import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Realm Settings",
  description: "Manage your LifeQuest account, profile, and preferences.",
}

/**
 * Settings / Realm Settings page — placeholder.
 * Full UI will be implemented from the Stitch design.
 */
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold text-gold-400 text-glow-gold">
        Realm Settings
      </h1>
      {/* TODO: ProfileSettings, AccountSettings, AppearanceSettings,
               NotificationSettings, AccessibilitySettings, SecuritySettings */}
    </div>
  )
}
