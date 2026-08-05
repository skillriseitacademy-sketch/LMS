import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/landing_page")({
  component: LandingPagePage,
});

function LandingPagePage() {
  return (
    <>
      <nav className="bg-surface dark:bg-surface-container-lowest text-primary dark:text-inverse-primary docked full-width top-0 sticky z-50 border-b border-outline-variant dark:border-outline shadow-sm font-headline-md text-headline-md. Body: font-body-md text-body-md. Labels: font-label-sm text-label-sm">
        <div className="flex justify-between items-center px-lg py-md max-w-container-max mx-auto">
          <div className="text-headline-md font-headline-md font-extrabold text-primary dark:text-primary-fixed-dim flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px]" data-icon="rocket_launch">
              rocket_launch
            </span>
            PlacePro
          </div>
          <div className="hidden md:flex items-center gap-xl">
            <a
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              href="#how-it-works"
            >
              How it Works
            </a>
            <a
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              href="#testimonials"
            >
              Testimonials
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              className="hidden md:inline-flex text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              href="#"
            >
              Log In
            </a>
            <a
              className="bg-primary hover:bg-primary-fixed-variant text-on-primary px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-md"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-high via-surface to-background"></div>
          <div className="max-w-container-max mx-auto px-lg text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm mb-8 border border-surface-variant">
              <span className="material-symbols-outlined text-[16px]" data-icon="stars">
                stars
              </span>
              <span>Your Ultimate Career OS</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-6 max-w-4xl mx-auto leading-tight">
              Get placement-ready — interviews, quizzes, live classes, and a{" "}
              <span className="text-primary relative whitespace-nowrap">
                community
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-secondary-container"
                  preserveaspectratio="none"
                  viewBox="0 0 100 10"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>{" "}
              that's doing it with you.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
              Stop stressing about placements. PlacePro provides a structured, gamified environment
              to master skills, practice in real-time, and land your dream role.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-md text-headline-md shadow-lg shadow-primary/20 hover:-translate-y-1 hover:shadow-xl hover:bg-primary-fixed-variant transition-all duration-300 flex items-center justify-center gap-2">
                Get Started
                <span className="material-symbols-outlined" data-icon="arrow_forward">
                  arrow_forward
                </span>
              </button>
              <button className="w-full sm:w-auto bg-surface-container-lowest text-on-surface px-8 py-4 rounded-xl font-headline-md text-headline-md border border-outline-variant hover:bg-surface-container hover:border-primary transition-all duration-300 flex items-center justify-center gap-2">
                Log in
              </button>
            </div>

            <div className="mt-20 relative mx-auto max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
              <img
                alt="PlacePro Dashboard Preview"
                className="w-full h-auto rounded-xl shadow-2xl border border-surface-variant object-cover aspect-[16/9]"
                data-alt="A highly detailed, modern software dashboard interface displayed on a sleek laptop screen. The UI is a 'light mode' career operating system, featuring a pristine white background (#FFFFFF) with indigo (#3525cd) accents. It shows data visualizations, a sidebar navigation, and a user profile section. The environment is well-lit, professional SaaS aesthetic, clean lines, generous whitespace."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbUAD2ggy4HMvE-8NK5a3lmhu0iQNKEUZmSqpG_4Ke-CfjP37GeQH0o40oc7I2OKPij-kL359CFwyxpzAP-WBfr7IKLJ2083zgjVjGTrTRS4jfyh0MUONrgo2lohxsfz8M-3hlQ_X35HJxY3wr3VlbMb81uI5QndE2RwGyVeY3K_6beMIWdPq8PLYv0LbpstnVf2rMAeI6EopAIyT5dwzoAWjNjznBbWdlh7eYJyNkJaklpG79Nv6Tyw"
              />
            </div>
          </div>
        </section>

        <section className="py-12 bg-surface-container-lowest border-y border-outline-variant">
          <div className="max-w-container-max mx-auto px-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant">
              <div className="pt-4 md:pt-0">
                <div className="font-display-lg text-display-lg text-primary mb-2">50k+</div>
                <div className="font-body-md text-body-md text-on-surface-variant font-medium">
                  Active Students
                </div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="font-display-lg text-display-lg text-secondary-container mb-2">
                  12M+
                </div>
                <div className="font-body-md text-body-md text-on-surface-variant font-medium">
                  XP Earned
                </div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="font-display-lg text-display-lg text-primary mb-2">150k+</div>
                <div className="font-body-md text-body-md text-on-surface-variant font-medium">
                  Interviews Completed
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface relative" id="features">
          <div className="max-w-container-max mx-auto px-lg">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                Everything you need to succeed
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                A comprehensive suite of tools designed to simulate real-world hiring scenarios and
                build your confidence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    data-icon="smart_toy"
                    data-weight="fill"
                  >
                    smart_toy
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
                  AI Mock Interviews
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
                  Practice with our advanced AI interviewer. Receive instant, actionable feedback on
                  your body language, tone, and technical accuracy.
                </p>
                <div className="w-full h-48 rounded-xl overflow-hidden border border-surface-variant relative">
                  <img
                    alt="AI Interview Interface"
                    className="w-full h-full object-cover"
                    data-alt="A close-up shot of a modern, clean web interface showing an AI interview analysis screen. Light mode aesthetic with deep indigo accents. The UI displays a video feed placeholder, audio waveforms, and a scoring breakdown chart with high ratings. The visual style is crisp, professional SaaS, with smooth rounded corners."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIm-0subLhRiuJ1yHgq4y79eAKhfJBkafvdyEFg5YnxmmeaxmCbOW4a_eqHayh5aH_HFODgWG7EGrPTWpJxWwqi-2e-8B0AKM8I1Cbqj3SH6bEssFk4SCA8tS1pvbvXmad3nQy1tzdiwAftpCF_M7-xBxcrqbESMfMSMrE7GHfydAuFJXrmwoO9OVJyZvBajGP8h8vhFYDbGEXAjEHxFg9BpQIOsSmMe78oTS4dZDKH-17ATouolE3Bg"
                  />
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-6">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    data-icon="code"
                    data-weight="fill"
                  >
                    code
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-secondary-container transition-colors">
                  Coding Arena
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Compete in time-bound algorithmic challenges. Climb the leaderboard and earn XP to
                  showcase your problem-solving skills.
                </p>
                <div className="mt-auto flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">
                    DSA
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">
                    System Design
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-6">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    data-icon="live_tv"
                    data-weight="fill"
                  >
                    live_tv
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-tertiary transition-colors">
                  Live Classes
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Join expert-led sessions on top tech skills and interview strategies. Interact in
                  real-time and clear your doubts instantly.
                </p>
              </div>

              <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-8 group">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      data-icon="route"
                      data-weight="fill"
                    >
                      route
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
                    Personalized Roadmap
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    We analyze your current skill level and generate a custom, week-by-week study
                    plan to ensure you're ready for placement season.
                  </p>
                </div>
                <div className="w-full md:w-1/2 h-32 flex items-center justify-center">
                  <div className="w-full h-8 bg-surface-variant rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-primary w-[65%] rounded-full flex items-center px-4 justify-end">
                      <span className="text-on-primary font-label-sm text-label-sm">65% Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface-container-low" id="how-it-works">
          <div className="max-w-container-max mx-auto px-lg">
            <div className="text-center mb-20">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                Your Path to Placement
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                A proven, three-step methodology to transform your career prospects.
              </p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-outline-variant z-0"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-surface-container-lowest border-4 border-surface-container-low flex items-center justify-center shadow-md mb-6 relative">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-on-primary font-headline-md text-headline-md flex items-center justify-center">
                      1
                    </div>
                    <span
                      className="material-symbols-outlined text-[40px] text-primary"
                      data-icon="menu_book"
                    >
                      menu_book
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
                    Master Skills
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Follow tailored curriculum tracks, consume bite-sized content, and solidify
                    concepts through interactive quizzes.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-surface-container-lowest border-4 border-surface-container-low flex items-center justify-center shadow-md mb-6 relative">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-on-primary font-headline-md text-headline-md flex items-center justify-center">
                      2
                    </div>
                    <span
                      className="material-symbols-outlined text-[40px] text-primary"
                      data-icon="model_training"
                    >
                      model_training
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
                    Practice Real-time
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Enter the Arena for timed coding bouts, schedule mock interviews, and build
                    muscle memory for the real thing.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-surface-container-lowest border-4 border-surface-container-low flex items-center justify-center shadow-md mb-6 relative">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-on-primary font-headline-md text-headline-md flex items-center justify-center">
                      3
                    </div>
                    <span
                      className="material-symbols-outlined text-[40px] text-primary"
                      data-icon="work"
                    >
                      work
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
                    Land the Role
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Utilize our resume builder, apply through our partner network, and walk into
                    interviews with unshakeable confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface overflow-hidden" id="testimonials">
          <div className="max-w-container-max mx-auto px-lg">
            <h2 className="font-headline-lg text-headline-lg text-on-surface text-center mb-16">
              Wall of Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative">
                <span
                  className="material-symbols-outlined text-[48px] text-surface-variant absolute top-6 right-6"
                  data-icon="format_quote"
                  data-weight="fill"
                >
                  format_quote
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    alt="User Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-surface-container"
                    data-alt="A professional headshot of a young woman with a confident smile. She is wearing a smart casual blazer. The lighting is bright and soft, reflecting a modern corporate aesthetic. The background is a clean, out-of-focus office environment."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-z03cCgQrspwvDzE_wRzfk2v3qxgsKaq5M46G_MVnBhBzx7yMOBTxDUrTYJcCuhmTfzTtiIVZqjsofErJ4NmTrbKpYAkQ9Xjk0fIYj2PZ4u4ttd8rbqVxefZjH48Wxqo5LExJgdQRnAokwkOGndh83y33VG5ILLwpnSVQWVN5TLuSu4yb0B97nKWpEKUfdstmpGIcRsb2PNLvCpSfdUFAoRa81ujAFXATliHSIo-iifXqe-LxS2LaQ"
                  />
                  <div>
                    <h4 className="font-headline-md text-headline-md text-on-surface text-[18px]">
                      Priya Sharma
                    </h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Placed at TechCorp Inc.
                    </p>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  "The AI mock interviews were a game-changer. They highlighted flaws in my delivery
                  I never knew I had. By the time the real interview came, I felt like I was just
                  talking to a friend."
                </p>
              </div>

              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative">
                <span
                  className="material-symbols-outlined text-[48px] text-surface-variant absolute top-6 right-6"
                  data-icon="format_quote"
                  data-weight="fill"
                >
                  format_quote
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    alt="User Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-surface-container"
                    data-alt="A professional headshot of a young man looking directly at the camera with a subtle, friendly expression. He is wearing a crisp button-down shirt. The aesthetic is clean, well-lit, typical of a professional LinkedIn profile picture. The background is a soft, light grey."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_N-2tEt7H0oTmFnAOopLDB0zFEEDIO4zo9LRgdGxeYC1YY6tV0ZwSfJvqpMVtWHf8krWuN-ahmNv3tmKIUqifwm578PKg_nHXCOVXRB7vSA3bd3FaiztgQK3VAxUBEdYAKCkidKfcglq63zEN2RuW9iCxVVLppzf61mrGbTjWAWPPETHl7Nx6KK5u-HD_IboTdTphWZaDBpiBa5Hv4wEHvyA2x7_C_a90uP1ab3xiSSGKW0muWDLnuQ"
                  />
                  <div>
                    <h4 className="font-headline-md text-headline-md text-on-surface text-[18px]">
                      Rahul Verma
                    </h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Placed at DataSystems
                    </p>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  "The Arena kept me disciplined. Treating DSA practice like a game with XP and
                  leaderboards actually made it fun instead of a chore. Highly recommend the
                  structured roadmap."
                </p>
              </div>

              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative hidden lg:block">
                <span
                  className="material-symbols-outlined text-[48px] text-surface-variant absolute top-6 right-6"
                  data-icon="format_quote"
                  data-weight="fill"
                >
                  format_quote
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    alt="User Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-surface-container"
                    data-alt="A professional headshot of a young woman with a bright, enthusiastic smile. She is wearing a modern, stylish top. The image is brightly lit, evoking a positive, successful mood. The background is a blurred modern workspace."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhn_jEk5TjZxWDkjiTxw4V5y4wYmGm6HlDeSTONn8poOPIWSfpCoWAPG2QR85-uXZrKYwz77xiK4VWxMQt8dq4Fg1iJKQiBJnJgIpHPU4-L1Xm0fpPH5U-U15wpF8DtIoX_NPCOtzB3bUVPkdKdryrRhGoN9-bWZxRnMHd522KYtsW6xUQgLJ0xXRBZTVgobJcCSXxmTBRugAXTUBjn2fmb7pOoHAI4BTsK091xuQB52nGiqklrmJw1A"
                  />
                  <div>
                    <h4 className="font-headline-md text-headline-md text-on-surface text-[18px]">
                      Ananya Patel
                    </h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Placed at CloudNet
                    </p>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  "I loved the live classes. The instructors didn't just teach theory; they focused
                  on what interviewers actually look for. The community aspect kept me motivated
                  during the tough weeks."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-on-primary text-center">
          <div className="max-w-3xl mx-auto px-lg">
            <h2 className="font-display-lg text-display-lg mb-6">Ready to secure your future?</h2>
            <p className="font-body-lg text-body-lg text-primary-fixed mb-10">
              Join thousands of students who have transformed their careers with PlacePro.
            </p>
            <button className="bg-surface-container-lowest text-primary px-8 py-4 rounded-xl font-headline-md text-headline-md shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-surface-bright transition-all duration-300">
              Get Started for Free
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-highest dark:bg-inverse-surface w-full py-xl border-t border-outline-variant flat no shadows font-body-md text-body-md. Labels: font-label-sm text-label-sm text-primary dark:text-inverse-primary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-xl max-w-container-max mx-auto px-lg">
          <div className="col-span-2 md:col-span-4 flex justify-between items-center mb-8 border-b border-outline-variant pb-8">
            <div className="text-headline-md font-headline-md font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]" data-icon="rocket_launch">
                rocket_launch
              </span>
              PlacePro
            </div>
            <div className="text-on-surface-variant font-label-sm text-label-sm">
              © 2024 PlacePro Career OS. All rights reserved.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Product
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Resources
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Company
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Privacy
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
