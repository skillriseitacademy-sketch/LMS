import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Initialize a generic service client
export const serviceClient = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Validates request authentication and returns the user object.
 */
export async function requireAuth(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  const {
    data: { user },
    error,
  } = await serviceClient.auth.getUser(token);

  if (error || !user) {
    throw new ApiError(401, "Unauthorized: Invalid or expired token");
  }

  return user;
}

/**
 * Validates JSON body against a Zod schema
 */
export async function validateBody<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      throw new ApiError(400, `Validation Error: ${e.errors.map((err) => err.message).join(", ")}`);
    }
    throw new ApiError(400, "Invalid JSON payload");
  }
}

/**
 * Standard error handler for API routes
 */
export function handleError(error: any) {
  if (error instanceof ApiError) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  console.error("API Unhandled Error:", error);
  return new Response(JSON.stringify({ error: "Internal Server Error" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
