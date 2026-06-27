// Centralised mock data so analytics/leaderboard/profile/quizzes stay in sync.

export type Period = "7d" | "30d" | "90d";

const seed = (n: number) => {
  let s = n;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export function generateSignups(period: Period) {
  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const rng = seed(days);
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    return {
      day: d.toLocaleDateString("en-US", { day: "2-digit", month: "short" }),
      iso: d.toISOString(),
      value: Math.round(1 + rng() * 4),
      revenue: Math.round(80 + rng() * 220),
      learners: Math.round(20 + rng() * 80),
    };
  });
}

export function computeKpis(period: Period) {
  const series = generateSignups(period);
  const totalSignups = series.reduce((s, p) => s + p.value, 0);
  const totalRevenue = series.reduce((s, p) => s + p.revenue, 0);
  const avgLearners = Math.round(series.reduce((s, p) => s + p.learners, 0) / series.length);
  return {
    series,
    kpis: [
      { label: "All Users", value: String(200 + totalSignups * 3) },
      { label: "Conversations", value: `${(30.1 + totalSignups / 10).toFixed(1)}k` },
      { label: `${period === "7d" ? "7" : period === "30d" ? "30" : "90"} day signups`, value: String(totalSignups) },
      { label: "Avg time", value: "50m" },
      { label: "Revenue", value: `$${totalRevenue.toLocaleString()}` },
      { label: "Active learners", value: String(avgLearners) },
    ],
  };
}

export const newUsers = [
  { name: "James Brown", time: "2 days ago", initials: "JB" },
  { name: "Tony Stark", time: "2 days ago", initials: "TS" },
  { name: "Mike Banner", time: "2 days ago", initials: "MB" },
  { name: "Nina Smith", time: "3 days ago", initials: "NS" },
];

export const onlineUsers = [
  { name: "Sophia Williams", time: "Joined 3 months ago", initials: "SW" },
  { name: "Arthur Taylor", time: "Joined 4 months ago", initials: "AT" },
  { name: "David Smith", time: "Joined 4 months ago", initials: "DS" },
  { name: "Harry Potter", time: "Joined 4 months ago", initials: "HP" },
  { name: "Frank Gary", time: "Joined 4 months ago", initials: "FG" },
];

export const events = [
  { name: "Mike Banner", status: "Logged In", tone: "success", time: "2 hours ago" },
  { name: "Nina Smith", status: "Logged Out", tone: "danger", time: "10 hours ago" },
  { name: "Alex Simitsis", status: "Logged In", tone: "success", time: "12 hours ago" },
  { name: "Tony Stark", status: "Logged Out", tone: "danger", time: "15 hours ago" },
];

export const blogs = [
  { title: "How to Sell Online Course On Your Shopify Store", new: true, days: "2 days ago", color: "bg-success" },
  { title: "16 Canva Black Friday templates for online course creators", new: true, days: "2 days ago", color: "bg-brand" },
  { title: "The 14-Step Checklist to Prepare Your Online School For Black Friday", days: "2 days ago", color: "bg-muted-foreground" },
  { title: "From Emergency Remote Training to Long Team Effective & Profitable Online Learning", days: "2 days ago", color: "bg-muted-foreground" },
];

// Leaderboard
export interface LeaderboardRow {
  rank: number;
  name: string;
  initials: string;
  xp: number;
  streak: number;
  quizzes: number;
  level: number;
  you?: boolean;
}

export const leaderboard: LeaderboardRow[] = [
  { rank: 1, name: "Priya Sharma", initials: "PS", xp: 12480, streak: 64, quizzes: 312, level: 24 },
  { rank: 2, name: "Arjun Mehta", initials: "AM", xp: 11320, streak: 58, quizzes: 287, level: 22 },
  { rank: 3, name: "Sophia Williams", initials: "SW", xp: 10110, streak: 42, quizzes: 261, level: 21 },
  { rank: 4, name: "Liam Chen", initials: "LC", xp: 9540, streak: 39, quizzes: 240, level: 20 },
  { rank: 5, name: "Aisha Khan", initials: "AK", xp: 9120, streak: 31, quizzes: 228, level: 19 },
  { rank: 6, name: "Diego Ramirez", initials: "DR", xp: 8650, streak: 27, quizzes: 215, level: 18 },
  { rank: 7, name: "Mei Tanaka", initials: "MT", xp: 8210, streak: 22, quizzes: 203, level: 18 },
  { rank: 8, name: "Noah Müller", initials: "NM", xp: 7890, streak: 19, quizzes: 195, level: 17 },
  { rank: 9, name: "Ava Rossi", initials: "AR", xp: 7320, streak: 18, quizzes: 184, level: 17 },
  { rank: 10, name: "Yusuf Demir", initials: "YD", xp: 7010, streak: 15, quizzes: 176, level: 16 },
  { rank: 14, name: "Sam Adams (You)", initials: "SA", xp: 1240, streak: 3, quizzes: 18, level: 7, you: true },
];

