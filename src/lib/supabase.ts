import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Please check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our Database
export type UserRow = {
  id: string; // uuid
  role: 'student' | 'admin';
  name: string;
  email: string;
  created_at: string;
};

export type ProjectRow = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  github_url: string | null;
  live_url: string | null;
  author_name: string;
  created_at: string;
};

export type CareerPathRow = {
  id: string;
  user_id: string; // references users(id)
  target_job: string;
  country: string;
  education_level: string;
  roadmap_json: any; // Stored roadmap steps
  created_at: string;
};
