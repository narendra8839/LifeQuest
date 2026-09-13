"use client"

import { useHero } from "@/lib/stores/heroStore"
import { soundEngine } from "@/lib/utils/audio"

export function AccountSettings() {
  const { preferences, updatePreferences } = useHero()

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-5">
      <div className="border-b border-white/8 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ddb8ff]">
          <span className="material-symbols-rounded text-sm">notifications_active</span>
          Chronicle Wards & Alerts
        </div>
        <h3 className="font-display text-xl font-bold text-white mt-0.5">Notifications & Wards</h3>
        <p className="text-xs text-[#d4c4ae] mt-0.5">
          Configure sensory chimes and reminder alerts across the astral planes.
        </p>
      </div>

      <div className="space-y-3">
        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between rounded-xl bg-[#0c0e13] p-3.5 border border-white/5">
          <div>
            <span className="text-xs font-bold text-white block">RPG Sound FX & Fanfares</span>
            <span className="text-[10px] text-white/50">Procedural audio chimes upon quest victory & level-ups</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const muted = soundEngine.toggleMute()
              updatePreferences({ soundEnabled: !muted })
              if (!muted) soundEngine.playCoin()
            }}
            className={`flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${
              preferences.soundEnabled ? "bg-[#ffc659]" : "bg-white/20"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-black transition-transform ${
                preferences.soundEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Daily Reminders */}
        <div className="flex items-center justify-between rounded-xl bg-[#0c0e13] p-3.5 border border-white/5">
          <div>
            <span className="text-xs font-bold text-white block">Daily Quest Dawn Reminders</span>
            <span className="text-[10px] text-white/50">Prompt to inspect and conquer objectives each morning</span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              updatePreferences({ dailyReminders: !preferences.dailyReminders })
            }}
            className={`flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${
              preferences.dailyReminders ? "bg-[#57dffe]" : "bg-white/20"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-black transition-transform ${
                preferences.dailyReminders ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Streak Saver Alerts */}
        <div className="flex items-center justify-between rounded-xl bg-[#0c0e13] p-3.5 border border-white/5">
          <div>
            <span className="text-xs font-bold text-white block">Streak Saver Midnight Alerts</span>
            <span className="text-[10px] text-white/50">Urgent ward alert if no quest has been conquered by dusk</span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              updatePreferences({ streakAlerts: !preferences.streakAlerts })
            }}
            className={`flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${
              preferences.streakAlerts ? "bg-[#ffb4ab]" : "bg-white/20"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-black transition-transform ${
                preferences.streakAlerts ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
