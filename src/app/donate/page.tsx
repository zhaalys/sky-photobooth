import Link from "next/link";
import Image from "next/image";

export default function DonatePage() {
  const tiers = [
    {
      icon: (
        <span className="material-symbols-outlined text-4xl animate-pulse">
          phone_iphone
        </span>
      ),
      name: "Support Us",
      amount: "$3",
      color: "bg-[#e5a04e]",
    },
    {
      icon: (
        <span className="material-symbols-outlined text-4xl animate-bounce">
          photo_camera
        </span>
      ),
      name: "Buy a Film Roll",
      amount: "$10",
      color: "bg-primary",
    },
    {
      icon: (
        <span className="material-symbols-outlined text-4xl animate-spin">
          album
        </span>
      ),
      name: "Server Booster",
      amount: "$25",
      color: "bg-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background-light font-display relative overflow-hidden">
      {/* Dynamic background decoration */}
      <div className="absolute top-20 right-10 size-64 bg-accent/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-10 left-10 size-96 bg-primary/20 rounded-full blur-[100px]"></div>

      {/* Header */}
      <header className="h-20 border-b-4 border-[#181511] px-6 md:px-12 flex items-center justify-between bg-[#fff5f5] shrink-0 relative z-20">
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
            <span className="font-bold text-sm tracking-widest uppercase">
              Support Us
            </span>
            <h1 className="text-3xl font-impact tracking-widest italic -mt-1 drop-shadow-[2px_2px_0_#ffcc00]">
              DONATE
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6 md:p-12 relative z-10">
        <div className="bg-white retro-border p-8 md:p-12 shadow-[12px_12px_0_#181511] text-center flex flex-col items-center">
          <div className="bg-[#181511] text-white font-impact italic tracking-widest text-4xl px-8 py-3 transform -rotate-2 mb-8 shadow-[4px_4px_0_#ffcc00]">
            KEEP SKYBOOTH FREE!
          </div>

          <p className="text-lg font-bold text-slate-700 max-w-xl mb-12">
            We don't run ads, and we don't track you. If you love taking retro
            snaps and want to help keep the servers running, consider dropping a
            few coins in the jar!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`${tier.color} retro-border p-6 flex flex-col items-center gap-4 shadow-[6px_6px_0_#181511] hover:-translate-y-2 hover:shadow-[10px_10px_0_#181511] transition-all cursor-pointer group`}
              >
                <div className="size-16 bg-white rounded-full retro-border flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                  {tier.icon}
                </div>
                <h3 className="font-black tracking-widest uppercase text-center leading-tight">
                  {tier.name}
                </h3>
                <span className="bg-white px-4 py-1 retro-border font-impact text-xl text-[#181511]">
                  {tier.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full max-w-sm">
            <button className="w-full bg-[#181511] text-white py-4 rounded-xl font-black tracking-widest text-xl retro-border hover:bg-slate-800 transition-colors shadow-[6px_6px_0_#ff9900] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">favorite</span>
              DONATE NOW
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
