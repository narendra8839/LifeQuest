"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useHero } from "@/lib/stores/heroStore"
import { soundEngine } from "@/lib/utils/audio"
import { HelpModal } from "@/components/layout/HelpModal"

const NAV_ITEMS = [
  { href: "/dashboard",    label: "Dashboard",     sublabel: "Command Center",     icon: "shield" },
  { href: "/quests",       label: "Quests",        sublabel: "Quest Board",        icon: "swords" },
  { href: "/character",   label: "Character",     sublabel: "Codex Sanctorum",    icon: "person" },
  { href: "/achievements", label: "Achievements",  sublabel: "Archive Codex",      icon: "military_tech" },
  { href: "/settings",    label: "Settings",      sublabel: "Realm Config",       icon: "tune" },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, xpProgress } = useHero()
  const [helpOpen, setHelpOpen] = useState(false)

  const handleLogout = () => {
    soundEngine.playClick()
    if (typeof document !== "undefined") {
      document.cookie = "lifequest_guest_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
    router.push("/login")
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-white/8 bg-[#0c0e13] lg:flex">
        {/* Brand Header */}
        <div className="flex flex-col border-b border-white/8 px-6 py-5">
          <Link
            href="/dashboard"
            onClick={() => soundEngine.playClick()}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffc659] to-[#e5a92b] shadow-md shadow-[#ffc659]/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-rounded text-2xl text-black font-bold">shield</span>
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-wider text-[#ffc659] text-glow-gold">
                LIFEQUEST
              </span>
              <p className="text-[9px] font-semibold tracking-widest text-[#d4c4ae] uppercase opacity-75">
                Turn Life Into An Adventure
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-5" aria-label="Main Navigation">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
            Navigation Rail
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => soundEngine.playClick()}
                className={`group flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#641ea3] text-white shadow-lg shadow-[#641ea3]/40 border border-[#ddb8ff]/30 font-semibold"
                    : "text-[#d4c4ae] hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <span
                  className={`material-symbols-rounded text-[22px] transition-transform group-hover:scale-110 ${
                    isActive ? "text-[#f0dbff]" : "text-[#d4c4ae] group-hover:text-[#ffc659]"
                  }`}
                >
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <span className="leading-tight">{item.label}</span>
                  <span className="text-[10px] opacity-60 leading-tight font-normal">{item.sublabel}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Player mini-card & Footer */}
        <div className="border-t border-white/8 p-4 space-y-3 bg-[#111318]">
          <Link
            href="/character"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-3 rounded-xl bg-[#1a1b21] p-3 border border-white/5 hover:border-[#ffc659]/30 transition-all group"
          >
            <div className="relative">
              <img
                src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={profile.username || "Arjun"}
                className="h-10 w-10 rounded-lg object-cover ring-2 ring-[#641ea3]"
              />
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffc659] text-[9px] font-bold text-black">
                {profile.level}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-white truncate group-hover:text-[#ffc659] transition-colors">
                  {profile.username || "Arjun"}
                </p>
                <span className="text-[10px] text-[#ffc659] font-semibold">Lvl {profile.level}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ffc659] to-[#ddb8ff]"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </Link>

          {/* Footer utility links */}
          <div className="flex items-center justify-between px-1 text-xs text-white/50">
            <button
              onClick={() => {
                soundEngine.playClick()
                setHelpOpen(true)
              }}
              className="hover:text-[#ffc659] transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-rounded text-sm">menu_book</span>
              Help & Codices
            </button>
            <button
              onClick={handleLogout}
              className="hover:text-[#ffb4ab] transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-rounded text-sm">logout</span>
              Log Out
            </button>
          </div>
        </div>
      </aside>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  )
}
