# PlacePro LMS — Architecture Document

## 1. Project Overview

PlacePro LMS is a full-stack, AI-powered Learning Management System targeted at college students and placement candidates. It offers structured course tracks, quiz-based learning, proctored AI voice interviews, live video classes, coding challenges, gamification, a career roadmap generator, and a social feed for peer connections.

### Tech Stack Summary

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TanStack Router (`@tanstack/react-router`) |
| **Styling** | TailwindCSS v4, shadcn/ui (Radix Primitives), Framer Motion, GSAP |
| **Backend / API** | TanStack Start (Nitro runtime via Vite), Node.js |
| **AI-LLM** | Vercel AI SDK (Gemini 1.5 Flash), OpenAI Realtime API (GPT-4o) |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **Auth** | Supabase Auth (JWT based) |
| **Hosting** | Vercel (indicated by `vercel.json`), Cloudflare R2 for media |
| **Build** | Vite 8, Bun |
| **Third-party** | MediaPipe (Proctoring face detection) |
| **Live Video** | Custom Peer-to-Peer WebRTC with Supabase Realtime (Broadcast) signaling |


## 2. Folder Structure

```text
c:\Users\Mani\Projects\pixel-perfect-preview
├── .env                    # Environment variables (DO NOT COMMIT)
├── package.json            # Dependencies and scripts (React 19, Vite, Tanstack)
├── vite.config.ts          # Vite bundler configuration & custom invite middleware
├── vercel.json             # Vercel deployment rewrite rules
├── supabase.sql            # Full PostgreSQL database DDL schema and RLS policies
├── README.md               # Project overview
├── api/
│   └── invite.ts           # Standalone invite script/function
├── src/
│   ├── components/         # Reusable React components (shadcn/ui, layout components)
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   ├── supabase.ts     # Supabase client initialization
│   │   ├── store.ts        # LocalStorage + Event-based state for profile and quizzes
│   │   ├── auth-store.ts   # React hook wrapping Supabase auth state changes
│   │   └── r2-client.server.ts # Cloudflare R2 bucket integration
│   ├── routes/             # TanStack file-based routing structure
│   │   ├── api/            # Backend API route handlers (Nitro)
│   │   │   ├── interview.start.ts   # Starts OpenAI realtime session
│   │   │   ├── roadmap.ts           # Gemini 1.5 career roadmap generation
│   │   │   └── onboarding.complete.ts # Completes user profile
│   │   ├── __root.tsx      # Root routing layout & error boundary
│   │   ├── index.tsx       # Landing page (GSAP animated)
│   │   ├── _app.*.tsx      # App views (Dashboard, Quizzes, Interviews, etc)
│   │   └── admin.*.tsx     # Admin dashboard views
│   ├── router.tsx          # TanStack Router initialization
│   ├── routeTree.gen.ts    # Auto-generated routing tree (DO NOT EDIT)
│   └── main.tsx            # React application entry point
└── dist/                   # Production build output
```

## 3. Architecture Diagram

```ascii
+-----------------------+        +---------------------------+        +------------------------+
|                       |  HTTP  |                           |        |                        |
|   Web Browser         +------->+   Backend API (Nitro)     +------->+  Supabase (PostgreSQL) |
|   (React 19, GSAP,    |        |   (/api/* routes)         |        |  Auth + Database + RLS |
|   TanStack Router)    +<-------+                           +<-------+                        |
|                       |        +---+------------------+----+        +------------------------+
|   - LocalStorage      |            |                  |
|   - Context/Hooks     |        HTTP|                  |HTTP
|   - WebRTC            |            v                  v
+-----------+-----------+    +---------------+  +---------------+
            |                | OpenAI API    |  | Gemini API    |
            |WebRTC          | (Realtime)    |  | (AI SDK)      |
            v                +---------------+  +---------------+
   +-----------------------+
   | Peer-to-Peer WebRTC   |
   | (Supabase Realtime    |
   | Signaling)            |
   +-----------------------+
```

## 4. Frontend Architecture

- **Routing:** Handled entirely by `@tanstack/react-router` using file-based routing. The `__root.tsx` defines the main layout and QueryClient provider.
- **State Management:** 
  - **Auth:** Managed via `src/lib/auth-store.ts` using a custom hook `useAuth()` that subscribes to `supabase.auth.onAuthStateChange`.
  - **Client State:** A hybrid approach using `localStorage` coupled with native DOM Event dispatching (`window.dispatchEvent(new Event("profile-updated"))`) to trigger re-renders across components in `src/lib/store.ts`.
  - **Server State:** `@tanstack/react-query` is installed and initialized in the router, intended for async data fetching.
