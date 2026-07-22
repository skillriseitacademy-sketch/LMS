/**
 * ChatDock — LinkedIn/Messenger-style docked chat widget.
 *
 * Structure:
 *   <ChatDock>                          ← Fixed bottom-right, z-50, persists all routes
 *     <ChatDockBar>                     ← Horizontal avatar bubble row + "Messaging" icon
 *     <ConversationListPanel>           ← Popover panel: search + recent threads
 *     <ChatWindow conversationId>       ← Per-conversation window (max 3 open side-by-side)
 *       <MessageList>                   ← Virtualized with @tanstack/react-virtual
 *       <TypingIndicator>
 *       <MessageInput>
 *     </ChatWindow>
 *   </ChatDock>
 *
 * Key decisions:
 *  - Lazy-mount: message lists only render when the window is EXPANDED.
 *  - Max 3 open windows; 4th+ auto-collapse the oldest.
 *  - Bot window routes messages to /api/chat/bot (streaming) instead of /api/chat/messages.
 *  - Typing indicators use Supabase Realtime Broadcast, not DB (debounced 1.5 s).
 */

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  Fragment,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  MessageSquare,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Send,
  Bot,
  Minimize2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useChat as useAiChat } from "@ai-sdk/react";
import {
  useConversations,
  useMessages,
  useSendMessage,
  useConversationRealtime,
  useSendTyping,
  useReadReceipt,
  useEnsureBotThread,
} from "@/hooks/useChat";
import { useAuth } from "@/lib/auth-store";
import type { ConversationSummary, MessageWithSender } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_OPEN_WINDOWS = 3;
const BOT_CONVERSATION_NAME = "AI Assistant";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getConvName(conv: ConversationSummary, currentUserId: string): string {
  if (conv.is_bot_thread) return BOT_CONVERSATION_NAME;
  const other = conv.participants.find((p) => p.user_id !== currentUserId);
  return other?.name ?? conv.name ?? "Chat";
}

function getConvAvatar(conv: ConversationSummary, currentUserId: string): string | null {
  if (conv.is_bot_thread) return null;
  const other = conv.participants.find((p) => p.user_id !== currentUserId);
  return other?.avatar_url ?? null;
}

// ─── ConversationListPanel ────────────────────────────────────────────────────

interface ConvListProps {
  conversations: ConversationSummary[];
  currentUserId: string;
  onOpen: (convId: string) => void;
  onClose: () => void;
  search: string;
  onSearchChange: (v: string) => void;
}

