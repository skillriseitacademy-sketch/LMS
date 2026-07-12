import { Link } from "@tanstack/react-router";

export function TopicChip({ topic, tint }: { topic: { id: string; title: string }; tint: string }) {
  return (
    <Link
      to="/feed"
      search={{ topic: topic.id }}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${tint} text-foreground/80 hover:text-foreground transition-colors`}
    >
      {topic.title}
    </Link>
  );
}
