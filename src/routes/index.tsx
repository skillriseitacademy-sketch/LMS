import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Sparkles, Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlacePro LMS — The new standard in placement prep" },
      {
        name: "description",
        content: "A complete learning platform setting a new standard for efficient placement training.",
      },
    ],
  }),
  component: Landing,
});

const TOTAL_FRAMES = 225;

function Landing() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    const loadFrame = (index: number) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        // Handle the missing frame 221 by cloning 220
        const frameNum = index === 221 ? 220 : index;
        const paddedIndex = frameNum.toString().padStart(3, "0");
        img.src = `/images/frame_${paddedIndex}.png`;
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.warn(`Failed to load frame ${index}`);
          resolve(img); // resolve anyway to not block
        };
      });
    };

    const preload = async () => {
      // Concurrent batches of 10
      const batchSize = 10;
      for (let i = 1; i <= TOTAL_FRAMES; i += batchSize) {
        const batch = [];
        for (let j = i; j < i + batchSize && j <= TOTAL_FRAMES; j++) {
          batch.push(loadFrame(j));
        }
        const results = await Promise.all(batch);
        results.forEach((img, idx) => {
          imgArray[i + idx - 1] = img;
          loadedCount++;
          setProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        });
      }
      imagesRef.current = imgArray;
      setLoaded(true);
      
      // Draw first frame immediately
      setTimeout(() => renderFrame(1), 50);
    };

    preload();
  }, []);

  const renderFrame = (frameIndex: number) => {
    const img = imagesRef.current[frameIndex - 1];
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set actual canvas resolution to match its displayed size for crisp rendering
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Custom object-fit: cover math
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  useGSAP(
    () => {
      if (!loaded) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
        onUpdate: (self) => {
          const currentFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(self.progress * (TOTAL_FRAMES - 1)) + 1));
          renderFrame(currentFrame);
        },
      });
      
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { dependencies: [loaded] }
  );

  return (
    <div className="bg-black font-sans selection:bg-[#6D28D9]/20 selection:text-[#6D28D9]">
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <Loader2 className="h-10 w-10 animate-spin text-[#6D28D9]" />
          <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-[#6D28D9] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-sm font-bold text-slate-500">Loading Experience... {progress}%</p>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 md:px-10 mix-blend-difference text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="text-display text-xl font-extrabold tracking-tight">PlacePro</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-semibold hover:opacity-70 transition-opacity">
            Log In
          </Link>
          <Link to="/signup" className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105 shadow-md">
            Sign up
          </Link>
        </div>
      </header>

      <div ref={containerRef} className="h-[400vh] relative w-full bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 bg-[#F7F9F8] px-4 pb-4 pt-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-200 text-[#0f172a] py-24 px-6 text-center shadow-sm">
          <h2 className="text-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Ready to upgrade your placement prep?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-500">
            PlacePro has solutions for all your placement needs, whether it's mock interviews, ATS
            resume building, or roadmap generation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link
              to="/signup"
              className="rounded-full bg-[#6D28D9] px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 shadow-[0_4px_20px_rgba(109,40,217,0.25)]"
            >
              Book a Demo <ArrowRight className="inline-block h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 text-sm font-medium text-slate-400 md:flex-row md:px-12">
            <span>© {new Date().getFullYear()} PlacePro LMS. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-800 transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-slate-800 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-800 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-shadow {
          0% { box-shadow: 0 0 0 0 rgba(109, 40, 217, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(109, 40, 217, 0); }
          100% { box-shadow: 0 0 0 0 rgba(109, 40, 217, 0); }
        }
        .animate-pulse-shadow {
          animation: pulse-shadow 2s infinite;
        }
      `}} />
    </div>
  );
}
