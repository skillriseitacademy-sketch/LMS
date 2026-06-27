import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Menu,
  PlayCircle,
  FileText,
  Users,
  Gamepad2,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Github,
  FolderGit2,
  Briefcase
} from "lucide-react";
import { useProjects } from "@/lib/auth-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlacePro LMS — The new standard in placement prep" },
      { name: "description", content: "A complete learning platform setting a new standard for efficient placement training." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { projects } = useProjects();

  return (
    <div className="min-h-screen bg-[#F7F9F8] font-sans overflow-x-hidden selection:bg-[#00E5A8] selection:text-[#002f24]">
      
      {/* --- HERO SECTION --- */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-b from-[#002B24] to-[#014134] text-white pb-32">
          
          {/* Top Navigation inside the curved hero */}
          <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
            <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#002B24] transition-transform hover:scale-105">
              <Menu className="h-4 w-4" /> Menu
            </button>
            
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-3xl bg-[#F7F9F8] px-8 py-4 shadow-sm">
              <div className="flex items-center gap-2 text-[#002B24]">
                <Sparkles className="h-5 w-5 text-[#00E5A8]" />
                <span className="text-display text-xl font-extrabold tracking-tight">PlacePro</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-semibold hover:text-[#00E5A8] transition-colors">Log In</Link>
              <Link to="/signup" className="rounded-full bg-[#00E5A8] px-5 py-2.5 text-sm font-bold text-[#002B24] transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,168,0.3)]">
                Book a Demo <ArrowRight className="inline-block h-4 w-4 ml-1" />
              </Link>
            </div>
          </header>

          {/* Hero Content */}
          <div className="relative z-10 mx-auto mt-20 max-w-4xl px-6 text-center">
            <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00E5A8]">
              AI-Driven Placement Platform
            </span>
            <h1 className="mt-8 text-display text-5xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-[5rem]">
              A complete learning platform.<br/>
              Setting a new standard for <span className="text-[#00E5A8]">efficient placement training</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-white/80 leading-relaxed">
              From coding assessments and mock interviews to career roadmaps — PlacePro uses AI and automation to cut prep time by up to 90%, while boosting placement rates across your campus.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link to="/signup" className="rounded-full bg-[#00E5A8] px-8 py-4 text-base font-bold text-[#002B24] transition-transform hover:scale-105 shadow-[0_0_30px_rgba(0,229,168,0.4)]">
                Book a Demo <ArrowRight className="inline-block h-5 w-5 ml-1" />
              </Link>
              <Link to="/dashboard" className="group flex items-center gap-2 text-base font-bold hover:text-white/80">
                Try for free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E5A8]/10 rounded-full blur-[120px]"></div>

          {/* Bottom elements in hero */}
          <div className="absolute bottom-8 left-8">
            <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold backdrop-blur-md hover:bg-white/10">
              Scroll down <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Mascot Overlapping */}
        <div className="relative mx-auto -mt-24 w-48 h-48 md:w-56 md:h-56 z-30 transform hover:-translate-y-4 transition-transform duration-500">
          <img src="/mascot.png" alt="PlacePro Mascot" className="w-full h-full object-contain drop-shadow-2xl filter" />
        </div>
      </div>

      {/* --- LOGOS SECTION --- */}
      <div className="mt-8 mb-24 px-6 text-center">
        <p className="text-sm font-medium text-slate-500">Trusted by over <strong className="text-[#00E5A8] font-bold">100,000 Students</strong> in top universities</p>
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale">
          {/* Mock Logos using text for simplicity */}
          <span className="text-2xl font-display font-black tracking-tighter">Google</span>
          <span className="text-2xl font-display font-bold">Microsoft</span>
          <span className="text-xl font-display font-bold tracking-widest uppercase">Amazon</span>
          <span className="text-2xl font-display font-black tracking-tight">META</span>
          <span className="text-2xl font-display font-semibold">Netflix</span>
        </div>
      </div>

      {/* --- VIDEO MOCKUP SECTION --- */}
      <section className="mx-auto max-w-5xl px-6 pb-32 text-center">
        <h2 className="text-display text-4xl font-extrabold tracking-tight md:text-5xl text-[#002B24]">
          See <span className="inline-flex items-center justify-center bg-[#00E5A8] text-[#002B24] rounded-lg px-2 py-1 mx-1 -rotate-3 shadow-sm text-3xl md:text-4xl"><Sparkles className="h-6 w-6 mr-1" /> PP</span> PlacePro in action
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-slate-600 font-medium">
          Experience how AI transforms placement prep — from interactive roadmaps to live coding challenges that inspire growth and engagement.
        </p>

        {/* Tabs */}
        <div className="mx-auto mt-12 flex max-w-fit flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
          <button className="flex items-center gap-2 rounded-full bg-[#F2FCFA] px-5 py-2.5 text-sm font-bold text-[#00A87A]">
            <PlayCircle className="h-4 w-4" /> Watch video about PlacePro
          </button>
          <button className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <FileText className="h-4 w-4" /> E-learning
          </button>
          <button className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Users className="h-4 w-4" /> Instructor
          </button>
          <button className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <Gamepad2 className="h-4 w-4" /> Live Game
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="mx-auto mt-8 aspect-video max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#004134] to-[#002B24] p-2 shadow-2xl ring-1 ring-black/5">
          <div className="relative h-full w-full rounded-[1.5rem] bg-[#002B24] border border-white/10 overflow-hidden">
            {/* Mock Player UI */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#00E5A8]/5">
              <div className="flex flex-col items-center gap-4">
                <button className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00E5A8] pl-2 text-[#002B24] transition-transform hover:scale-110 shadow-[0_0_40px_rgba(0,229,168,0.5)]">
                  <PlayCircle className="h-10 w-10" />
                </button>
              </div>
            </div>
            {/* Ambient lines in player */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00E5A8] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* --- METRICS / TILTED CARDS SECTION --- */}
      <section className="relative mx-auto max-w-6xl px-6 pb-32 pt-10">
        <div className="text-center">
          <span className="inline-block rounded-full border border-[#00E5A8]/30 bg-[#00E5A8]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#00A87A]">
            The platform with impact
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl text-display text-4xl font-extrabold leading-tight text-[#002B24] md:text-5xl">
            PlacePro drives <span className="text-slate-400">standout results for students</span>, lifting placement rates and engagement.
          </h2>
        </div>

        <div className="relative mt-20 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {/* Card 1 */}
          <div className="relative w-64 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 -rotate-3 transition-transform hover:rotate-0 hover:-translate-y-2">
            <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5FFF7] text-[#00E5A8] shadow-sm">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="mt-4 text-display text-5xl font-black text-[#002B24]">
              <span className="text-2xl text-slate-300">LPA </span>
              14<span className="text-3xl">M</span>
            </div>
            <h3 className="mt-2 font-bold text-[#002B24]">Average CTC</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">For students completing our advanced AI roadmap.</p>
          </div>

          {/* Card 2 */}
          <div className="relative w-64 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 rotate-2 transition-transform hover:rotate-0 hover:-translate-y-2 lg:-mt-16">
            <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5FFF7] text-[#00E5A8] shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="mt-4 text-display text-6xl font-black text-[#00E5A8]">
              98<span className="text-4xl">%</span>
            </div>
            <h3 className="mt-2 font-bold text-[#002B24]">Placement Rates</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">For top tier universities adopting the platform.</p>
          </div>

          {/* Card 3 */}
          <div className="relative w-64 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 -rotate-2 transition-transform hover:rotate-0 hover:-translate-y-2">
            <div className="absolute -bottom-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5FFF7] text-[#00E5A8] shadow-sm">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <div className="mt-4 text-display text-6xl font-black text-slate-300">
              12<span className="text-4xl">x</span>
            </div>
            <h3 className="mt-2 font-bold text-[#002B24]">Faster Prep</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">Compared to traditional manual mock interviews.</p>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SHOWCASE --- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-display text-3xl font-extrabold tracking-tight md:text-4xl text-[#002B24]">Student Projects</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500 font-medium">See what our students are building and launching.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map(p => (
            <div key={p.id} className="group rounded-[2rem] bg-white p-2 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-xl hover:shadow-slate-200">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-slate-100 relative">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300"><FolderGit2 className="h-8 w-8 opacity-50" /></div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-display font-bold text-lg text-[#002B24]">{p.title}</h3>
                <p className="text-xs text-[#00A87A] font-bold mt-1 uppercase tracking-wider">by {p.authorName}</p>
                <p className="mt-3 text-sm text-slate-500 line-clamp-2 leading-relaxed">{p.description}</p>
                
                <div className="mt-6 flex gap-2">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#002B24] px-3 py-2.5 text-xs font-bold text-white hover:bg-[#004134] transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-slate-100 px-3 py-2.5 text-xs font-bold text-slate-600 hover:border-slate-200 hover:bg-slate-50 transition-colors">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <div className="px-4 pb-4">
        <div className="relative overflow-hidden rounded-[3rem] bg-[#002B24] text-white py-24 px-6 text-center">
          <h2 className="text-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Solutions for all placement purposes
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/80">
            PlacePro has solutions for all your placement needs, whether it's mock interviews, ATS resume building, or roadmap generation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link to="/signup" className="rounded-full bg-[#00E5A8] px-8 py-4 text-base font-bold text-[#002B24] transition-transform hover:scale-105 shadow-[0_0_30px_rgba(0,229,168,0.4)]">
              Book a Demo <ArrowRight className="inline-block h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm font-medium text-white/50 md:flex-row md:px-12">
            <span>© {new Date().getFullYear()} PlacePro LMS. All rights reserved.</span>
            <div className="flex gap-6">
              <Link to="/login" className="hover:text-white">Login</Link>
              <Link to="/signup" className="hover:text-white">Sign up</Link>
              <Link to="/admin" className="hover:text-white">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
