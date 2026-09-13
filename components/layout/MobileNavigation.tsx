"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { soundEngine } from "@/lib/utils/audio"

const MOBILE_NAV_ITEMS = [
  { href: "/dashboard",    icon: "shield",        label: "Home" },
  { href: "/quests",       icon: "swords",        label: "Quests" },
  { href: "/character",   icon: "person",        label: "Hero" },
  { href: "/achievements", icon: "military_tech", label: "Codex" },
  { href: "/settings",    icon: "tune",          label: "Realm" },
] as const

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-[#0c0e13]/95 backdrop-blur-lg lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => soundEngine.playClick()}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-medium transition-all ${
                isActive
                  ? "text-[#ffc659] font-bold"
                  : "text-[#d4c4ae]/60 hover:text-white"
              }`}
            >
              <span
                className={`material-symbols-rounded text-[22px] transition-transform ${
                  isActive ? "text-[#ffc659] scale-110" : ""
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
