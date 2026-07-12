import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-store";
import { UserPlus, UserCheck, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Status = "pending" | "accepted" | "declined" | "blocked" | null;

export function ConnectionButton({
  targetId,
  initialStatus,
  targetVisibility,
  size = "default",
}: {
  targetId: string;
  initialStatus: Status;
  targetVisibility: "public" | "private";
  size?: "default" | "sm" | "icon";
}) {
  const { session } = useAuth();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  if (!session || session.id === targetId) return null;

  const handleAction = async (action: string) => {
    setIsLoading(true);
    try {
      const token = (supabase as any).realtime?.accessToken ?? "";
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action, target_id: targetId }),
      });
      if (res.ok) {
        if (action === "follow") {
          setStatus(targetVisibility === "public" ? "accepted" : "pending");
        } else if (action === "unfollow") {
          setStatus(null);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const btnClass = size === "sm" ? "h-8 px-3 text-xs rounded-full" : "rounded-full";

  if (status === "accepted") {
    return (
      <Button
        variant="outline"
        size={size === "icon" ? "icon" : "default"}
        className={btnClass}
        onClick={() => handleAction("unfollow")}
        disabled={isLoading}
      >
        <UserCheck className={size === "sm" ? "h-3 w-3 mr-1.5" : "h-4 w-4 mr-2"} />
        {size !== "icon" && "Connected"}
      </Button>
    );
  }

  if (status === "pending") {
    return (
      <Button
        variant="secondary"
        size={size === "icon" ? "icon" : "default"}
        className={btnClass}
        onClick={() => handleAction("unfollow")}
        disabled={isLoading}
      >
        <Clock className={size === "sm" ? "h-3 w-3 mr-1.5" : "h-4 w-4 mr-2"} />
        {size !== "icon" && "Pending"}
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      size={size === "icon" ? "icon" : "default"}
      className={btnClass}
      onClick={() => handleAction("follow")}
      disabled={isLoading}
    >
      <UserPlus className={size === "sm" ? "h-3 w-3 mr-1.5" : "h-4 w-4 mr-2"} />
      {size !== "icon" && "Connect"}
    </Button>
  );
}
