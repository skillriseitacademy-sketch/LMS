import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/coding_arena_challenge_editor")({
  component: CodingArenaChallengeEditorPage,
});

function CodingArenaChallengeEditorPage() {
  return (
    <>
      <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-lg flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-md">
          <button
            aria-label="Exit Challenge"
            className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md font-bold text-primary">
              PlacePro Arena
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Daily Challenge #402
            </span>
          </div>
        </div>

        <div className="flex items-center gap-xl">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-secondary-container">stars</span>
            <span className="font-label-sm text-label-sm font-bold">500 PTS</span>
          </div>
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-on-surface-variant">timer</span>
            <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">
              45:00
            </span>
          </div>
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-error">warning</span>
            <span className="font-label-sm text-label-sm text-error">Attempts: 1/3</span>
          </div>

          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <img
              alt="User Avatar"
              className="w-full h-full object-cover"
              data-alt="A small, professional headshot avatar of a student looking confident, suitable for a tech platform profile. Clean white background, high-key lighting, modern corporate style."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhq0hjPwltyia2rsBA4w20Uh9gxWhSwjbjnGP3HIXO-uArysfHu2AXCyqJMUFhcAY0JUDG1KvebY20Is7B9xQ4tEaKhbiKXjqZfeAU_0dsnQdamDo_phxqzKHkwMmqconZx-Cg5hOrGm9-kxLbbKOUJ01gjN2FYsY70J12_RSOTmpLbTg0gKzejxNBN1G6BsNoqa6nj8GeyuiHZQ2-8-mf-MLB15C3yd6Oz07_m-tjg0SKVJQVm2LMAA"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 split-pane bg-surface">
        <section
          className="pane w-1/3 min-w-[300px] bg-surface-container-lowest p-lg border-r border-outline-variant flex flex-col gap-lg"
          id="left-pane"
        >
          <div className="flex justify-between items-start">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              Optimize Route Delivery
            </h1>
            <span className="px-2 py-1 bg-tertiary-fixed-dim text-on-tertiary-fixed text-xs font-bold rounded">
              Hard
            </span>
          </div>
          <div className="prose prose-sm text-on-surface-variant flex-1">
            <p>
              You are given a list of <code>n</code> delivery nodes, each represented by coordinates{" "}
              <code>(x, y)</code>. Your task is to find the most efficient route that visits every
              node exactly once and returns to the origin <code>(0,0)</code>.
            </p>
            <p>
              The efficiency of a route is determined by the total Euclidean distance traveled. You
              need to return the minimum possible distance.
            </p>
            <h3 className="font-headline-md text-headline-md mt-md text-on-surface">
              Constraints:
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <code>1 &lt;= n &lt;= 12</code>
              </li>
              <li>
                <code>-100 &lt;= x, y &lt;= 100</code>
              </li>
            </ul>
            <h3 className="font-headline-md text-headline-md mt-md text-on-surface">Example 1:</h3>
            <div className="bg-surface-container p-md rounded-lg font-label-sm text-label-sm code-font">
              <strong>Input:</strong> nodes = [[1,1], [2,2]]
              <br />
              <strong>Output:</strong> 4.8284
              <br />
              <strong>Explanation:</strong> Origin (0,0) -&gt; (1,1) -&gt; (2,2) -&gt; (0,0).
            </div>
          </div>

          <div className="mt-auto pt-md border-t border-outline-variant">
            <details className="group">
              <summary className="flex items-center cursor-pointer font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors">
                <span className="material-symbols-outlined mr-sm transition-transform group-open:rotate-90">
                  chevron_right
                </span>
                Show Hint 1
              </summary>
              <div className="mt-sm p-sm bg-surface-container-low rounded border border-outline-variant text-sm text-on-surface-variant">
                Consider using Dynamic Programming with Bitmasking given the small constraint on
                `n`.
              </div>
            </details>
          </div>
        </section>

        <div className="resizer" id="resizer"></div>

        <section
          className="pane flex-1 flex flex-col bg-inverse-surface text-on-tertiary"
          id="right-pane"
        >
          <div className="h-12 bg-on-background flex items-center justify-between px-md border-b border-outline">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-outline-variant">code</span>
              <select className="bg-inverse-surface text-on-tertiary border border-outline rounded px-2 py-1 font-label-sm text-label-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option>Python 3</option>
                <option>Java</option>
                <option>C++</option>
                <option>JavaScript</option>
              </select>
            </div>
            <div className="flex items-center gap-sm">
              <button
                className="p-1 rounded hover:bg-surface-variant hover:text-on-surface-variant text-outline-variant transition-colors"
                title="Reset Code"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>
              <button
                className="p-1 rounded hover:bg-surface-variant hover:text-on-surface-variant text-outline-variant transition-colors"
                title="Editor Settings"
              >
                <span className="material-symbols-outlined text-sm">settings</span>
              </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-auto p-md font-label-sm text-label-sm code-font leading-relaxed">
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-on-background border-r border-outline text-outline text-right pr-2 pt-md select-none">
              1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />
              10
              <br />
              11
              <br />
              12
            </div>

            <div className="pl-12 pt-0">
              <pre>
                <code className="language-python">
                  <span className="text-secondary-fixed">class</span> Solution:
                  <span className="text-secondary-fixed">def</span>{" "}
                  <span className="text-primary-fixed-dim">optimizeRoute</span>(
                  <span className="text-secondary-fixed">self</span>, nodes: List[List[int]]) -&gt;
                  float:
                  <span className="text-outline"># Write your code here</span>
                  <span className="text-outline"># Return the minimum distance</span>
                  <span className="text-secondary-fixed">pass</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="border-t border-outline bg-on-background flex flex-col">
            <div className="p-sm flex justify-between items-center border-b border-outline">
              <button className="flex items-center gap-xs px-3 py-1.5 text-on-tertiary hover:bg-surface-variant hover:text-on-surface-variant rounded transition-colors font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">terminal</span>
                Console
              </button>
              <div className="flex gap-md">
                <button className="px-4 py-2 bg-surface-container-low text-on-surface rounded font-label-sm text-label-sm font-bold hover:bg-surface-variant transition-colors flex items-center gap-xs">
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  Run Code
                </button>
                <button className="px-4 py-2 bg-primary text-on-primary rounded font-label-sm text-label-sm font-bold hover:bg-primary-container hover:scale-105 transition-all shadow-md flex items-center gap-xs">
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  Submit
                </button>
              </div>
            </div>

            <div className="h-32 bg-inverse-surface p-sm overflow-y-auto hidden">
              <div className="font-label-sm text-label-sm text-outline-variant code-font">
                &gt; Ready...
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
