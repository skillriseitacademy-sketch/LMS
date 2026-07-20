import { ReactNode } from "react";

type FeedLayoutProps = {
  left?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
};

export function FeedLayout({ left, center, right }: FeedLayoutProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[var(--pp-surface)]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Rail */}
        {left && (
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="sticky top-6 flex flex-col gap-6">{left}</div>
          </div>
        )}

        {/* Center Feed */}
        <div className={`col-span-1 ${left && right ? 'lg:col-span-6' : 'lg:col-span-9'} space-y-6 min-w-0`}>
          {center}
        </div>

        {/* Right Rail */}
        {right && (
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="sticky top-6 flex flex-col gap-6">{right}</div>
          </div>
        )}
      </div>
    </div>
  );
}
