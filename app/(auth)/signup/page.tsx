import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your LifeQuest account and begin your adventure.",
}

/**
 * Signup page — placeholder.
 * Full UI will be implemented from the Stitch design.
 */
export default function SignupPage() {
  return (
    <div className="rpg-panel w-full max-w-md p-8">
      <h1 className="font-display text-3xl font-bold text-gold-400 text-glow-gold">
        Begin Your Quest
      </h1>
      <p className="mt-2 text-sm text-white/60">Create your account to start your adventure.</p>
      {/* TODO: Implement SignupForm component */}
    </div>
  )
}
