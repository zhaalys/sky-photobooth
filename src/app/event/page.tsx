import Link from "next/link";
import Image from "next/image";

export default function EventPage() {
  return (
    <div className="min-h-screen w-full bg-accent flex items-center justify-center p-4 md:p-8 font-display relative overflow-hidden pixel-pattern">
      {/* Top Left Level Indicator (Refined for Universal Theme) */}
      <div className="absolute top-4 xl:top-8 left-4 xl:left-8 flex gap-4 items-end">
        <Link
          href="/"
          className="bg-white retro-border text-slate-900 size-12 rounded-full flex items-center justify-center shadow-[4px_4px_0_#181511] hover:translate-y-1 hover:shadow-[2px_2px_0_#181511] transition-all active:translate-y-[4px] active:shadow-none"
        >
          <span className="material-symbols-outlined font-black">home</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-impact tracking-widest italic text-white drop-shadow-[3px_3px_0_#181511] [text-shadow:3px_3px_0_#181511,-1px_-1px_0_#181511,1px_-1px_0_#181511,-1px_1px_0_#181511,1px_1px_0_#181511]">
          LV. 20
        </h1>
        <div className="hidden md:flex gap-2 pb-1 bg-white p-2 retro-border rounded-xl">
          {/* Stylized Pixel Graphics */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse flex items-center justify-center -mx-1 drop-shadow-[2px_2px_0_#181511]"
            >
              <Image
                src="/gambar-cd.png"
                alt="CD decor"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl w-full flex flex-col gap-6 relative z-10 pt-20 md:pt-0 mt-8 md:mt-0">
        {/* Main Event Card - Neobrutalism Meets 8-Bit */}
        <div className="bg-white retro-border p-2 md:p-[6px] shadow-[16px_16px_0_#181511]">
          {/* Inner Padding Layer */}
          <div className="border-[4px] border-primary bg-background-light p-6 md:p-8 flex flex-col md:flex-row gap-8 rounded">
            {/* Text Information Panel */}
            <div className="flex-1 flex flex-col gap-6">
              <h2 className="font-impact text-4xl text-[#181511] uppercase tracking-widest italic border-b-4 border-dashed border-[#181511] pb-4 mb-2 flex items-center gap-3">
                <div className="bg-primary text-white size-12 flex items-center justify-center retro-border not-italic overflow-hidden">
                  <Image
                    src="/gambar-awan.png"
                    alt="Cloud"
                    width={32}
                    height={32}
                    className="animate-bounce"
                  />
                </div>
                Jisung Day Event
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-4 items-center">
                <div className="bg-primary text-[#181511] font-bold text-center py-1 retro-border shadow-[2px_2px_0_#181511] text-xs uppercase tracking-widest w-fit sm:w-full px-4 sm:px-0">
                  LOCATION
                </div>
                <div className="text-sm font-bold text-slate-700">
                  <p className="text-pink-500">Cafe Retro Booth</p>
                  <p>Jl. Sudirman No 88, Jakarta Pusat</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-4 items-center">
                <div className="bg-primary text-[#181511] font-bold text-center py-1 retro-border shadow-[2px_2px_0_#181511] text-xs uppercase tracking-widest w-fit sm:w-full px-4 sm:px-0">
                  DURATION
                </div>
                <div className="text-sm font-bold text-slate-700">
                  <p>2026.03.15 ~ 2026.03.17</p>
                  <p>10:00 ~ 20:00 (Daily Activity)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-4">
                <div className="bg-primary text-[#181511] font-bold text-center py-1 retro-border shadow-[2px_2px_0_#181511] text-xs uppercase tracking-widest h-fit w-fit sm:w-full px-4 sm:px-0 mt-1">
                  GIFTS
                </div>
                <div className="text-sm font-bold text-slate-700 flex flex-col gap-3">
                  <div className="bg-white retro-border p-3 grid grid-cols-[80px_1fr] gap-2 items-center">
                    <span className="bg-slate-200 text-xs text-center py-0.5 rounded font-bold">
                      Basic
                    </span>
                    <span>Fan art photo card random (2 types)</span>
                  </div>
                  <div className="bg-white retro-border p-3 grid grid-cols-[80px_1fr] gap-2 items-center">
                    <span className="bg-accent text-white text-xs text-center py-0.5 rounded font-bold">
                      Special
                    </span>
                    <span>
                      Hologram sticker (First 25)
                      <br />
                      Keyring set (First 10)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive/Image Panel */}
            <div className="w-full md:w-[320px] flex flex-col gap-6 shrink-0 relative bg-white retro-border p-4">
              {/* Rightmost Cup/Image Preview */}
              <div className="flex-1 bg-secondary border-2 border-[#181511] p-4 relative shadow-inner overflow-hidden min-h-[300px]">
                <div className="absolute top-4 left-4 font-impact text-white tracking-widest text-xl opacity-50 rotate-90 origin-left">
                  CUP PREVIEW
                </div>

                <div className="w-full h-full flex flex-col relative items-center justify-end pb-4 pl-4 pt-4">
                  {/* The "Cup" representation */}
                  <div className="w-[85%] h-full bg-primary retro-border rounded-b-3xl rounded-t-lg flex flex-col items-center justify-end shadow-inner relative z-10 p-4 transform rotate-3">
                    <span className="bg-white px-3 py-1 retro-border font-black text-[#181511] mb-2 shadow-[2px_2px_0_#181511]">
                      BEST MENU
                    </span>
                    <h2 className="text-white font-impact text-3xl tracking-widest drop-shadow-[2px_2px_0_#181511]">
                      RETRO CUP
                    </h2>
                  </div>
                  {/* Floating top image mockup */}
                  <div className="absolute top-0 right-[-10px] w-[110%] h-[55%] bg-accent retro-border -rotate-6 shadow-[4px_4px_0_rgba(0,0,0,0.3)] overflow-hidden z-20">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB10CLSXk8DSXXnU0G4fM1DxHxces-iTUFi_YvW5X8TwAnVFjR4GPWX_96QWwOrmBvZxGFeNcxZA122ICpgFogS-OECc3FFLLLOVRJDURdrHtNdZ4jFVADkdO3nZ1AQzKwE_Q0jHIANwt2oaIIABIWeSXDxYYW0YK4WSDXgKds8Ipjw5akeVDdndB3C_hk2SXe7riligNBCkR2VG3xgzEXjwDNLrYwAM4kXMpDZ1tvoBvEF-RoDDuCv55l_aYqu0QITKxDEJzCEl50')",
                        filter: "saturate(1.5)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Control Column */}
              <div className="flex gap-2 w-full justify-between">
                <Link
                  href="/filter"
                  className="flex-1 bg-primary text-[#181511] py-3 text-center retro-border font-impact tracking-widest shadow-[4px_4px_0_#181511] hover:translate-y-1 hover:shadow-[2px_2px_0_#181511] transition-all uppercase text-xl"
                >
                  JOIN EVENT
                </Link>
                <button className="px-4 bg-background-light retro-border flex items-center justify-center text-red-500 shadow-[4px_4px_0_#181511] hover:bg-red-50 transition-colors">
                  <span className="material-symbols-outlined text-3xl fill-current">
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Disclaimer Box (Themed) */}
        <div className="bg-[#181511] p-2 mt-2 retro-border shadow-[12px_12px_0_rgba(0,0,0,0.2)]">
          <div className="bg-white p-6 retro-border flex flex-col md:flex-row gap-6 relative items-center">
            {/* Notice Text */}
            <div className="flex-1 flex flex-col gap-2 justify-center text-sm font-bold text-slate-700">
              <div className="bg-accent text-white px-4 py-1 retro-border w-fit shadow-[2px_2px_0_#181511] mb-2 font-impact tracking-widest text-lg uppercase italic">
                NOTICE
              </div>
              <p className="flex gap-2">
                <span className="text-accent">•</span> Please wear a mask when
                visiting the venue.
              </p>
              <p className="flex gap-2">
                <span className="text-accent">•</span> 1 drink order required
                per person.
              </p>
              <p className="flex gap-2">
                <span className="text-accent">•</span> Special gifts may run out
                early due to limited stock.
              </p>
            </div>

            {/* Mascot Badge */}
            <div className="size-24 bg-primary retro-border rounded-full shrink-0 flex items-center justify-center shadow-[4px_4px_0_#181511] transform -rotate-12 overflow-hidden">
              <Image
                src="/gambar-remote.png"
                alt="Remote Mascot"
                width={60}
                height={60}
                className="animate-pulse"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
