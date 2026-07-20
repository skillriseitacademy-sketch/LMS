import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_app/roadmap")({
  component: RoadmapPage,
});

type RoadmapNode = "sde" | "ds" | "pm" | null;

const nodeData = {
  sde: {
    title: "Software Development Engineer",
    desc: "The core engineering path focused on building robust scalable systems. Demands strong fundamentals in algorithms and system design.",
    skills: ["Data Structures", "Algorithms", "System Design", "Java / C++", "REST APIs"],
  },
  ds: {
    title: "Data Scientist",
    desc: "Focuses on extracting insights from data, building machine learning models, and statistical analysis.",
    skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Viz"],
  },
  pm: {
    title: "Product Manager",
    desc: "Sits at the intersection of business, technology, and design. Focuses on product strategy and execution.",
    skills: ["Product Strategy", "Agile", "User Research", "Data Analytics", "Wireframing"],
  }
};

function RoadmapPage() {
  const [activeNode, setActiveNode] = useState<RoadmapNode>("sde");

  return (
    <>
      <style>{`
        .grid-pattern {
            background-size: 40px 40px;
            background-image: 
                linear-gradient(to right, rgba(119, 117, 135, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(119, 117, 135, 0.05) 1px, transparent 1px);
        }
        
        .tree-line-horizontal {
            position: absolute;
            height: 2px;
            background-color: var(--pp-primary);
            top: 50%;
            z-index: 0;
        }
        
        .tree-line-vertical {
            position: absolute;
            width: 2px;
            background-color: var(--pp-primary);
            left: 50%;
            z-index: 0;
        }

        .node-shadow {
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
        }
      `}</style>
      <div className="flex-1 flex h-[calc(100vh-theme(spacing.16))] md:h-screen relative grid-pattern bg-background overflow-hidden w-full max-w-[100vw]">
        {/* Interactive Roadmap Area */}
        <div className="flex-1 relative overflow-auto p-4 md:p-8 flex items-center justify-center cursor-grab active:cursor-grabbing" id="roadmap-canvas">
          {/* Roadmap Tree Structure */}
          <div className="relative min-w-[1000px] min-h-[800px] flex items-center justify-center">
            
            {/* Center Node (Root) */}
            <div className="absolute z-10 flex flex-col items-center cursor-pointer group">
              <div className="w-24 h-24 bg-surface-container-lowest rounded-full flex items-center justify-center node-shadow border-4 border-secondary-container transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-4xl text-secondary-container" data-weight="fill">school</span>
              </div>
              <div className="mt-3 bg-surface-container-lowest px-4 py-2 rounded-lg node-shadow text-center">
                <span className="text-xs tracking-[0.05em] font-medium text-secondary-container uppercase tracking-wider block mb-1" style={{ fontFamily: "JetBrains Mono" }}>Current Status</span>
                <span className="text-base leading-[1.5] font-semibold text-on-surface" style={{ fontFamily: "Inter" }}>B.Tech 3rd Year</span>
              </div>
            </div>

            {/* Lines radiating from center */}
            <div className={`tree-line-horizontal w-64 left-1/2 ml-12 ${activeNode === 'sde' ? 'bg-primary' : 'bg-outline-variant'}`}></div>
            <div className={`tree-line-horizontal w-64 right-1/2 mr-12 ${activeNode === 'ds' ? 'bg-primary' : 'bg-outline-variant'}`}></div>
            <div className={`tree-line-vertical h-64 top-1/2 mt-12 ${activeNode === 'pm' ? 'bg-primary' : 'bg-outline-variant'}`}></div>

            {/* Path 1: SDE (Right) */}
            <div onClick={() => setActiveNode("sde")} className={`absolute z-10 right-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group transition-opacity ${activeNode === 'sde' ? '' : 'opacity-70 hover:opacity-100'}`}>
              
              {activeNode === 'sde' && (
                <>
                  <div className="absolute left-full top-12 w-16 h-0.5 bg-primary"></div>
                  <div className="absolute left-[calc(100%+4rem)] top-12 w-0.5 h-32 bg-primary -translate-y-1/2"></div>
                  <div className="absolute left-[calc(100%+4rem)] top-[-2rem] w-8 h-0.5 bg-primary"></div>
                  <div className="absolute left-[calc(100%+4rem)] top-[5rem] w-8 h-0.5 bg-primary"></div>
                </>
              )}
              
              <div className={`w-20 h-20 rounded-full flex items-center justify-center node-shadow transition-transform group-hover:scale-110 ${activeNode === 'sde' ? 'bg-primary ring-4 ring-primary-container ring-opacity-30' : 'bg-surface-container-lowest border-2 border-outline'}`}>
                <span className={`material-symbols-outlined text-3xl ${activeNode === 'sde' ? 'text-on-primary' : 'text-outline'}`}>code</span>
              </div>
              <div className={`mt-3 px-4 py-2 rounded-lg node-shadow text-center max-w-[150px] ${activeNode === 'sde' ? 'bg-surface-container-lowest border border-primary-container' : 'bg-surface-container-lowest'}`}>
                <span className={`text-base leading-[1.5] font-semibold ${activeNode === 'sde' ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontFamily: "Inter" }}>Software Eng.</span>
              </div>

              {/* SDE Subnodes */}
              {activeNode === 'sde' && (
                <>
                  <div className="absolute left-[calc(100%+6rem)] top-[-4rem] flex items-center gap-2">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-on-secondary node-shadow">
                      <span className="material-symbols-outlined text-xl" data-weight="fill">star</span>
                    </div>
                    <span className="bg-surface-container-lowest px-2 py-1 rounded text-xs tracking-[0.05em] font-medium shadow-sm whitespace-nowrap border-l-2 border-secondary" style={{ fontFamily: "JetBrains Mono" }}>Master DSA</span>
                  </div>
                  <div className="absolute left-[calc(100%+6rem)] top-[3rem] flex items-center gap-2">
                    <div className="w-12 h-12 bg-surface-container-lowest border-2 border-primary rounded-full flex items-center justify-center text-primary node-shadow">
                      <span className="material-symbols-outlined text-xl">work</span>
                    </div>
                    <span className="bg-surface-container-lowest px-2 py-1 rounded text-xs tracking-[0.05em] font-medium shadow-sm whitespace-nowrap border-l-2 border-primary" style={{ fontFamily: "JetBrains Mono" }}>TechCorp Intern</span>
                  </div>
                </>
              )}
            </div>

            {/* Path 2: Data Science (Left) */}
            <div onClick={() => setActiveNode("ds")} className={`absolute z-10 left-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group transition-opacity ${activeNode === 'ds' ? '' : 'opacity-70 hover:opacity-100'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center node-shadow transition-transform group-hover:scale-110 ${activeNode === 'ds' ? 'bg-primary ring-4 ring-primary-container ring-opacity-30' : 'bg-surface-container-lowest border-2 border-outline'}`}>
                <span className={`material-symbols-outlined text-3xl ${activeNode === 'ds' ? 'text-on-primary' : 'text-outline'}`}>analytics</span>
              </div>
              <div className={`mt-3 px-3 py-1.5 rounded-lg node-shadow text-center ${activeNode === 'ds' ? 'bg-surface-container-lowest border border-primary-container' : 'bg-surface-container-lowest'}`}>
                <span className={`text-base leading-[1.5] ${activeNode === 'ds' ? 'font-semibold text-primary' : 'text-on-surface-variant'}`} style={{ fontFamily: "Inter" }}>Data Scientist</span>
              </div>
            </div>

            {/* Path 3: Product Manager (Bottom) */}
            <div onClick={() => setActiveNode("pm")} className={`absolute z-10 bottom-[15%] left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group transition-opacity ${activeNode === 'pm' ? '' : 'opacity-70 hover:opacity-100'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center node-shadow transition-transform group-hover:scale-110 ${activeNode === 'pm' ? 'bg-primary ring-4 ring-primary-container ring-opacity-30' : 'bg-surface-container-lowest border-2 border-outline'}`}>
                <span className={`material-symbols-outlined text-3xl ${activeNode === 'pm' ? 'text-on-primary' : 'text-outline'}`}>lightbulb</span>
              </div>
              <div className={`mt-3 px-3 py-1.5 rounded-lg node-shadow text-center ${activeNode === 'pm' ? 'bg-surface-container-lowest border border-primary-container' : 'bg-surface-container-lowest'}`}>
                <span className={`text-base leading-[1.5] ${activeNode === 'pm' ? 'font-semibold text-primary' : 'text-on-surface-variant'}`} style={{ fontFamily: "Inter" }}>Product Mgr</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Detail Panel (Right Sidebar) */}
        <aside className={`hidden lg:flex w-[360px] bg-surface-container-lowest shadow-[-4px_0_15px_rgba(0,0,0,0.05)] border-l border-outline-variant flex-col z-20 transition-transform duration-300 transform h-full ${activeNode ? 'translate-x-0' : 'translate-x-full'}`}>
          {activeNode && (
            <>
              {/* Panel Header */}
              <div className="p-6 border-b border-outline-variant flex justify-between items-start bg-surface-bright">
                <div>
                  <span className="inline-block bg-primary-fixed text-on-primary-fixed text-xs tracking-[0.05em] font-medium px-2 py-1 rounded uppercase tracking-wider mb-2" style={{ fontFamily: "JetBrains Mono" }}>Target Role</span>
                  <h2 className="text-[24px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>{nodeData[activeNode].title}</h2>
                </div>
                <button onClick={() => setActiveNode(null)} className="text-on-surface-variant hover:bg-surface-variant p-1 rounded-full transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                {/* Description */}
                <div>
                  <p className="text-base leading-[1.5] text-on-surface-variant leading-relaxed" style={{ fontFamily: "Inter" }}>
                    {nodeData[activeNode].desc}
                  </p>
                </div>
                
                {/* Required Skills */}
                <div>
                  <h3 className="text-xs tracking-[0.05em] font-medium text-outline uppercase tracking-widest mb-4" style={{ fontFamily: "JetBrains Mono" }}>Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {nodeData[activeNode].skills.map(skill => (
                      <span key={skill} className="bg-surface-variant text-on-surface px-3 py-1.5 rounded-full text-xs tracking-[0.05em] font-medium border border-outline-variant/50" style={{ fontFamily: "JetBrains Mono" }}>{skill}</span>
                    ))}
                  </div>
                </div>
                
                {/* Recommended Resources */}
                <div>
                  <h3 className="text-xs tracking-[0.05em] font-medium text-outline uppercase tracking-widest mb-4" style={{ fontFamily: "JetBrains Mono" }}>Milestones</h3>
                  <div className="flex flex-col gap-3">
                    {/* Completed Milestone */}
                    <div className="bg-surface-container-low p-4 rounded-lg flex gap-3 items-center border-l-4 border-secondary">
                      <div className="w-10 h-10 rounded bg-secondary-fixed flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base leading-[1.5] font-medium text-on-surface line-through decoration-outline-variant text-opacity-70" style={{ fontFamily: "Inter" }}>Fundamentals</h4>
                        <p className="text-xs tracking-[0.05em] font-medium text-secondary" style={{ fontFamily: "JetBrains Mono" }}>Completed • 500 XP</p>
                      </div>
                    </div>
                    
                    {/* Active Milestone */}
                    <div className="bg-surface-container-high p-4 rounded-lg flex gap-3 items-center border-l-4 border-primary">
                      <div className="w-10 h-10 rounded bg-primary-fixed flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">work_history</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base leading-[1.5] font-bold text-on-surface" style={{ fontFamily: "Inter" }}>Build Portfolio Project</h4>
                        <p className="text-xs tracking-[0.05em] font-medium text-primary" style={{ fontFamily: "JetBrains Mono" }}>In Progress • 60%</p>
                      </div>
                      <button className="text-primary hover:bg-primary-fixed p-2 rounded-full transition-colors">
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Panel Footer Actions */}
              <div className="p-6 border-t border-outline-variant bg-surface-container-lowest">
                <button className="w-full group relative overflow-hidden bg-surface-container-low text-primary border border-primary-container py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm">
                  <span className="material-symbols-outlined">magic_button</span>
                  <span className="text-base leading-[1.5] font-semibold" style={{ fontFamily: "Inter" }}>AI Regenerate Path</span>
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
