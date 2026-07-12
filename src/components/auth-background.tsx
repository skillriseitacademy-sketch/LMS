export function AuthBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background image covering the screen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-multiply"
        style={{ backgroundImage: "url('/auth-bg.png')" }}
      />

      {/* Soft gradient overlay to blend colors nicely */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light/40 via-background/60 to-card-yellow/20" />
    </div>
  );
}
