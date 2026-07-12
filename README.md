# PlacePro LMS

PlacePro LMS is a full-stack AI-powered Learning Management System targeting college students and placement candidates. Its purpose is to provide an all-in-one platform for placement preparation: structured course tracks, quiz-based learning, AI voice interviews with real-time proctoring, live video classes, coding challenges, gamification, a career roadmap generator, a job board, and a resume builder.

## Features

- **AI Mock Interviews** — WebRTC + OpenAI Realtime API voice sessions, proctored by MediaPipe face detection.
- **Quizzes** — Timed multiple-choice quizzes with instant feedback and score persistence.
- **Resume Builder** — AI-tuned resume builder with role-specific suggestions and multiple templates.
- **Live Classes** — Daily.co video rooms scheduled by teachers.
- **Career Roadmap** — AI-generated step-by-step roadmap via Gemini 1.5 Flash.
- **Social Feed & Connections** — Student feed, posts, comments, reactions, and a connection/following graph.
- **Admin Panel** — User management, teacher approval, analytics powered by real Supabase data.

## Tech Stack

- **Frontend:** React 19, TailwindCSS v4, shadcn/ui, Framer Motion
- **Full-Stack Framework:** TanStack Start (SSR), TanStack Router
- **Backend/API:** Nitro (Cloudflare Workers target), Supabase (PostgreSQL + RLS)
- **AI Integration:** Vercel AI SDK (Gemini 1.5 Flash), OpenAI Realtime API (WebRTC)
- **Build Tool:** Vite 8, Bun

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`. Ensure your Supabase URL and keys are correct. For AI features, you will need:
   - `OPENAI_API_KEY`
   - `DAILY_API_KEY`
   - `PlacePro_API_KEY`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

For a detailed breakdown of the routing, state management, backend APIs, and database schema, please refer to the [Architecture Document](architecture_document.md).
