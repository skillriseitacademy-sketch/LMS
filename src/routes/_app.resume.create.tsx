import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FilePlus, UploadCloud, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_app/resume/create")({
  component: ResumeCreate,
});

function ResumeCreate() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-12">
      <div className="text-center mb-12">
        <h1 className="text-display text-4xl font-bold md:text-5xl">
          How would you like to build your resume?
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Create New */}
        <button
          onClick={() => navigate({ to: "/resume/templates" })}
          className="group flex flex-col items-center text-center p-8 md:p-12 rounded-3xl border-2 border-border bg-card transition hover:border-brand hover:shadow-lg cursor-pointer"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-light text-brand-dark mb-6 group-hover:scale-110 transition-transform">
            <FilePlus className="h-10 w-10" />
          </div>
          <h3 className="text-display text-2xl font-bold mb-3">Start with a new resume</h3>
          <p className="text-muted-foreground text-sm">
            We will provide a step-by-step guide to help you build your resume from scratch quickly.
          </p>
        </button>

        {/* Upload Existing */}
        <button
          onClick={() => navigate({ to: "/resume/templates" })}
          className="group flex flex-col items-center text-center p-8 md:p-12 rounded-3xl border-2 border-border bg-card transition hover:border-brand hover:shadow-lg cursor-pointer"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-foreground mb-6 group-hover:scale-110 transition-transform group-hover:bg-brand-light group-hover:text-brand-dark">
            <UploadCloud className="h-10 w-10" />
          </div>
          <h3 className="text-display text-2xl font-bold mb-3">Upload an existing resume</h3>
          <p className="text-muted-foreground text-sm">
            We'll extract your information and reformat it into a professional, modern design.
          </p>
        </button>
      </div>

      <div className="mt-12 flex justify-start">
        <button
          onClick={() => navigate({ to: "/resume" })}
          className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>
    </div>
  );
}
