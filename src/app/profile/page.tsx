import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const booths = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-secondary pixel-pattern font-display p-4 md:p-8 flex items-center justify-center">
      {/* Return Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-30 size-12 bg-white retro-border rounded-full flex items-center justify-center hover:-translate-x-1 transition-transform group shadow-[4px_4px_0_#181511]"
      >
        <span className="material-symbols-outlined font-black group-hover:text-primary transition-colors">
          home
        </span>
      </Link>

      {/* Profile ID Card Container */}
      <div className="w-full max-w-4xl bg-white retro-border rounded-3xl shadow-[16px_16px_0_#181511] flex flex-col md:flex-row overflow-hidden relative isolate mt-12 md:mt-0">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-full bg-accent -skew-x-12 translate-x-32 z-0 hidden md:block"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-primary z-0 opacity-20"></div>

        {/* Left Side: User Info */}
        <div className="w-full md:w-80 bg-background-light p-8 flex flex-col items-center border-b-4 md:border-b-0 md:border-r-4 border-[#181511] relative z-10">
          <div className="w-full border-b-2 border-dashed border-slate-300 pb-2 mb-6 flex justify-between items-center">
            <span className="font-impact italic tracking-widest text-[#181511]">
              MEMBERSHIP CARD
            </span>
            <span className="material-symbols-outlined text-primary">
              verified
            </span>
          </div>

          {/* Avatar HolePunch effect */}
          <div className="size-40 bg-white rounded-full retro-border shadow-inner p-2 mb-4 relative group cursor-pointer">
            <div
              className="w-full h-full rounded-full bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDT9ibA1lSl1CrY8vcj9p7UPWNfR5Ef_-Ck3CsLYEjaZES3yFMjgqIGEuaa-hrk_04vRcMN2DebQoJZRW-CG4fSVI0vvKRPSuNVYP_NL1ZXB6WnizJ_d6n_N1iRxo9Sa3NUTzJYrK8_FHDb6hgIhrBKQQaNyfgR65QapTwWh8IqCXkIEkCT9dPP9FKQP6MIIbyz9D8AjKuPltcS5ay_6sRRZ_Z-ryQ5HwPydtrEhOsBt10QGWXp3N3ZMcqk906M5OPbW8xyDEY6cGE')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold">
              <span className="material-symbols-outlined mb-1">edit</span>{" "}
              Change
            </div>
          </div>

          <h2 className="font-impact text-3xl tracking-widest uppercase text-center mb-1">
            Random User
          </h2>
          <p className="font-bold text-slate-500 mb-6">@orang.random</p>

          <div className="w-full flex justify-between bg-white retro-border rounded-xl p-4 gap-4">
            <div className="flex flex-col items-center flex-1">
              <span className="font-impact text-2xl text-primary drop-shadow-[1px_1px_0_#181511]">
                42
              </span>
              <span className="font-bold text-[10px] text-slate-500 uppercase tracking-widest">
                Booths
              </span>
            </div>
            <div className="w-0.5 bg-[#181511] opacity-20"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="font-impact text-2xl text-secondary drop-shadow-[1px_1px_0_#181511]">
                8K
              </span>
              <span className="font-bold text-[10px] text-slate-500 uppercase tracking-widest">
                Likes
              </span>
            </div>
          </div>

          <button className="mt-8 w-full bg-[#181511] text-white py-3 rounded-xl font-bold tracking-widest uppercase hover:bg-slate-800 transition-colors shadow-[4px_4px_0_#ffcc00] active:translate-y-1 active:shadow-none">
            Edit Profile
          </button>
        </div>

        {/* Right Side: Collections Gallery */}
        <div className="flex-1 p-8 relative z-10 flex flex-col h-full bg-white md:bg-transparent">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-impact text-4xl tracking-widest italic drop-shadow-[2px_2px_0_#181511] text-white">
              MY COLLECTION
            </h3>
            <button className="text-sm font-bold border-b-2 border-[#181511] hover:text-primary transition-colors pb-1">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 overflow-y-auto pr-2 pb-4">
            {booths.map((booth, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] bg-background-light retro-border rounded-xl p-2 md:p-3 shadow-[4px_4px_0_#181511] hover:translate-y-[-4px] hover:shadow-[8px_8px_0_#181511] transition-all cursor-pointer group flex flex-col"
              >
                <div
                  className="flex-1 w-full bg-cover bg-center rounded-lg border-2 border-[#181511] opacity-90 group-hover:opacity-100"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDT9ibA1lSl1CrY8vcj9p7UPWNfR5Ef_-Ck3CsLYEjaZES3yFMjgqIGEuaa-hrk_04vRcMN2DebQoJZRW-CG4fSVI0vvKRPSuNVYP_NL1ZXB6WnizJ_d6n_N1iRxo9Sa3NUTzJYrK8_FHDb6hgIhrBKQQaNyfgR65QapTwWh8IqCXkIEkCT9dPP9FKQP6MIIbyz9D8AjKuPltcS5ay_6sRRZ_Z-ryQ5HwPydtrEhOsBt10QGWXp3N3ZMcqk906M5OPbW8xyDEY6cGE')",
                    filter: "sepia(0.3)",
                  }}
                ></div>
                <div className="mt-2 flex justify-between items-center text-xs px-1">
                  <span className="font-bold text-slate-500">Jan 12, 2026</span>
                  <span className="material-symbols-outlined text-sm text-slate-300 group-hover:text-red-500 fill-current">
                    favorite
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
