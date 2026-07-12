// Centralised mock data so analytics/leaderboard/profile/quizzes stay in sync.

// Removed unused mock data since admin and leaderboard use real queries now.

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
  {
    id: "react-basics",
    title: "React Fundamentals",
    description: "Components, props, state, and effects.",
    difficulty: "Beginner",
    questions: 10,
    minutes: 12,
    tint: "bg-card-blue",
  },
  {
    id: "js-async",
    title: "Async JavaScript",
    description: "Promises, async/await, event loop.",
    difficulty: "Intermediate",
    questions: 12,
    minutes: 15,
    tint: "bg-card-yellow",
  },
  {
    id: "system-design",
    title: "System Design 101",
    description: "Load balancers, caches, queues, sharding.",
    difficulty: "Advanced",
    questions: 10,
    minutes: 20,
    tint: "bg-card-pink",
  },
  {
    id: "sql-joins",
    title: "SQL Joins & Indexes",
    description: "Inner/outer joins, query plans, indexes.",
    difficulty: "Intermediate",
    questions: 10,
    minutes: 12,
    tint: "bg-card-green",
  },
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
      explanation:
        "useMemo caches the result of a calculation across renders when its deps don't change.",
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
      explanation:
        "await suspends the async function until the awaited promise resolves or rejects.",
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
      explanation:
        "LRU (Least Recently Used) evicts the entry that hasn't been accessed for the longest.",
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
  {
    id: "frontend",
    title: "Frontend Engineer",
    desc: "React, TypeScript, performance, accessibility.",
  },
  { id: "backend", title: "Backend Engineer", desc: "APIs, databases, scaling, system design." },
  { id: "data", title: "Data Engineer", desc: "Pipelines, warehousing, SQL, modelling." },
  { id: "pm", title: "Product Manager", desc: "Prioritisation, metrics, stakeholder craft." },
];
