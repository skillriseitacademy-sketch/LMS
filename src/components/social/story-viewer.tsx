/**
 * StoryViewer — Full-screen Instagram-style story player.
 *
 * Features:
 *  - Segmented progress bar (one segment per story in the active stack)
 *  - Auto-advance timer (5 s images, 15 s video)
 *  - Hold-to-pause (onPointerDown / onPointerUp)
 *  - Left/right tap zones + swipe gestures for prev/next
 *  - Swipe-down or X to close
 *  - Video mute toggle
 *  - Seen-by bottom sheet (story owner only)
 *  - Reply-to-story input — creates/opens DM with story_id reference
 *  - Marks stories viewed via useMarkStoryViewed (debounced 1 s)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Volume2, VolumeX, Eye, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import type { Story, StoryStack } from "@/hooks/useStories";
import { useMarkStoryViewed } from "@/hooks/useStories";

// ─── Constants ────────────────────────────────────────────────────────────────

const IMAGE_DURATION_MS = 5000;
const VIDEO_DURATION_MS = 15000;

// ─── Types ────────────────────────────────────────────────────────────────────

interface StoryViewerProps {
  stacks: StoryStack[];
  initialStackIndex: number;
  currentUserId: string;
  onClose: () => void;
}

interface SeenByData {
  viewers: Array<{ viewer_id: string; viewed_at: string; profiles: { name: string; avatar_url: string | null } }>;
  count: number;
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────

function SegmentedProgressBar({
  total,
  current,
  progress,
}: {
  total: number;
  current: number;
  progress: number; // 0–1
}) {
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            animate={{ width: i < current ? "100%" : i === current ? `${progress * 100}%` : "0%" }}
            transition={i === current ? { duration: 0, ease: "linear" } : undefined}
          />
        </div>
      ))}
    </div>
  );
}

// ─── StoryViewer ──────────────────────────────────────────────────────────────

export function StoryViewer({ stacks, initialStackIndex, currentUserId, onClose }: StoryViewerProps) {
  const [stackIdx, setStackIdx] = useState(initialStackIndex);
  const [storyIdx, setStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [seenByOpen, setSeenByOpen] = useState(false);
  const [seenByData, setSeenByData] = useState<SeenByData | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyInputFocused, setReplyInputFocused] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const markViewed = useMarkStoryViewed(currentUserId);

  const currentStack = stacks[stackIdx];
  const currentStory = currentStack?.stories[storyIdx];
  const isOwn = currentStory?.user_id === currentUserId;
  const isVideo = !!currentStory?.media_url && (
    currentStory.media_url.includes(".mp4") || currentStory.media_url.includes(".webm")
  );
  const duration = isVideo ? VIDEO_DURATION_MS : IMAGE_DURATION_MS;

  // ── Navigation helpers ────────────────────────────────────────────────────

  const goToNext = useCallback(() => {
    if (!currentStack) return;
    if (storyIdx < currentStack.stories.length - 1) {
      setStoryIdx((i) => i + 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else if (stackIdx < stacks.length - 1) {
      setStackIdx((i) => i + 1);
      setStoryIdx(0);
      setProgress(0);
      elapsedRef.current = 0;
    } else {
      onClose();
    }
  }, [currentStack, stackIdx, stacks.length, storyIdx, onClose]);

  const goToPrev = useCallback(() => {
    if (storyIdx > 0) {
      setStoryIdx((i) => i - 1);
    } else if (stackIdx > 0) {
      setStackIdx((i) => i - 1);
      const prevStack = stacks[stackIdx - 1];
      setStoryIdx(prevStack.stories.length - 1);
    }
    setProgress(0);
    elapsedRef.current = 0;
  }, [stackIdx, stacks, storyIdx]);

  // ── Progress animation ────────────────────────────────────────────────────

  useEffect(() => {
    if (!currentStory || paused || replyInputFocused) return;

    startTimeRef.current = performance.now() - elapsedRef.current;

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      elapsedRef.current = elapsed;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        goToNext();
        return;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [currentStory?.id, paused, replyInputFocused, duration, goToNext]);

  // ── Mark viewed on story change ───────────────────────────────────────────

  useEffect(() => {
    if (currentStory?.id) {
      markViewed(currentStory.id);
    }
  }, [currentStory?.id, markViewed]);

  // ── Video sync ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) video.pause();
    else video.play().catch(() => {});
  }, [paused]);

  // ── Swipe/hold handlers ────────────────────────────────────────────────────

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setPaused(true);
    swipeStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setPaused(false);
    const start = swipeStartRef.current;
    if (!start) return;
    swipeStartRef.current = null;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;

    // Swipe down to close
    if (dy > 80 && Math.abs(dx) < 60) { onClose(); return; }

    // Short tap — navigate
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      const { left, width } = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const tapX = e.clientX - left;
      if (tapX < width * 0.35) goToPrev();
      else goToNext();
    }
  }, [goToNext, goToPrev, onClose]);

  // ── Seen by ────────────────────────────────────────────────────────────────

  const fetchSeenBy = useCallback(async () => {
    if (!currentStory) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const res = await fetch(`/api/stories/views?story_id=${currentStory.id}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (res.ok) setSeenByData(await res.json());
  }, [currentStory]);

  const openSeenBy = useCallback(() => {
    fetchSeenBy();
    setSeenByOpen(true);
  }, [fetchSeenBy]);

  // ── Reply to story ─────────────────────────────────────────────────────────

  const sendReply = useCallback(async () => {
    if (!replyText.trim() || !currentStory) return;
    setReplySending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const token = session.access_token;

      // Find or create DM with the story author
      const convRes = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ other_user_id: currentStory.user_id }),
      });
      const { conversationId } = await convRes.json();

      // Send message tagged with story_id
      await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          conversation_id: conversationId,
          body: replyText.trim(),
          story_id: currentStory.id,
        }),
      });

      setReplyText("");
    } catch (e) {
      console.error("[StoryViewer] reply failed:", e);
    } finally {
      setReplySending(false);
    }
  }, [replyText, currentStory]);

  if (!currentStack || !currentStory) return null;

  const { profile } = currentStack;
  const initials = profile.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-black flex items-center justify-center"
        key="story-viewer"
      >
        <div
          className="relative w-full h-full max-w-sm mx-auto flex flex-col select-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* ── Media / Text content ── */}
          {currentStory.media_url ? (
            isVideo ? (
              <video
                key={currentStory.id}
                ref={videoRef}
                src={currentStory.media_url}
                muted={muted}
                playsInline
                autoPlay
                loop={false}
                className="absolute inset-0 w-full h-full object-cover"
                onEnded={goToNext}
              />
            ) : (
              <img
                key={currentStory.id}
                src={currentStory.media_url}
                alt="story"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )
          ) : (
            <div
              key={currentStory.id}
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{
                background:
                  currentStory.story_type === "streak"
                    ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                    : currentStory.story_type === "achievement"
                    ? "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <p className="text-white text-2xl font-bold text-center leading-snug drop-shadow">
                {currentStory.content}
              </p>
            </div>
          )}

          {/* ── Gradient overlays for readability ── */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* ── Top HUD ── */}
          <div className="absolute top-0 inset-x-0 p-3 space-y-2 z-10">
            <SegmentedProgressBar
              total={currentStack.stories.length}
              current={storyIdx}
              progress={progress}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 ring-2 ring-white/60">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.name} className="object-cover" />
                  ) : null}
                  <AvatarFallback className="bg-brand text-white text-xs font-bold">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">{profile.name}</p>
                  <p className="text-white/60 text-[10px]">
                    {new Date(currentStory.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isVideo && (
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerUp={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                    className="p-2 rounded-full bg-black/30 text-white"
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                )}
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => { e.stopPropagation(); onClose(); }}
                  className="p-2 rounded-full bg-black/30 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Tap zones (invisible, on top of media, below HUD) ── */}
          <div className="absolute inset-0 top-24 bottom-24 flex pointer-events-none">
            <div className="flex-[2]" />
            <div className="flex-[3]" />
          </div>

          {/* ── Bottom controls ── */}
          <div className="absolute bottom-0 inset-x-0 p-4 space-y-3 z-10">
            {/* Seen by (own story only) */}
            {isOwn && (
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => { e.stopPropagation(); openSeenBy(); }}
                className="flex items-center gap-1.5 text-white/80 text-xs hover:text-white transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>{seenByData?.count ?? "…"} views</span>
              </button>
            )}

            {/* Reply input (other users only) */}
            {!isOwn && (
              <div
                className="flex items-center gap-2"
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onFocus={() => { setReplyInputFocused(true); setPaused(true); }}
                  onBlur={() => { setReplyInputFocused(false); setPaused(false); }}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
                  placeholder={`Reply to ${profile.name}…`}
                  className="flex-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-white/50 px-4 py-2 text-sm outline-none focus:border-white/50 transition-colors"
                />
                <button
                  onClick={sendReply}
                  disabled={!replyText.trim() || replySending}
                  className="p-2 rounded-full bg-brand text-white disabled:opacity-50 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* ── Prev / Next arrows (keyboard-style, visible on hover) ── */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity z-20"
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => { e.stopPropagation(); goToPrev(); }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity z-20"
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => { e.stopPropagation(); goToNext(); }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* ── Seen By Drawer ── */}
        <Drawer open={seenByOpen} onOpenChange={setSeenByOpen}>
          <DrawerContent className="max-h-[60vh]">
            <DrawerHeader>
              <DrawerTitle className="text-base">
                Seen by {seenByData?.count ?? 0}
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto p-4 space-y-3">
              {seenByData?.viewers.map((v) => {
                const name = v.profiles?.name ?? "User";
                const init = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
                return (
                  <div key={v.viewer_id} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      {v.profiles?.avatar_url ? (
                        <img src={v.profiles.avatar_url} alt={name} className="object-cover" />
                      ) : null}
                      <AvatarFallback className="bg-brand/20 text-brand-dark text-xs font-bold">{init}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(v.viewed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })}
              {seenByData?.viewers.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No views yet</p>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </motion.div>
    </AnimatePresence>
  );
}
