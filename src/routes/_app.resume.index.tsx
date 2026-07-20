import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/resume/")({
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="flex-1 flex flex-col w-full max-w-container-max mx-auto relative bg-surface-bright pattern-bg">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full h-16 px-4 md:px-8 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h1 className="text-[24px] font-semibold leading-[1.3] font-bold text-on-background" style={{ fontFamily: "Manrope" }}>Choose your resume template</h1>
        </div>
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-full text-base leading-[1.5] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all placeholder:text-outline/70 shadow-sm outline-none" style={{ fontFamily: "Inter" }} placeholder="Search templates..." type="text" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/20 text-secondary-fixed-dim hover:bg-secondary-container/30 transition-colors">
              <span className="material-symbols-outlined text-[18px]" data-weight="fill">local_fire_department</span>
              <span className="text-xs tracking-[0.05em] font-bold" style={{ fontFamily: "JetBrains Mono" }}>1,250 XP</span>
            </button>
            <button className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-base leading-[1.5] text-[14px] font-medium hover:bg-primary-fixed-dim transition-colors shadow-sm active:scale-95" style={{ fontFamily: "Inter" }}>
              Upgrade Pro
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-xs tracking-[0.05em] font-medium text-outline mr-2 uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>Filters:</span>
          <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-base leading-[1.5] text-[14px] font-medium border border-primary/20 hover:bg-primary/20 transition-colors shadow-sm" style={{ fontFamily: "Inter" }}>
            All
          </button>
          <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant text-base leading-[1.5] text-[14px] border border-outline-variant/50 hover:bg-surface-container transition-colors shadow-sm" style={{ fontFamily: "Inter" }}>
            ATS-Friendly
          </button>
          <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant text-base leading-[1.5] text-[14px] border border-outline-variant/50 hover:bg-surface-container transition-colors shadow-sm" style={{ fontFamily: "Inter" }}>
            Single Page
          </button>
          <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant text-base leading-[1.5] text-[14px] border border-outline-variant/50 hover:bg-surface-container transition-colors shadow-sm" style={{ fontFamily: "Inter" }}>
            Two Column
          </button>
          <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant text-base leading-[1.5] text-[14px] border border-outline-variant/50 hover:bg-surface-container transition-colors shadow-sm ml-auto flex items-center gap-2" style={{ fontFamily: "Inter" }}>
            <span className="material-symbols-outlined text-[18px]">tune</span>
            More Filters
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Template 1: Active */}
          <div className="group template-card relative flex flex-col bg-surface-container-lowest rounded-xl border-2 border-primary shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3 py-1 bg-primary text-on-primary text-xs tracking-[0.05em] font-medium rounded-full shadow-sm flex items-center gap-1" style={{ fontFamily: "JetBrains Mono" }}>
                <span className="material-symbols-outlined text-[14px]" data-weight="fill">check_circle</span>
                Active
              </span>
            </div>
            <div className="relative w-full aspect-[1/1.4] bg-surface-variant p-4">
              <div className="w-full h-full bg-cover bg-center rounded bg-surface-container-lowest shadow-sm border border-outline-variant/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASkMfGN9c5h3cqvR-Xg3DXrdN-EPQVd0nGcSI4wAYjHKrqUQ8ipmD9lyU-gcJkqJYZQ1UxwE75fxTRg8phSTdTMBGmdTSmJh5Fy7PP6EbAP0y9MtoFuZxjSsZ4xKtkIB8e6QLOrnE9keGm8hgyUumHNEPcTIUSGaJEjL_5j4KwUX8aabWAHFxi2Rj-isqBWKZ739G-CW5LAMIzmGknzXhbcEvcmU8MBN0Xk-DWqIbs__URqynhx-aYAA')" }}></div>
              <div className="template-overlay absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20 group-hover:opacity-100">
                <button className="w-3/4 py-2 bg-primary text-on-primary text-base leading-[1.5] font-medium rounded-lg shadow-md hover:bg-primary-fixed-dim transition-colors transform hover:scale-105" style={{ fontFamily: "Inter" }}>
                  Use This Template
                </button>
                <button className="w-3/4 py-2 bg-surface-container-lowest text-on-surface text-base leading-[1.5] font-medium rounded-lg shadow-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2" style={{ fontFamily: "Inter" }}>
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Preview Full
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest z-10">
              <h3 className="text-[18px] font-semibold leading-[1.3] text-on-surface mb-1" style={{ fontFamily: "Manrope" }}>The Minimalist</h3>
              <p className="text-base leading-[1.5] text-[14px] text-on-surface-variant" style={{ fontFamily: "Inter" }}>Clean, text-heavy. Perfect for ATS parsing.</p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs tracking-[0.05em] font-medium text-[10px] rounded uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>ATS</span>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs tracking-[0.05em] font-medium text-[10px] rounded uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>1 Col</span>
              </div>
            </div>
          </div>

          {/* Template 2 */}
          <div className="group template-card relative flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-outline-variant">
            <div className="relative w-full aspect-[1/1.4] bg-surface-variant p-4">
              <div className="w-full h-full bg-cover bg-center rounded bg-surface-container-lowest shadow-sm border border-outline-variant/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDAy6EwYHxws8ZGrgAcEP1z1a0HxT8lsgbrOEktOpu5dPzXHwcSdg6xZCx-tqnvM0_PhjB5P-54tAEmg-zynS79LC6GEe9xXOac39Zb6IOJjNYNfCz5zYaHJUC6GcTrUbEYH5EOid8fqQePa243fgL9gYVlC0oXWausPSR5RG88EqR8MB-sXPPSoxbyl7uy8FHiXAxY1bRegnn9Elu4D8yn4XtRqJ6eH3jzA0NqZdkraNGDj6uj1ZV7A')" }}></div>
              <div className="template-overlay absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20 group-hover:opacity-100">
                <button className="w-3/4 py-2 bg-primary text-on-primary text-base leading-[1.5] font-medium rounded-lg shadow-md hover:bg-primary-fixed-dim transition-colors transform hover:scale-105" style={{ fontFamily: "Inter" }}>
                  Use This Template
                </button>
                <button className="w-3/4 py-2 bg-surface-container-lowest text-on-surface text-base leading-[1.5] font-medium rounded-lg shadow-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2" style={{ fontFamily: "Inter" }}>
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Preview Full
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest z-10">
              <h3 className="text-[18px] font-semibold leading-[1.3] text-on-surface mb-1" style={{ fontFamily: "Manrope" }}>The Modernist</h3>
              <p className="text-base leading-[1.5] text-[14px] text-on-surface-variant" style={{ fontFamily: "Inter" }}>Sleek, single column layout for tech roles.</p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs tracking-[0.05em] font-medium text-[10px] rounded uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>ATS</span>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs tracking-[0.05em] font-medium text-[10px] rounded uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>Modern</span>
              </div>
            </div>
          </div>

          {/* Template 3 */}
          <div className="group template-card relative flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-outline-variant">
            <div className="relative w-full aspect-[1/1.4] bg-surface-variant p-4">
              <div className="w-full h-full bg-cover bg-center rounded bg-surface-container-lowest shadow-sm border border-outline-variant/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEq5IKiBg-c1XyOh6sJphJ6eHQLUMkzZhIcqGtkIlmFQfetrHXHtrKqMcDfMlgJ8DtxV5dZWFpcbb4z_FYuxgQWmh22EkmSUkuIjKxjvmibS81KbCeOmn5D6s2yEBW0yGEwq41N-pDDkS9S5_JdNMSWw3GIOyrMKaGflpVLAKLZl10VElHgVi3AkvvNmW9UVr13MypuHRbDYW192gJQv9ylzXHboUQI7QFj0bJkOwZ8-ukuHfgr9dZ-Q')" }}></div>
              <div className="template-overlay absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20 group-hover:opacity-100">
                <button className="w-3/4 py-2 bg-primary text-on-primary text-base leading-[1.5] font-medium rounded-lg shadow-md hover:bg-primary-fixed-dim transition-colors transform hover:scale-105" style={{ fontFamily: "Inter" }}>
                  Use This Template
                </button>
                <button className="w-3/4 py-2 bg-surface-container-lowest text-on-surface text-base leading-[1.5] font-medium rounded-lg shadow-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2" style={{ fontFamily: "Inter" }}>
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Preview Full
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest z-10">
              <h3 className="text-[18px] font-semibold leading-[1.3] text-on-surface mb-1" style={{ fontFamily: "Manrope" }}>The Executive</h3>
              <p className="text-base leading-[1.5] text-[14px] text-on-surface-variant" style={{ fontFamily: "Inter" }}>Bold headers, strong hierarchy.</p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs tracking-[0.05em] font-medium text-[10px] rounded uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>Classic</span>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs tracking-[0.05em] font-medium text-[10px] rounded uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>Multi-page</span>
              </div>
            </div>
          </div>

          {/* Template 4 */}
          <div className="group template-card relative flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-outline-variant">
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-1 bg-secondary-container/80 text-on-secondary-container text-xs tracking-[0.05em] font-medium text-[10px] rounded-full shadow-sm uppercase tracking-wider font-bold backdrop-blur-sm" style={{ fontFamily: "JetBrains Mono" }}>
                New
              </span>
            </div>
            <div className="relative w-full aspect-[1/1.4] bg-surface-variant p-4">
              <div className="w-full h-full bg-cover bg-center rounded bg-surface-container-lowest shadow-sm border border-outline-variant/20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyHgJgEx5SctxRIjbahcq2dCfiyYytJwX6F1WhXYLlpHRyb1adKBdSFDpagQyiruODuszTzphRTuxo2x-55Ovyg6du9cq34ChsRSnbOSrdshVk9K34aMY5ME7d0ReFlLE2OhjPAuHnO7VoyqcC-b_CJMxpOch8u3dBu6de2s1cnm1UQQRFQrnTCaeSRUONYVJpW7BpHiRg00dDl0EtL0VT2ATvgNKY4b_WHdfLxq9sU6CZqh7Iw7z38A')" }}></div>
              <div className="template-overlay absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20 group-hover:opacity-100">
                <button className="w-3/4 py-2 bg-primary text-on-primary text-base leading-[1.5] font-medium rounded-lg shadow-md hover:bg-primary-fixed-dim transition-colors transform hover:scale-105" style={{ fontFamily: "Inter" }}>
                  Use This Template
                </button>
                <button className="w-3/4 py-2 bg-surface-container-lowest text-on-surface text-base leading-[1.5] font-medium rounded-lg shadow-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2" style={{ fontFamily: "Inter" }}>
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Preview Full
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest z-10">
              <h3 className="text-[18px] font-semibold leading-[1.3] text-on-surface mb-1" style={{ fontFamily: "Manrope" }}>The Creative</h3>
              <p className="text-base leading-[1.5] text-[14px] text-on-surface-variant" style={{ fontFamily: "Inter" }}>Subtle sidebar column for skills & contact.</p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs tracking-[0.05em] font-medium text-[10px] rounded uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>2 Col</span>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-xs tracking-[0.05em] font-medium text-[10px] rounded uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>Design</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pb-8 text-center">
          <p className="text-on-surface-variant text-base leading-[1.5]" style={{ fontFamily: "Inter" }}>Don't see what you need? <a className="text-primary font-semibold hover:underline" href="#">Request a new template</a>.</p>
        </div>
      </main>
    </div>
  );
}
