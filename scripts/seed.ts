import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: ".env" });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting seed process...");

  // 1. Seed Interview Tracks
  console.log("Seeding interview tracks...");
  const tracks = [
    {
      name: "React Hooks Deep Dive",
      description: "Technical interview focusing on React Hooks, context, and performance.",
      system_prompt: "You are a senior React developer interviewing a candidate. Ask advanced questions about useEffect, useMemo, custom hooks, and React reconciliation. Wait for their answers, then evaluate.",
    },
    {
      name: "System Design - Scalable Chat",
      description: "Architecture interview for a scalable real-time chat application.",
      system_prompt: "You are a Principal Engineer interviewing a candidate on System Design. Ask them to design a scalable real-time chat application like WhatsApp. Ask about protocols (WebSockets), databases, load balancing, and offline support.",
    },
    {
      name: "Behavioral - Leadership & Conflict",
      description: "STAR method interview focusing on leadership and conflict resolution.",
      system_prompt: "You are an Engineering Manager. Ask the candidate behavioral questions using the STAR method (Situation, Task, Action, Result). Focus on times they had a conflict with a coworker, or took leadership on a difficult project.",
    }
  ];

  for (const track of tracks) {
    const { error } = await supabase
      .from("interview_tracks")
      .upsert({ name: track.name, description: track.description, system_prompt: track.system_prompt }, { onConflict: "name" });
    if (error) console.error("Error inserting track:", error.message);
  }

  // 2. Seed Topics
  console.log("Seeding topics...");
  const topicsList = [
    { title: "Frontend Engineering", description: "React, CSS, and web performance." },
    { title: "Backend Engineering", description: "Node.js, databases, and APIs." },
    { title: "Career Prep", description: "Resume writing and interview skills." },
  ];

  for (const t of topicsList) {
    const { error } = await supabase
      .from("topics")
      .upsert({ title: t.title, description: t.description }, { onConflict: "title" });
    if (error) console.error("Error inserting topic:", error.message);
  }

  // 3. Seed Job Listings
  console.log("Seeding job listings...");
  
  const jobs = [
    {
      title: "Frontend Developer (React)",
      company: "TechNova",
      url: "https://example.com/job/1",
      source: "internal",
      external_id: "job-1"
    },
    {
      title: "Backend Engineer",
      company: "DataFlow Systems",
      url: "https://example.com/job/2",
      source: "internal",
      external_id: "job-2"
    }
  ];

  for (const job of jobs) {
    const { error } = await supabase
      .from("job_listings")
      .upsert(job, { onConflict: "source,external_id" });
    if (error && !error.message.includes("duplicate key value")) {
      console.error("Error inserting job:", error.message);
    }
  }

  console.log("Seed process complete!");
}

seed().catch(console.error);
