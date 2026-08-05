import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/welcome_to_pro_success_splash")({
  component: WelcomeToProSuccessSplashPage,
});

function WelcomeToProSuccessSplashPage() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none z-0" id="confetti-container"></div>
      <main className="relative z-10 w-full max-w-container-max px-md md:px-xl mx-auto flex flex-col items-center text-center">
        <div className="mb-lg relative">
          <div className="absolute inset-0 bg-secondary-container opacity-20 blur-xl rounded-full scale-150"></div>
          <img
            alt="Golden Trophy"
            className="w-32 h-32 md:w-48 md:h-48 object-contain relative z-10 drop-shadow-xl"
            data-alt="A 3D rendered, premium-looking golden trophy with glowing accents on a sleek, light-mode background. The style is modern, corporate SaaS with a gamified edge, featuring vibrant amber and indigo highlights to signify achievement and success. Clean lighting and soft shadows."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMyLvZ5RDkwulqoEQ-5OQN7ZI7K3UYLEU1CXtpPiikp6gT3u1-19XBrFVeifYLlcixL-bSXa7BkPDb52cDym7QzSJmdKRDSiL1YRsWQ7gxfRBhnkBd1kcdLAIbgCTt4lQrCaZYaM6fKGs-ETedYYLZ3l0X5MH4Kv5pTyrVqkuJqYW9ivNde9PwdnXcLMHEj5arlCVSM-Q550QIu8VMHc5y-qUqCTKwgpD3uRlY6ZeXtlSzYia6FncS6A"
          />
        </div>

        <h1 className="font-display-lg text-display-lg text-on-surface mb-sm hidden md:block">
          Welcome to the Pro Tier, Alex!
        </h1>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-sm md:hidden">
          Welcome to Pro, Alex!
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-xl">
          Your career acceleration starts now. All premium features are now unlocked and ready to
          propel you forward.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md w-full max-w-3xl mb-xl">
          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex items-start text-left hover:border-primary transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mr-md flex-shrink-0 group-hover:bg-primary-container transition-colors">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                magic_button
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-[18px] mb-xs">AI Resume Optimization</h3>
              <p className="font-body-md text-[14px] text-on-surface-variant">
                Tailor your resume instantly for every application with AI-driven insights.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex items-start text-left hover:border-primary transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mr-md flex-shrink-0 group-hover:bg-primary-container transition-colors">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                record_voice_over
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-[18px] mb-xs">Unlimited Mock Interviews</h3>
              <p className="font-body-md text-[14px] text-on-surface-variant">
                Practice with industry-specific AI interviewers anytime.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex items-start text-left hover:border-primary transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center mr-md flex-shrink-0 group-hover:bg-secondary-container/40 transition-colors">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-[18px] mb-xs">Premium Arena Challenges</h3>
              <p className="font-body-md text-[14px] text-on-surface-variant">
                Compete in high-stakes coding and logic challenges for extra visibility.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-sm border border-surface-variant flex items-start text-left hover:border-primary transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mr-md flex-shrink-0 group-hover:bg-primary-container transition-colors">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mark_email_read
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-[18px] mb-xs">Direct Recruiter Credits</h3>
              <p className="font-body-md text-[14px] text-on-surface-variant">
                Send direct messages to hiring managers and recruiters every month.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-md items-center w-full md:w-auto">
          <button className="w-full md:w-auto bg-primary text-on-primary font-body-md font-semibold py-sm px-xl rounded-lg hover:bg-surface-tint scale-up-hover shadow-sm">
            Go to Dashboard
          </button>
          <button className="w-full md:w-auto bg-surface-container-lowest text-on-surface border border-outline-variant font-body-md font-semibold py-sm px-xl rounded-lg hover:bg-surface-container-low transition-colors">
            Explore Pro Features
          </button>
        </div>
      </main>
    </>
  );
}
