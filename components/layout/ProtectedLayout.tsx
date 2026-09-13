"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { MobileNavigation } from "@/components/layout/MobileNavigation"
import { LevelUpModal } from "@/components/character/LevelUpModal"
import { useHero } from "@/lib/stores/heroStore"

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { preferences, levelUpModal, closeLevelUpModal } = useHero()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  // Apply theme & accessibility classes to body
  useEffect(() => {
    if (typeof document === "undefined") return
    const body = document.body

    // Reset theme classes
    body.classList.remove("theme-dark", "theme-night", "theme-arcane", "theme-golden")
    body.classList.add(`theme-${preferences.theme}`)

    // Font scale
    if (preferences.fontScale === "compact") {
      body.classList.add("font-compact")
    } else {
      body.classList.remove("font-compact")
    }

    // High contrast
    if (preferences.highContrast) {
      body.classList.add("high-contrast")
    } else {
      body.classList.remove("high-contrast")
    }

    // Dyslexic font
    if (preferences.dyslexicFont) {
      body.classList.add("dyslexic-font")
    } else {
      body.classList.remove("dyslexic-font")
    }
  }, [preferences])

  return (
    <div className="flex min-h-screen bg-[#0c0e13] text-[#e2e2e9]">
      {/* Desktop sidebar - 288px (w-72) */}
      <Sidebar />

      {/* Main content area offset by 288px on lg screens */}
      <div className="flex flex-1 flex-col lg:pl-72 min-w-0">
        <Header onMobileMenuToggle={() => setMobileDrawerOpen(!mobileDrawerOpen)} />

        <main className="flex-1 pb-20 lg:pb-12">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNavigation />

      {/* Global Level Up Victory Celebration */}
      {levelUpModal && (
        <LevelUpModal
          open={levelUpModal.isOpen}
          onClose={closeLevelUpModal}
          previousLevel={levelUpModal.previousLevel}
          newLevel={levelUpModal.newLevel}
          xpGained={levelUpModal.xpGained}
          goldGained={levelUpModal.goldGained}
        />
      )}
    </div>
  )
}
