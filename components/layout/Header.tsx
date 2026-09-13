"use client"

import { useState } from "react"
import Link from "next/link"
import { useHero } from "@/lib/stores/heroStore"
import { soundEngine } from "@/lib/utils/audio"
import { RewardsVaultModal } from "@/components/rewards/RewardsVaultModal"

interface HeaderProps {
  onMobileMenuToggle?: () => void
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const { profile, userAchievements } = useHero()
  const [vaultOpen, setVaultOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted())

  const handleSoundToggle = () => {
    const muted = soundEngine.toggleMute()
    setIsMuted(muted)
    if (!muted) soundEngine.playCoin()
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-[#1a1b21]/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        {/* Left: Mobile hamburger & breadcrumb/status */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              onMobileMenuToggle?.()
            }}
            className="rounded-lg p-2 text-white/70 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <span className="material-symbols-rounded text-2xl">menu</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#d4c4ae]">
            <span className="pulse-indicator" />
            <span className="font-medium text-white/80">Cloud Codex Link</span>
            <span className="text-[10px] text-[#57dffe] font-semibold uppercase tracking-wider bg-[#57dffe]/10 px-2 py-0.5 rounded-full border border-[#57dffe]/20">
              Synchronized
            </span>
          </div>
        </div>

        {/* Right: Gamified Stats, Audio Toggle, Notifications, User */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#111318] text-white/70 hover:border-[#ffc659]/40 hover:text-[#ffc659] transition-all"
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            aria-label="Toggle Sound Effects"
          >
            <span className="material-symbols-rounded text-lg">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </button>

          {/* Gold Indicator Pill - Interactive */}
          <button
            onClick={() => {
              soundEngine.playClick()
              setVaultOpen(true)
            }}
            className="flex items-center gap-1.5 rounded-full border border-[#ffc659]/30 bg-[#ffc659]/10 px-3 py-1.5 text-xs font-bold text-[#ffc659] shadow-sm hover:bg-[#ffc659]/20 hover:scale-105 transition-all cursor-pointer group"
            title="Open Rewards Vault"
          >
            <span className="text-sm">🪙</span>
            <span>{profile.gold.toLocaleString()} Gold</span>
            <span className="text-[10px] opacity-70 group-hover:opacity-100">🛒</span>
          </button>

          {/* Battle Streak Pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-[#ffb4ab]/30 bg-[#ffb4ab]/10 px-3 py-1.5 text-xs font-bold text-[#ffb4ab] shadow-sm">
            <span className="text-sm">🔥</span>
            <span>{profile.streak} Day Streak</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                soundEngine.playClick()
                setNotifOpen(!notifOpen)
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#111318] text-white/70 hover:border-[#57dffe]/40 hover:text-white transition-all"
              aria-label="Notifications"
            >
              <span className="material-symbols-rounded text-lg">notifications</span>
              {userAchievements.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#57dffe] text-[9px] font-bold text-black">
                  {userAchievements.length}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl border border-white/10 bg-[#1e1f25] p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-white/8 pb-2 px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ffc659]">Chronicle Wards</span>
                  <span className="text-[10px] text-white/40">{userAchievements.length} Unlocks</span>
                </div>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto pr-1">
                  {userAchievements.slice(0, 4).map((ua) => (
                    <div key={ua.id} className="flex items-start gap-2.5 rounded-lg bg-[#111318] p-2 border border-white/5">
                      <span className="material-symbols-rounded text-[#ffc659] text-base mt-0.5">military_tech</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{ua.achievement?.name || "Achievement Unlocked"}</p>
                        <p className="text-[10px] text-white/50 truncate">{ua.achievement?.description}</p>
                      </div>
                    </div>
                  ))}
                  {userAchievements.length === 0 && (
                    <p className="py-4 text-center text-xs text-white/40">No alerts yet. Conquer quests to make history!</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Mini Block */}
          <Link
            href="/character"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-2.5 rounded-lg p-1 hover:bg-white/5 transition-all group"
          >
            <div className="relative">
              <img
                src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={profile.username || "Arjun"}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-[#641ea3] group-hover:ring-[#ffc659] transition-all"
              />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white group-hover:text-[#ffc659] transition-colors leading-none">
                {profile.username || "Arjun"}
              </span>
              <span className="text-[10px] text-[#d4c4ae] mt-0.5 leading-none">
                Lvl {profile.level} Warrior-Scholar
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Rewards Vault / Armory Modal */}
      <RewardsVaultModal open={vaultOpen} onClose={() => setVaultOpen(false)} />
    </>
  )
}
