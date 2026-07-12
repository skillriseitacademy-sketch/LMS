import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/resume/templates")({
  component: ResumeTemplates,
});

const templates = [
  { id: "modern", name: "Modern Professional", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80", tag: "Recommended" },
  { id: "classic", name: "Classic Corporate", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80", tag: "" },
  { id: "creative", name: "Creative Designer", img: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=400&q=80", tag: "" },
  { id: "minimal", name: "Minimalist Clean", img: "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=400&q=80", tag: "" },
  { id: "executive", name: "Executive Leadership", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80", tag: "" },
  { id: "tech", name: "Tech Startup", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80", tag: "" },
];

function ResumeTemplates() {
  const navigate = useNavigate();
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-display text-3xl font-bold md:text-4xl mb-6">
          Templates we recommend for you
        </h1>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition">
            Headshot <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition">
            Columns <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition">
            Colors <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {templates.map((tpl) => (
          <div 
            key={tpl.id}
            className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition"
            onMouseEnter={() => setActiveTemplate(tpl.id)}
            onMouseLeave={() => setActiveTemplate(null)}
          >
            <div className="aspect-[1/1.4] w-full bg-muted relative">
              {tpl.tag && (
                <div className="absolute top-3 right-3 z-10 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground shadow-sm">
                  {tpl.tag}
                </div>
              )}
              {/* Using Unsplash placeholder images styled to look like documents */}
              <img 
                src={tpl.img} 
                alt={tpl.name}
                className="h-full w-full object-cover opacity-80"
              />
              
              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${activeTemplate === tpl.id ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-xl font-bold mb-4 text-center">{tpl.name}</h3>
                <button className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground hover:opacity-90 transition w-full max-w-[200px]">
                  Choose template
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <h3 className="font-semibold text-center">{tpl.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => navigate({ to: "/resume/create" })}
          className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>
    </div>
  );
}
