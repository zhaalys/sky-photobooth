"use client";

import { useState } from "react";

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-[slideDown_0.5s_ease-out]">
      <div className="bg-[#0f1014] border-2 border-[#e8902d] rounded-full px-5 py-2.5 flex items-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1 text-[#e8902d]">
          <span className="material-symbols-outlined text-[20px]">
            photo_camera
          </span>
          <span className="material-symbols-outlined text-[20px]">
            auto_awesome
          </span>
        </div>
        <p className="text-white text-sm md:text-base font-bold tracking-wide flex items-center gap-1.5 whitespace-nowrap">
          Share & tag us{" "}
          <span className="text-[#e8902d] text-xs font-medium">
            @skyphotobooth!
          </span>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-3 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[20px] leading-none">
            close
          </span>
        </button>
      </div>
    </div>
  );
}
