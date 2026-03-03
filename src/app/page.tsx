"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden animate-[fadeIn_0.5s_ease-out]">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b-4 border-solid border-[#181511] px-6 md:px-20 py-4 bg-accent relative z-50">
          <Link
            href="/"
            className="flex items-center hover:scale-[1.02] transition-transform"
          >
            <Image
              src="/gambar-logo-sky.png"
              alt="SKYBOOTH Logo"
              width={160}
              height={60}
              className="h-12 md:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="flex flex-1 justify-end gap-8">
            <nav className="hidden md:flex items-center gap-9">
              <Link
                className="text-[#181511] text-sm font-bold uppercase tracking-tighter hover:underline"
                href="/about"
              >
                About
              </Link>
              <Link
                className="text-[#181511] text-sm font-bold uppercase tracking-tighter hover:underline"
                href="/privacy"
              >
                Privacy
              </Link>
              <a
                className="group ml-2 flex cursor-pointer items-center gap-2 rounded-xl border-[3px] border-[#181511] bg-[#e79212] pl-2 pr-4 py-1.5 shadow-[3px_3px_0_#181511] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#181511] active:translate-y-1 active:shadow-[0_0_0_#181511]"
                href="https://saweria.co/fsalmz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex size-7 items-center justify-center rounded-full border-[2px] border-[#fde047] bg-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
                  <Image
                    src="/saweria/saweria.webp"
                    alt="Saweria"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-[9px] font-bold uppercase leading-none tracking-wider text-black/70 mb-0.5">
                    Support On
                  </span>
                  <span className="font-display text-[15px] font-black leading-none tracking-wide text-black drop-shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)]">
                    Saweria
                  </span>
                </div>
              </a>
            </nav>

            {/* Hamburger Button (mobile only) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-xl border-[3px] border-[#181511] bg-white shadow-[3px_3px_0_#181511] active:translate-y-1 active:shadow-none transition-all"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-[#181511] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-[#181511] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-[#181511] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
              />
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden absolute top-[72px] left-0 right-0 z-40 bg-accent border-b-4 border-[#181511] shadow-[0_8px_0_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 py-4" : "max-h-0 py-0"}`}
        >
          <nav className="flex flex-col gap-1 px-6">
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-[#181511] font-bold uppercase tracking-widest text-sm py-3 border-b-2 border-[#181511]/20 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                info
              </span>
              About
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMenuOpen(false)}
              className="text-[#181511] font-bold uppercase tracking-widest text-sm py-3 border-b-2 border-[#181511]/20 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                privacy_tip
              </span>
              Privacy
            </Link>
            <a
              href="https://saweria.co/fsalmz"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="py-3 flex items-center gap-3 border-b-2 border-[#181511]/20"
            >
              <div className="flex size-7 items-center justify-center rounded-full border-[2px] border-[#fde047] bg-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
                <Image
                  src="/saweria/saweria.webp"
                  alt="Saweria"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <span className="text-[#181511] font-bold uppercase tracking-widest text-sm">
                Donate via Saweria
              </span>
            </a>
            <Link
              href="/filter"
              onClick={() => setMenuOpen(false)}
              className="mt-2 w-full py-3 bg-[#181511] text-primary font-impact tracking-widest italic text-xl rounded-xl border-4 border-[#181511] shadow-[4px_4px_0_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
            >
              START
              <span className="material-symbols-outlined font-black">
                arrow_forward
              </span>
            </Link>
          </nav>
        </div>
        <main className="flex-1 flex flex-col items-center px-4 py-4 md:py-8 bg-background-light pixel-bg">
          <div className="w-full max-w-4xl text-center mb-2">
            <h1 className="text-secondary text-4xl md:text-6xl font-impact italic tracking-tighter drop-shadow-[2px_2px_0px_#181511]">
              Hi, Selamat Datang di{" "}
              <span className="text-primary">Sky PhotoBooth!</span>
            </h1>
          </div>
          <div className="w-full max-w-5xl @container flex-1 flex flex-col items-center justify-center p-2 md:p-4">
            <div
              className="w-full min-h-[400px] md:min-h-[450px] h-[60vh] relative overflow-hidden rounded-2xl md:rounded-3xl border-8 border-[#181511] shadow-[12px_12px_0_rgba(0,0,0,0.5)] flex flex-col items-center justify-center py-6 px-4 text-center"
              style={{
                backgroundImage: "url('/latar-belakang/latarsky.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                imageRendering: "pixelated",
              }}
            >
              {/* Decorative Floating Clouds */}
              <div className="absolute top-10 left-10 md:left-20 animate-[bounce_4s_infinite] opacity-90 z-20">
                <Image
                  src="/gambar-awan.png"
                  alt="Cloud"
                  width={120}
                  height={120}
                  className="drop-shadow-[4px_4px_0_#181511]"
                />
              </div>
              <div className="absolute bottom-20 left-4 md:left-12 animate-[bounce_5s_infinite_0.5s] opacity-90 z-20 scale-75">
                <Image
                  src="/gambar-awan.png"
                  alt="Cloud"
                  width={100}
                  height={100}
                  className="drop-shadow-[4px_4px_0_#181511]"
                />
              </div>
              <div className="absolute top-20 right-4 md:right-16 animate-[bounce_6s_infinite_1s] opacity-90 z-20 scale-90">
                <Image
                  src="/gambar-awan.png"
                  alt="Cloud"
                  width={150}
                  height={150}
                  className="drop-shadow-[4px_4px_0_#181511] -scale-x-100"
                />
              </div>
              <div className="absolute bottom-10 right-10 md:right-32 animate-[bounce_4.5s_infinite_0.2s] opacity-90 z-20 scale-50">
                <Image
                  src="/gambar-awan.png"
                  alt="Cloud"
                  width={90}
                  height={90}
                  className="drop-shadow-[4px_4px_0_#181511]"
                />
              </div>

              <div className="relative z-30 flex flex-col items-center w-full max-w-4xl mx-auto gap-4 md:gap-6 mt-2">
                <div className="flex flex-col items-center gap-0 relative">
                  {/* Title Image */}
                  <div className="flex justify-center w-full">
                    <Image
                      src="/logofilter.png"
                      alt="SKYBOOTH Logo Text"
                      width={600}
                      height={200}
                      priority
                      className="w-[260px] sm:w-[320px] md:w-[400px] object-contain drop-shadow-[5px_5px_0px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  {/* Tagline Badge */}
                  <div className="bg-[#fab432] inline-block px-4 md:px-8 py-2 border-[6px] border-[#181511] shadow-[6px_6px_0_#181511] z-10 -mt-2 md:-mt-4">
                    <h2 className="text-[#181511] text-xs sm:text-sm md:text-md font-bold font-mono tracking-widest uppercase">
                      Make Memories Keep Vibes
                    </h2>
                  </div>
                </div>

                {/* Sub-container for Start Button Area */}
                <div className="bg-white/10 backdrop-blur-sm border-4 border-white/20 p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center w-full max-w-[14rem] sm:max-w-sm md:max-w-md shadow-2xl relative mb-2">
                  <Link
                    href="/filter"
                    className="flex min-w-[160px] md:min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-12 md:h-16 px-6 md:px-10 bg-white text-[#181511] shadow-[0_6px_0_#181511] border-4 border-[#181511] text-xl md:text-3xl font-impact tracking-widest transition-all hover:translate-y-1 hover:shadow-[0_4px_0_#181511] uppercase group"
                  >
                    <span className="flex items-center gap-2 md:gap-3">
                      START{" "}
                      <span className="material-symbols-outlined text-xl md:text-2xl font-black">
                        arrow_forward
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-[#181511] text-accent py-8 px-6 md:px-20 border-t-4 border-primary">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">copyright</span>
              <p className="font-impact tracking-widest text-sm uppercase">
                2026 SKYBOOTH TEAM
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/about">
                <span className="material-symbols-outlined cursor-pointer hover:text-white">
                  language
                </span>
              </Link>
              <Link href="/about">
                <span className="material-symbols-outlined cursor-pointer hover:text-white">
                  share
                </span>
              </Link>
              <Link href="/about">
                <span className="material-symbols-outlined cursor-pointer hover:text-white">
                  help_center
                </span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
