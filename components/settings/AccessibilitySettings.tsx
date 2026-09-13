"use client"

import { useHero } from "@/lib/stores/heroStore"
import { soundEngine } from "@/lib/utils/audio"

export function AccessibilitySettings() {
  const { preferences, updatePreferences } = useHero()

  const TOGGLES = [
    {
      key: "reduceMotion",
      label: "Reduce Motion",
      desc: "Minimize celebratory particle explosions and screen shakes",
      icon: "motion_photos_off",
      val: preferences.reduceMotion,
    },
    {
      key: "highContrast",
      label: "High Contrast Mode",
      desc: "Elevate text luminosity deltas on ambient parchment cards",
      icon: "contrast",
      val: preferences.highContrast,
    },
    {
      key: "dyslexicFont",
      label: "Dyslexic-Friendly Typography",
      desc: "Override serif titling with hyper-legible weighted sans-serif glyphs",
      icon: "spellcheck",
      val: preferences.dyslexicFont,
    },
    {
      key: "fullKeyboardNav",
      label: "Full Keyboard Navigation",
      desc: "Comprehensive Tab, Space, and Escape focus rings across all modals",
      icon: "keyboard",
      val: preferences.fullKeyboardNav,
    },
  ] as const

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-4">
      <div className="border-b border-white/8 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#57dffe]">
          <span className="material-symbols-rounded text-sm">accessibility_new</span>
          Inclusive Sanctuary
        </div>
        <h3 className="font-display text-xl font-bold text-white mt-0.5">Accessibility Controls</h3>
        <p className="text-xs text-[#d4c4ae] mt-0.5">
          Tune sensory feedback and visual readability to your preferences.
        </p>
      </div>

      <div className="space-y-3">
        {TOGGLES.map((t) => (
          <div
            key={t.key}
            className="flex items-center justify-between rounded-xl bg-[#0c0e13] p-3.5 border border-white/5 hover:border-white/15 transition-all"
          >
            <div className="flex items-start gap-3 pr-4">
              <span className="material-symbols-rounded text-lg text-[#57dffe] mt-0.5">{t.icon}</span>
              <div>
                <span className="text-xs font-bold text-white block">{t.label}</span>
                <span className="text-[11px] text-[#d4c4ae]/70 leading-snug">{t.desc}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick()
                updatePreferences({ [t.key]: !t.val })
              }}
              className={`flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${
                t.val ? "bg-[#57dffe]" : "bg-white/20"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-black transition-transform ${
                  t.val ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
