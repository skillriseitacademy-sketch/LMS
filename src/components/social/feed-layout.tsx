/**
 * FeedLayout — 3-column social layout shell
 * Left rail: 280px fixed (mini profile + nav shortcuts)
 * Center: fluid (posts feed)
 * Right rail: 320px fixed (stories + suggestions + topic chips)
 * Collapses to single column on mobile (< md breakpoint)
 */

type FeedLayoutProps = {
  left?: React.ReactNode;
  center: React.ReactNode;
  right?: React.ReactNode;
};

export function FeedLayout({ left, center, right }: FeedLayoutProps) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[280px_1fr_300px] md:p-6">
      {/* Left Rail */}
      {left && (
        <aside className="hidden md:block">
          <div className="sticky top-6 flex flex-col gap-3">{left}</div>
        </aside>
      )}

      {/* Center Feed */}
      <main className="min-w-0">{center}</main>

      {/* Right Rail */}
      {right && (
        <aside className="hidden lg:block">
          <div className="sticky top-6 flex flex-col gap-4">{right}</div>
        </aside>
      )}
    </div>
  );
}
