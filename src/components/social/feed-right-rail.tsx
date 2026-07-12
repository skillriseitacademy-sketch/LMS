import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { StoryRow } from "./story-row";
import { SuggestionCard } from "./suggestion-card";
import { TopicChip } from "./topic-chip";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";

type Story = {
  id: string;
  user_id: string;
  story_type: string;
  content: string | null;
  media_url: string | null;
  expires_at: string;
  profiles: { id: string; name: string; avatar_url: string | null };
};

type Suggestion = {
  id: string;
  name: string;
  avatar_url: string | null;
  headline: string | null;
  role: string;
};

type Topic = { id: string; title: string };

export function FeedRightRail() {
  const { session } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    if (!session) return;

    const token = (supabase as any).realtime?.accessToken ?? "";

    // Fetch stories
    fetch("/api/stories", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setStories(data.slice(0, 6));
      })
      .catch(() => {});

    // Fetch suggestions
    fetch("/api/suggestions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSuggestions(data);
      })
      .catch(() => {});

    // Fetch enrolled topics for recommendation chips
    supabase
      .from("student_topics")
      .select("topics(id, title)")
      .eq("user_id", session.id)
      .then(({ data }) => {
        if (data) {
          setTopics(data.map((d: any) => d.topics).filter(Boolean));
        }
      });
  }, [session]);

  // Topic color tokens map (cycles through card tints)
  const tints = ["bg-card-blue", "bg-card-pink", "bg-card-yellow", "bg-card-green"];

  return (
    <>
      {/* Stories */}
      {stories.length > 0 && (
        <div className="rounded-3xl border border-border bg-card p-4">
          <h3 className="text-display text-sm font-semibold mb-3">Stories</h3>
          <StoryRow stories={stories} />
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="rounded-3xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-display text-sm font-semibold">Suggestions</h3>
            <span className="text-xs text-muted-foreground">People you may know</span>
          </div>
          <div className="flex flex-col gap-3">
            {suggestions.map((s) => (
              <SuggestionCard key={s.id} user={s} />
            ))}
          </div>
          <Link to="/feed" className="mt-3 block text-xs text-brand hover:underline">
            See all
          </Link>
        </div>
      )}

      {/* Topic Recommendations */}
      {topics.length > 0 && (
        <div className="rounded-3xl border border-border bg-card p-4">
          <h3 className="text-display text-sm font-semibold mb-3">Your Topics</h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((t, i) => (
              <TopicChip key={t.id} topic={t} tint={tints[i % tints.length]} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
