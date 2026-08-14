import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/jobs_board_role_details_applied_state")({
  component: JobsBoardRoleDetailsAppliedStatePage,
});

function JobsBoardRoleDetailsAppliedStatePage() {
  return (
    <>
      <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface/80 dark:bg-background/80 backdrop-blur-md flex justify-between items-center px-8 z-40 hidden md:flex">
        <div className="flex items-center gap-4">
          <div className="relative focus-within:ring-2 focus-within:ring-primary/20 rounded-full">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
              data-icon="search"
            >
              search
            </span>
            <input
              className="bg-surface-container-highest border-none rounded-full py-2 pl-10 pr-4 text-body-md text-on-surface focus:ring-0 w-64 placeholder:text-outline-variant"
              placeholder="Search PlacePro..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="p-2 rounded-full text-on-surface-variant hover:text-primary transition-all hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined" data-icon="notifications">
              notifications
            </span>
          </button>
          <button
            aria-label="Premium"
            className="p-2 rounded-full text-on-surface-variant hover:text-primary transition-all hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined" data-icon="workspace_premium">
              workspace_premium
            </span>
          </button>
          <img
            alt="Student Avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-high cursor-pointer"
            data-alt="A clean, professional headshot of a college student against a neutral studio background. Bright, modern lighting, corporate modern aesthetic. High quality, crisp focus."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIwM7pEWUUCbthNCnKp1KrS5QMVkvd02uAdjwQj7MUoZ_AW6eLU3Xbr30mRmz0WYmnlBQogDf_Ww-r6VZCwY_Bj5is5aYesc9EU8kgto9FA0-OzTHFLo-Awv2unUVIAbbN9SfeIo7uTm9Qru4KVozcOp7NEyeuj-mf96RAGq8Fb8qQocDOU8wJzmQk7a9S2BGS4WXG1r5f_K9c2tU-_iKk9ssawj1BKRb7kQy-ugezuPEaCdGP9SCEcg"
          />
        </div>
      </header>

      <nav className="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] flex flex-col py-6 px-4 overflow-y-auto hidden md:flex z-50">
        <div className="mb-8 px-2">
          <h1 className="text-headline-md font-display-lg font-extrabold text-primary">PlacePro</h1>
          <p className="font-label-sm text-label-sm text-outline tracking-wider mt-1 uppercase">
            Career OS
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            <span className="font-body-md text-body-md font-medium">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="rss_feed">
              rss_feed
            </span>
            <span className="font-body-md text-body-md font-medium">Feed</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="video_chat">
              video_chat
            </span>
            <span className="font-body-md text-body-md font-medium">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="quiz">
              quiz
            </span>
            <span className="font-body-md text-body-md font-medium">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="sports_esports">
              sports_esports
            </span>
            <span className="font-body-md text-body-md font-medium">Arena</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-icon="work"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              work
            </span>
            <span className="font-body-md text-body-md">Jobs</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="map">
              map
            </span>
            <span className="font-body-md text-body-md font-medium">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="description">
              description
            </span>
            <span className="font-body-md text-body-md font-medium">Resume</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="leaderboard">
              leaderboard
            </span>
            <span className="font-body-md text-body-md font-medium">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="person">
              person
            </span>
            <span className="font-body-md text-body-md font-medium">Profile</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="groups">
              groups
            </span>
            <span className="font-body-md text-body-md font-medium">Rooms</span>
          </a>
        </div>
        <div className="mt-auto pt-8">
          <button className="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 active:scale-[0.98] shadow-sm mb-6">
            Start Practice
          </button>
          <div className="flex flex-col gap-2 border-t border-surface-container pt-4">
            <a
              className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]" data-icon="settings">
                settings
              </span>
              <span className="font-body-md text-[14px] font-medium">Settings</span>
            </a>
            <a
              className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/50 transition-colors duration-200"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]" data-icon="logout">
                logout
              </span>
              <span className="font-body-md text-[14px] font-medium">Logout</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="md:ml-[280px] w-full min-h-screen pt-16 md:pt-24 pb-24 md:pb-xl px-4 md:px-xl max-w-[1560px] mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] flex items-start gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-bl-full -z-0"></div>
            <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant/30 z-10">
              <img
                alt="Company Logo"
                className="w-10 h-10 object-contain"
                data-alt="A clean, minimalist logo of a tech company, stylized 'Z', corporate modern aesthetic, white background."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxTgMDGPP5mlnWQfu-iASitpw2a4GHUqMvkohgsGl68deTLbLm7G02jAoPWJA6Jp4HnboF8vRrB6Veh8qlIwtu_jCjp1ABdeotEXmDp6CXROrTlFRSfsNp1i1RmwCgrPwMsVCinLmcO7shfb6dujlNEdPSZXb-fwGjheSXAxf5NiGy821OK3oqWT9aC007PEd3fPCoiyHT21LJp_fyeAOf2G-C-d5Szk6BVI4bLfoBOTSSSAbtCXhAag"
              />
            </div>
            <div className="flex-1 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">
                    Software Engineer, Backend
                  </h2>
                  <p className="font-body-lg text-body-lg text-primary font-medium">
                    Zomato <span className="text-on-surface-variant font-normal mx-2">•</span>{" "}
                    Gurgaon, India (Hybrid)
                  </p>
                </div>
                <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container">
                  <span className="material-symbols-outlined" data-icon="bookmark">
                    bookmark
                  </span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]" data-icon="payments">
                    payments
                  </span>
                  ₹24L - ₹32L Base
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]" data-icon="work">
                    work
                  </span>
                  0-2 Years Exp
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]" data-icon="schedule">
                    schedule
                  </span>
                  Full-time
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
              About the Role
            </h3>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              We are looking for a passionate Software Engineer to join our core backend team. You
              will be responsible for designing, building, and maintaining high-performance,
              scalable, and reliable services that power millions of food deliveries daily. This
              role requires a deep understanding of distributed systems, database design, and a
              strong problem-solving mindset.
            </p>
            <h3 className="font-headline-md text-[20px] font-semibold text-on-surface mb-2 mt-8">
              Responsibilities
            </h3>
            <ul className="space-y-3 text-on-surface-variant list-none pl-1 mb-6">
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0"
                  data-icon="check_circle"
                >
                  check_circle
                </span>
                Design and implement microservices using Go and Java to handle high throughput and
                low latency requirements.
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0"
                  data-icon="check_circle"
                >
                  check_circle
                </span>
                Optimize database queries and schema design (PostgreSQL, Redis) to improve
                application performance.
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0"
                  data-icon="check_circle"
                >
                  check_circle
                </span>
                Collaborate with cross-functional teams (Product, Design, QA) to define and ship new
                features.
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0"
                  data-icon="check_circle"
                >
                  check_circle
                </span>
                Participate in code reviews, write automated tests, and ensure code quality and
                maintainability.
              </li>
            </ul>
            <h3 className="font-headline-md text-[20px] font-semibold text-on-surface mb-2 mt-8">
              Requirements
            </h3>
            <ul className="space-y-3 text-on-surface-variant list-none pl-1">
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-outline text-[20px] mt-0.5 shrink-0"
                  data-icon="arrow_right"
                >
                  arrow_right
                </span>
                B.Tech/M.Tech in Computer Science or a related field.
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-outline text-[20px] mt-0.5 shrink-0"
                  data-icon="arrow_right"
                >
                  arrow_right
                </span>
                Strong proficiency in Data Structures, Algorithms, and System Design.
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-outline text-[20px] mt-0.5 shrink-0"
                  data-icon="arrow_right"
                >
                  arrow_right
                </span>
                Experience with backend languages like Go, Java, or Python.
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined text-outline text-[20px] mt-0.5 shrink-0"
                  data-icon="arrow_right"
                >
                  arrow_right
                </span>
                Familiarity with cloud platforms (AWS/GCP) and containerization (Docker, Kubernetes)
                is a plus.
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-[380px] flex flex-col gap-6 shrink-0">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border-t-4 border-primary">
            <h3 className="font-headline-md text-[20px] font-semibold text-on-surface mb-2">
              Application Sent! 🎉
            </h3>
            <p className="text-on-surface-variant text-sm mb-4">
              Your profile and resume have been sent to Zomato. Good luck, Alex!
            </p>
            <button className="w-full text-on-primary font-body-md text-body-md font-semibold py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 group bg-secondary">
              <span className="material-symbols-outlined" data-icon="check_circle">
                check_circle
              </span>{" "}
              Applied!
            </button>
            <div className="mt-4 text-center">
              <a className="text-primary hover:underline text-sm font-medium" href="#">
                View Application Status
              </a>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary" data-icon="radar">
                  radar
                </span>
              </div>
              <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">
                Why You Match
              </h3>
            </div>
            <p className="text-on-surface-variant text-sm mb-6">
              Based on your Arena performance and Roadmap progress.
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-on-surface">System Design</span>
                  <span className="text-primary font-bold">Top 10%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Matched requirement: Scalable systems
                </p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-on-surface">Go / Java</span>
                  <span className="text-secondary font-bold">Advanced</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  From Roadmap: Backend Mastery
                </p>
              </div>

              <div className="p-3 bg-error-container/20 rounded-lg border border-error-container/50">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="material-symbols-outlined text-error text-[16px]"
                    data-icon="warning"
                  >
                    warning
                  </span>
                  <span className="text-sm font-medium text-on-surface">Kubernetes</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-2">
                  Recommended to review before interview.
                </p>
                <a className="text-xs text-primary font-medium hover:underline" href="#">
                  Start K8s Module →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
            <h3 className="font-headline-md text-[20px] font-semibold text-on-surface mb-6">
              Company at a Glance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-surface rounded-lg border border-surface-container-highest">
                <span
                  className="material-symbols-outlined text-outline-variant mb-1"
                  data-icon="domain"
                >
                  domain
                </span>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-label-sm">
                  Industry
                </p>
                <p className="font-medium text-on-surface text-sm">Consumer Tech</p>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-surface-container-highest">
                <span
                  className="material-symbols-outlined text-outline-variant mb-1"
                  data-icon="group"
                >
                  group
                </span>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-label-sm">
                  Size
                </p>
                <p className="font-medium text-on-surface text-sm">5,000+ Emp.</p>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-surface-container-highest">
                <span
                  className="material-symbols-outlined text-outline-variant mb-1"
                  data-icon="trending_up"
                >
                  trending_up
                </span>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-label-sm">
                  Stage
                </p>
                <p className="font-medium text-on-surface text-sm">Public (IPO)</p>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-surface-container-highest">
                <span
                  className="material-symbols-outlined text-outline-variant mb-1"
                  data-icon="psychology"
                >
                  psychology
                </span>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-label-sm">
                  Culture
                </p>
                <p className="font-medium text-on-surface text-sm">Fast-paced</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-surface-container-highest">
              <a
                className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
                href="#"
              >
                View full company profile
                <span className="material-symbols-outlined text-[16px]" data-icon="open_in_new">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
