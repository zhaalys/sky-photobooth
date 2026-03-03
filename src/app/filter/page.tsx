"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";

const FILTERS = [
  {
    id: "ORIGINAL",
    title: "ORIGINAL",
    description: "No filter applied",
    previewClass: "",
    color: "bg-white text-black",
  },
  {
    id: "VINTAGE",
    title: "VINTAGE '98",
    description: "Warm tones and soft contrast",
    previewClass: "sepia-[.4] contrast-125 brightness-90",
    color: "bg-[#e2a85c] text-white",
  },
  {
    id: "NOIR",
    title: "FILM NOIR",
    description: "Classic high contrast B&W",
    previewClass: "grayscale contrast-150",
    color: "bg-slate-800 text-white",
  },
  {
    id: "CYBER",
    title: "CYBER GLOW",
    description: "Neon pink & blue accents",
    previewClass: "saturate-200 hue-rotate-15 contrast-125",
    color: "bg-pink-500 text-white",
  },
  {
    id: "POLAROID",
    title: "POLAROID",
    description: "Faded blacks and high exposure",
    previewClass: "brightness-110 contrast-90 sepia-[.2]",
    color: "bg-orange-100 text-black",
  },
];

export default function FilterPage() {
  const [activeFilterId, setActiveFilterId] = useState("VINTAGE");
  const router = useRouter();
  const activeFilter =
    FILTERS.find((f) => f.id === activeFilterId) || FILTERS[0];

  const handleNext = () => {
    sessionStorage.setItem("skybooth_selected_filter", activeFilterId);
    router.push("/frames");
  };

  return (
    <div className="flex flex-col h-screen bg-background-light font-display overflow-hidden">
      {/* ── HEADER ── */}
      <header className="h-14 md:h-20 border-b-4 border-[#181511] px-4 md:px-12 flex items-center justify-between bg-primary shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="size-9 md:size-12 bg-white retro-border rounded-full flex items-center justify-center hover:-translate-x-1 transition-transform group shadow-[4px_4px_0_#181511]"
          >
            <span className="material-symbols-outlined font-black group-hover:text-primary transition-colors text-[18px] md:text-[24px]">
              home
            </span>
          </Link>
          <div className="flex flex-col">
            <span className="font-bold text-[10px] md:text-sm tracking-widest uppercase">
              Step 1 of 3
            </span>
            <h1 className="text-xl md:text-3xl font-impact tracking-widest italic -mt-0.5 drop-shadow-[2px_2px_0_#fff] flex items-center gap-2">
              SELECT FILTER
              <Image
                src="/gambar-camera.png"
                alt="Camera"
                width={20}
                height={20}
                className="animate-bounce drop-shadow-[2px_2px_0_#181511] hidden sm:block"
              />
            </h1>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-4 w-24 bg-white border-2 border-[#181511] shadow-[2px_2px_0_#181511]"></div>
          <div className="h-4 w-24 bg-transparent border-2 border-dashed border-[#181511]"></div>
          <div className="h-4 w-24 bg-transparent border-2 border-dashed border-[#181511]"></div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative pixel-bg min-h-0">
        {/* Live Preview — compact height on mobile */}
        <div className="shrink-0 md:flex-1 flex flex-col items-center justify-center p-2 md:p-8 relative border-b-4 md:border-b-0 md:border-r-4 border-[#181511]">
          <div className="absolute inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(#181511_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="hidden md:block absolute top-6 right-6 z-20 pointer-events-none">
            <Image
              src="/logofilter.png"
              alt="Filter Logo"
              width={160}
              height={64}
              className="drop-shadow-[4px_4px_0_#181511] object-contain"
            />
          </div>

          {/* Webcam — aspect ratio limited on mobile */}
          <div className="w-full max-w-xs md:max-w-3xl aspect-[4/3] md:aspect-video bg-zinc-900 border-4 md:border-8 border-[#181511] overflow-hidden relative shadow-[6px_6px_0_rgba(0,0,0,0.8)] md:shadow-[12px_12px_0_rgba(0,0,0,0.8)] rounded-xl z-10">
            <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 text-white font-impact tracking-widest bg-black/50 px-2 py-0.5 border border-white/10 text-[9px] md:text-xs">
              <span className="size-2 bg-red-500 rounded-full animate-pulse border border-black"></span>
              LIVE
            </div>
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              mirrored={true}
              className={`w-full h-full object-cover transition-all duration-500 ${activeFilter.previewClass}`}
              videoConstraints={{ facingMode: "user" }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background:
                  "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                backgroundSize: "100% 2px, 3px 100%",
              }}
            ></div>
          </div>
        </div>

        {/* ── RIGHT: Filter Selection ── */}
        <div className="flex-1 bg-secondary flex flex-col md:w-[380px] md:shrink-0 overflow-hidden relative z-20 min-h-0">
          {/* Filter title bar */}
          <div className="px-4 py-2 md:p-6 bg-[#1f6d99] border-b-4 border-[#181511] shrink-0">
            <h2 className="text-white font-impact tracking-widest text-lg md:text-2xl drop-shadow-[2px_2px_0_#181511]">
              COLOR GRADING
            </h2>
            <p className="text-white/80 font-bold text-xs tracking-wider uppercase mt-0.5 hidden md:block">
              Pick your vibe for the session.
            </p>
          </div>

          {/* Filter list — scrollable */}
          <div className="flex-1 overflow-y-auto p-2 md:p-5 flex flex-col gap-2 min-h-0">
            {FILTERS.map((filter, idx) => (
              <div
                key={filter.id}
                onClick={() => setActiveFilterId(filter.id)}
                className={`w-full px-3 py-2 md:p-4 rounded-xl border-4 ${
                  activeFilterId === filter.id
                    ? "border-primary shadow-[4px_4px_0_#ffcc00] scale-[1.01]"
                    : "border-[#181511] shadow-[4px_4px_0_#181511] hover:translate-y-0.5 hover:shadow-[2px_2px_0_#181511]"
                }
                  ${filter.color} cursor-pointer transition-all flex items-center gap-3 relative overflow-hidden group`}
              >
                <span className="text-2xl md:text-4xl opacity-10 font-impact italic absolute right-3 top-1/2 -translate-y-1/2">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-impact tracking-widest text-base md:text-2xl uppercase drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
                    {filter.title}
                  </h3>
                  <p className="font-bold text-xs opacity-80 hidden md:block">
                    {filter.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Next button sticky */}
          <div className="p-3 md:p-6 shrink-0 bg-secondary border-t-4 border-[#181511] shadow-[0_-4px_0_#181511]">
            <button
              onClick={handleNext}
              className="w-full py-3 md:py-4 bg-accent retro-border rounded-xl flex items-center justify-center gap-2 text-[#181511] group hover:scale-[1.02] transition-transform"
            >
              <span className="font-impact text-lg md:text-2xl tracking-widest uppercase italic">
                NEXT: FRAME
              </span>
              <span className="material-symbols-outlined font-black text-xl md:text-3xl group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
