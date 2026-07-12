import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, LayoutTemplate, PenTool, Type, FileText, Download } from "lucide-react";

export const Route = createFileRoute("/_app/resume/")({
  component: ResumeLanding,
});

const features = [
  {
    title: "Easy to use",
    description: "Our builder guides you step-by-step. No formatting headaches, just fill in your details.",
    icon: CheckCircle2,
  },
  {
    title: "Professional templates",
    description: "Choose from dozens of recruiter-approved templates tailored to your industry.",
    icon: LayoutTemplate,
  },
  {
    title: "Pre-written phrases",
    description: "Stuck on what to say? Browse our library of expert-written phrases for your role.",
    icon: PenTool,
  },
  {
    title: "Auto-summary",
    description: "Generate a professional summary instantly based on your experience and skills.",
    icon: FileText,
  },
  {
    title: "Built-in spelling check",
    description: "Never worry about typos. Our real-time spell checker keeps your resume flawless.",
    icon: Type,
  },
  {
    title: "Unlimited downloads",
    description: "Export to PDF or Word as many times as you want, completely free.",
    icon: Download,
  },
];

function ResumeLanding() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-5xl p-6 md:p-12">
      <div className="text-center mb-12">
        <h1 className="text-display text-4xl font-bold md:text-5xl">
          6 features to boost your job search
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          More than a resume builder. We provide everything you need to create a stunning, professional resume that gets you hired.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-3xl border border-border bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-dark mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-display text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={() => navigate({ to: "/resume/create" })}
          className="rounded-full bg-brand px-8 py-4 text-lg font-bold text-brand-foreground hover:opacity-90 transition shadow-lg"
        >
          Build my resume
        </button>
      </div>
    </div>
  );
}
