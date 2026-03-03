import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light font-display">
      {/* Universal Header */}
      <header className="h-16 md:h-20 border-b-4 border-[#181511] px-4 md:px-12 flex items-center justify-between bg-primary shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="size-10 md:size-12 bg-white retro-border rounded-full flex items-center justify-center hover:-translate-x-1 transition-transform group shadow-[4px_4px_0_#181511]"
          >
            <span className="material-symbols-outlined font-black group-hover:text-primary transition-colors text-[20px] md:text-[24px]">
              home
            </span>
          </Link>
          <div className="flex flex-col text-[#181511]">
            <span className="font-bold text-xs md:text-sm tracking-widest uppercase text-white drop-shadow-[1px_1px_0_#181511]">
              Our Story
            </span>
            <h1 className="text-2xl md:text-3xl font-impact tracking-widest italic -mt-0.5 md:-mt-1 drop-shadow-[2px_2px_0_#fff]">
              ABOUT US
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-4xl mx-auto p-4 md:p-12 pb-16">
        <div className="bg-secondary retro-border p-5 md:p-12 shadow-[8px_8px_0_#181511] md:shadow-[12px_12px_0_#181511] relative isolate mt-8 md:mt-10">
          {/* Mascot Decor */}
          <div
            className="absolute -top-8 right-4 md:-top-10 md:-right-10 bg-white rounded-full size-20 md:size-32 retro-border shadow-[4px_4px_0_#181511] flex items-center justify-center rotate-12 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <Image
              src="/logofilter.png"
              alt="Camera Decor"
              width={64}
              height={64}
              className="object-contain w-10 md:w-16"
            />
          </div>

          <div className="bg-white retro-border p-4 md:p-6 shadow-inner inline-block mb-6 md:mb-8 mt-4 md:mt-0">
            <h2 className="font-impact text-3xl md:text-6xl uppercase tracking-widest drop-shadow-[3px_3px_0_#ffcc00] text-[#181511] leading-tight">
              We Build Memories.
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 text-base md:text-lg font-bold text-white tracking-wide">
            <p className="bg-[#181511] p-4 retro-border leading-relaxed shadow-[4px_4px_0_#ff9900]">
              Sky PhotoBooth is a place to make beautiful memories, through
              photos we can get many memories
            </p>

            <p className="bg-primary text-[#181511] p-4 retro-border leading-relaxed shadow-[4px_4px_0_#181511]">
              Try out the many frame effects! Download and share with your
              friends and create memories together through Sky!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2 md:mt-4">
              <div className="bg-accent retro-border p-4 md:p-6 text-[#181511] shadow-[4px_4px_0_#181511] hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined text-3xl md:text-4xl mb-2">
                  rocket_launch
                </span>
                <h3 className="font-impact text-xl md:text-2xl uppercase italic">
                  The Mission
                </h3>
                <p className="text-sm mt-1">
                  Make you happy and give you a place to remember through photo
                  shots.
                </p>
              </div>
              <div className="bg-white retro-border p-4 md:p-6 text-[#181511] shadow-[4px_4px_0_#181511] hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined text-3xl md:text-4xl mb-2">
                  code_blocks
                </span>
                <h3 className="font-impact text-xl md:text-2xl uppercase italic">
                  Developer Message
                </h3>
                <p className="text-sm mt-1">
                  Thank you for using it! I will continue to develop this
                  website until it remains good and cool
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
