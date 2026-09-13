"use client"

import { useHero } from "@/lib/stores/heroStore"
import { soundEngine } from "@/lib/utils/audio"

export function AppearanceSettings() {
  const { preferences, updatePreferences } = useHero()

  const THEMES = [
    {
      id: "dark",
      name: "Dark Realm",
      desc: "Obsidian, gold & amethyst glow",
      colors: ["#111318", "#ffc659", "#ddb8ff"],
    },
    {
      id: "night",
      name: "Night Realm",
      desc: "Starlit black, cyan & cool silver",
      colors: ["#0a0e17", "#57dffe", "#acedff"],
    },
    {
      id: "arcane",
      name: "Arcane Realm",
      desc: "Purple nebula & shimmering lavender",
      colors: ["#150d1e", "#ddb8ff", "#641ea3"],
    },
    {
      id: "golden",
      name: "Golden Realm",
      desc: "Warm sepia, brass & sunburst runes",
      colors: ["#18140c", "#ffc659", "#e5a92b"],
    },
  ] as const

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a1b21] p-6 shadow-xl space-y-6">
      <div className="border-b border-white/8 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffc659]">
          <span className="material-symbols-rounded text-sm">palette</span>
          Atmospheric Aura
        </div>
        <h3 className="font-display text-xl font-bold text-white mt-0.5">Realm Appearance</h3>
        <p className="text-xs text-[#d4c4ae] mt-0.5">
          Select the runic aesthetic and interface density of your command realm.
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {THEMES.map((t) => {
          const isActive = preferences.theme === t.id

          return (
            <button
              type="button"
              key={t.id}
              onClick={() => {
                soundEngine.playClick()
                updatePreferences({ theme: t.id })
              }}
              className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                isActive
                  ? "border-[#ffc659] bg-[#111318] shadow-lg shadow-[#ffc659]/15 scale-[1.02]"
                  : "border-white/10 bg-[#0c0e13] hover:border-white/30 hover:bg-[#111318]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-sm text-white">{t.name}</span>
                {isActive ? (
                  <span className="rounded-full bg-[#ffc659] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-black">
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] text-white/40">Select</span>
                )}
              </div>

              <p className="text-[11px] text-[#d4c4ae] mt-1 line-clamp-1">{t.desc}</p>

              {/* Color Swatch Circles */}
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/5">
                {t.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </button>
          )
        })}
      </div>

      {/* Font Scale & Runic Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/8">
        {/* Font Scale */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80 block">
            Font Scale Metric
          </label>
          <div className="flex rounded-xl bg-[#0c0e13] p-1 border border-white/10 text-xs">
            {(["standard", "compact"] as const).map((scale) => (
              <button
                type="button"
                key={scale}
                onClick={() => {
                  soundEngine.playClick()
                  updatePreferences({ fontScale: scale })
                }}
                className={`flex-1 rounded-lg py-1.5 font-bold uppercase text-[11px] tracking-wider transition-all ${
                  preferences.fontScale === scale
                    ? "bg-[#ffc659] text-black shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {scale}
              </button>
            ))}
          </div>
        </div>

        {/* Runic Borders Toggle */}
        <div className="flex items-center justify-between rounded-xl bg-[#0c0e13] p-3.5 border border-white/10">
          <div>
            <span className="text-xs font-bold text-white block">Runic Border Accents</span>
            <span className="text-[10px] text-white/50">Gilded hairline highlights</span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              updatePreferences({ runicBorders: !preferences.runicBorders })
            }}
            className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
              preferences.runicBorders ? "bg-[#ffc659]" : "bg-white/20"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-black transition-transform ${
                preferences.runicBorders ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
