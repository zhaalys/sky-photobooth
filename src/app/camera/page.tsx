"use client";

import Link from "next/link";
import { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Predefined retro filters with CSS classes for preview and standard CSS strings for the Canvas context
const FILTERS = [
  {
    id: "ORIGINAL",
    name: "ORIGINAL",
    previewClass: "",
    canvasFilter: "none",
    color: "bg-white text-black",
  },
  {
    id: "VINTAGE",
    name: "VINTAGE '98",
    previewClass: "sepia-[.4] contrast-125 brightness-90",
    canvasFilter: "sepia(40%) contrast(125%) brightness(90%)",
    color: "bg-[#e2a85c] text-white",
  },
  {
    id: "NOIR",
    name: "FILM NOIR",
    previewClass: "grayscale contrast-150",
    canvasFilter: "grayscale(100%) contrast(150%)",
    color: "bg-slate-800 text-white",
  },
  {
    id: "CYBER",
    name: "CYBER GLOW",
    previewClass: "saturate-200 hue-rotate-15 contrast-125",
    canvasFilter: "saturate(200%) hue-rotate(15deg) contrast(125%)",
    color: "bg-pink-500 text-white",
  },
  {
    id: "POLAROID",
    name: "POLAROID",
    previewClass: "brightness-110 contrast-90 sepia-[.2]",
    canvasFilter: "brightness(110%) contrast(90%) sepia(20%)",
    color: "bg-orange-100 text-black",
  },
];

export default function CameraPage() {
  const webcamRef = useRef<Webcam>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isMirrored, setIsMirrored] = useState(true);
  const [flash, setFlash] = useState(false);
  const [orientation] = useState<"LANDSCAPE">("LANDSCAPE");
  const [activeFilterId, setActiveFilterId] = useState("ORIGINAL");
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  // Auto-capture states
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const router = useRouter();
  const maxPhotos = 6;

  // Initialization on mount
  useEffect(() => {
    sessionStorage.removeItem("skybooth_photos");
    const savedFilter = sessionStorage.getItem("skybooth_selected_filter");
    if (savedFilter && FILTERS.some((f) => f.id === savedFilter)) {
      setActiveFilterId(savedFilter);
    }
    const savedFrame = sessionStorage.getItem("skybooth_selected_frame");
    if (savedFrame) {
      setSelectedFrame(savedFrame);
    }
  }, []);

  const activeFilter =
    FILTERS.find((f) => f.id === activeFilterId) || FILTERS[0];

  const handleFinish = useCallback(() => {
    sessionStorage.setItem("skybooth_photos", JSON.stringify(photos));
    router.push("/editor");
  }, [photos, router]);

  const takeActualPhoto = useCallback(() => {
    if (flash) {
      // Simulate flash effect
      const overlay = document.getElementById("flash-overlay");
      if (overlay) {
        overlay.style.opacity = "1";
        setTimeout(() => {
          overlay.style.opacity = "0";
        }, 150);
      }
    }

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Bake the filter and orientation into the final image using a hidden canvas
      const img = new window.Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set target dimensions based on orientation
        let targetWidth = img.width;
        let targetHeight = img.height;

        // Assuming raw webcam feed is usually landscape 16:9 or 4:3
        // Force landscape crop 4:3
        const cropRatio = 4 / 3;
        const rawRatio = img.width / img.height;

        let cropWidth = img.width;
        let cropHeight = img.height;
        let cropX = 0;
        let cropY = 0;

        if (rawRatio > cropRatio) {
          // Raw is wider than target crop
          cropWidth = img.height * cropRatio;
          cropX = (img.width - cropWidth) / 2;
        } else {
          // Target crop is wider than raw
          cropHeight = img.width / cropRatio;
          cropY = (img.height - cropHeight) / 2;
        }

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        // Apply the filter
        ctx.filter = activeFilter.canvasFilter;

        // The webcam live preview is mirrored visually when isMirrored=true.
        // getScreenshot() returns the RAW (non-mirrored) image from the sensor.
        // So: if isMirrored=false, the user sees the UN-mirrored live view,
        //     meaning the saved image should also be un-mirrored (raw). No flip needed.
        // If isMirrored=true, the user sees the MIRRORED live view,
        //     and expects the saved image to MATCH what they see. So we need to flip.
        if (isMirrored) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }

        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight,
        );

        const bakedDataUri = canvas.toDataURL("image/jpeg", 0.9);
        setPhotos((prev) => [...prev, bakedDataUri]);
      };
    }
  }, [webcamRef, flash, orientation, activeFilter, isMirrored]);

  const startSequence = () => {
    if (photos.length >= maxPhotos || isCapturing) return;
    setIsCapturing(true);
  };

  useEffect(() => {
    if (!isCapturing) return;

    if (photos.length >= maxPhotos) {
      setIsCapturing(false);
      // Add slight delay before bouncing to editor
      const t = setTimeout(() => {
        handleFinish();
      }, 1000);
      return () => clearTimeout(t);
    }

    let timerCount = 3;
    setCountdown(timerCount);

    const intervalId = setInterval(() => {
      timerCount--;
      if (timerCount > 0) {
        setCountdown(timerCount);
      } else {
        clearInterval(intervalId);
        setCountdown(null);
        takeActualPhoto();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isCapturing, photos.length, takeActualPhoto, handleFinish]);

  const deletePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setIsCapturing(false); // Stop sequence if user interrupts to delete
    setCountdown(null);
  };

  const skipCountdown = () => {
    setCountdown(null);
    takeActualPhoto();
  };

  return (
    <div className="flex h-screen w-full bg-[#d32626] pixel-pattern overflow-hidden flex-col items-center justify-between p-2 md:p-4 lg:p-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-20 bg-black"></div>

      {/* Flash Overlay */}
      <div
        id="flash-overlay"
        className="fixed inset-0 bg-white opacity-0 pointer-events-none z-50 transition-opacity duration-150"
      ></div>

      {/* Top Header */}
      <header className="w-full max-w-[1400px] flex items-center justify-between relative z-10 shrink-0">
        <Link
          href="/frames"
          className="size-9 md:size-12 bg-[#181511] retro-border rounded-xl flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all group"
        >
          <span className="material-symbols-outlined text-white font-black">
            arrow_back
          </span>
        </Link>

        {/* Center Pill */}
        <div className="hidden md:flex bg-[#181511] text-white px-6 py-2 rounded-full font-bold font-mono text-xs md:text-sm shadow-[4px_4px_0_rgba(0,0,0,0.5)] retro-border items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">
            calendar_today
          </span>
          Share & tag us @skybooth!
        </div>

        {/* Right Counter */}
        <div className="bg-primary text-[#181511] px-3 md:px-4 py-1.5 md:py-2 rounded-xl font-impact tracking-widest text-base md:text-xl retro-border shadow-[4px_4px_0_#181511]">
          {photos.length}/{maxPhotos}
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="flex-1 w-full max-w-[1400px] flex flex-col lg:flex-row gap-2 md:gap-3 lg:gap-6 my-2 md:my-3 relative z-10 min-h-0 overflow-hidden">
        {/* Webcam Viewport */}
        <div className="flex-[3] relative bg-[#181511] rounded-xl md:rounded-2xl retro-border shadow-[8px_8px_0_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center p-1.5 md:p-2 lg:p-4 min-h-0">
          <div
            className={`relative bg-black rounded-xl overflow-hidden shadow-inner retro-border border-white/10 aspect-[4/3] w-full max-h-full`}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              mirrored={isMirrored}
              className={`w-full h-full object-cover ${activeFilter.previewClass}`}
              videoConstraints={{
                facingMode: "user",
                width: 1920,
                height: 1080,
              }}
            />

            {/* HUD Overlays */}
            <div className="absolute top-4 left-4 bg-red-500/80 backdrop-blur text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest flex items-center gap-2 border border-red-400">
              <div className="size-2 bg-white rounded-full animate-pulse"></div>
              REC
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <div className="bg-cyan-500/80 backdrop-blur text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest border border-cyan-400">
                MIRROR {isMirrored ? "ON" : "OFF"}
              </div>
              <div className="bg-black/60 backdrop-blur text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest border border-white/20">
                FLASH {flash ? "ON" : "OFF"}
              </div>
              <div className="bg-green-500/80 backdrop-blur text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest border border-green-400 uppercase">
                {activeFilter.name}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur text-yellow-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest border border-white/20">
              ISO 800
            </div>

            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-green-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest border border-white/20">
              [ FACE ]
            </div>

            {/* Crosshair */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
              <div className="size-8 md:size-12 rounded-full border border-white relative flex items-center justify-center">
                <div className="w-2 h-px bg-white absolute -left-1"></div>
                <div className="w-2 h-px bg-white absolute -right-1"></div>
                <div className="h-2 w-px bg-white absolute -top-1"></div>
                <div className="h-2 w-px bg-white absolute -bottom-1"></div>
                <div className="size-0.5 rounded-full bg-red-500"></div>
              </div>
            </div>

            {/* Giant Countdown Overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 bg-black/50 backdrop-blur-[1px]">
                {/* Countdown number - fluid responsive size */}
                <span
                  className="text-white font-impact tracking-widest drop-shadow-[0_8px_0_#181511] leading-none select-none"
                  style={{ fontSize: "clamp(5rem, 30vw, 14rem)" }}
                >
                  {countdown}
                </span>

                <p className="text-white/60 font-mono text-[10px] md:text-sm tracking-widest mt-2 mb-6 uppercase">
                  Preparing shot...
                </p>

                {/* Skip Button - solid neo-brutalist, easy to tap */}
                <button
                  onClick={skipCountdown}
                  className="pointer-events-auto flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-[#181511] border-[4px] border-[#181511] rounded-2xl font-impact text-base md:text-xl tracking-widest uppercase transition-all active:scale-95 shadow-[6px_6px_0_rgba(0,0,0,0.5)] hover:bg-primary hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-[22px] md:text-[28px] font-black">
                    skip_next
                  </span>
                  <span className="hidden sm:inline">SKIP COUNTDOWN</span>
                  <span className="sm:hidden">SKIP</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Inventory - horizontal scrollable strip on mobile, side panel on lg */}
        <div className="lg:flex-[1] lg:min-w-[240px] bg-accent rounded-xl md:rounded-2xl border-4 border-[#181511] shadow-[8px_8px_0_rgba(0,0,0,0.5)] flex flex-col overflow-hidden retro-border shrink-0">
          <div className="bg-[#181511] p-4 flex items-center justify-between border-b-4 border-[#181511]">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary text-[20px]">
                layers
              </span>
              <h2 className="font-impact italic text-xl tracking-widest mt-1 drop-shadow-[2px_2px_0_#ffbc00]">
                INVENTORY
              </h2>
            </div>
            <span className="bg-green-500 border-2 border-[#181511] text-[#181511] font-mono font-bold px-3 py-0.5 rounded-full text-xs shadow-[2px_2px_0_#181511]">
              {photos.length}/6
            </span>
          </div>
          {/* Mobile: horizontal scroll; Desktop: 2-col grid */}
          <div className="flex flex-row lg:grid lg:grid-cols-2 gap-2 p-2 lg:p-4 bg-slate-100 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:flex-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-24 h-20 lg:w-auto lg:h-auto lg:aspect-[4/3] rounded-xl border-4 border-dashed border-[#181511]/30 bg-[#181511]/10 overflow-hidden flex items-center justify-center group transition-all"
              >
                {photos[i] ? (
                  <>
                    <img
                      src={photos[i]}
                      className="w-full h-full object-cover"
                      alt={`Slot ${i + 1}`}
                    />
                    <button
                      onClick={() => deletePhoto(i)}
                      className="absolute inset-0 bg-red-600/80 items-center justify-center flex opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                    >
                      <span className="material-symbols-outlined text-white text-3xl">
                        delete
                      </span>
                    </button>
                  </>
                ) : (
                  <span className="font-impact text-4xl text-[#181511]/20">
                    {i + 1}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="w-full max-w-[1400px] bg-[#181511] rounded-xl md:rounded-2xl border-4 border-[#181511] px-3 py-2 md:p-4 shadow-[8px_8px_0_rgba(0,0,0,0.5)] flex items-center justify-between gap-2 z-10 shrink-0 retro-border">
        {/* Left: Logo & Settings pill */}
        <div className="flex items-center gap-2 md:gap-4">
          <img
            src="/gambar-logo-sky.png"
            alt="SkyBooth Logo"
            className="h-8 md:h-12 object-contain drop-shadow-[2px_2px_0_#181511] hidden sm:block"
          />

          {/* Hardware Toggles */}
          <div className="flex items-center gap-1 bg-[#222222] p-1 md:p-1.5 rounded-2xl shadow-inner border border-white/5">
            <button
              onClick={() => setFlash(!flash)}
              className={`w-12 h-10 rounded-xl transition-all flex items-center justify-center ${flash ? "bg-[#f9a023] text-[#181511] shadow-sm font-bold" : "bg-transparent text-white/80 hover:bg-white/10"}`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {flash ? "flash_on" : "flash_off"}
              </span>
            </button>
            <button
              onClick={() => setIsMirrored(!isMirrored)}
              className={`w-12 h-10 rounded-xl transition-all flex items-center justify-center ${isMirrored ? "bg-[#f9a023] text-[#181511] shadow-sm font-bold" : "bg-transparent text-white/80 hover:bg-white/10"}`}
            >
              <span className="material-symbols-outlined text-[24px]">
                flip
              </span>
            </button>
          </div>
        </div>

        {/* Right: Controls & Capture */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0 ml-auto">
          <button
            onClick={photos.length >= maxPhotos ? handleFinish : undefined}
            className={`flex items-center justify-center px-4 py-3 rounded-xl border-4 font-impact tracking-widest italic transition-all ${
              photos.length >= maxPhotos
                ? "bg-white text-[#181511] border-[#181511] hover:-translate-y-1 shadow-[4px_4px_0_#181511]"
                : "hidden"
            }`}
          >
            <span className="material-symbols-outlined mr-2">upload</span>
            UPLOAD
          </button>

          <button
            onClick={startSequence}
            disabled={photos.length >= maxPhotos || isCapturing}
            className={`flex items-center gap-1.5 md:gap-2 px-5 md:px-10 py-2 md:py-4 rounded-xl border-4 font-impact italic text-base md:text-3xl tracking-widest transition-all ${
              isCapturing
                ? "bg-red-500 border-[#181511] text-white cursor-wait scale-95"
                : photos.length >= maxPhotos
                  ? "bg-primary/50 border-[#181511] text-[#181511]/50 cursor-not-allowed"
                  : "bg-primary border-[#181511] text-[#181511] hover:-translate-y-1 hover:bg-white active:translate-y-1 shadow-[6px_6px_0_#181511]"
            }`}
          >
            <span className="material-symbols-outlined text-[20px] md:text-[32px]">
              {isCapturing ? "hourglass_empty" : "photo_camera"}
            </span>
            {isCapturing ? "CAPTURING" : "CAPTURE"}
          </button>
        </div>
      </footer>
    </div>
  );
}