// Quizzes
export interface QuizTopic {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questions: number;
  minutes: number;
  tint: string;
}

export const quizTopics: QuizTopic[] = [
  { id: "react-basics", title: "React Fundamentals", description: "Components, props, state, and effects.", difficulty: "Beginner", questions: 10, minutes: 12, tint: "bg-card-blue" },
  { id: "js-async", title: "Async JavaScript", description: "Promises, async/await, event loop.", difficulty: "Intermediate", questions: 12, minutes: 15, tint: "bg-card-yellow" },
  { id: "system-design", title: "System Design 101", description: "Load balancers, caches, queues, sharding.", difficulty: "Advanced", questions: 10, minutes: 20, tint: "bg-card-pink" },
  { id: "sql-joins", title: "SQL Joins & Indexes", description: "Inner/outer joins, query plans, indexes.", difficulty: "Intermediate", questions: 10, minutes: 12, tint: "bg-card-green" },
];

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: Record<string, QuizQuestion[]> = {
  "react-basics": [
    {
      id: "q1",
      prompt: "Which hook lets you store state in a functional component?",
      options: ["useEffect", "useState", "useMemo", "useRef"],
      correctIndex: 1,
      explanation: "useState returns a stateful value and a setter to update it.",
    },
    {
      id: "q2",
      prompt: "What does the dependency array of useEffect control?",
      options: [
        "Which DOM elements are updated",
        "When the effect re-runs",
        "The order React renders children",
        "Which props are memoised",
      ],
      correctIndex: 1,
      explanation: "The effect re-runs whenever any value in the dependency array changes.",
    },
    {
      id: "q3",
      prompt: "Which of these is NOT a valid React component name?",
      options: ["ProductCard", "userProfile", "PageHeader", "AppShell"],
      correctIndex: 1,
      explanation: "Component names must start with an uppercase letter.",
    },
    {
      id: "q4",
      prompt: "When should you reach for useMemo?",
      options: [
        "To memoise an expensive computation between renders",
        "To replace useState",
        "To trigger side effects",
        "To create a DOM ref",
      ],
      correctIndex: 0,
      explanation: "useMemo caches the result of a calculation across renders when its deps don't change.",
    },
    {
      id: "q5",
      prompt: "Which prop convention sends data from parent to child?",
      options: ["Context", "Props", "Refs", "Reducers"],
      correctIndex: 1,
      explanation: "Props are the primary way to pass data from parent to child.",
    },
  ],
  "js-async": [
    {
      id: "q1",
      prompt: "What does `await` do?",
      options: [
        "Blocks the entire main thread",
        "Pauses the surrounding async function until a promise settles",
        "Creates a new thread",
        "Converts a promise to a callback",
      ],
      correctIndex: 1,
      explanation: "await suspends the async function until the awaited promise resolves or rejects.",
    },
    {
      id: "q2",
      prompt: "Which API runs callbacks after the current task but before rendering?",
      options: ["setTimeout(fn, 0)", "queueMicrotask", "requestAnimationFrame", "setImmediate"],
      correctIndex: 1,
      explanation: "queueMicrotask schedules a microtask that runs before the next render.",
    },
  ],
  "system-design": [
    {
      id: "q1",
      prompt: "Which cache eviction policy removes the oldest unused entry?",
      options: ["LFU", "LRU", "FIFO", "Random"],
      correctIndex: 1,
      explanation: "LRU (Least Recently Used) evicts the entry that hasn't been accessed for the longest.",
    },
  ],
  "sql-joins": [
    {
      id: "q1",
      prompt: "Which join returns only rows present in both tables?",
      options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"],
      correctIndex: 2,
      explanation: "INNER JOIN returns rows with matching keys in both tables.",
    },
  ],
};

// Interview roles
export const interviewRoles = [
  { id: "frontend", title: "Frontend Engineer", desc: "React, TypeScript, performance, accessibility." },
  { id: "backend", title: "Backend Engineer", desc: "APIs, databases, scaling, system design." },
  { id: "data", title: "Data Engineer", desc: "Pipelines, warehousing, SQL, modelling." },
  { id: "pm", title: "Product Manager", desc: "Prioritisation, metrics, stakeholder craft." },
];
