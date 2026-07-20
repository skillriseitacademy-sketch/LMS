import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/billing")({
  component: BillingPage,
});

const PRO_FEATURES = [
  {
    icon: "description",
    color: "text-[#f59e0b] bg-[#f59e0b]/10",
    title: "AI Resume Optimization",
    desc: "Get personalized feedback to beat ATS and stand out to recruiters.",
  },
  {
    icon: "video_chat",
    color: "text-primary bg-primary/10",
    title: "Unlimited Mock Interviews",
    desc: "Practice anytime with our AI interviewer, complete with detailed analysis.",
  },
  {
    icon: "emoji_events",
    color: "text-[#f59e0b] bg-[#f59e0b]/10",
    title: "Premium Arena Access",
    desc: "Compete in exclusive coding challenges and boost your global ranking.",
  },
];

function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Plan & Billing</h2>
        <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: "Inter" }}>Manage your subscription and billing details.</p>
      </div>

      {/* Plan + Payment row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Current Plan */}
        <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono" }}>Current Plan</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-surface-variant text-on-surface-variant border border-outline-variant uppercase">Free Tier</span>
          </div>
          <h3 className="text-2xl font-bold text-on-surface mt-2 mb-2" style={{ fontFamily: "Manrope" }}>PlacePro Basic</h3>
          <p className="text-sm text-on-surface-variant mb-4" style={{ fontFamily: "Inter" }}>
            You are currently on the free tier. Upgrade to Pro to unlock advanced career preparation tools.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40">
            <span className="text-sm text-on-surface-variant" style={{ fontFamily: "Inter" }}>Free forever · Basic access to feed and roadmap.</span>
            <Link
              to="/pro"
              className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-sm"
              style={{ fontFamily: "Inter" }}
            >
              Upgrade to Pro
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3" style={{ fontFamily: "JetBrains Mono" }}>Payment Method</p>
          <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-outline-variant mb-4">
            <span className="material-symbols-outlined text-on-surface-variant">credit_card</span>
            <span className="text-sm text-on-surface-variant" style={{ fontFamily: "Inter" }}>No card added</span>
          </div>
          <button className="mt-auto w-full py-2.5 text-primary border border-primary/40 rounded-xl text-sm font-medium hover:bg-primary hover:text-on-primary transition-all" style={{ fontFamily: "Inter" }}>
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Why Upgrade */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <span className="material-symbols-outlined text-[#f59e0b]">workspace_premium</span>
          <h3 className="text-lg font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Why Upgrade to PlacePro Pro?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRO_FEATURES.map(({ icon, color, title, desc }) => (
            <div key={title} className="p-5 rounded-2xl border border-outline-variant/40 hover:border-primary/30 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </div>
              <h4 className="font-semibold text-on-surface mb-2 text-sm" style={{ fontFamily: "Manrope" }}>{title}</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed" style={{ fontFamily: "Inter" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Billing History</h3>
          <button className="text-sm text-primary font-medium hover:underline" style={{ fontFamily: "Inter" }}>Download All</button>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 bg-surface-variant rounded-2xl flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-on-surface-variant text-2xl">receipt_long</span>
          </div>
          <p className="text-sm text-on-surface-variant" style={{ fontFamily: "Inter" }}>No billing history available yet.</p>
        </div>
      </div>
    </div>
  );
}
