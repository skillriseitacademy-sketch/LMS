import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/rooms/$roomCode/media-token" as any)({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        try {
          const authHeader = request.headers.get("Authorization");
          const token = authHeader?.replace("Bearer ", "");
          if (!token) return new Response("Unauthorized", { status: 401 });

          const serviceClient = createClient(
            process.env.VITE_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
          );

          const {
            data: { user },
            error: authError,
          } = await serviceClient.auth.getUser(token);
          if (authError || !user) return new Response("Unauthorized", { status: 401 });

          const roomCode = params.roomCode;
          if (!roomCode) {
            return new Response("Room code required", { status: 400 });
          }

          // Fetch user profile for name
          const { data: profile } = await serviceClient
            .from("profiles")
            .select("name, role")
            .eq("id", user.id)
            .single();

          const meteredSecretKey = process.env.METERED_API_KEY;
          const meteredDomain = process.env.METERED_DOMAIN || "nivi-cyber-solutions.metered.live";

          if (!meteredSecretKey) {
            return new Response("Server configuration error", { status: 500 });
          }

          // Create the room on Metered via REST API if it doesn't exist
          try {
            const createRoomRes = await fetch(
              `https://${meteredDomain}/api/v1/room?secretKey=${meteredSecretKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  roomName: roomCode,
                  privacy: "public"
                })
              }
            );
            
            const createRoomData = await createRoomRes.json();
            
            if (!createRoomRes.ok && createRoomData.message !== "room already exists") {
              console.error("[Metered] Failed to create room:", createRoomData);
              return new Response(createRoomData.message || "Failed to create room", { status: 500 });
            }
          } catch (createErr: any) {
            console.error("[Metered] Error calling Metered API:", createErr);
            return new Response("Error connecting to Metered API", { status: 500 });
          }
          
          return new Response(
            JSON.stringify({
              roomURL: `https://${meteredDomain}/${roomCode}`,
              // If Metered requires a token for private rooms, it would be here.

              // token: generatedJwt
            }),
            {
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (e: any) {
          return new Response(e.message, { status: 500 });
        }
      },
    },
  },
});
