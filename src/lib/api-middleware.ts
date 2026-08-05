import fs from "fs";
import path from "path";
import { loadEnv } from "vite";

/**
 * A generic Vite middleware that executes TanStack Start API routes (.ts)
 * located in src/routes/api/ during local Vite SPA development.
 */
export function apiRoutesPlugin() {
  return {
    name: "api-routes-plugin",
    configureServer(server: any) {
      server.middlewares.use("/api", async (req: any, res: any, next: any) => {
        // Skip explicitly handled dev middlewares in vite.config.ts
        if (req.url === "/invite" || req.url === "/upload") return next();

        // Ensure env vars are loaded into process.env for Node.js
        const env = loadEnv("development", process.cwd(), "");
        Object.assign(process.env, env);

        try {
          // req.url here is relative to /api (e.g. /chat/bot or /jobs)
          const urlPath = req.url.split("?")[0]; // e.g. /chat/bot

          // Map URL to file path. We need to handle both dot notation and folder structures.
          // e.g., /chat/bot -> src/routes/api/chat.bot.ts or src/routes/api/chat/bot.ts
          let relativeFilePath = urlPath.slice(1).replace(/\//g, ".") + ".ts";
          let absolutePath = path.resolve(process.cwd(), "src/routes/api", relativeFilePath);

          if (!fs.existsSync(absolutePath)) {
            // Try standard slash structure
            relativeFilePath = urlPath.slice(1) + ".ts";
            absolutePath = path.resolve(process.cwd(), "src/routes/api", relativeFilePath);
          }

          if (!fs.existsSync(absolutePath)) {
            // Also check for index.ts if it's a directory (e.g. /cron -> /cron/index.ts)
            relativeFilePath = urlPath.slice(1) + "/index.ts";
            absolutePath = path.resolve(process.cwd(), "src/routes/api", relativeFilePath);
          }

          if (!fs.existsSync(absolutePath)) {
            // No matching API file found
            return next();
          }

          // Use Vite's SSR module loader to compile and load the TypeScript route file
          const routeModule = await server.ssrLoadModule(absolutePath);

          if (!routeModule.Route || !routeModule.Route.options?.server?.handlers) {
            console.error(
              `API Route ${absolutePath} does not export a valid Route.server.handlers`,
            );
            return next();
          }

          const method = req.method;
          const handler = routeModule.Route.options.server.handlers[method];

          if (!handler) {
            res.writeHead(405);
            res.end("Method Not Allowed");
            return;
          }

          // Read body
          let bodyStr = "";
          for await (const chunk of req) {
            bodyStr += chunk;
          }

          // Create a mock Web Request object
          const host = req.headers.host || "localhost:3000";
          const protocol = "http";
          const fullUrl = `${protocol}://${host}/api${req.url}`;

          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (Array.isArray(value)) {
              value.forEach((v) => headers.append(key, v as string));
            } else if (typeof value === "string") {
              headers.set(key, value);
            }
          }

          const requestInit: RequestInit = {
            method: req.method,
            headers,
          };

          if (req.method !== "GET" && req.method !== "HEAD" && bodyStr) {
            requestInit.body = bodyStr;
          }

          const webRequest = new Request(fullUrl, requestInit);

          // Execute the TanStack Start handler
          const response: Response = await handler({ request: webRequest });

          // Convert Web Response back to Node Response
          const responseHeaders: Record<string, string> = {};
          response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
          });

          res.writeHead(response.status, responseHeaders);

          if (response.body) {
            const buffer = await response.arrayBuffer();
            res.end(Buffer.from(buffer));
          } else {
            res.end();
          }
        } catch (e: any) {
          console.error(`[API Middleware Error] ${req.url}:`, e);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: e.message || "Internal Server Error" }));
        }
      });
    },
  };
}
