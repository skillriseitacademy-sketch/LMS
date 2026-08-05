import { createClient } from "@supabase/supabase-js";

// Ensure this file is only imported on the server
if (typeof window !== "undefined") {
  throw new Error("ai-monitor.server.ts must only be used on the server");
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Bypass RLS for inserts
);

// We assume a $0.50 default daily limit per user
const DEFAULT_DAILY_LIMIT_USD = 0.5;

export interface AIUsageLog {
  userId: string;
  provider: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  actionType: string;
  costOverride?: number;
}

// Rough cost per 1k tokens in USD for various models
// (Update these as pricing changes)
const MODEL_PRICING: Record<string, { prompt: number; completion: number }> = {
  "gpt-4o-realtime-preview-2024-12-17": { prompt: 0.005, completion: 0.02 }, // Realtime audio text token pricing is approx
  "gpt-4o": { prompt: 0.0025, completion: 0.01 },
  "gpt-4o-mini": { prompt: 0.00015, completion: 0.0006 },
  "claude-3-5-sonnet": { prompt: 0.003, completion: 0.015 },
  "gemini-1.5-pro": { prompt: 0.0035, completion: 0.0105 },
  "gemini-1.5-flash": { prompt: 0.000075, completion: 0.0003 },
};

function estimateCost(model: string, promptTokens: number, completionTokens: number): number {
  // Normalize model name for lookup (OpenRouter appends provider sometimes)
  let normalizedModel = model;
  if (model.includes("gpt-4o") && !model.includes("mini") && !model.includes("realtime"))
    normalizedModel = "gpt-4o";
  else if (model.includes("gpt-4o-mini")) normalizedModel = "gpt-4o-mini";
  else if (model.includes("sonnet")) normalizedModel = "claude-3-5-sonnet";

  const pricing = MODEL_PRICING[normalizedModel] || { prompt: 0.001, completion: 0.002 }; // fallback

  const promptCost = (promptTokens / 1000) * pricing.prompt;
  const completionCost = (completionTokens / 1000) * pricing.completion;

  return promptCost + completionCost;
}

/**
 * Checks if a user has exceeded their daily AI budget.
 * Throws an Error if they have.
 */
export async function checkRateLimit(userId: string): Promise<void> {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  // Sum up estimated cost for today
  const { data, error } = await supabase
    .from("ai_usage_logs")
    .select("estimated_cost")
    .eq("user_id", userId)
    .gte("created_at", startOfDay.toISOString());

  if (error) {
    console.error("Failed to check rate limit:", error);
    // Fail open or closed? Let's fail open if DB is down, to not break app entirely
    return;
  }

  const totalCostToday = data.reduce((sum, row) => sum + Number(row.estimated_cost), 0);

  if (totalCostToday >= DEFAULT_DAILY_LIMIT_USD) {
    throw new Error("AI Daily Rate Limit Exceeded");
  }
}

/**
 * Logs the AI usage to the database asynchronously.
 */
export async function logAIUsage({
  userId,
  provider,
  model,
  promptTokens,
  completionTokens,
  actionType,
  costOverride,
}: AIUsageLog): Promise<void> {
  const estimatedCost = costOverride ?? estimateCost(model, promptTokens, completionTokens);

  const { error } = await supabase.from("ai_usage_logs").insert({
    user_id: userId,
    provider,
    model,
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
    estimated_cost: estimatedCost,
    action_type: actionType,
  });

  if (error) {
    console.error("Failed to log AI usage:", error);
  }
}
