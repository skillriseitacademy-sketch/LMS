import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Video, Code2, PlaySquare, Map, BookOpen, Target, Briefcase, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlacePro — The new standard in placement prep" },
      {
        name: "description",
        content: "Get placement-ready – interviews, quizzes, live classes, and a community that's doing it with you.",
      },
    ],
  }),
  component: Landing,
});

import { useAuth } from "@/lib/auth-store";
import { useEffect } from "react";

function Landing() {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate({ to: "/dashboard" });
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#3424C2]/20 selection:text-[#3424C2]">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center gap-2 text-[#3424C2]">
          <Sparkles className="h-5 w-5" />
          <span className="text-display text-xl font-extrabold tracking-tight">PlacePro</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="rounded-full bg-[#3424C2] px-5 py-2 text-sm font-bold text-white transition-all hover:bg-[#2A1D9C] shadow-sm">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-[#F4F4FF] to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-[#3424C2] text-xs font-bold uppercase tracking-wider mb-8 border border-blue-100">
            <Sparkles className="h-3.5 w-3.5" /> Your Ultimate Career OS
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
            Get placement-ready — interviews, <br className="hidden md:block"/>
            quizzes, live classes, and a <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-[#3424C2]">community</span>
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span><br className="hidden md:block"/>
            that's doing it with you.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Stop stressing about placements. PlacePro provides a structured, gamified environment to master skills, practice in real-time, and land your dream role.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto rounded-full bg-[#3424C2] px-8 py-4 text-[15px] font-bold text-white transition-transform hover:scale-105 shadow-[0_4px_20px_rgba(52,36,194,0.25)] flex items-center justify-center gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto rounded-full bg-white border border-slate-200 px-8 py-4 text-[15px] font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center shadow-sm">
              Log in
            </Link>
          </div>
        </div>

        {/* Laptop Mockup */}
        <div className="mt-16 max-w-5xl mx-auto relative z-10 px-4">
          <div className="rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-slate-200/50 relative bg-white aspect-[16/9] flex items-center justify-center">
            {/* Fallback mockup since we don't have the image asset */}
            <div className="absolute inset-0 bg-slate-50 flex flex-col">
              <div className="h-10 bg-slate-100 border-b flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <div className="ml-4 h-5 w-48 bg-white rounded shadow-sm border border-slate-200 text-center text-[10px] text-slate-400 flex items-center justify-center">placepro.app/dashboard</div>
              </div>
              <div className="flex-1 p-8 grid grid-cols-12 gap-6 bg-slate-50">
                <div className="col-span-3 bg-white rounded-xl border p-4">
                  <div className="w-full h-8 bg-slate-100 rounded mb-4"></div>
                  <div className="w-2/3 h-4 bg-slate-100 rounded mb-2"></div>
                  <div className="w-3/4 h-4 bg-slate-100 rounded mb-2"></div>
                  <div className="w-1/2 h-4 bg-slate-100 rounded mb-2"></div>
                </div>
                <div className="col-span-9 grid grid-cols-2 gap-6">
                  <div className="col-span-2 bg-white rounded-xl border p-6 flex justify-between items-center">
                     <div>
                       <div className="w-48 h-6 bg-slate-100 rounded mb-2"></div>
                       <div className="w-64 h-4 bg-slate-50 rounded"></div>
                     </div>
                     <div className="w-16 h-16 rounded-full bg-blue-100"></div>
                  </div>
                  <div className="bg-white rounded-xl border p-6 aspect-video"></div>
                  <div className="bg-white rounded-xl border p-6 aspect-video"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
          <div className="py-6 md:py-0">
            <h3 className="text-4xl font-extrabold text-[#3424C2] mb-2">50k+</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Students</p>
          </div>
          <div className="py-6 md:py-0">
            <h3 className="text-4xl font-extrabold text-[#F59E0B] mb-2">12M+</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">XP Earned</p>
          </div>
          <div className="py-6 md:py-0">
            <h3 className="text-4xl font-extrabold text-[#3424C2] mb-2">150k+</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Interviews Completed</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Everything you need to succeed</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">A comprehensive suite of tools designed to simulate real-world hiring scenarios and build your confidence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Mock Interviews - Large */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm md:col-span-2 lg:col-span-1">
              <div className="h-12 w-12 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center mb-6">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Mock Interviews</h3>
              <p className="text-slate-500 mb-8">Practice with our advanced AI interviewer. Receive instant, actionable feedback on your body language, tone, and technical accuracy.</p>
              <div className="rounded-xl bg-slate-50 border border-slate-100 aspect-video flex items-center justify-center p-4">
                 {/* Mockup visual */}
                 <div className="w-full h-full bg-white rounded-lg shadow-sm border p-4 flex gap-4">
                    <div className="w-1/3 bg-slate-100 rounded flex flex-col items-center justify-center gap-2">
                       <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                       <div className="w-16 h-2 bg-slate-200 rounded"></div>
                    </div>
                    <div className="w-2/3 flex flex-col gap-4">
                       <div className="flex-1 bg-slate-100 rounded"></div>
                       <div className="h-8 bg-blue-50 rounded w-1/2"></div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Coding Arena */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Coding Arena</h3>
              <p className="text-slate-500 mb-6">Compete in time-bound algorithmic challenges. Climb the leaderboard and earn XP to showcase your problem-solving skills.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">DSA</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">System Design</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">SQL</span>
              </div>
            </div>

            {/* Live Classes */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-6">
                <PlaySquare className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Live Classes</h3>
              <p className="text-slate-500">Join expert-led sessions on top tech skills and interview strategies. Interact in real-time and clear your doubts instantly.</p>
            </div>

            {/* Personalized Roadmap */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="h-12 w-12 rounded-2xl bg-[#3424C2]/10 text-[#3424C2] flex items-center justify-center mb-6 relative z-10">
                <Map className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 relative z-10">Personalized Roadmap</h3>
              <p className="text-slate-500 relative z-10 mb-8">We analyze your current skill level and generate a custom, week-by-week study plan to ensure you're ready for placement season.</p>
              
              <div className="relative z-10 bg-slate-100 rounded-full h-8 flex items-center px-1 overflow-hidden w-full max-w-[200px]">
                <div className="bg-[#3424C2] h-6 rounded-full w-[65%] flex items-center justify-end px-3">
                   <span className="text-[10px] font-bold text-white">65% Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Placement */}
      <section id="how-it-works" className="py-24 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Your Path to Placement</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">A proven, three-step methodology to transform your career prospects.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-10 left-[10%] right-[10%] h-[2px] bg-slate-100 hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-white rounded-full border-2 border-slate-100 flex items-center justify-center shadow-sm relative mb-6">
                  <div className="absolute -top-3 -right-3 h-8 w-8 bg-[#3424C2] text-white rounded-full font-bold flex items-center justify-center border-[3px] border-white">1</div>
                  <BookOpen className="h-8 w-8 text-[#3424C2]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Master Skills</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Follow tailored curriculum tracks, consume bite-sized content, and solidify concepts through interactive quizzes.</p>
              </div>

              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-white rounded-full border-2 border-slate-100 flex items-center justify-center shadow-sm relative mb-6">
                  <div className="absolute -top-3 -right-3 h-8 w-8 bg-[#3424C2] text-white rounded-full font-bold flex items-center justify-center border-[3px] border-white">2</div>
                  <Target className="h-8 w-8 text-[#3424C2]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Practice Real-time</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Enter the Arena for timed coding bouts, schedule mock interviews, and build muscle memory for the real thing.</p>
              </div>

              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-white rounded-full border-2 border-slate-100 flex items-center justify-center shadow-sm relative mb-6">
                  <div className="absolute -top-3 -right-3 h-8 w-8 bg-[#3424C2] text-white rounded-full font-bold flex items-center justify-center border-[3px] border-white">3</div>
                  <Briefcase className="h-8 w-8 text-[#3424C2]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Land the Role</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Utilize our resume builder, apply through our partner network, and walk into interviews with unshakeable confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wall of Success */}
      <section id="testimonials" className="py-24 bg-[#F8F9FC] px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Wall of Success</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative">
              <Quote className="absolute top-8 right-8 h-8 w-8 text-blue-100" />
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Priya" />
                </div>
                <div>
                  <h4 className="font-bold">Priya Sharma</h4>
                  <p className="text-xs text-slate-500">Placed at TechCorp Inc.</p>
                </div>
              </div>
              <p className="text-slate-600 italic text-sm leading-relaxed">"The AI mock interviews were a game-changer. They highlighted flaws in my delivery I never knew I had. By the time the real interview came, I felt like I was just talking to a friend."</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative">
              <Quote className="absolute top-8 right-8 h-8 w-8 text-blue-100" />
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Rahul" />
                </div>
                <div>
                  <h4 className="font-bold">Rahul Verma</h4>
                  <p className="text-xs text-slate-500">Placed at DataSystems</p>
                </div>
              </div>
              <p className="text-slate-600 italic text-sm leading-relaxed">"The Arena kept me disciplined. Treating DSA practice like a game with XP and leaderboards actually made it fun instead of a chore. Highly recommend the structured roadmap."</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative">
              <Quote className="absolute top-8 right-8 h-8 w-8 text-blue-100" />
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="Ananya" />
                </div>
                <div>
                  <h4 className="font-bold">Ananya Patel</h4>
                  <p className="text-xs text-slate-500">Placed at CloudNet</p>
                </div>
              </div>
              <p className="text-slate-600 italic text-sm leading-relaxed">"I loved the live classes. The instructors didn't just teach theory; they focused on what interviewers actually look for. The community aspect kept me motivated during the tough weeks."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#3424C2] px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Ready to secure your future?</h2>
          <p className="text-indigo-200 mb-10 text-lg">Join thousands of students who have transformed their careers with PlacePro.</p>
          <Link to="/signup" className="inline-block rounded-full bg-white px-8 py-4 text-base font-bold text-[#3424C2] transition-transform hover:scale-105 shadow-lg">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8F9FC] py-12 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-800">
            <Sparkles className="h-5 w-5" />
            <span className="text-lg font-bold tracking-tight">PlacePro</span>
          </div>
          
          <div className="text-sm font-semibold text-slate-500">
            © {new Date().getFullYear()} PlacePro Career OS. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-xs font-semibold text-slate-500">
            <a href="#" className="hover:text-slate-800 transition-colors">Product</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Company</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Resources</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
