import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/settings/security")({
  component: SecurityPage,
});

const MOCK_SESSIONS = [
  { id: "1", device: "MacBook Pro", location: "Bengaluru, India", browser: "Chrome", lastActive: "Active now", isCurrent: true },
  { id: "2", device: "iPhone 13", location: "Mumbai, India", browser: "CareerOS App", lastActive: "Last active: 2 hours ago", isCurrent: false },
  { id: "3", device: "Windows PC", location: "Delhi, India", browser: "Chrome", lastActive: "Last active: 3 days ago", isCurrent: false },
];

function SecurityPage() {
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [twoFAEnabled] = useState(true);
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      setMessage({ text: "New passwords do not match.", type: "error" });
      return;
    }
    if (passwordForm.newPass.length < 12) {
      setMessage({ text: "Password must be at least 12 characters.", type: "error" });
      return;
    }
    setSaving(true);
    setMessage({ text: "", type: "" });
    const { error } = await supabase.auth.updateUser({ password: passwordForm.newPass });
    setSaving(false);
    if (error) {
      setMessage({ text: "Error: " + error.message, type: "error" });
    } else {
      setMessage({ text: "Password updated successfully!", type: "success" });
      setPasswordForm({ current: "", newPass: "", confirm: "" });
    }
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const revokeSession = (id: string) => {
    setSessions(s => s.filter(sess => sess.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-on-surface-variant" style={{ fontFamily: "Inter" }}>
        <span>Profile</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-medium">Security & Privacy</span>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Security & Privacy</h2>
        <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: "Inter" }}>
          Manage your account security, authentication methods, and review active sessions to keep your Career OS data safe.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">

          {/* Password */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
              </div>
              <div>
                <h3 className="font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Password</h3>
                <p className="text-xs text-on-surface-variant" style={{ fontFamily: "Inter" }}>Last changed 45 days ago</p>
              </div>
            </div>

            {message.text && (
              <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${
                message.type === "success" ? "bg-primary/10 text-primary" : "bg-error/10 text-error"
              }`} style={{ fontFamily: "Inter" }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>Current Password</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={e => setPasswordForm(p => ({ ...p, current: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface"
                  placeholder="••••••••"
                  style={{ fontFamily: "Inter" }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPass}
                    onChange={e => setPasswordForm(p => ({ ...p, newPass: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface"
                    placeholder="••••••••"
                    style={{ fontFamily: "Inter" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={e => setPasswordForm(p => ({ ...p, confirm: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface"
                    placeholder="••••••••"
                    style={{ fontFamily: "Inter" }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-on-surface-variant" style={{ fontFamily: "Inter" }}>
                  Must be at least 12 characters, include a number and symbol.
                </p>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm disabled:opacity-70 flex-shrink-0 ml-4"
                  style={{ fontFamily: "Inter" }}
                >
                  {saving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>

          {/* Two-Factor Auth */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[20px]">security</span>
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Two-Factor Authentication</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5" style={{ fontFamily: "Inter" }}>
                    Add an extra layer of security to your account.
                  </p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${twoFAEnabled ? "bg-primary" : "bg-surface-variant"}`}>
                {twoFAEnabled && <span className="material-symbols-outlined text-on-primary text-[14px]">check</span>}
              </div>
            </div>

            {twoFAEnabled && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">info</span>
                  <div>
                    <p className="text-sm font-medium text-on-surface" style={{ fontFamily: "Inter" }}>Authenticator App Active</p>
                    <p className="text-xs text-on-surface-variant mt-0.5" style={{ fontFamily: "Inter" }}>
                      Your account is currently protected via Google Authenticator.
                    </p>
                  </div>
                </div>
                <button className="text-sm text-primary font-medium hover:underline flex-shrink-0" style={{ fontFamily: "Inter" }}>Configure</button>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-error text-[18px]">warning</span>
              <h3 className="font-semibold text-error" style={{ fontFamily: "Manrope" }}>Danger Zone</h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-4" style={{ fontFamily: "Inter" }}>
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-5 py-2.5 text-error border border-error/40 rounded-xl text-sm font-semibold hover:bg-error hover:text-on-error transition-all"
                style={{ fontFamily: "Inter" }}
              >
                Delete Account
              </button>
            ) : (
              <div className="bg-error/10 rounded-xl p-4">
                <p className="text-sm font-medium text-error mb-3" style={{ fontFamily: "Inter" }}>
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-on-surface border border-outline-variant rounded-lg text-sm hover:bg-surface-variant transition-all"
                    style={{ fontFamily: "Inter" }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-error text-on-error rounded-lg text-sm font-semibold hover:bg-error/90 transition-all"
                    style={{ fontFamily: "Inter" }}
                  >
                    Yes, Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Active Sessions</h3>
              <button className="text-xs text-error font-medium hover:underline" style={{ fontFamily: "Inter" }}>Sign out all</button>
            </div>
            <div className="space-y-4">
              {sessions.map(sess => (
                <div key={sess.id} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px] mt-0.5 flex-shrink-0">
                    {sess.device.includes("iPhone") ? "smartphone" : "laptop"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-on-surface" style={{ fontFamily: "Inter" }}>{sess.device}</p>
                      {sess.isCurrent && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-primary/10 text-primary rounded uppercase tracking-wider">Current</span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5" style={{ fontFamily: "Inter" }}>
                      {sess.location} · {sess.browser}
                    </p>
                    <p className="text-xs text-on-surface-variant" style={{ fontFamily: "Inter" }}>{sess.lastActive}</p>
                  </div>
                  {!sess.isCurrent && (
                    <button
                      onClick={() => revokeSession(sess.id)}
                      className="text-on-surface-variant hover:text-error transition-colors flex-shrink-0 mt-0.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
