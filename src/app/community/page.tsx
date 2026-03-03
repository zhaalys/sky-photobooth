import Link from "next/link";
import Image from "next/image";

export default function CommunityPage() {
  const posts = [
    {
      user: "@sarah.vibe",
      time: "2h ago",
      text: "Just tried the new Pink Star frame! Obsessed ✨📸",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDT9ibA1lSl1CrY8vcj9p7UPWNfR5Ef_-Ck3CsLYEjaZES3yFMjgqIGEuaa-hrk_04vRcMN2DebQoJZRW-CG4fSVI0vvKRPSuNVYP_NL1ZXB6WnizJ_d6n_N1iRxo9Sa3NUTzJYrK8_FHDb6hgIhrBKQQaNyfgR65QapTwWh8IqCXkIEkCT9dPP9FKQP6MIIbyz9D8AjKuPltcS5ay_6sRRZ_Z-ryQ5HwPydtrEhOsBt10QGWXp3N3ZMcqk906M5OPbW8xyDEY6cGE",
      likes: 124,
      comments: 12,
    },
    {
      user: "@jason.wave",
      time: "5h ago",
      text: "Who's hitting up the Cafe Retro Booth event this weekend? Need a +1! ☕️👾",
      likes: 89,
      comments: 45,
    },
    {
      user: "@cyber.punk",
      time: "1d ago",
      text: "Loving the new color grading options. Cyber glow is unmatched.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCfO3PkDjuw3VxLvciBioOWebBHTuhz3VlDyvVGgIn4IfYfLRTeacfbgpqS5xBlNIzWhvnnNvLzWSubiM854ke4iJhCe7NhxPvJY4lNXyW1RrZ7D4FWYXxlJlXmAAnVNFcSFOkGdUgE4iC1avGi4M9TjVZ2FCmFCyzjVvqZKhIXnWmpQHb1Nf-hwrR1n7vu2-T1k3FB4idIm6uA5kwix_odXjCKDpBGyQOOFknPiRX-Wsfg6lfmNM78H0efeRLrvlbTHYzPdxpi8Rc",
      likes: 302,
      comments: 8,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light pixel-bg font-display">
      {/* Header aligned with unified theme */}
      <header className="h-20 border-b-4 border-[#181511] px-6 md:px-12 flex items-center justify-between bg-primary shrink-0 relative z-20">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="size-12 bg-white retro-border rounded-full flex items-center justify-center hover:-translate-x-1 transition-transform group shadow-[4px_4px_0_#181511]"
          >
            <span className="material-symbols-outlined font-black group-hover:text-primary transition-colors">
              home
            </span>
          </Link>
          <div className="flex flex-col text-[#181511]">
            <span className="font-bold text-sm tracking-widest uppercase text-white drop-shadow-[1px_1px_0_#181511]">
              SkyBooth Forum
            </span>
            <h1 className="text-3xl font-impact tracking-widest italic -mt-1 drop-shadow-[2px_2px_0_#fff]">
              COMMUNITY
            </h1>
          </div>
        </div>

        <button className="bg-accent retro-border px-6 py-2 font-bold tracking-widest shadow-[4px_4px_0_#181511] hover:translate-y-1 hover:shadow-[2px_2px_0_#181511] active:translate-y-2 active:shadow-none transition-all uppercase text-sm hidden md:block">
          New Post
        </button>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        {/* Left Side: Forums & Feed */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Post Input Box */}
          <div className="bg-white retro-border rounded-2xl p-6 shadow-[8px_8px_0_#181511] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
            <div className="flex gap-4">
              <div className="size-12 bg-primary rounded-full retro-border shrink-0"></div>
              <div className="flex-1 flex flex-col gap-3">
                <textarea
                  placeholder="Drop your latest booth or thought here..."
                  className="w-full bg-slate-50 border-2 border-[#181511] rounded-xl p-3 resize-none h-24 font-bold text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-accent transition-all"
                ></textarea>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 text-slate-400">
                    <button className="hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">image</span>
                    </button>
                    <button className="hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">mood</span>
                    </button>
                  </div>
                  <button className="bg-primary retro-border px-6 py-1.5 font-bold tracking-widest uppercase hover:bg-[#ffcc00] transition-colors rounded-lg">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Label */}
          <div className="flex items-center gap-4 mt-2">
            <h2 className="font-impact text-2xl tracking-widest italic">
              LATEST POSTS
            </h2>
            <div className="flex-1 h-1 bg-[#181511]/10 rounded"></div>
          </div>

          {/* Posts Feed */}
          <div className="flex flex-col gap-6">
            {posts.map((post, idx) => (
              <article
                key={idx}
                className="bg-white retro-border rounded-2xl p-6 shadow-[6px_6px_0_rgba(0,0,0,0.15)] flex flex-col gap-4 hover:-translate-y-1 transition-transform"
              >
                {/* Author Head */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div
                      className={`size-10 rounded-full retro-border ${idx % 2 === 0 ? "bg-secondary" : "bg-accent"}`}
                    ></div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">
                        {post.user}
                      </h3>
                      <p className="text-xs text-slate-400 font-bold">
                        {post.time}
                      </p>
                    </div>
                  </div>
                  <button className="text-slate-300 hover:text-slate-600">
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </button>
                </div>

                {/* Post Content */}
                <p className="font-bold text-slate-700 text-[15px]">
                  {post.text}
                </p>

                {post.image && (
                  <div className="w-full max-w-md rounded-xl retro-border overflow-hidden mt-2 bg-slate-100 p-2">
                    <div
                      className="w-full aspect-square bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${post.image})` }}
                    ></div>
                  </div>
                )}

                {/* Interaction Bar */}
                <div className="flex gap-6 mt-2 pt-4 border-t-2 border-dashed border-slate-200">
                  <button className="flex items-center gap-2 group text-slate-500 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined group-hover:fill-current">
                      favorite
                    </span>
                    <span className="font-impact tracking-widest">
                      {post.likes}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 group text-slate-500 hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined group-hover:fill-current">
                      chat_bubble
                    </span>
                    <span className="font-impact tracking-widest">
                      {post.comments}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 group text-slate-500 hover:text-primary transition-colors ml-auto">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar: Trends & Online Status */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          {/* Active Users Block */}
          <div className="bg-secondary retro-border rounded-2xl p-6 shadow-[8px_8px_0_#181511] text-white relative overflow-hidden">
            <Image
              src="/globe.svg"
              alt="Globe"
              width={120}
              height={120}
              className="absolute -right-6 -top-6 opacity-20 drop-shadow-[2px_2px_0_#181511]"
            />
            <div className="relative z-10">
              <h3 className="flex items-center gap-2 font-impact italic tracking-widest text-2xl mb-1 text-[#181511]">
                <Image
                  src="/globe.svg"
                  alt="Globe Icon"
                  width={24}
                  height={24}
                  className="brightness-0"
                />
                BOOTHERS ONLINE
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black drop-shadow-[2px_2px_0_#181511]">
                  5,820
                </span>
                <span className="size-3 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80] border border-black animate-pulse"></span>
              </div>
            </div>
            <Link
              href="/camera"
              className="block w-full bg-white text-secondary font-black tracking-widest uppercase py-3 rounded-xl border-2 border-[#181511] text-center hover:bg-slate-100 transition-colors shadow-[2px_2px_0_#181511]"
            >
              CHECK IN NOW!
            </Link>
          </div>

          {/* Trending Topics Box */}
          <div className="bg-white retro-border rounded-2xl overflow-hidden shadow-[6px_6px_0_rgba(0,0,0,0.15)]">
            <div className="bg-accent px-6 py-4 border-b-2 border-[#181511]">
              <h3 className="font-impact italic tracking-widest text-[#181511] text-xl">
                TRENDING BOOTHS
              </h3>
            </div>
            <div className="p-4 flex flex-col">
              {[
                "#Y2K_Dream",
                "#CafeRetroEvent",
                "#NoirFilter",
                "#PetBooths",
              ].map((tag, i) => (
                <div
                  key={i}
                  className="px-4 py-3 border-b-2 border-dashed border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer flex justify-between items-center group"
                >
                  <span className="font-bold text-slate-700">{tag}</span>
                  <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-primary transition-colors">
                    arrow_forward
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center text-xs font-bold text-slate-400">
            <a href="#" className="hover:text-slate-600">
              Rules
            </a>
            <a href="#" className="hover:text-slate-600">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-600">
              Report
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
