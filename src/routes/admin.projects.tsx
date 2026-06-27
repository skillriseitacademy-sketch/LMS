import { createFileRoute } from "@tanstack/react-router";
import { FolderGit2, Plus, ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { TopBar } from "@/components/top-bar";
import { useProjects } from "@/lib/auth-store";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({ meta: [{ title: "Projects — PlacePro LMS" }] }),
  component: AdminProjects,
});

function AdminProjects() {
  const { projects, saveProject } = useProjects();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    saveProject({
      title,
      description,
      imageUrl,
      githubUrl,
      liveUrl,
      authorName
    });
    setIsAdding(false);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setGithubUrl("");
    setLiveUrl("");
    setAuthorName("");
  };

  return (
    <>
      <TopBar breadcrumb={["Admin", "Projects"]} />
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-display text-2xl font-bold flex items-center gap-2">
              <FolderGit2 className="h-6 w-6 text-brand" />
              Project Showcase
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage the projects displayed on the public landing page.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90"
          >
            {isAdding ? "Cancel" : <><Plus className="h-3.5 w-3.5" /> Add Project</>}
          </button>
        </header>

        {isAdding && (
          <form onSubmit={handleAdd} className="rounded-3xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-display text-lg font-bold">Add New Project</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Title</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="e.g. Real-time Chat App" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Author Name</label>
                <input required value={authorName} onChange={e => setAuthorName(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="e.g. Sam Adams" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Description</label>
              <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="Short description of the project..." rows={2} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Image URL</label>
              <input required value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">GitHub URL (Optional)</label>
                <input value={githubUrl} onChange={e => setGithubUrl(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="https://github.com/..." />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Live URL (Optional)</label>
                <input value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" placeholder="https://..." />
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button type="submit" className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90">Save Project</button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(p => (
            <div key={p.id} className="rounded-3xl border border-border bg-card overflow-hidden flex flex-col group">
              <div className="aspect-video w-full overflow-hidden bg-muted relative">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground"><FolderGit2 className="h-8 w-8 opacity-20" /></div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-display font-bold text-lg">{p.title}</h3>
                <p className="text-xs text-brand font-medium mt-1">by {p.authorName}</p>
                <p className="mt-3 text-sm text-muted-foreground flex-1">{p.description}</p>
                
                <div className="mt-5 flex gap-2 border-t border-border pt-4">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background hover:opacity-90">
                      <ExternalLink className="h-3 w-3" /> Live Demo
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-muted">
                      <Github className="h-3 w-3" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
