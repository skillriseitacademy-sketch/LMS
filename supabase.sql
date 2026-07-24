-- PlacePro LMS Full Database Schema from Zero

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. BASE TABLES & AUTH
-- ==============================================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  headline TEXT,
  onboarding_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  specialization TEXT[],
  is_approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Utility function to get the current user's role securely without infinite RLS recursion
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role;
END;
$$;

-- Trigger to create a profile automatically when a new auth.user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role, name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'role', 'student'), -- Default to student
    COALESCE(new.raw_user_meta_data->>'name', 'New User'),
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- ==============================================================================
-- 2. LMS CORE (COURSES, TOPICS, QUIZZES)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS student_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, topic_id)
);

CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_index INTEGER NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 3. LIVE CLASSES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS live_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  room_url TEXT,
  recording_storage_path TEXT,
  status TEXT DEFAULT 'scheduled',
  max_participants INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS class_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES live_classes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ,
  left_at TIMESTAMPTZ
);

-- ==============================================================================
-- 4. INTERVIEWS & PROCTORING
-- ==============================================================================

CREATE TABLE IF NOT EXISTS interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  role TEXT,
  transcript JSONB,
  scores JSONB,
  status TEXT,
  mode_detail TEXT DEFAULT 'realtime_voice',
  proctor_flags JSONB DEFAULT '[]'::jsonb,
  fullscreen_exits INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 5. CODE CHALLENGES & RESUMES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS code_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  description TEXT NOT NULL,
  starter_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS code_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES code_challenges(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  status TEXT NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 6. GAMIFICATION & LEADERBOARD
-- ==============================================================================

CREATE TABLE IF NOT EXISTS xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  required_xp INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS streak_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS daily_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS leaderboard_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  rankings JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 7. CAREER ROADMAP & PROJECTS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  url TEXT NOT NULL,
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(source, external_id)
);

CREATE TABLE IF NOT EXISTS career_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roadmap_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_job TEXT NOT NULL,
  country TEXT NOT NULL,
  education_level TEXT NOT NULL,
  roadmap_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS roadmap_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT NOT NULL UNIQUE,
  roadmap_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS roadmap_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES roadmap_nodes(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('education', 'job', 'root')),
  field TEXT NOT NULL,
  level TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE streak_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Global Read/Write logic:
-- Students: See their own data, public content (topics, quizzes, badges)
-- Teachers: See their own data, public content, plus student data related to their courses
-- Admins: See everything (via get_user_role() = 'admin')
-- Note: the 'ai_agent' actions are performed via service_role API keys which bypass RLS.
-- ------------------------------------------------------------------------------

-- Profiles
CREATE POLICY "Public profiles are viewable by all authenticated users" ON profiles FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR get_user_role() = 'admin');

-- Teachers
CREATE POLICY "Teachers viewable by all" ON teachers FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage teachers" ON teachers FOR ALL USING (get_user_role() = 'admin');

-- Topics, Quizzes, Quiz Questions, Code Challenges, Badges, Career Roles, Job Listings, Roadmap Cache
-- These are content/global tables. Anyone can read, only admin can manage.
CREATE POLICY "Content viewable by all" ON topics FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage topics" ON topics FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Content viewable by all" ON quizzes FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage quizzes" ON quizzes FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Content viewable by all" ON quiz_questions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage quiz questions" ON quiz_questions FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Content viewable by all" ON code_challenges FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage code challenges" ON code_challenges FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Content viewable by all" ON badges FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage badges" ON badges FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Content viewable by all" ON career_roles FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage career roles" ON career_roles FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Content viewable by all" ON job_listings FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage job listings" ON job_listings FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Content viewable by all" ON roadmap_cache FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage roadmap cache" ON roadmap_cache FOR ALL USING (get_user_role() = 'admin');
CREATE POLICY "Users view own roadmap nodes" ON roadmap_nodes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own roadmap nodes" ON roadmap_nodes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Content viewable by all" ON leaderboard_snapshots FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins manage leaderboard" ON leaderboard_snapshots FOR ALL USING (get_user_role() = 'admin');