function ConversationListPanel({
  conversations,
  currentUserId,
  onOpen,
  onClose,
  search,
  onSearchChange,
}: ConvListProps) {
  const filtered = conversations.filter((c) => {
    const name = getConvName(c, currentUserId).toLowerCase();
    return name.includes(search.toLowerCase());
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-16 right-0 w-80 rounded-xl border border-border bg-card shadow-2xl overflow-hidden z-50"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-display font-bold text-sm text-foreground">Messaging</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search messages…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-72">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-xs py-6">No conversations yet</p>
        )}
        {filtered.map((conv) => {
          const name = getConvName(conv, currentUserId);
          const avatar = getConvAvatar(conv, currentUserId);
          const lastMsg = conv.last_message?.body ?? "";
          const isBot = conv.is_bot_thread;

          return (
            <button
              key={conv.id}
              onClick={() => { onOpen(conv.id); onClose(); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/60 transition-colors text-left"
            >
              <div className="relative shrink-0">
                <Avatar className="h-9 w-9">
                  {avatar ? <img src={avatar} alt={name} className="object-cover" /> : null}
                  <AvatarFallback className={`text-xs font-bold ${isBot ? "bg-brand text-white" : "bg-brand/20 text-brand-dark"}`}>
                    {isBot ? <Bot className="h-4 w-4" /> : getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                {conv.unread_count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-brand border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{name}</p>
                <p className="text-xs text-muted-foreground truncate">{lastMsg || "No messages yet"}</p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({
  msg,
  currentUserId,
  isBot,
}: {
  msg: MessageWithSender & { _optimistic?: boolean; _streaming?: boolean };
  currentUserId: string;
  isBot: boolean;
}) {
  const isOwn = msg.sender_id === currentUserId;
  const isSystem = !msg.sender_id;

  if (isSystem || (isBot && !isOwn)) {
    return (
      <div className="flex items-start gap-2 max-w-[85%]">
        <div className="h-6 w-6 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-foreground leading-relaxed">
          {msg.body}
          {(msg as any)._streaming && (
            <span className="inline-flex gap-0.5 ml-1">
              <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </span>
          )}
        </div>
      </div>
    );
  }

  if (isOwn) {
    return (
      <div className="flex justify-end">
        <div className={`max-w-[80%] rounded-2xl rounded-tr-sm px-3 py-2 text-sm leading-relaxed ${msg._optimistic ? "bg-brand/60 text-white/80" : "bg-brand text-white"}`}>
          {msg.body}
          {/* Story reply reference badge */}
          {msg.story_id && (
            <p className="text-white/60 text-[10px] mt-0.5">↩ Story reply</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-1.5 max-w-[85%]">
      <Avatar className="h-5 w-5 shrink-0">
        {msg.sender?.avatar_url ? <img src={msg.sender.avatar_url} alt="" className="object-cover" /> : null}
        <AvatarFallback className="text-[8px] bg-muted">{getInitials(msg.sender?.name ?? "?")}</AvatarFallback>
      </Avatar>
      <div className="rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-foreground leading-relaxed">
        {msg.body}
      </div>
    </div>
  );
}

// ─── ChatWindow ───────────────────────────────────────────────────────────────

interface ChatWindowProps {
  conversationId: string;
  conversations: ConversationSummary[];
  currentUserId: string;
  currentUserName: string;
  onClose: () => void;
}

function ChatWindow({
  conversationId,
  conversations,
  currentUserId,
  currentUserName,
  onClose,
}: ChatWindowProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [inputText, setInputText] = useState("");
  const parentRef = useRef<HTMLDivElement>(null);

  const conv = conversations.find((c) => c.id === conversationId);
  const isBot = conv?.is_bot_thread ?? false;
  const convName = conv ? getConvName(conv, currentUserId) : "Chat";
  const convAvatar = conv ? getConvAvatar(conv, currentUserId) : null;

  // ── Regular messages (non-bot) ─────────────────────────────────────────────
  const messagesQuery = useMessages(isBot ? null : conversationId);
  const flatMessages: (MessageWithSender & { _optimistic?: boolean })[] = isBot
    ? []
    : (messagesQuery.data?.pages.flatMap((p) => p) ?? []).reverse();

  const sendMessage = useSendMessage();
  const { typingPeers } = useConversationRealtime(isBot ? null : conversationId, currentUserId);
  const sendTyping = useSendTyping(isBot ? null : conversationId);
  const readReceipt = useReadReceipt(conversationId);

  // ── Bot messages (streaming via ai-sdk) ───────────────────────────────────
  const {
    messages: aiMessages,
    input: aiInput,
    setInput: setAiInput,
    handleSubmit: handleAiSubmit,
    isLoading: aiLoading,
    stop: aiStop,
  } = useAiChat({
    api: "/api/chat/bot",
    body: { conversation_id: conversationId },
    headers: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return { Authorization: `Bearer ${session?.access_token ?? ""}` };
    },
  });

  // ── Virtualizer ────────────────────────────────────────────────────────────
  const virtualizer = useVirtualizer({
    count: flatMessages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
    // Reverse rendering (newest at bottom)
    scrollPaddingEnd: 0,
  });

  // Scroll to bottom on new messages
  useLayoutEffect(() => {
    if (collapsed || flatMessages.length === 0) return;
    virtualizer.scrollToIndex(flatMessages.length - 1, { behavior: "smooth" });
  }, [flatMessages.length, collapsed]);

  // Load more on scroll to top
  useEffect(() => {
    const el = parentRef.current;
    if (!el || isBot) return;
    const handleScroll = () => {
      if (el.scrollTop < 50 && messagesQuery.hasNextPage && !messagesQuery.isFetchingNextPage) {
        messagesQuery.fetchNextPage();
      }
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [messagesQuery, isBot]);

  // Mark read on focus
  useEffect(() => {
    if (!collapsed) readReceipt.mutate();
  }, [collapsed, conversationId]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSend = useCallback(() => {
    if (isBot) {
      handleAiSubmit(new Event("submit") as any);
      return;
    }
    const text = inputText.trim();
    if (!text) return;
    sendMessage.mutate({ conversationId, body: text });
    setInputText("");
  }, [isBot, inputText, conversationId, sendMessage, handleAiSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isBot) setAiInput(e.target.value);
      else {
        setInputText(e.target.value);
        sendTyping(currentUserId, currentUserName);
      }
    },
    [isBot, setAiInput, sendTyping, currentUserId, currentUserName]
  );

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col rounded-t-xl border border-border border-b-0 bg-card shadow-xl overflow-hidden"
      style={{ width: 320, height: collapsed ? "auto" : 460 }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-3 py-2.5 border-b border-border cursor-pointer select-none hover:bg-muted/40 transition-colors"
        onClick={() => setCollapsed((c) => !c)}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Avatar className="h-7 w-7">
              {convAvatar ? <img src={convAvatar} alt={convName} className="object-cover" /> : null}
              <AvatarFallback className={`text-xs font-bold ${isBot ? "bg-brand text-white" : "bg-brand/20 text-brand-dark"}`}>
                {isBot ? <Bot className="h-3.5 w-3.5" /> : getInitials(convName)}
              </AvatarFallback>
            </Avatar>
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success border-2 border-card" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground leading-none">{convName}</p>
            {typingPeers.length > 0 && !collapsed && (
              <p className="text-[10px] text-brand">typing…</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {collapsed ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Body (lazy-mounted: only renders when expanded) ── */}
      {!collapsed && (
        <>
          {/* Message list */}
          <div
            ref={parentRef}
            className="flex-1 overflow-y-auto px-3 py-2 space-y-2"
          >
            {isBot ? (
              // AI SDK messages (streaming)
              <div className="space-y-2">
                {aiMessages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "assistant" ? (
                      <div className="flex items-start gap-2 max-w-[85%]">
                        <div className="h-6 w-6 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                          {m.parts?.map((p, i) =>
                            p.type === "text" ? <Fragment key={i}>{p.text}</Fragment> : null
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-3 py-2 text-sm text-white leading-relaxed">
                        {m.parts?.map((p, i) =>
                          p.type === "text" ? <Fragment key={i}>{p.text}</Fragment> : null
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-brand flex items-center justify-center shrink-0">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2">
                      <span className="inline-flex gap-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Virtualized regular messages
              <div
                style={{ height: virtualizer.getTotalSize(), position: "relative" }}
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const msg = flatMessages[virtualRow.index];
                  return (
                    <div
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={virtualizer.measureElement}
                      style={{
                        position: "absolute",
                        top: 0,
                        transform: `translateY(${virtualRow.start}px)`,
                        width: "100%",
                        paddingBottom: 8,
                      }}
                    >
                      <MessageBubble
                        msg={msg}
                        currentUserId={currentUserId}
                        isBot={isBot}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Typing indicator */}
          {typingPeers.length > 0 && (
            <div className="px-3 pb-1">
              <p className="text-xs text-muted-foreground italic">
                {typingPeers.join(", ")} {typingPeers.length === 1 ? "is" : "are"} typing…
              </p>
            </div>
          )}

          {/* Input row */}
          <div className="px-3 py-2 border-t border-border flex items-end gap-2">
            <textarea
              value={isBot ? aiInput : inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isBot ? "Ask AI Assistant…" : "Message…"}
              rows={1}
              className="flex-1 resize-none rounded-lg bg-muted border border-border px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand/50 max-h-20 overflow-y-auto"
              style={{ minHeight: 36 }}
            />
            <button
              onClick={handleSend}
              disabled={isBot ? (aiLoading || !aiInput.trim()) : !inputText.trim()}
              className="p-2 rounded-lg bg-brand text-white hover:bg-brand-dark transition-colors disabled:opacity-40 shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ─── ChatDock (root component) ────────────────────────────────────────────────

export function ChatDock() {
  const { session } = useAuth();
  const [listOpen, setListOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>([]); // conversationIds
  const [searchQuery, setSearchQuery] = useState("");

  const { data: conversations = [] } = useConversations();
  const { data: botThread } = useEnsureBotThread(!!session);

  // Auto-open the bot thread conversation on first mount
  useEffect(() => {
    if (botThread?.conversationId && openWindows.length === 0) {
      setOpenWindows([botThread.conversationId]);
    }
  }, [botThread?.conversationId]);

  const openWindow = useCallback((convId: string) => {
    setOpenWindows((prev) => {
      if (prev.includes(convId)) return prev; // already open
      const next = [convId, ...prev];
      // Cap at MAX_OPEN_WINDOWS; collapse (remove) the oldest
      return next.slice(0, MAX_OPEN_WINDOWS);
    });
  }, []);

  const closeWindow = useCallback((convId: string) => {
    setOpenWindows((prev) => prev.filter((id) => id !== convId));
  }, []);

  if (!session) return null;

  const currentUserId = session.id;
  const currentUserName = session.name;

  // Dock bubbles: up to 5 most recent non-open conversations
  const dockBubbles = conversations
    .filter((c) => !openWindows.includes(c.id))
    .slice(0, 5);

  return (
    <div className="fixed bottom-0 right-4 z-50 flex flex-col items-end gap-0">
      {/* ── Open chat windows (stacked side-by-side to the left) ── */}
      <div className="flex items-end gap-2 mb-0">
        <AnimatePresence>
          {[...openWindows].reverse().map((convId) => (
            <ChatWindow
              key={convId}
              conversationId={convId}
              conversations={conversations}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
              onClose={() => closeWindow(convId)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Conversation list panel ── */}
      <div className="relative">
        <AnimatePresence>
          {listOpen && (
            <ConversationListPanel
              conversations={conversations}
              currentUserId={currentUserId}
              onOpen={openWindow}
              onClose={() => setListOpen(false)}
              search={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
        </AnimatePresence>

        {/* ── Dock bar ── */}
        <div className="flex items-center gap-2 bg-card border border-border border-b-0 rounded-t-xl px-3 py-2 shadow-lg">
          {/* Messaging icon */}
          <button
            onClick={() => setListOpen((o) => !o)}
            className={`relative flex items-center justify-center h-9 w-9 rounded-full transition-all ${
              listOpen ? "bg-brand text-white" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            {/* Total unread badge */}
            {conversations.reduce((acc, c) => acc + (c.unread_count ?? 0), 0) > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-brand border-2 border-card text-white text-[8px] font-bold flex items-center justify-center">
                {Math.min(conversations.reduce((a, c) => a + (c.unread_count ?? 0), 0), 9)}
              </span>
            )}
          </button>

          {/* Bubble avatars for recent conversations */}
          {dockBubbles.map((conv) => {
            const name = getConvName(conv, currentUserId);
            const avatar = getConvAvatar(conv, currentUserId);
            const isBot = conv.is_bot_thread;

            return (
              <button
                key={conv.id}
                onClick={() => openWindow(conv.id)}
                title={name}
                className="relative hover:scale-110 transition-transform"
              >
                <Avatar className="h-8 w-8">
                  {avatar ? <img src={avatar} alt={name} className="object-cover" /> : null}
                  <AvatarFallback className={`text-[10px] font-bold ${isBot ? "bg-brand text-white" : "bg-brand/20 text-brand-dark"}`}>
                    {isBot ? <Bot className="h-3.5 w-3.5" /> : getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                {conv.unread_count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-brand border-2 border-card" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