- **Animations:** Heavy use of `framer-motion` for UI interactions and `gsap` (with ScrollTrigger) for complex landing page canvas animations.

### Routing Table Example
| Path | File | Description |
|---|---|---|
| `/` | `index.tsx` | Main GSAP-animated landing page |
| `/login` | `login.tsx` | Authentication login page |
| `/onboarding` | `onboarding.tsx` | Personalized onboarding flow |
| `/dashboard` | `_app.dashboard.tsx` | Main student dashboard |
| `/interview/ai/:sessionId` | `_app.interview.ai.$sessionId.tsx` | Active AI voice interview room |
| `/admin/users` | `admin.users.tsx` | Admin panel for user management |

### Code Snippet: State Management (`src/lib/store.ts`)
```typescript
export function saveProfile(profile: ProfileData) {
  if (typeof window === "undefined") return;
  localStorage.setItem("placepro-profile", JSON.stringify(profile));
  window.dispatchEvent(new Event("profile-updated")); // Manual event bus pattern
}
```

## 5. Backend / API Architecture

- **Framework:** TanStack Start API Routes (running on Nitro).
- **Middleware:** A custom Vite middleware (`api-invite-middleware` in `vite.config.ts`) bypasses standard Nitro routing during development to handle admin user invitations securely via the Supabase Service Role Key.
- **Security & Validation:** Cross-platform input sanitization is implemented for API routes (e.g., chat, posts, stories) using `src/lib/sanitize.ts` to prevent injection attacks.
- **Missing Protections:** 🔴 **No global rate limiting** is evident. 🔴 Some API routes (e.g., `/api/roadmap`) **lack authentication checks** entirely, allowing unauthorized access to paid AI integrations. CORS is manually handled in the Vite dev middleware but relies on hosting config in production.

### Endpoint Table
| Method | Route | Description | Auth Required? |
|---|---|---|---|
| `POST` | `/api/invite` | Invites a user via service role key | Yes (Admin) |
| `POST` | `/api/interview/start` | Fetches OpenAI ephemeral key and creates DB session | Yes |
| `POST` | `/api/onboarding/complete` | Updates user profile and topics | Yes |
| `POST` | `/api/roadmap` | Generates career roadmap via Gemini | **NO (Missing)** |

### Code Snippet: Route Handler (`src/routes/api/interview.start.ts`)
```typescript
const authHeader = request.headers.get("Authorization");
const token = authHeader?.replace("Bearer ", "");
if (!token) return new Response("Unauthorized", { status: 401 });

const { data: { user }, error: authError } = await supabase.auth.getUser(token);
if (authError || !user) return new Response("Unauthorized", { status: 401 });

const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
  method: "POST",
  headers: { Authorization: `Bearer ${openAiKey}`, "Content-Type": "application/json" },
  // ...
});
```

## 6. Database Schema

The application uses PostgreSQL (via Supabase). The full schema is maintained in `supabase.sql`.

### Core Entities
- **Auth & Profiles:** `profiles` (links to `auth.users`), `teachers`, `connections`.
- **LMS Content:** `topics`, `quizzes`, `quiz_questions`, `code_challenges`.
- **User Activity:** `student_topics`, `quiz_attempts`, `code_submissions`, `interview_sessions`.
- **Live Rooms:** `instant_rooms`, `room_participants` (Tracks active rooms and waiting room guests).
- **Gamification:** `xp_transactions`, `badges`, `topic_leaderboards`.
- **Social:** `posts`, `post_reactions`, `post_comments`, `stories`.

### ER Diagram (Mermaid)
```mermaid
erDiagram
    auth_users ||--o| profiles : "has profile"
    profiles ||--o{ student_topics : "enrolls in"
    topics ||--o{ student_topics : "is enrolled by"
    topics ||--o{ quizzes : "contains"
    quizzes ||--o{ quiz_questions : "has"
    auth_users ||--o{ quiz_attempts : "attempts"
    quizzes ||--o{ quiz_attempts : "is attempted in"
    auth_users ||--o{ interview_sessions : "conducts"
    auth_users ||--o{ posts : "creates"
    posts ||--o{ post_comments : "has"
    auth_users ||--o{ connections : "follows / is followed by"
```

