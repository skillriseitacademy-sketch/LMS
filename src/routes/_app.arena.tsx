
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app/arena")({
  component: ArenaPage,
});

interface TopicStats {
  easy: number;
  med: number;
  hard: number;
  total: number;
  completed: number; // mock for now unless we fetch user progress
}

function ArenaPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [stats, setStats] = useState<Record<string, TopicStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Fetch topics
      const { data: topicsData } = await supabase.from("topics").select("*").order("created_at");
      
      // Fetch challenges to calculate stats
      const { data: challengesData } = await supabase.from("code_challenges").select("topic_id, difficulty");
      
      if (topicsData) {
        setTopics(topicsData);
        
        // Calculate stats per topic
        const newStats: Record<string, TopicStats> = {};
        for (const topic of topicsData) {
          const topicChallenges = (challengesData || []).filter(c => c.topic_id === topic.id);
          newStats[topic.id] = {
            easy: topicChallenges.filter(c => c.difficulty === 'easy').length || 15, // fallback numbers if 0
            med: topicChallenges.filter(c => c.difficulty === 'medium' || c.difficulty === 'med').length || 22,
            hard: topicChallenges.filter(c => c.difficulty === 'hard').length || 8,
            total: topicChallenges.length || 45,
            completed: Math.floor((topicChallenges.length || 45) * 0.6), // Mock completion percentage
          };
        }
        setStats(newStats);
      }
      
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-4 md:px-8 py-8 pb-32">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-secondary-container" data-weight="fill">local_fire_department</span>
            <span className="text-xs tracking-[0.05em] font-medium text-secondary-container uppercase" style={{ fontFamily: "JetBrains Mono" }}>Active Challenge Season</span>
          </div>
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-on-surface mb-2" style={{ fontFamily: "Manrope" }}>Arena Topics</h2>
          <p className="text-lg leading-[1.6] text-outline max-w-2xl" style={{ fontFamily: "Inter" }}>Master individual concepts to increase your global rank. Choose your battleground and start solving curated challenge sets.</p>
        </div>
        {/* Global Gamification Stats */}
        <div className="flex gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
          <div className="text-center px-4 border-r border-outline-variant">
            <p className="text-xs tracking-[0.05em] font-medium text-outline mb-1" style={{ fontFamily: "JetBrains Mono" }}>Global Rank</p>
            <p className="text-[24px] md:text-[32px] font-semibold leading-[1.3] text-primary" style={{ fontFamily: "Manrope" }}>#42</p>
          </div>
          <div className="text-center px-4">
            <p className="text-xs tracking-[0.05em] font-medium text-outline mb-1" style={{ fontFamily: "JetBrains Mono" }}>Total Solved</p>
            <p className="text-[24px] md:text-[32px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>348</p>
          </div>
        </div>
      </header>
      
      {loading ? (
        <div className="w-full flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {topics.map((topic, i) => {
            const tStats = stats[topic.id] || { easy: 0, med: 0, hard: 0, total: 0, completed: 0 };
            const percentage = tStats.total > 0 ? (tStats.completed / tStats.total) * 100 : 0;
            const isFirst = i === 0;
            const isSecond = i === 1;
            
            // Cycle through styles for the demo
            const themeClass = isFirst ? 'text-primary bg-primary' : (isSecond ? 'text-secondary bg-secondary' : 'text-error bg-error');
            const strokeClass = isFirst ? 'stroke-primary' : (isSecond ? 'stroke-secondary' : 'stroke-error');
            const icon = isFirst ? 'text_format' : (isSecond ? 'data_array' : 'memory');

            return (
              <article key={topic.id} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),_0_2px_4px_-2px_rgb(0_0_0_/_0.05)] flex flex-col relative overflow-hidden group hover:border-primary-fixed-dim transition-colors duration-300">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${themeClass.split(' ')[1]}`}></div>
                <header className="flex justify-between items-start mb-6 pl-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center group-hover:scale-110 transition-transform ${themeClass.split(' ')[0]}`}>
                      <span className="material-symbols-outlined text-[28px]">{topic.icon || icon}</span>
                    </div>
                    <h3 className="text-[24px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>{topic.title}</h3>
                  </div>
                </header>
                <div className="flex items-center justify-between mb-8 pl-2">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                      <span className="text-xs tracking-[0.05em] font-medium text-outline w-12" style={{ fontFamily: "JetBrains Mono" }}>Easy</span>
                      <span className="text-base leading-[1.5] text-on-surface font-medium" style={{ fontFamily: "Inter" }}>{tStats.easy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                      <span className="text-xs tracking-[0.05em] font-medium text-outline w-12" style={{ fontFamily: "JetBrains Mono" }}>Med</span>
                      <span className="text-base leading-[1.5] text-on-surface font-medium" style={{ fontFamily: "Inter" }}>{tStats.med}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      <span className="text-xs tracking-[0.05em] font-medium text-outline w-12" style={{ fontFamily: "JetBrains Mono" }}>Hard</span>
                      <span className="text-base leading-[1.5] text-on-surface font-medium" style={{ fontFamily: "Inter" }}>{tStats.hard}</span>
                    </div>
                  </div>
                  {/* Progress Ring with absolute centered text to fix overlap */}
                  <div className="w-24 h-24 relative flex items-center justify-center">
                    <svg className="circular-chart w-full h-full absolute inset-0" viewBox="0 0 36 36">
                      <path className="circle-bg" fill="none" strokeWidth="2.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                      <path className={`circle ${strokeClass}`} fill="none" strokeWidth="2.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray={`${percentage}, 100`}></path>
                    </svg>
                    <div className="text-[17px] font-bold z-10 flex items-center justify-center text-on-surface" style={{ fontFamily: "Manrope" }}>
                      {tStats.completed}<span className="text-xs text-outline font-medium">/{tStats.total}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pl-2">
                  <Link to="/arena/$topicId" params={{ topicId: topic.id }} className="w-full bg-surface-container hover:bg-primary text-primary hover:text-on-primary text-base leading-[1.5] font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md" style={{ fontFamily: "Inter" }}>
                    <span>Enter Arena</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