-- User-scoped data (student_topics, quiz_attempts, interview_sessions, code_submissions, resumes, xp_transactions, user_badges, streak_history, daily_missions, user_roadmap_progress, projects)
-- Students see their own. Admins see all. Teachers see relevant rows (for simplicity, we'll give teachers read-only to some global student data since they need to review progress).
CREATE POLICY "View own or admin/teacher" ON student_topics FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON student_topics FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON quiz_attempts FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON interview_sessions FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON interview_sessions FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON code_submissions FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON code_submissions FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON resumes FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON resumes FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON xp_transactions FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON xp_transactions FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON user_badges FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON user_badges FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON streak_history FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON streak_history FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON daily_missions FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON daily_missions FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON user_roadmap_progress FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON user_roadmap_progress FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

CREATE POLICY "View own or admin/teacher" ON projects FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Manage own or admin" ON projects FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');

-- Live Classes & Attendance
-- Teachers manage their own classes. Admins manage all. Students view all.
CREATE POLICY "Classes viewable by all" ON live_classes FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Teachers manage own classes" ON live_classes FOR ALL USING (auth.uid() = teacher_id OR get_user_role() = 'admin');

-- Attendance: students can insert their own join/leave. Teachers/Admins can view all.
CREATE POLICY "Students insert own attendance" ON class_attendance FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own attendance" ON class_attendance FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "View own or admin/teacher" ON class_attendance FOR SELECT USING (auth.uid() = user_id OR get_user_role() IN ('admin', 'teacher'));
CREATE POLICY "Admins manage attendance" ON class_attendance FOR ALL USING (get_user_role() = 'admin');

-- ==============================================================================
-- PHASE 1 FIXES — Applied 2026-07-11
-- ==============================================================================

-- 1a. interview_sessions: add started_at / ended_at columns
ALTER TABLE interview_sessions
  ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS ended_at TIMESTAMPTZ;

-- 1a. proctor_flags table (was referenced in code but never created)
CREATE TABLE IF NOT EXISTS proctor_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
  flag_type TEXT NOT NULL CHECK (flag_type IN ('no_face', 'multiple_faces', 'tab_switch', 'fullscreen_exit', 'audio_anomaly')),
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE proctor_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Session owner and admin/teacher can view flags" ON proctor_flags FOR SELECT
  USING (
    (SELECT user_id FROM interview_sessions WHERE id = session_id) = auth.uid()
    OR get_user_role() IN ('admin', 'teacher')
  );
CREATE POLICY "Session owner inserts flags" ON proctor_flags FOR INSERT
  WITH CHECK (
    (SELECT user_id FROM interview_sessions WHERE id = session_id) = auth.uid()
  );
CREATE POLICY "Admin manages all flags" ON proctor_flags FOR ALL
  USING (get_user_role() = 'admin');

-- 1a. live_classes: rename room_url → daily_room_url; add daily_room_name, start_time, end_time
ALTER TABLE live_classes
  RENAME COLUMN room_url TO daily_room_url;
ALTER TABLE live_classes
  ADD COLUMN IF NOT EXISTS daily_room_name TEXT,
  ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ;
-- scheduled_at kept for backward compatibility; start_time preferred going forward

-- 1a. projects: add author_name column (referenced in code but missing from schema)
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS author_name TEXT;

-- ==============================================================================
-- PHASE 2 — SOCIAL LAYER TABLES — Applied 2026-07-11
-- ==============================================================================

-- 2a. profiles social extensions
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS visibility TEXT NOT NULL DEFAULT 'private'
    CHECK (visibility IN ('public', 'private')),
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS skills TEXT[];

-- Helper function: check if two users are blocked (either direction)
CREATE OR REPLACE FUNCTION are_blocked(user_a UUID, user_b UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM connections
    WHERE status = 'blocked'
      AND ((follower_id = user_a AND following_id = user_b)
        OR (follower_id = user_b AND following_id = user_a))
  );
END;
$$;

-- Helper function: check if two users are connected (mutual accept)
CREATE OR REPLACE FUNCTION are_connected(user_a UUID, user_b UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM connections
    WHERE status = 'accepted'
      AND ((follower_id = user_a AND following_id = user_b)
        OR (follower_id = user_b AND following_id = user_a))
  );
END;
$$;

-- Connections / Follow system
CREATE TABLE IF NOT EXISTS connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(follower_id, following_id),
  CHECK (follower_id <> following_id)
);
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own connections" ON connections FOR SELECT
  USING (auth.uid() = follower_id OR auth.uid() = following_id);