## 7. Authentication & Authorization

- **Authentication Method:** Supabase JWT Tokens. Users authenticate on the client, and tokens are stored by the Supabase SDK. 
- **Authorization / Roles:** The system defines three roles: `student`, `teacher`, and `admin` within the `profiles` table.
- **Enforcement Mechanisms:**
  - **Client-side:** `useAuth()` hook determines UI visibility.
  - **Database (RLS):** Strict Row Level Security policies exist in PostgreSQL. E.g., `CREATE POLICY "Manage own or admin" ON quiz_attempts FOR ALL USING (auth.uid() = user_id OR get_user_role() = 'admin');`.
  - **API Level:** Endpoints retrieve the user from the Bearer token via `supabase.auth.getUser(token)`.

## 8. Third-Party Integrations

1. **Supabase:** Core database, authentication, RLS, and **Realtime Broadcast** for WebRTC signaling (live rooms). 
2. **OpenAI (Realtime API):** Used for AI voice interviews. Generates an ephemeral WebRTC token for the client.
3. **Google Gemini (Vercel AI SDK):** Used for generating structured Career Roadmaps (`/api/roadmap`).
4. **Cloudflare R2:** Used for media storage (images/recordings). Configured via AWS S3 SDK compatibility (`@aws-sdk/client-s3`).

### Code Snippet: Gemini Integration (`api/roadmap.ts`)
```typescript
const google = createGoogleGenerativeAI({ apiKey: key });
const { object } = await generateObject({
  model: google("gemini-1.5-flash") as any,
  schema: z.object({ title: z.string(), steps: z.array(...) }),
  prompt: `Generate a detailed step-by-step career roadmap...`
});
```

## 9. Environment Variables

| Variable | Purpose | Scope | Status |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Supabase instance URL | Client/Server | Present |
| `VITE_SUPABASE_ANON_KEY` | Public Supabase anon key | Client/Server | Present |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin access to Supabase | Server Only | Present |
| `GEMINI_API_KEY` | Roadmap generation | Server Only | Present |
| `OPENAI_API_KEY` | Realtime voice interviews | Server Only | Present |
| `R2_ACCOUNT_ID`... | Cloudflare R2 configurations | Server Only | Present |

## 10. Data Flow Walkthroughs

### Flow 1: AI Interview Initialization
1. **User Action:** Clicks "Start AI Interview" on the frontend.
2. **Client:** Calls `POST /api/interview/start` passing their Supabase JWT.
3. **Server:** Verifies the JWT via Supabase. Calls the OpenAI API (`/v1/realtime/sessions`) using the secure server-side `OPENAI_API_KEY`.
4. **Server:** Inserts a new row into `interview_sessions` in Supabase with status `in_progress`.
5. **Response:** Server returns the OpenAI ephemeral `client_secret` and the DB `session_id`.
6. **Client:** Uses the ephemeral key to connect directly to OpenAI via WebRTC for real-time audio.

## 11. Deployment Architecture

- **Hosting:** The application is designed to be hosted on Vercel or Cloudflare. The `vercel.json` rewrite rules route `/api/*` to the Nitro backend and everything else to `index.html` (SPA fallback).
- **Media Storage:** Cloudflare R2 is explicitly configured for robust media storage, reducing egress costs compared to standard Vercel blob storage.
- **Database:** Supabase acts as a standalone external database provider.

## 12. Known Issues / TODOs

### 🔴 Critical
- **Unauthenticated API Route:** The `/api/roadmap.ts` endpoint lacks Supabase token verification. Anyone can POST to this endpoint and consume the server's `GEMINI_API_KEY` quota.

### 🟡 Important
- **State Management Anti-Pattern:** Global state (`src/lib/store.ts`) relies on `window.dispatchEvent(new Event(...))`. This can lead to race conditions and brittle react reactivity. Since `@tanstack/react-query` is installed, state syncing should ideally be migrated to query mutations and invalidations.
- **Missing Global Rate Limiting:** No rate limiting is configured in Nitro, making AI endpoints vulnerable to abuse.

### 🟢 Feature Stubs
- The database schema introduces an `arena_mode` for CTFs (`topic_leaderboards`, `flag_submitted`), which appear to be recent structural additions likely still in active development on the frontend (`_app.arena.tsx`).

---
*Document Generation Date: 2026-07-15*
*Codebase Version/Branch: Local Development Workspace*
