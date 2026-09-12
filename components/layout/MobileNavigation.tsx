"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const MOBILE_NAV_ITEMS = [
  { href: "/dashboard",    icon: "dashboard",      label: "Home" },
  { href: "/quests",       icon: "military_tech",  label: "Quests" },
  { href: "/character",   icon: "person",         label: "Character" },
  { href: "/achievements", icon: "emoji_events",   label: "Awards" },
  { href: "/settings",    icon: "settings",       label: "Settings" },
] as const

/**
 * MobileNavigation — fixed bottom tab bar for mobile screens.
 * Hidden on desktop (lg:hidden).
 * TODO: Replace placeholder markup with Stitch design.
 */
export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-background-secondary/95 backdrop-blur lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors",
                isActive ? "text-gold-400" : "text-white/50 hover:text-white/80",
              ].join(" ")}
            >
              <span className="material-symbols-rounded text-[22px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