CREATE POLICY "Users create connections" ON connections FOR INSERT
  WITH CHECK (auth.uid() = follower_id AND follower_id <> following_id);
CREATE POLICY "Users update own connections" ON connections FOR UPDATE
  USING (auth.uid() = follower_id OR auth.uid() = following_id);
CREATE POLICY "Users delete own connections" ON connections FOR DELETE
  USING (auth.uid() = follower_id OR auth.uid() = following_id);
CREATE POLICY "Admins view all connections" ON connections FOR SELECT
  USING (get_user_role() = 'admin');

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  visibility TEXT NOT NULL DEFAULT 'connections'
    CHECK (visibility IN ('public', 'connections', 'private')),
  type TEXT NOT NULL DEFAULT 'text'
    CHECK (type IN ('text', 'achievement', 'project', 'question')),
  ref_type TEXT,    -- 'quiz_attempt' | 'badge' | 'roadmap_step' | null
  ref_id UUID,      -- ID of the referenced row
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- Visibility-aware SELECT: public open to all authenticated; connections require accepted link; private owner-only
-- Blocked relationships excluded in all cases
CREATE POLICY "Post visibility and block check" ON posts FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND NOT are_blocked(auth.uid(), user_id)
    AND (
      auth.uid() = user_id
      OR visibility = 'public'
      OR (visibility = 'connections' AND are_connected(auth.uid(), user_id))
    )
    AND is_hidden = false
  );
-- Owner sees own hidden posts too
CREATE POLICY "Owner sees all own posts" ON posts FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users create own posts" ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own posts" ON posts FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Users delete own posts" ON posts FOR DELETE
  USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all posts" ON posts FOR ALL
  USING (get_user_role() = 'admin');

-- Post reactions (one per user per post; users can change reaction type by updating)
CREATE TABLE IF NOT EXISTS post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL
    CHECK (reaction_type IN ('like', 'fire', 'clap', 'brain', 'rocket')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(post_id, user_id)
);
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reactions visible when post is visible" ON post_reactions FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (SELECT 1 FROM posts WHERE id = post_id AND NOT are_blocked(auth.uid(), user_id))
  );
CREATE POLICY "Users manage own reactions" ON post_reactions FOR ALL
  USING (auth.uid() = user_id);
CREATE POLICY "Admins manage reactions" ON post_reactions FOR ALL
  USING (get_user_role() = 'admin');

-- Post comments
CREATE TABLE IF NOT EXISTS post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments visible when post is visible" ON post_comments FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (SELECT 1 FROM posts WHERE id = post_id AND NOT are_blocked(auth.uid(), user_id))
  );
CREATE POLICY "Users create own comments" ON post_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own comments" ON post_comments FOR DELETE
  USING (auth.uid() = user_id);
CREATE POLICY "Admins manage comments" ON post_comments FOR ALL
  USING (get_user_role() = 'admin');

-- Stories (24-hour ephemeral)
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT,
  media_url TEXT,
  story_type TEXT NOT NULL DEFAULT 'status'
    CHECK (story_type IN ('status', 'streak', 'achievement', 'media')),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours'),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  CHECK (content IS NOT NULL OR media_url IS NOT NULL)
);
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
-- Only non-expired stories visible; blocked users excluded
CREATE POLICY "Stories visible to connections and public profiles" ON stories FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND expires_at > now()
    AND NOT are_blocked(auth.uid(), user_id)
    AND (
      auth.uid() = user_id
      OR (SELECT visibility FROM profiles WHERE id = user_id) = 'public'
      OR are_connected(auth.uid(), user_id)
    )
  );
CREATE POLICY "Users manage own stories" ON stories FOR ALL
  USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all stories" ON stories FOR ALL
  USING (get_user_role() = 'admin');

-- Reports (user-generated content moderation)
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('post', 'user', 'comment')),
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewed', 'dismissed', 'actioned')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reporter can insert and view own reports" ON reports FOR SELECT
  USING (auth.uid() = reporter_id);
CREATE POLICY "Reporter can create reports" ON reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admins manage all reports" ON reports FOR ALL
  USING (get_user_role() = 'admin');

-- ==============================================================================
-- PHASE 4 — INSTANT VIDEO CALL ROOMS — Applied 2026-07-11
-- ==============================================================================

