"use client"

import { useHero } from "@/lib/stores/heroStore"

export function CollectibleBadges() {
  const { unlockedBadges } = useHero()

  const BADGES = [
    {
      title: "Deep Focus Sage",
      status: "earned",
      progress: 100,
      icon: "psychology",
      desc: "Logged 100 deep work hours without broken streak.",
    },
    {
      title: "Flame of Fortitude",
      status: "earned",
      progress: 100,
      icon: "local_fire_department",
      desc: "Held 7+ day battle streak across any month.",
    },
    {
      title: "Binary Alchemist",
      status: "earned",
      progress: 100,
      icon: "code",
      desc: "Conquered 40+ coding and algorithms quests.",
    },
    {
      title: "Tome Devourer",
      status: "in_progress",
      progress: 75,
      current: 24,
      target: 30,
      icon: "menu_book",
      desc: "Study 30 technical volumes and codices (24/30).",
    },
    {
      title: "Titan of Discipline",
      status: "locked",
      progress: 0,
      icon: "military_tech",
      desc: "Reach Level 20 and achieve flawless month of daily rituals.",
    },
  ]

  const earnedCount = BADGES.filter((b) => b.status === "earned" || unlockedBadges.includes(b.title)).length

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/8 pb-3">
        <div>
          <span className="label-caps text-[#ffc659] text-[10px]">Insignias & Accolades</span>
          <h4 className="font-display text-xl font-bold text-white mt-0.5">Collectible Badges Showcase</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#ffc659]/10 border border-[#ffc659]/30 px-3 py-0.5 text-xs font-bold text-[#ffc659]">
            {earnedCount} Earned
          </span>
          <span className="rounded-full bg-[#57dffe]/10 border border-[#57dffe]/30 px-3 py-0.5 text-xs font-bold text-[#57dffe]">
            1 In Progress
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {BADGES.map((b) => {
          const isEarned = b.status === "earned" || unlockedBadges.includes(b.title)

          return (
            <div
              key={b.title}
              className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all ${
                isEarned
                  ? "border-[#ffc659]/30 bg-[#0c0e13] shadow-md hover:border-[#ffc659]"
                  : b.status === "in_progress"
                  ? "border-[#57dffe]/30 bg-[#0c0e13] hover:border-[#57dffe]"
                  : "border-white/5 bg-[#0c0e13]/50 opacity-45"
              }`}
            >
              {/* Circular Icon / SVG Progress */}
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                {b.status === "in_progress" && (
                  <svg className="absolute inset-0 h-full w-full -rotate-90">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="#57dffe"
                      strokeWidth="3"
                      strokeDasharray="113"
                      strokeDashoffset={113 - (113 * b.progress) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isEarned ? "bg-[#ffc659]/10 text-[#ffc659]" : b.status === "in_progress" ? "text-[#57dffe]" : "text-white/30"
                }`}>
                  <span className="material-symbols-rounded text-xl">{b.icon}</span>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs text-white truncate">{b.title}</h5>
                  {isEarned && (
                    <span className="material-symbols-rounded text-sm text-[#ffc659]">verified</span>
                  )}
                </div>
                <p className="text-[11px] text-[#d4c4ae]/80 mt-1 leading-snug line-clamp-2">{b.desc}</p>
                {b.status === "in_progress" && (
                  <span className="text-[10px] font-mono text-[#57dffe] font-bold block mt-1">
                    {b.current} / {b.target} ({b.progress}%)
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
