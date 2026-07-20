import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings/notifications")({
  component: NotificationsPage,
});

type Toggle = {
  id: string;
  label: string;
  desc: string;
  defaultOn: boolean;
};

const SECTIONS: { title: string; icon: string; color: string; items: Toggle[] }[] = [
  {
    title: "Career Opportunities",
    icon: "work",
    color: "text-primary bg-primary/10",
    items: [
      { id: "interview_invites", label: "Interview Invitations", desc: "Get instantly notified when a company invites you to interview.", defaultOn: true },
      { id: "job_matches", label: "New Job Matches", desc: "Alerts for new postings that align with your profile and skills.", defaultOn: true },
    ],
  },
  {
    title: "Practice & Preparation",
    icon: "sports_esports",
    color: "text-[#f59e0b] bg-[#f59e0b]/10",
    items: [
      { id: "arena_challenges", label: "Coding Arena Challenges", desc: "Notifications for upcoming tournaments and daily challenges.", defaultOn: false },
      { id: "quiz_reminders", label: "Quiz Reminders", desc: "Scheduled nudges to complete your daily aptitude quizzes.", defaultOn: true },
    ],
  },
  {
    title: "Community",
    icon: "forum",
    color: "text-[#8b5cf6] bg-[#8b5cf6]/10",
    items: [
      { id: "feed_activity", label: "Social Feed Activity", desc: "Mentions, likes, and comments on your feed posts.", defaultOn: false },
      { id: "connection_requests", label: "Connection Requests", desc: "When someone sends you a connection request.", defaultOn: true },
    ],
  },
];

function NotificationsPage() {
  const initState = Object.fromEntries(
    SECTIONS.flatMap(s => s.items.map(i => [i.id, i.defaultOn]))
  );
  const [toggles, setToggles] = useState<Record<string, boolean>>(initState);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Store preferences (localStorage for now; can be moved to DB)
    localStorage.setItem("placepro-notif-prefs", JSON.stringify(toggles));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Notification Preferences</h2>
        <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: "Inter" }}>Control how and when PlacePro communicates with you.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">
          {SECTIONS.map(section => (
            <div key={section.title} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.color}`}>
                  <span className="material-symbols-outlined text-[18px]">{section.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>{section.title}</h3>
              </div>

              <div className="space-y-5">
                {section.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-on-surface" style={{ fontFamily: "Inter" }}>{item.label}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5" style={{ fontFamily: "Inter" }}>{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setToggles(t => ({ ...t, [item.id]: !t[item.id] }))}
                      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                        toggles[item.id] ? "bg-primary" : "bg-surface-variant"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        toggles[item.id] ? "translate-x-6" : ""
                      }`} />
                      {toggles[item.id] && (
                        <span className="absolute top-1/2 left-1.5 -translate-y-1/2">
                          <span className="material-symbols-outlined text-on-primary text-[11px]">check</span>
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Email Delivery Info Card */}
        <div className="xl:col-span-1">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-primary/20 sticky top-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">mail</span>
            </div>
            <h3 className="font-semibold text-on-surface mb-2" style={{ fontFamily: "Manrope" }}>Email Delivery</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed" style={{ fontFamily: "Inter" }}>
              Crucial updates like interview invites will always be sent to your registered email address,
              regardless of push notification settings.
            </p>
            <button className="mt-4 text-sm text-primary font-medium hover:underline flex items-center gap-1" style={{ fontFamily: "Inter" }}>
              Manage Email Settings
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Bar */}
      <div className="flex items-center justify-end gap-4 pt-2">
        {saved && <span className="text-sm text-primary font-medium" style={{ fontFamily: "Inter" }}>✓ Saved</span>}
        <button
          onClick={() => setToggles(initState)}
          className="px-5 py-2.5 text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-variant text-sm font-medium transition-all"
          style={{ fontFamily: "Inter" }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
          style={{ fontFamily: "Inter" }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