CREATE TABLE IF NOT EXISTS instant_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  room_url TEXT NOT NULL,
  room_name TEXT NOT NULL,
  room_code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '4 hours') NOT NULL
);
ALTER TABLE instant_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view active rooms" ON instant_rooms FOR SELECT
  USING (auth.uid() IS NOT NULL AND is_active = true AND expires_at > now());
CREATE POLICY "Host manages own rooms" ON instant_rooms FOR ALL
  USING (auth.uid() = host_id);
CREATE POLICY "Admins manage all rooms" ON instant_rooms FOR ALL
  USING (get_user_role() = 'admin');

-- ==============================================================================
-- PHASE 5 — CTF / PRACTICE ARENA — Applied 2026-07-11
-- ==============================================================================

-- Extend topics with arena_mode
ALTER TABLE topics
  ADD COLUMN IF NOT EXISTS arena_mode TEXT NOT NULL DEFAULT 'code'
    CHECK (arena_mode IN ('code_ranker', 'ctf', 'mixed'));

-- Extend code_challenges with arena fields
ALTER TABLE code_challenges
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'code'
    CHECK (category IN ('code', 'web', 'network', 'crypto', 'forensics')),
  ADD COLUMN IF NOT EXISTS topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS flag TEXT,
  ADD COLUMN IF NOT EXISTS points INTEGER NOT NULL DEFAULT 100,
  ADD COLUMN IF NOT EXISTS max_attempts INTEGER,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Update code_challenges RLS: allow teacher + admin to create/edit
DROP POLICY IF EXISTS "Admins manage code challenges" ON code_challenges;
CREATE POLICY "Admins and teachers manage code challenges" ON code_challenges FOR ALL
  USING (get_user_role() IN ('admin', 'teacher'));

-- Extend code_submissions for CTF flag submission
ALTER TABLE code_submissions
  ADD COLUMN IF NOT EXISTS flag_submitted TEXT,
  ADD COLUMN IF NOT EXISTS points_earned INTEGER DEFAULT 0;

-- Per-topic leaderboard (real-time, not snapshot-based)
CREATE TABLE IF NOT EXISTS topic_leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER NOT NULL DEFAULT 0,
  challenges_solved INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(topic_id, user_id)
);
ALTER TABLE topic_leaderboards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view topic leaderboards" ON topic_leaderboards FOR SELECT
  USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins update leaderboards" ON topic_leaderboards FOR ALL
  USING (get_user_role() = 'admin');
-- Students can upsert their own leaderboard entry (triggered by submission)
CREATE POLICY "Users upsert own leaderboard entry" ON topic_leaderboards FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own leaderboard entry" ON topic_leaderboards FOR UPDATE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- 10. INSTANT ROOMS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS instant_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  room_code TEXT NOT NULL UNIQUE,
  room_name TEXT NOT NULL,
  room_url TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE instant_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can view active instant rooms" ON instant_rooms FOR SELECT
  USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can create instant rooms" ON instant_rooms FOR INSERT
  WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts can manage their instant rooms" ON instant_rooms FOR UPDATE
  USING (auth.uid() = host_id);
CREATE POLICY "Hosts can delete their instant rooms" ON instant_rooms FOR DELETE
  USING (auth.uid() = host_id);

-- ==============================================================================
-- NOTIFICATIONS ARCHITECTURE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'follow', 'mention')),
  ref_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE stories ADD CONSTRAINT stories_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- ==============================================================================
-- NOTIFICATIONS ARCHITECTURE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'follow', 'mention')),
  ref_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE stories ADD CONSTRAINT stories_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE instant_rooms ADD CONSTRAINT instant_rooms_host_id_profiles_fkey FOREIGN KEY (host_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE notifications ADD CONSTRAINT notifications_actor_id_profiles_fkey FOREIGN KEY (actor_id) REFERENCES profiles(id) ON DELETE CASCADE;


ALTER TABLE post_comments ADD CONSTRAINT post_comments_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE post_reactions ADD CONSTRAINT post_reactions_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- ==============================================================================
-- PHASE 6 — STORY VIEWS + CHAT SYSTEM — Applied 2026-07-22
-- ==============================================================================

-- ── Story view tracking ────────────────────────────────────────────────────────

-- Index for expiry cleanup queries (already used in RLS but benefits from index)
CREATE INDEX IF NOT EXISTS stories_expires_at_idx ON stories(expires_at);

CREATE TABLE IF NOT EXISTS story_views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id    UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  viewer_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  viewed_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(story_id, viewer_id)
);
CREATE INDEX IF NOT EXISTS story_views_story_id_idx ON story_views(story_id);
CREATE INDEX IF NOT EXISTS story_views_viewer_id_idx ON story_views(viewer_id);

ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;

