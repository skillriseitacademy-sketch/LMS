/**
 * useChat — React Query + Supabase Realtime Broadcast hook for the chat widget.
 *
 * Conventions (matching useWebRTC.ts):
 *  - Supabase Broadcast channel `chat:${conversationId}` for live events.
 *  - No postgres_changes — broadcast is cheaper and matches project convention.
 *  - Messages are persisted to DB via API routes (not directly from client).
 *  - Typing indicators are broadcast-only, never written to DB.
 *  - Optimistic sends: message appears immediately, reconciled when API confirms.
 *  - Cursor-based pagination on created_at (30 messages/page).
 */

import { useEffect, useRef, useCallback, useState } from "react";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ConversationSummary, MessageWithSender } from "@/lib/supabase";

// ─── Query keys ───────────────────────────────────────────────────────────────

export const CONVERSATIONS_KEY = ["conversations"] as const;
export const MESSAGES_KEY = (convId: string) => ["messages", convId] as const;
export const BOT_THREAD_KEY = ["bot-thread"] as const;

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function getToken(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  return session.access_token;
}

async function apiFetch(url: string, init?: RequestInit) {
  const token = await getToken();
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(body || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── useConversations ─────────────────────────────────────────────────────────

export function useConversations() {
  const queryClient = useQueryClient();

  const query = useQuery<ConversationSummary[]>({
    queryKey: CONVERSATIONS_KEY,
    queryFn: () => apiFetch("/api/chat/conversations"),
    staleTime: Infinity,
  });

  // Invalidate when a new message arrives (broadcast handler updates this)
  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
  }, [queryClient]);

  return { ...query, invalidateConversations: invalidate };
}

// ─── useMessages (infinite / paginated) ──────────────────────────────────────

const PAGE_SIZE = 30;

export function useMessages(conversationId: string | null) {
  return useInfiniteQuery<MessageWithSender[]>({
    queryKey: MESSAGES_KEY(conversationId ?? ""),
    queryFn: async ({ pageParam }) => {
      const before = pageParam as string | undefined;
      const url = `/api/chat/messages?conversation_id=${conversationId}${before ? `&before=${encodeURIComponent(before)}` : ""}&limit=${PAGE_SIZE}`;
      return apiFetch(url);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return lastPage[lastPage.length - 1].created_at;
    },
    initialPageParam: undefined,
    staleTime: Infinity,
    enabled: !!conversationId,
  });
}

// ─── useSendMessage ───────────────────────────────────────────────────────────

interface SendMessageParams {
  conversationId: string;
  body: string;
  storyId?: string;
  isBotConversation?: boolean;
}

interface OptimisticMessage extends MessageWithSender {
  _optimistic?: true;
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ conversationId, body, storyId }: SendMessageParams) => {
      return apiFetch("/api/chat/messages", {
        method: "POST",
        body: JSON.stringify({ conversation_id: conversationId, body, story_id: storyId ?? null }),
      });
    },
    onMutate: async ({ conversationId, body }: SendMessageParams) => {
      // Cancel in-flight queries for this conversation
      await queryClient.cancelQueries({ queryKey: MESSAGES_KEY(conversationId) });

      const previousMessages = queryClient.getQueryData<InfiniteData<MessageWithSender[]>>(
        MESSAGES_KEY(conversationId)
      );

      // Optimistic message (shown immediately, replaced by real data on success)
      const optimistic: OptimisticMessage = {
        id: `optimistic-${Date.now()}`,
        conversation_id: conversationId,
        sender_id: "me", // placeholder — replaced on reconcile
        body,
        story_id: null,
        created_at: new Date().toISOString(),
        sender: null,
        _optimistic: true,
      };

      queryClient.setQueryData<InfiniteData<MessageWithSender[]>>(
        MESSAGES_KEY(conversationId),
        (old) => {
          if (!old) return old;
          const newPages = [...old.pages];
          newPages[0] = [optimistic, ...newPages[0]];
          return { ...old, pages: newPages };
        }
      );

      return { previousMessages };
    },
    onError: (_err, { conversationId }, context) => {
      // Roll back optimistic update
      if (context?.previousMessages) {
        queryClient.setQueryData(MESSAGES_KEY(conversationId), context.previousMessages);
      }
    },
    onSettled: (_data, _err, { conversationId }) => {
      // Always reconcile with server state after send
      queryClient.invalidateQueries({ queryKey: MESSAGES_KEY(conversationId) });
      queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
    },
  });
}

