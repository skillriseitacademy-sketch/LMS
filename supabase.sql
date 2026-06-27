-- Run this SQL in your Supabase SQL Editor to initialize the database schema

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('student', 'admin')),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  github_url TEXT,
  live_url TEXT,
  author_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Career Paths Table
CREATE TABLE IF NOT EXISTS career_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_job TEXT NOT NULL,
  country TEXT NOT NULL,
  education_level TEXT NOT NULL,
  roadmap_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Set up Row Level Security (RLS) for testing
-- We will allow public read/write for now so the app works seamlessly out of the box.
-- (In a real production app, you would lock this down using Supabase Auth policies)

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all for projects" ON projects FOR ALL USING (true);
CREATE POLICY "Enable all for career_paths" ON career_paths FOR ALL USING (true);
