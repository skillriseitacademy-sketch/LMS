import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConnectionButton } from "./connection-button";
import { supabase } from "@/lib/supabase";

type SearchUser = {
  id: string;
  name: string;
  username: string;
  avatar_url: string | null;
  headline: string | null;
  role: string;
  visibility: "public" | "private";
  connectionStatus: "none" | "connected" | "pending" | "received";
};

export function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setOpen(true);

    const timeout = setTimeout(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        if (res.ok) {
          const json = await res.json();
          setResults(json.users || []);
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative mb-6" ref={wrapperRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.length >= 2) setOpen(true);
          }}
          className="w-full bg-card rounded-full border border-border pl-9 pr-4 py-2 text-sm outline-none focus:border-brand transition-colors"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {open && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto">
            {results.length === 0 && !loading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No users found.
              </div>
            ) : (
              results.map((user) => (
                <div key={user.id} className="flex items-center justify-between gap-3 p-3 hover:bg-muted/50 border-b border-border last:border-0 transition-colors">
                  <Link
                    to="/profile/$username"
                    params={{ username: user.username || "unknown" }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 min-w-0 flex-1"
                  >
                    <Avatar className="h-9 w-9 shrink-0 border border-border">
                      <AvatarFallback className="bg-brand/10 text-brand-dark text-xs font-bold">
                        {user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-baseline gap-1 truncate">
                        <span className="text-sm font-semibold truncate">{user.name}</span>
                        {user.username && <span className="text-[10px] text-muted-foreground truncate">@{user.username}</span>}
                      </div>
                      <span className="text-[10px] text-muted-foreground truncate">
                        {user.headline || (user.role === "teacher" ? "Teacher" : "Student")}
                      </span>
                    </div>
                  </Link>
                  <ConnectionButton
                    targetId={user.id}
                    initialStatus={user.connectionStatus === "none" ? null : user.connectionStatus as any}
                    targetVisibility={user.visibility}
                    size="sm"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
