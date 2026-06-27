import type { LucideIcon } from "lucide-react";

interface PageStubProps {
  title: string;
  description: string;
  icon: LucideIcon;
  bullets?: string[];
}

export function PageStub({ title, description, icon: Icon, bullets }: PageStubProps) {
  return (
    <div className="p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-display text-2xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {bullets && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Coming up
            </h2>
            <ul className="space-y-2 text-sm">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
