/**
 * useStories — React Query hook for story stacks + view tracking.
 *
 * Conventions:
 *  - staleTime: Infinity — Supabase Realtime (postgres_changes on stories INSERT)
 *    drives cache invalidation, not polling.
 *  - View tracking is debounced (1 s) and uses ON CONFLICT DO NOTHING server-side
 *    to avoid duplicate rows on re-open.
 */

import { useCallback, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StoryProfile {
  id: string;
  name: string;
  username: string | null;
  avatar_url: string | null;
}

export interface Story {
  id: string;
  user_id: string;
  content: string | null;
  media_url: string | null;
  story_type: "status" | "streak" | "achievement" | "media";
  expires_at: string;
  created_at: string;
  profiles: StoryProfile;
}

/** Stories grouped by author — one entry per user who has active stories */
export interface StoryStack {
  userId: string;
  profile: StoryProfile;
  stories: Story[];
  /** true when current user has viewed every story in this stack */
  allSeen: boolean;
}

// ─── Query keys ───────────────────────────────────────────────────────────────

export const STORIES_KEY = ["stories"] as const;
export const STORY_VIEWS_KEY = (userId: string) => ["story-views", userId] as const;

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function fetchStories(token: string): Promise<Story[]> {
  const res = await fetch("/api/stories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch stories");
  return res.json();
}

/** Returns story IDs (from a given set) that the current user has viewed */
async function fetchViewedIds(token: string, storyIds: string[]): Promise<Set<string>> {
  if (storyIds.length === 0) return new Set();
  const res = await fetch(`/api/stories/views?ids=${storyIds.join(",")}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return new Set();
  const data: string[] = await res.json();
  return new Set(data);
}

// ─── useStories ───────────────────────────────────────────────────────────────

/**
 * Main hook. Returns story stacks with seen-state computed.
 *
 * Usage:
 *   const { stacks, isLoading } = useStories(session?.id ?? "");
 */
export function useStories(currentUserId: string) {
  const queryClient = useQueryClient();

  // 1. Fetch all visible stories
  const storiesQuery = useQuery({
    queryKey: STORIES_KEY,
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];
      return fetchStories(session.access_token);
    },
    staleTime: Infinity,
    enabled: !!currentUserId,
  });

  // 2. Fetch which story IDs the current user has already viewed
  const allStoryIds = (storiesQuery.data ?? []).map((s) => s.id);
  const viewsQuery = useQuery({
    queryKey: STORY_VIEWS_KEY(currentUserId),
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return new Set<string>();
      return fetchViewedIds(session.access_token, allStoryIds);
    },
    staleTime: Infinity,
    enabled: allStoryIds.length > 0 && !!currentUserId,
  });

  // 3. Subscribe to Realtime INSERT on stories → invalidate query
  useEffect(() => {
    if (!currentUserId) return;
    const channel = supabase
      .channel("stories-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "stories" },
        () => {
          queryClient.invalidateQueries({ queryKey: STORIES_KEY });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, queryClient]);

  // 4. Group stories into per-user stacks
  const viewedIds = viewsQuery.data ?? new Set<string>();
  const stacks: StoryStack[] = [];
  const seen = new Map<string, StoryStack>();

  for (const story of storiesQuery.data ?? []) {
    // Filter out already-expired stories client-side
    if (new Date(story.expires_at) <= new Date()) continue;

    if (!seen.has(story.user_id)) {
      const stack: StoryStack = {
        userId: story.user_id,
        profile: story.profiles,
        stories: [],
        allSeen: false,
      };
      seen.set(story.user_id, stack);
      stacks.push(stack);
    }
    seen.get(story.user_id)!.stories.push(story);
  }

  // Compute allSeen for each stack
  for (const stack of stacks) {
    stack.allSeen = stack.stories.every((s) => viewedIds.has(s.id));
  }

  return {
    stacks,
    viewedIds,
    isLoading: storiesQuery.isLoading,
    refetch: () => queryClient.invalidateQueries({ queryKey: STORIES_KEY }),
  };
}

// ─── useMarkStoryViewed ────────────────────────────────────────────────────────

/**
 * Returns a debounced function to mark a story as viewed.
 * Debounce (1 s) prevents duplicate calls when the viewer quickly flips between stories.
 */
export function useMarkStoryViewed(currentUserId: string) {
  const queryClient = useQueryClient();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<Set<string>>(new Set());

  const mutation = useMutation({
    mutationFn: async (storyIds: string[]) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      await fetch("/api/stories/views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ story_ids: storyIds }),
      });
    },
    onSuccess: () => {
      // Invalidate the views query so ring states update immediately
      queryClient.invalidateQueries({ queryKey: STORY_VIEWS_KEY(currentUserId) });
    },
  });

  const markViewed = useCallback(
    (storyId: string) => {
      pendingRef.current.add(storyId);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const ids = Array.from(pendingRef.current);
        pendingRef.current.clear();
        mutation.mutate(ids);
      }, 1000);
    },
    [mutation]
  );

  return markViewed;
}
