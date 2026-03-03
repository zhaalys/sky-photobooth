import Link from "next/link";
import Image from "next/image";

export default function CreatorsPage() {
  const creators = [
    {
      rank: 1,
      name: "@sarah.vibe",
      likes: "124K",
      filter: "Vintage 90s",
      color: "bg-secondary",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDT9ibA1lSl1CrY8vcj9p7UPWNfR5Ef_-Ck3CsLYEjaZES3yFMjgqIGEuaa-hrk_04vRcMN2DebQoJZRW-CG4fSVI0vvKRPSuNVYP_NL1ZXB6WnizJ_d6n_N1iRxo9Sa3NUTzJYrK8_FHDb6hgIhrBKQQaNyfgR65QapTwWh8IqCXkIEkCT9dPP9FKQP6MIIbyz9D8AjKuPltcS5ay_6sRRZ_Z-ryQ5HwPydtrEhOsBt10QGWXp3N3ZMcqk906M5OPbW8xyDEY6cGE",
    },
    {
      rank: 2,
      name: "@pixel.pete",
      likes: "89K",
      filter: "8-Bit Dream",
      color: "bg-primary",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB10CLSXk8DSXXnU0G4fM1DxHxces-iTUFi_YvW5X8TwAnVFjR4GPWX_96QWwOrmBvZxGFeNcxZA122ICpgFogS-OECc3FFLLLOVRJDURdrHtNdZ4jFVADkdO3nZ1AQzKwE_Q0jHIANwt2oaIIABIWeSXDxYYW0YK4WSDXgKds8Ipjw5akeVDdndB3C_hk2SXe7riligNBCkR2VG3xgzEXjwDNLrYwAM4kXMpDZ1tvoBvEF-RoDDuCv55l_aYqu0QITKxDEJzCEl50",
    },
    {
      rank: 3,
      name: "@neon.nights",
      likes: "76K",
      filter: "Cyberpunk Glow",
      color: "bg-accent",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCfO3PkDjuw3VxLvciBioOWebBHTuhz3VlDyvVGgIn4IfYfLRTeacfbgpqS5xBlNIzWhvnnNvLzWSubiM854ke4iJhCe7NhxPvJY4lNXyW1RrZ7D4FWYXxlJlXmAAnVNFcSFOkGdUgE4iC1avGi4M9TjVZ2FCmFCyzjVvqZKhIXnWmpQHb1Nf-hwrR1n7vu2-T1k3FB4idIm6uA5kwix_odXjCKDpBGyQOOFknPiRX-Wsfg6lfmNM78H0efeRLrvlbTHYzPdxpi8Rc",
    },
    {
      rank: 4,
      name: "@y2k.angel",
      likes: "55K",
      filter: "Starry Pink",
      color: "bg-[#f48fb1]",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB_pM0S3j2B9N8fU2k_yPnP0q-mJ2P9J2P8P1s0r_7a5l2Kx2y8zO_pBXPmCkV3O6wM-n8LcVlH_oQ7kLZ4Y8oZV8R6L1u-cOuZbA_o16Q93EszK-fXpB9xJ4tG_xQo9gRzN8qI4rZ3S-w_bQxV8H_8iM6QhV8A7oZv7wP1hS8jL5Z1tV0xM3H9T8x_wQ_vY7nR_r3O8E",
    },
  ];

  return (
    <div className="min-h-screen bg-background-light px-4 py-8 md:p-12 font-display text-slate-900 pixel-pattern relative overflow-hidden">
      {/* Background structural elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent rounded-full blur-[100px] opacity-40 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-secondary rounded-full blur-[80px] opacity-20 z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="size-12 bg-white retro-border rounded-full flex items-center justify-center hover:-translate-x-1 transition-transform group"
            >
              <span className="material-symbols-outlined font-black group-hover:text-primary transition-colors">
                arrow_back
              </span>
            </Link>
            <div>
              <h1 className="text-5xl md:text-7xl font-impact tracking-tighter uppercase italic drop-shadow-[4px_4px_0_#181511] text-secondary">
                TOP CREATORS
              </h1>
              <p className="font-bold tracking-widest uppercase mt-2 text-primary border-b-4 border-[#181511] inline-block pb-1">
                Hall of Fame
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-primary retro-border px-8 py-3 rounded-full font-black tracking-widest uppercase hover:-translate-y-1 hover:shadow-[6px_6px_0_#181511] transition-all active:translate-y-0 active:shadow-[2px_2px_0_#181511]">
              UPLOAD YOURS
            </button>
          </div>
        </header>

        {/* Grand Podium / Top 3 Showcase (Neobrutalism Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-16">
          {/* Rank 2 */}
          <div className="flex flex-col items-center order-2 md:order-1">
            <div className="w-full bg-primary retro-border rounded-2xl p-6 flex flex-col items-center relative hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 bg-white retro-border size-12 rounded-full flex items-center justify-center font-impact text-2xl z-10">
                #2
              </div>
              <div className="size-32 rounded-full retro-border overflow-hidden mb-4 bg-white">
                {/* Avatar Image */}
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${creators[1].avatar}')` }}
                ></div>
              </div>
              <h3 className="font-black text-xl mb-1">{creators[1].name}</h3>
              <span className="bg-white retro-border px-3 py-1 text-xs font-bold rounded-full mb-4">
                {creators[1].filter}
              </span>
              <div className="flex items-center gap-1 font-impact text-2xl tracking-widest text-[#181511]">
                <span className="material-symbols-outlined text-red-500 fill-current">
                  favorite
                </span>
                {creators[1].likes}
              </div>
            </div>
            {/* Podium block */}
            <div className="w-3/4 h-16 bg-primary retro-border border-t-0 rounded-b-xl opacity-80 mt-[-4px]"></div>
          </div>

          {/* Rank 1 */}
          <div className="flex flex-col items-center order-1 md:order-2 z-20">
            <div className="mb-2 animate-bounce flex items-center justify-center">
              <Image
                src="/assets/cloud.png"
                alt="Cloud Crown"
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div className="w-full bg-accent retro-border rounded-2xl p-8 flex flex-col items-center relative hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0_#181511]">
              <div className="absolute -top-6 bg-white retro-border size-14 rounded-full flex items-center justify-center font-impact text-3xl z-10 text-primary">
                #1
              </div>
              <div className="size-48 rounded-full retro-border overflow-hidden mb-4 bg-white p-2">
                <div
                  className="w-full h-full rounded-full overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url('${creators[0].avatar}')` }}
                ></div>
              </div>
              <h3 className="font-black text-2xl mb-1">{creators[0].name}</h3>
              <span className="bg-white retro-border px-4 py-1.5 text-sm font-bold rounded-full mb-4">
                {creators[0].filter}
              </span>
              <div className="flex items-center gap-2 font-impact text-4xl tracking-widest text-[#181511]">
                <span className="material-symbols-outlined text-red-500 fill-current text-4xl">
                  favorite
                </span>
                {creators[0].likes}
              </div>
            </div>
            <div className="w-4/5 h-24 bg-accent retro-border border-t-0 rounded-b-xl opacity-80 mt-[-4px]"></div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center order-3 md:order-3">
            <div className="w-full bg-secondary retro-border rounded-2xl p-6 flex flex-col items-center relative hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 bg-white retro-border size-12 rounded-full flex items-center justify-center font-impact text-2xl z-10">
                #3
              </div>
              <div className="size-32 rounded-full retro-border overflow-hidden mb-4 bg-white">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${creators[2].avatar}')` }}
                ></div>
              </div>
              <h3 className="font-black text-white text-xl mb-1">
                {creators[2].name}
              </h3>
              <span className="bg-white retro-border px-3 py-1 text-xs font-bold rounded-full mb-4">
                {creators[2].filter}
              </span>
              <div className="flex items-center gap-1 font-impact text-2xl tracking-widest text-white">
                <span className="material-symbols-outlined text-[#181511] fill-current">
                  favorite
                </span>
                {creators[2].likes}
              </div>
            </div>
            <div className="w-3/4 h-12 bg-secondary retro-border border-t-0 rounded-b-xl opacity-80 mt-[-4px]"></div>
          </div>
        </div>

        {/* Leaderboard List (Other ranks) */}
        <div className="bg-white retro-border rounded-2xl p-6 md:p-8">
          <h3 className="font-impact text-3xl italic tracking-widest mb-6">
            RUNNERS-UP
          </h3>
          <div className="flex flex-col gap-4">
            {[...creators, ...creators].slice(3, 7).map((c, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-background-light retro-border rounded-xl hover:bg-[#fff9e6] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <span className="font-impact text-3xl text-slate-400 group-hover:text-[#181511] transition-colors w-8 text-center">
                    {idx + 4}
                  </span>
                  <div className="size-16 rounded-lg retro-border overflow-hidden bg-white shrink-0 hidden sm:block">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${c.avatar}')` }}
                    ></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{c.name}</h4>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      {c.filter}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-impact text-xl text-primary">
                  <span className="material-symbols-outlined text-[#181511]">
                    favorite
                  </span>
                  {c.likes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
