import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

console.log("Supabase URL initialized as:", supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Please check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Create a new user via Supabase Admin REST API.
 * Uses fetch directly to avoid dual-client conflicts.
 */
export async function createUserAdmin(opts: {
  email: string;
  password: string;
  role: string;
  name: string;
}): Promise<{ user: any; error: string | null }> {
  if (!supabaseServiceKey) {
    return { user: null, error: "Missing VITE_SUPABASE_SERVICE_ROLE_KEY in environment variables." };
  }

  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: "POST",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: opts.email,
        password: opts.password,
        email_confirm: true,
        user_metadata: { role: opts.role, name: opts.name },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { user: null, error: data.msg || data.message || data.error || "Failed to create user" };
    }

    return { user: data, error: null };
  } catch (e: any) {
    return { user: null, error: e.message || "Network error" };
  }
}

// ─── Core Tables ─────────────────────────────────────────────────────────────

export type UserRow = {
  id: string;
  role: "student" | "teacher" | "admin"; // Fixed: was missing 'teacher'
  name: string;
  email: string;
  avatar_url: string | null;
  headline: string | null;
  onboarding_complete: boolean;
  // Phase 2 additions:
  username: string;
  visibility: "public" | "private";
  bio: string | null;
  skills: string[] | null;
  created_at: string;
  updated_at: string;
};

export type ProjectRow = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  github_url: string | null;
  live_url: string | null;
  author_name: string | null; // Phase 1 fix: now exists in DB
  created_at: string;
};

export type CareerPathRow = {
  id: string;
  user_id: string;
  target_job: string;
  country: string;
  education_level: string;
  roadmap_json: any;
  created_at: string;
};

export type QuizAttemptRow = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  created_at: string;
};

export type InterviewSessionRow = {
  id: string;
  user_id: string;
  topic_id: string | null;
  role: string | null;
  transcript: any | null;
  scores: any | null;
  status: string | null;
  mode_detail: string;
  proctor_flags: any[];
  fullscreen_exits: number;
  started_at: string | null; // Phase 1 fix
  ended_at: string | null; // Phase 1 fix
  created_at: string;
};

export type ProctorFlagRow = {
  id: string;
  session_id: string;
  flag_type: "no_face" | "multiple_faces" | "tab_switch" | "fullscreen_exit" | "audio_anomaly";
  description: string;
  created_at: string;
};

export type LiveClassRow = {
  id: string;
  teacher_id: string;
  topic_id: string;
  title: string;
  description: string | null;
  scheduled_at: string;
  duration_minutes: number;
  daily_room_url: string | null; // Phase 1 fix: was room_url
  daily_room_name: string | null;
  start_time: string | null;
  end_time: string | null;
  recording_storage_path: string | null;
  status: string;
  max_participants: number;
  created_at: string;
};

// ─── Social Layer (Phase 2) ──────────────────────────────────────────────────

export type ConnectionRow = {
  id: string;
  follower_id: string;
  following_id: string;
  status: "pending" | "accepted" | "declined" | "blocked";
  created_at: string;
};

export type PostRow = {
  id: string;
  user_id: string;
  content: string;
  media_urls: string[];
  visibility: "public" | "connections" | "private";
  type: "text" | "achievement" | "project" | "question";
  ref_type: string | null;
  ref_id: string | null;
  is_hidden: boolean;
  created_at: string;
};

export type PostReactionRow = {
  id: string;
  post_id: string;
  user_id: string;
  reaction_type: "like" | "fire" | "clap" | "brain" | "rocket";
  created_at: string;
};

export type PostCommentRow = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export type StoryRow = {
  id: string;
  user_id: string;
  content: string | null;
  media_url: string | null;
  story_type: "status" | "streak" | "achievement" | "media";
  expires_at: string;
  created_at: string;
};

export type ReportRow = {
  id: string;
  reporter_id: string;
  target_type: "post" | "user" | "comment";
  target_id: string;
  reason: string;
  status: "pending" | "reviewed" | "dismissed" | "actioned";
  created_at: string;
};

// ─── Video Rooms (Phase 4) ───────────────────────────────────────────────────

export type InstantRoomRow = {
  id: string;
  host_id: string;
  room_url: string;
  room_name: string;
  room_code: string;
  is_active: boolean;
  created_at: string;
  expires_at: string;
};

// ─── Arena (Phase 5) ─────────────────────────────────────────────────────────

export type CodeChallengeRow = {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  starter_code: string | null;
  category: "code" | "web" | "network" | "crypto" | "forensics";
  topic_id: string | null;
  flag: string | null;
  points: number;
  max_attempts: number | null;
  created_by: string | null;
  created_at: string;
};

export type TopicLeaderboardRow = {
  id: string;
  topic_id: string;
  user_id: string;
  total_points: number;
  challenges_solved: number;
  updated_at: string;
};