-- Viewers can insert their own view row (ON CONFLICT DO NOTHING handled by app)
CREATE POLICY "Viewers insert own view" ON story_views FOR INSERT
  WITH CHECK (auth.uid() = viewer_id);

-- Story owner can see all views on their stories
CREATE POLICY "Story owner sees views" ON story_views FOR SELECT
  USING (
    auth.uid() = viewer_id
    OR EXISTS (
      SELECT 1 FROM stories s WHERE s.id = story_id AND s.user_id = auth.uid()
    )
  );

-- ── Chat: conversations ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS conversations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_group   BOOLEAN NOT NULL DEFAULT false,
  name       TEXT,           -- optional label for group convs
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- A user can only see conversations they're a participant in
CREATE POLICY "Participants can view conversations" ON conversations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants cp
      WHERE cp.conversation_id = id AND cp.user_id = auth.uid()
    )
  );

-- ── Chat: participants ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS conversation_participants (
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_read_at    TIMESTAMPTZ,
  is_bot_thread   BOOLEAN NOT NULL DEFAULT false,  -- true = pinned AI assistant thread
  joined_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);
CREATE INDEX IF NOT EXISTS conv_participants_user_id_idx ON conversation_participants(user_id);
CREATE INDEX IF NOT EXISTS conv_participants_conv_id_idx ON conversation_participants(conversation_id);

ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;

-- Participants can read their own participant rows
CREATE POLICY "Users see own participation rows" ON conversation_participants FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own last_read_at
CREATE POLICY "Users update own last_read_at" ON conversation_participants FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role inserts participants (handled server-side only)
-- No INSERT policy for anon/authenticated role — all inserts go through API routes with service key

-- ── Chat: messages ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  -- sender_id is NULL for bot/system messages (inserted with service role key)
  sender_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  body            TEXT NOT NULL,
  -- Optional: links the message to a story (story-reply DM flow)
  story_id        UUID REFERENCES stories(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Hot-path index: fetch latest messages for a conversation
CREATE INDEX IF NOT EXISTS messages_conv_created_idx ON messages(conversation_id, created_at DESC);
-- Index for sender queries (read receipts, "your messages" filtering)
CREATE INDEX IF NOT EXISTS messages_sender_idx ON messages(sender_id);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can read messages in conversations they participate in
CREATE POLICY "Participants can read messages" ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversation_participants cp
      WHERE cp.conversation_id = messages.conversation_id
        AND cp.user_id = auth.uid()
    )
  );

-- Users can insert their own messages (sender_id must match)
-- Bot messages (sender_id = null) are inserted server-side with service role key — no RLS needed
CREATE POLICY "Users insert own messages" ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversation_participants cp
      WHERE cp.conversation_id = messages.conversation_id
    )
  );

-- ==============================================================================
-- PHASE 7 — ARENA DYNAMIC STATS — Applied 2026-07-22
-- ==============================================================================

CREATE OR REPLACE FUNCTION get_user_arena_stats(user_id_param UUID)
RETURNS TABLE (
  total_solved BIGINT,
  global_rank BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  solved_count BIGINT;
  rank_num BIGINT;
BEGIN
  -- Count challenges passed by this user
  SELECT COUNT(*) INTO solved_count 
  FROM code_submissions 
  WHERE user_id = user_id_param AND (status = 'passed' OR passed = true);
  
  -- Calculate global rank: 1 + number of users who have MORE solved challenges
  SELECT 1 + COUNT(DISTINCT user_id) INTO rank_num
  FROM (
    SELECT user_id, COUNT(*) as c
    FROM code_submissions
    WHERE (status = 'passed' OR passed = true)
    GROUP BY user_id
  ) as user_counts
  WHERE c > solved_count;

  RETURN QUERY SELECT solved_count, rank_num;
END;
$$;