// ─── useConversationRealtime ──────────────────────────────────────────────────

interface TypingState {
  [peerId: string]: { name: string; at: number };
}

/**
 * Subscribes to Supabase Broadcast on `chat:${conversationId}`.
 * Handles: new_message, typing.
 * Returns: `typingPeers` — list of names currently typing.
 */
export function useConversationRealtime(
  conversationId: string | null,
  currentUserId: string
) {
  const queryClient = useQueryClient();
  const [typingState, setTypingState] = useState<TypingState>({});
  const typingTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase.channel(`chat:${conversationId}`);

    channel
      .on("broadcast", { event: "new_message" }, ({ payload }) => {
        const msg = payload as MessageWithSender;
        // Skip if we sent it (optimistic already in cache)
        if (msg.sender_id === currentUserId) return;

        queryClient.setQueryData<InfiniteData<MessageWithSender[]>>(
          MESSAGES_KEY(conversationId),
          (old) => {
            if (!old) return old;
            const newPages = [...old.pages];
            newPages[0] = [msg, ...newPages[0]];
            return { ...old, pages: newPages };
          }
        );
        // Bump conversations list so unread count updates
        queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY });
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        const { userId, name } = payload as { userId: string; name: string };
        if (userId === currentUserId) return;

        setTypingState((prev) => ({ ...prev, [userId]: { name, at: Date.now() } }));

        // Auto-clear after 3 s of no typing broadcast
        if (typingTimers.current[userId]) clearTimeout(typingTimers.current[userId]);
        typingTimers.current[userId] = setTimeout(() => {
          setTypingState((prev) => {
            const next = { ...prev };
            delete next[userId];
            return next;
          });
        }, 3000);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      Object.values(typingTimers.current).forEach(clearTimeout);
    };
  }, [conversationId, currentUserId, queryClient]);

  const typingPeers = Object.values(typingState).map((s) => s.name);
  return { typingPeers };
}

// ─── useSendTyping ────────────────────────────────────────────────────────────

/**
 * Returns a debounced broadcast function for typing indicators.
 * Throttled to one broadcast per 1.5 s — never written to DB.
 */
export function useSendTyping(conversationId: string | null) {
  const lastSent = useRef<number>(0);

  return useCallback(
    (userId: string, name: string) => {
      if (!conversationId) return;
      const now = Date.now();
      if (now - lastSent.current < 1500) return;
      lastSent.current = now;

      supabase.channel(`chat:${conversationId}`).send({
        type: "broadcast",
        event: "typing",
        payload: { userId, name },
      });
    },
    [conversationId]
  );
}

// ─── useReadReceipt ───────────────────────────────────────────────────────────

/** Updates last_read_at when a chat window is focused or scrolled to bottom. */
export function useReadReceipt(conversationId: string | null) {
  return useMutation({
    mutationFn: async () => {
      if (!conversationId) return;
      return apiFetch(`/api/chat/conversations/${conversationId}/read`, { method: "PATCH" });
    },
  });
}

// ─── useEnsureBotThread ───────────────────────────────────────────────────────

/** Idempotent: finds-or-creates the AI bot conversation for the current user. */
export function useEnsureBotThread(enabled: boolean) {
  return useQuery<{ conversationId: string }>({
    queryKey: BOT_THREAD_KEY,
    queryFn: () =>
      apiFetch("/api/chat/ensure-bot-thread", { method: "POST", body: JSON.stringify({}) }),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
}
