import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-900 font-mono text-[#00ff41] p-3 md:p-8 flex items-start md:items-center justify-center relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]"></div>

      <div className="w-full max-w-3xl bg-black border-2 border-[#00ff41] p-[2px] shadow-[0_0_20px_rgba(0,255,65,0.4)] relative z-20 my-4">
        <div className="border border-[#00ff41] p-4 md:p-6 max-h-[85vh] overflow-y-auto flex flex-col hide-scrollbar relative">
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-[#00ff41] pb-3 mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Image
                src="/window.svg"
                alt="Window"
                width={16}
                height={16}
                className="opacity-80 invert sepia saturate-200 hue-rotate-[80deg] brightness-125"
              />
              <div className="flex gap-2 text-[10px] md:text-xs">
                <span>[ SKYBOOTH_OS v2.0 ]</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
            <Link
              href="/"
              className="px-2 md:px-4 py-1 border border-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors uppercase text-xs md:text-sm font-bold"
            >
              Exit (ESC)
            </Link>
          </div>

          {/* Document Content */}
          <div className="flex items-center gap-3 mb-6 pt-2">
            <Image
              src="/file.svg"
              alt="File"
              width={24}
              height={24}
              className="opacity-90 invert sepia saturate-200 hue-rotate-[80deg] brightness-125 shrink-0"
            />
            <h1 className="text-xl md:text-3xl font-black leading-tight">
              PRIVACY POLICY &amp; T.O.S.
            </h1>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 text-xs md:text-sm leading-relaxed">
            <section>
              <h2 className="text-base md:text-xl font-bold uppercase mb-2 border-b border-[#00ff41]/50 inline-block pb-1">
                &gt; DATA COLLECTION
              </h2>
              <p className="mt-2 text-zinc-400">
                SkyBooth captures images locally on your device via the WebRTC
                standard.{" "}
                <strong className="text-[#00ff41]">
                  We DO NOT transmit your webcam feed to any external servers.
                </strong>{" "}
                Your "Vibe" stays entirely on your local machine unless you
                explicitly choose to upload it to the Community Forum.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-xl font-bold uppercase mb-2 border-b border-[#00ff41]/50 inline-block pb-1">
                &gt; COOKIES &amp; STORAGE
              </h2>
              <p className="mt-2 text-zinc-400">
                We utilize lightweight LocalStorage to remember your favorite
                color-grades and frame presets. This is essential for the
                seamless operation of the "Vintage Retro Modern" aesthetic you
                demand. No tracking pixels. No invasive third-party ad networks.
              </p>
            </section>

            <section>
              <h2 className="text-base md:text-xl font-bold uppercase mb-2 border-b border-[#00ff41]/50 inline-block pb-1">
                &gt; TERMS OF SERVICE
              </h2>
              <ul className="list-disc pl-5 mt-2 text-zinc-400 flex flex-col gap-2">
                <li>
                  You agree to not exploit the photo generation for illegal
                  activities.
                </li>
                <li>
                  Community uploads must abide by the Habbo-style Safety
                  guidelines (No NSFW, no doxxing).
                </li>
                <li>Enjoy the nostalgic UI responsibly.</li>
              </ul>
            </section>

            <div className="mt-6 md:mt-12 bg-[#00ff41]/20 p-3 md:p-4 border border-[#00ff41] text-[#00ff41] text-xs md:text-sm">
              <p>
                root@skybooth:~# By continuing to use the software, you
                acknowledge these terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
