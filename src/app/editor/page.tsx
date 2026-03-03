"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditorPage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [transparentFrameUrl, setTransparentFrameUrl] = useState<string | null>(
    null,
  );

  const router = useRouter();

  useEffect(() => {
    // Load photos from session storage
    const storedPhotos = sessionStorage.getItem("skybooth_photos");
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
    } else {
      // If no photos, redirect back to camera
      router.push("/camera");
    }

    // Load selected frame
    const frame = sessionStorage.getItem("skybooth_selected_frame");
    if (frame) {
      setSelectedFrame(frame);
      createTransparentFrame(frame).then((url) => setTransparentFrameUrl(url));
    }
  }, [router]);

  const createTransparentFrame = async (src: string): Promise<string> => {
    try {
      const img = await loadImage(src);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return src;

      ctx.drawImage(img, 0, 0);

      // We need the layout bounds to know where the holes are
      const bounds = getFrameBounds(src);

      // Punch out mathematically perfect rounded holes!
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,1)";

      // Draw all 6 boxes
      for (let i = 0; i < 6; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);

        const dx = col === 0 ? bounds.x1 : bounds.x2;
        const dw = col === 0 ? bounds.w1 : bounds.w2;
        const dy = row === 0 ? bounds.y1 : row === 1 ? bounds.y2 : bounds.y3;
        const dh = row === 0 ? bounds.h1 : row === 1 ? bounds.h2 : bounds.h3;
        const rotation = col === 0 ? bounds.rot0 : bounds.rot1;
        const r = bounds.radius;

        const cx = dx + dw / 2;
        const cy = dy + dh / 2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((rotation * Math.PI) / 180);

        ctx.beginPath();
        ctx.moveTo(-dw / 2 + r, -dh / 2);
        ctx.arcTo(dw / 2, -dh / 2, dw / 2, dh / 2, r);
        ctx.arcTo(dw / 2, dh / 2, -dw / 2, dh / 2, r);
        ctx.arcTo(-dw / 2, dh / 2, -dw / 2, -dh / 2, r);
        ctx.arcTo(-dw / 2, -dh / 2, dw / 2, -dh / 2, r);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over"; // Reset
      return canvas.toDataURL("image/png");
    } catch {
      return src; // fallback
    }
  };

  const getFrameBounds = (frameSrc: string | null) => {
    // Group 3: Default standard layout (Mario, etc)
    let layout = {
      x1: 87,
      x2: 443,
      y1: 291,
      y2: 573,
      y3: 857,
      w1: 298,
      w2: 300,
      h1: 239,
      h2: 238,
      h3: 236,
      radius: 20,
      rot0: 0,
      rot1: 0,
    };

    if (!frameSrc) return layout;

    if (
      frameSrc.includes("naruto") ||
      frameSrc.includes("onepiece") ||
      frameSrc.includes("minecraft") ||
      frameSrc.includes("toy")
    ) {
      // Group 1: Treasure Chests (Rotated wooden frames like One Piece, Toy Story, Naruto)
      // These are actually rotated slightly! Left column CCW, right column CW.
      layout = {
        x1: 110,
        x2: 468,
        y1: 310,
        y2: 593,
        y3: 876,
        w1: 254,
        w2: 254,
        h1: 205,
        h2: 205,
        h3: 205,
        radius: 12,
        rot0: -4, // -4 degrees for left column
        rot1: 4, // +4 degrees for right column
      };
    } else if (frameSrc.includes("pokemon") || frameSrc.includes("spiderman")) {
      // Group 2: Thin borders (Pokemon, Spiderman)
      layout = {
        x1: 79,
        x2: 436,
        y1: 283,
        y2: 565,
        y3: 849,
        w1: 314,
        w2: 315,
        h1: 255,
        h2: 254,
        h3: 252,
        radius: 24,
        rot0: 0,
        rot1: 0,
      };
    }

    return layout;
  };

  const getPhotoStyle = (index: number) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const bounds = getFrameBounds(selectedFrame);

    const leftPx = col === 0 ? bounds.x1 : bounds.x2;
    const widthPx = col === 0 ? bounds.w1 : bounds.w2;
    const topPx = row === 0 ? bounds.y1 : row === 1 ? bounds.y2 : bounds.y3;
    const heightPx = row === 0 ? bounds.h1 : row === 1 ? bounds.h2 : bounds.h3;
    const rotation = col === 0 ? bounds.rot0 : bounds.rot1;

    return {
      left: `${(leftPx / 832) * 100}%`,
      top: `${(topPx / 1248) * 100}%`,
      width: `${(widthPx / 832) * 100}%`,
      height: `${(heightPx / 1248) * 100}%`,
      borderRadius: `${(bounds.radius / widthPx) * 100}%`,
    };
  };

  const handleDownloadAll = async () => {
    // If no frame, fallback to individual photos
    if (!selectedFrame) {
      photos.forEach((photo, index) => {
        const link = document.createElement("a");
        link.href = photo;
        link.download = `skybooth-photo-${index + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      // Standard resolution of the custom templates
      canvas.width = 832;
      canvas.height = 1248;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw the background color
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bounds = getFrameBounds(selectedFrame);

      // Draw the user photos into the specific cutout grid locations FIRST
      for (let i = 0; i < Math.min(photos.length, 6); i++) {
        const photoImg = await loadImage(photos[i]);
        const col = i % 2;
        const row = Math.floor(i / 2);

        const dx = col === 0 ? bounds.x1 : bounds.x2;
        const dw = col === 0 ? bounds.w1 : bounds.w2;
        const dy = row === 0 ? bounds.y1 : row === 1 ? bounds.y2 : bounds.y3;
        const dh = row === 0 ? bounds.h1 : row === 1 ? bounds.h2 : bounds.h3;
        const rotation = col === 0 ? bounds.rot0 : bounds.rot1;

        const cx = dx + dw / 2;
        const cy = dy + dh / 2;

        ctx.save();

        // Translate to center, rotate, then translate back to top-left to draw
        ctx.translate(cx, cy);
        ctx.rotate((rotation * Math.PI) / 180);

        // Shrink the clip and draw bounds slightly (by ~2px) to ensure they sit safely behind the frame borders
        const padding = 2;
        const r = bounds.radius;
        const innerW = dw - padding * 2;
        const innerH = dh - padding * 2;

        ctx.beginPath();
        // Drawing relative to the translated center
        ctx.moveTo(-innerW / 2 + r, -innerH / 2);
        ctx.arcTo(innerW / 2, -innerH / 2, innerW / 2, innerH / 2, r);
        ctx.arcTo(innerW / 2, innerH / 2, -innerW / 2, innerH / 2, r);
        ctx.arcTo(-innerW / 2, innerH / 2, -innerW / 2, -innerH / 2, r);
        ctx.arcTo(-innerW / 2, -innerH / 2, innerW / 2, -innerH / 2, r);
        ctx.closePath();
        ctx.clip();

        // Draw the image slightly overscanned inside the clip to avoid empty sub-pixel edges
        ctx.drawImage(photoImg, -dw / 2, -dh / 2, dw, dh);

        ctx.restore();
      }

      // Draw the frame ON TOP so it naturally masks the photo borders
      const frameImg = await loadImage(transparentFrameUrl || selectedFrame);
      ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

      const bakedDataUrl = canvas.toDataURL("image/jpeg", 0.95);
      const link = document.createElement("a");
      link.href = bakedDataUrl;
      link.download = `skybooth-strip.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating strip:", err);
      alert("Failed to generate the final image.");
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleRetake = () => {
    sessionStorage.removeItem("skybooth_photos");
    router.push("/camera");
  };

  const handleShare = async () => {
    if (navigator.share && photos.length > 0) {
      try {
        // Web Share API requires a file, so we convert the first image base64 back to a blob
        const res = await fetch(photos[0]);
        const blob = await res.blob();
        const file = new File([blob], "skybooth.jpg", { type: "image/jpeg" });

        await navigator.share({
          title: "My SkyBooth Session",
          text: "Check out my photos from SKYBOOTH!",
          files: [file],
        });
      } catch (err) {
        console.log("Error sharing", err);
        alert("Sharing is not supported on this device/browser.");
      }
    } else {
      alert("Sharing is not supported on this device/browser.");
    }
  };

  if (photos.length === 0) {
    return (
      <div
        className="flex h-screen w-full items-center justify-center bg-[#fdf5e6]"
        style={{
          backgroundImage: "radial-gradient(#d4b895 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <span className="text-secondary font-impact text-3xl tracking-widest animate-pulse drop-shadow-[2px_2px_0_#181511]">
          PROCESSING...
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16 px-4 pt-16 pb-8 md:p-12 overflow-x-hidden bg-[#fdf5e6]"
      style={{
        backgroundImage: "radial-gradient(#e0c8a3 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Marquee Header */}
      <div className="absolute top-0 left-0 w-full bg-[#181511] h-10 md:h-12 overflow-hidden flex items-center border-b-4 border-white/20 z-50 shadow-[0_4px_0_rgba(0,0,0,0.3)]">
        <div className="flex w-max animate-[marquee_30s_linear_infinite]">
          {/* Group 1 */}
          <div className="flex shrink-0">
            <span className="font-impact text-lg md:text-xl tracking-widest text-[#fde047] uppercase px-4 inline-block">
              semoga suka! ayo coba lagi dan cobain masih banyak frame nih
            </span>
            <span className="font-impact text-lg md:text-xl tracking-widest text-[#fde047] uppercase px-4 inline-block">
              semoga suka! ayo coba lagi dan cobain masih banyak frame nih
            </span>
            <span className="font-impact text-lg md:text-xl tracking-widest text-[#fde047] uppercase px-4 inline-block">
              semoga suka! ayo coba lagi dan cobain masih banyak frame nih
            </span>
            <span className="font-impact text-lg md:text-xl tracking-widest text-[#fde047] uppercase px-4 inline-block">
              semoga suka! ayo coba lagi dan cobain masih banyak frame nih
            </span>
          </div>
          {/* Group 2 (Exact Clone for Seamless Loop) */}
          <div className="flex shrink-0">
            <span className="font-impact text-lg md:text-xl tracking-widest text-[#fde047] uppercase px-4 inline-block">
              semoga suka! ayo coba lagi dan cobain masih banyak frame nih
            </span>
            <span className="font-impact text-lg md:text-xl tracking-widest text-[#fde047] uppercase px-4 inline-block">
              semoga suka! ayo coba lagi dan cobain masih banyak frame nih
            </span>
            <span className="font-impact text-lg md:text-xl tracking-widest text-[#fde047] uppercase px-4 inline-block">
              semoga suka! ayo coba lagi dan cobain masih banyak frame nih
            </span>
            <span className="font-impact text-lg md:text-xl tracking-widest text-[#fde047] uppercase px-4 inline-block">
              semoga suka! ayo coba lagi dan cobain masih banyak frame nih
            </span>
          </div>
        </div>
      </div>

      {/* Left Area: The Corkboard & Pinned Photo Strip */}
      <div className="relative flex-1 max-w-xl w-full flex items-center justify-center">
        {/* The pinned strip container */}
        <div className="relative w-full max-w-[min(340px,80vw)] md:max-w-[440px] aspect-[2/3] bg-[#f8f8f8] border-2 border-[#181511] shadow-[10px_10px_0_rgba(0,0,0,0.8)] transition-transform hover:rotate-1">
          {/* Top Pin Graphic */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 border-2 border-[#181511] shadow-[2px_2px_0_#181511] z-30">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/60"></div>
          </div>

          {selectedFrame ? (
            // Custom Frame Strip Layout
            <div className="w-full h-full relative overflow-hidden">
              {/* Captured Photos drawn underneath the frame */}
              <div className="absolute inset-0 z-0">
                {photos.slice(0, 6).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Capture ${index + 1}`}
                    className="absolute object-cover"
                    style={getPhotoStyle(index)}
                  />
                ))}
              </div>

              {/* Base template drawn ON TOP */}
              <img
                src={transparentFrameUrl || selectedFrame}
                alt="Photobooth Frame Template"
                className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none drop-shadow-sm"
              />

              {/* Subtle scanlines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.10] z-20 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                  backgroundSize: "100% 2px, 3px 100%",
                }}
              ></div>
            </div>
          ) : (
            // Individual Polaroid Grid Fallback
            <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-white">
              <div className="w-full flex-1 grid grid-cols-2 gap-3 pb-8 relative">
                {photos.slice(0, 6).map((photo, index) => (
                  <div
                    key={index}
                    className="bg-black/90 aspect-[4/3] rounded-md overflow-hidden border border-black/20 shadow-inner"
                  >
                    <img
                      src={photo}
                      alt={`Capture ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="h-10 w-full flex items-center justify-center font-mono text-xs text-gray-400 border-t border-gray-100">
                MARIO_ST_001
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Area: Action Menu */}
      <div className="w-full max-w-xs md:max-w-sm flex flex-col z-10">
        <div className="bg-[#fbdb4a] border-[4px] border-[#181511] p-6 shadow-[12px_12px_0_#181511]">
          <h3 className="font-impact text-2xl tracking-widest text-[#181511] mb-6 uppercase">
            Actions
          </h3>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleDownloadAll}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#00ded0] border-4 border-[#181511] shadow-[4px_4px_0_#181511] active:translate-y-1 active:shadow-none transition-all group"
            >
              <span className="material-symbols-outlined text-xl transition-transform text-[#181511]">
                download
              </span>
              <span className="font-impact text-lg tracking-widest text-[#181511] uppercase mt-1">
                Download Strip
              </span>
            </button>

            <button
              onClick={handleShare}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#f59e0b] border-4 border-[#181511] shadow-[4px_4px_0_#181511] active:translate-y-1 active:shadow-none transition-all group"
            >
              <span className="material-symbols-outlined text-xl transition-transform text-[#181511]">
                share
              </span>
              <span className="font-impact text-lg tracking-widest text-[#181511] uppercase mt-1">
                Share
              </span>
            </button>

            <a
              href="https://saweria.co/fsalmz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#e79212] border-4 border-[#181511] shadow-[4px_4px_0_#181511] active:translate-y-1 active:shadow-none transition-all group mb-2"
            >
              <div className="flex size-7 items-center justify-center rounded-full border-[2px] border-[#fde047] bg-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden shrink-0">
                <Image
                  src="/saweria/saweria.webp"
                  alt="Saweria"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <span className="font-impact text-lg tracking-widest text-[#181511] uppercase mt-1">
                Donate
              </span>
            </a>

            <div className="h-px bg-[#181511]/30 my-2"></div>

            <button
              onClick={handleRetake}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#3b82f6] border-4 border-[#181511] shadow-[4px_4px_0_#181511] active:translate-y-1 active:shadow-none transition-all group"
            >
              <span className="material-symbols-outlined text-xl group-hover:-rotate-90 transition-transform text-white">
                refresh
              </span>
              <span className="font-impact text-lg tracking-widest text-white uppercase mt-1">
                Retake Photos
              </span>
            </button>

            <Link
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 bg-white border-4 border-[#181511] shadow-[4px_4px_0_#181511] active:translate-y-1 active:shadow-none transition-all group"
            >
              <span className="material-symbols-outlined text-xl text-[#181511]">
                home
              </span>
              <span className="font-impact text-lg tracking-widest text-[#181511] uppercase mt-1">
                Back to Home
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
