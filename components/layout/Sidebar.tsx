"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { href: "/dashboard",    label: "Command Center",     icon: "dashboard" },
  { href: "/quests",       label: "Quest Board",        icon: "military_tech" },
  { href: "/character",   label: "Character Sanctum",  icon: "person" },
  { href: "/achievements", label: "Achievement Codex",  icon: "emoji_events" },
  { href: "/settings",    label: "Realm Settings",     icon: "settings" },
] as const

/**
 * Sidebar — desktop-only navigation rail.
 * Hidden on mobile (lg:flex).
 * TODO: Replace placeholder markup with Stitch design.
 */
export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/8 bg-background-secondary lg:flex">
      {/* Logo / Branding */}
      <div className="flex h-16 items-center gap-3 border-b border-white/8 px-6">
        <span className="font-display text-xl font-bold text-gold-400 text-glow-gold">
          LifeQuest
        </span>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gold-500/10 text-gold-400"
                  : "text-white/60 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <span className="material-symbols-rounded text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Player mini-card at bottom — TODO from Stitch design */}
      <div className="border-t border-white/8 p-4">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-white/40">Player</p>
          {/* TODO: PlayerMiniCard component */}
        </div>
      </div>
    </aside>
  )
}
