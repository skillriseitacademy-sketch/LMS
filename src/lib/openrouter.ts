import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Initialize the OpenRouter provider
// This securely uses the server-side environment variable so keys are never exposed
export const openRouter = createOpenAICompatible({
  name: "openrouter",
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    // OpenRouter requires these headers for ranking and analytics
    "HTTP-Referer": process.env.VITE_APP_URL || "http://localhost:3000",
    "X-Title": "PlacePro LMS",
  },
});

// We can define standard model strings here or just use them inline.
// By default, the user requested 'openai/gpt-4o'
export const defaultModel = "openai/gpt-4o";
