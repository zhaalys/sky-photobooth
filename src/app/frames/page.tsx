"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function FramesPage() {
  const router = useRouter();

  const categories = [
    "All Frames",
    "Basic Colors",
    "Patterns",
    "Pop Culture",
    "Gamer",
    "Anime",
  ];

  const frames = [
    {
      id: 1,
      title: "Pure White",
      category: "Basic Colors",
      src: "/asset-photobooth/ph-basic-white.webp",
    },
    {
      id: 2,
      title: "Midnight Black",
      category: "Basic Colors",
      src: "/asset-photobooth/ph-basic-black.webp",
    },
    {
      id: 3,
      title: "Sky Blue",
      category: "Basic Colors",
      src: "/asset-photobooth/ph-basic-blue.webp",
    },
    {
      id: 4,
      title: "Bubblegum Pink",
      category: "Basic Colors",
      src: "/asset-photobooth/ph-basic-pink.webp",
    },
    {
      id: 5,
      title: "Sunshine Yellow",
      category: "Basic Colors",
      src: "/asset-photobooth/ph-basic-yellow.webp",
    },
    {
      id: 6,
      title: "Retro Checker",
      category: "Patterns",
      src: "/asset-photobooth/ph-pattern-checker.webp",
    },
    {
      id: 7,
      title: "Sunset Gradient",
      category: "Patterns",
      src: "/asset-photobooth/ph-pattern-gradient.webp",
    },
    {
      id: 8,
      title: "Polka Dots",
      category: "Patterns",
      src: "/asset-photobooth/ph-pattern-dots.webp",
    },
    {
      id: 9,
      title: "Super Mario",
      category: "Gamer",
      src: "/asset-photobooth/ph-mario.webp",
    },
    {
      id: 10,
      title: "Mario Space",
      category: "Gamer",
      src: "/asset-photobooth/ph-mariospace.webp",
    },
    {
      id: 11,
      title: "One Piece",
      category: "Anime",
      src: "/asset-photobooth/ph-onepiece.webp",
    },
    {
      id: 12,
      title: "Pokemon",
      category: "Gamer",
      src: "/asset-photobooth/ph-pokemon.webp",
    },
    {
      id: 13,
      title: "Spider-Man",
      category: "Pop Culture",
      src: "/asset-photobooth/ph-spiderman.webp",
    },
  ];

  const [selectedFrame, setSelectedFrame] = useState(frames[0]);
  const [activeCategory, setActiveCategory] = useState("All Frames");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (selectedFrame.title === "One Piece") {
      audioRef.current = new window.Audio(
        "/asset-lagu/Memories - Maki Otsuki _ One Piece Ending Song 1 _ Lirik + Terjemahan Indonesia.mp4",
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    } else if (selectedFrame.title === "Spider-Man") {
      audioRef.current = new window.Audio(
        "/asset-lagu/videoplayback-spiderman.mp4",
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [selectedFrame]);

  const handleUseFrame = () => {
    sessionStorage.setItem("skybooth_selected_frame", selectedFrame.src);
    router.push("/camera");
  };

  const filteredFrames =
    activeCategory === "All Frames"
      ? frames
      : frames.filter((f) => f.category === activeCategory);

  return (
    <div className="flex flex-col h-screen bg-secondary pixel-pattern font-display overflow-hidden">
      {/* ── HEADER ── */}
      <header className="h-14 md:h-20 border-b-4 border-[#181511] px-4 md:px-12 flex items-center justify-between bg-accent shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/filter"
            className="size-9 md:size-12 bg-white retro-border rounded-full flex items-center justify-center hover:-translate-x-1 transition-transform group shadow-[4px_4px_0_#181511]"
          >
            <span className="material-symbols-outlined font-black group-hover:text-primary transition-colors text-[20px]">
              arrow_back
            </span>
          </Link>
          <div className="flex flex-col text-[#181511]">
            <span className="font-bold text-[10px] md:text-sm tracking-widest uppercase">
              Step 2 of 3
            </span>
            <h1 className="text-xl md:text-3xl font-impact tracking-widest italic -mt-0.5 drop-shadow-[2px_2px_0_#fff]">
              PICK FRAME
            </h1>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="h-4 w-24 bg-primary border-2 border-[#181511] shadow-[2px_2px_0_#181511]"></div>
          <div className="h-4 w-24 bg-white border-2 border-[#181511] shadow-[2px_2px_0_#181511]"></div>
          <div className="h-4 w-24 bg-transparent border-2 border-dashed border-[#181511]"></div>
        </div>
      </header>

      {/* ── MAIN: flex-col on mobile, flex-row on lg ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* ── LEFT / TOP: Compact Frame Preview ── */}
        <div className="shrink-0 lg:flex-1 flex flex-col items-center justify-center relative bg-secondary p-3 md:p-6 lg:p-8">
          {/* Angled background (hidden on small mobile, shown md+) */}
          <div className="absolute inset-4 md:inset-6 rounded-[1.5rem] border-[6px] border-[#181511] shadow-[6px_6px_0_#181511] bg-primary overflow-hidden -rotate-2 z-0 pointer-events-none">
            {selectedFrame.title === "One Piece" && (
              <video
                src="/asset-lagu/Memories - Maki Otsuki _ One Piece Ending Song 1 _ Lirik + Terjemahan Indonesia.mp4"
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-md scale-[1.05]"
                autoPlay
                loop
                muted
                playsInline
              />
            )}
            {selectedFrame.title === "Spider-Man" && (
              <video
                src="/asset-lagu/videoplayback-spiderman.mp4"
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-md scale-[1.05]"
                autoPlay
                loop
                muted
                playsInline
              />
            )}
            {(selectedFrame.title === "One Piece" ||
              selectedFrame.title === "Spider-Man") && (
              <div className="absolute inset-0 bg-black/50 z-0 mix-blend-multiply"></div>
            )}
          </div>

          {/* Frame card — compact on mobile */}
          <div className="relative z-10 flex flex-row lg:flex-col items-center gap-3 md:gap-4 w-full max-w-sm lg:max-w-[340px]">
            {/* Frame image preview — small on mobile */}
            <div
              className="shrink-0 w-24 h-32 md:w-40 md:h-52 lg:w-full lg:h-auto lg:aspect-[3/4] bg-cover bg-center border-[4px] md:border-[6px] border-[#181511] shadow-[4px_4px_0_rgba(0,0,0,0.6)] rounded-lg"
              style={{ backgroundImage: `url('${selectedFrame.src}')` }}
            />

            {/* Info + button */}
            <div className="flex flex-col flex-1 lg:w-full">
              <span className="bg-accent retro-border px-2 md:px-4 py-0.5 md:py-1 font-bold text-[10px] md:text-sm uppercase rounded-full self-start mb-1">
                {selectedFrame.category}
              </span>
              <h2 className="font-impact text-lg md:text-3xl tracking-widest italic uppercase drop-shadow-sm leading-tight">
                {selectedFrame.title}
              </h2>
              <span className="text-xs text-slate-500 font-mono mb-2">
                {selectedFrame.id}/{frames.length}
              </span>

              <button
                onClick={handleUseFrame}
                className="w-full bg-[#fde047] border-[4px] border-[#181511] py-2 md:py-3 rounded-xl flex items-center justify-center gap-2 group hover:bg-white transition-all cursor-pointer shadow-[4px_4px_0_#181511] active:translate-y-1 active:shadow-none"
              >
                <span className="material-symbols-outlined font-black text-lg md:text-2xl">
                  check_circle
                </span>
                <span className="font-impact text-sm md:text-xl tracking-widest italic uppercase">
                  USE THIS FRAME
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT / BOTTOM: Grid Selector ── */}
        <div className="flex-1 lg:w-[45%] flex flex-col bg-white border-t-4 lg:border-t-0 lg:border-l-4 border-[#181511] overflow-hidden min-h-0">
          {/* Category tabs */}
          <div className="bg-background-light border-b-4 border-[#181511] px-3 py-2 md:p-4 shrink-0">
            <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 md:px-5 py-1 md:py-2 retro-border rounded-full text-xs md:text-sm font-bold shrink-0 whitespace-nowrap transition-transform hover:-translate-y-0.5 active:translate-y-0
                    ${
                      activeCategory === cat
                        ? "bg-primary text-[#181511] shadow-[3px_3px_0_#181511]"
                        : "bg-white text-slate-600 shadow-[2px_2px_0_#181511]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Frame grid — scrollable */}
          <div className="flex-1 overflow-y-auto p-3 md:p-5 bg-slate-50/50 min-h-0">
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3">
              {filteredFrames.map((frame, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedFrame(frame)}
                  className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer relative transition-all duration-200 group
                    ${
                      selectedFrame.id === frame.id
                        ? "ring-[3px] ring-primary ring-offset-2 ring-offset-slate-50 scale-[1.03]"
                        : "border-2 md:border-4 border-[#181511] shadow-[3px_3px_0_#181511] hover:-translate-y-1 hover:shadow-[4px_4px_0_#181511]"
                    }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${frame.src}')` }}
                  />

                  {/* Hover label */}
                  <div className="absolute inset-0 bg-black/60 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity p-1.5">
                    <span className="font-impact text-xs text-white tracking-widest leading-tight text-center drop-shadow-md">
                      {frame.title}
                    </span>
                  </div>

                  {/* Check badge */}
                  {selectedFrame.id === frame.id && (
                    <div className="absolute top-1.5 right-1.5 bg-primary retro-border rounded-full size-5 flex items-center justify-center z-10 shadow-[2px_2px_0_#181511]">
                      <span className="material-symbols-outlined text-[11px] font-black text-[#181511]">
                        check
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
