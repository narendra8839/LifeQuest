import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your LifeQuest account and continue your adventure.",
}

/**
 * Login page — placeholder.
 * Full UI will be implemented from the Stitch design.
 */
export default function LoginPage() {
  return (
    <div className="rpg-panel w-full max-w-md p-8">
      <h1 className="font-display text-3xl font-bold text-gold-400 text-glow-gold">
        Welcome Back, Hero
      </h1>
      <p className="mt-2 text-sm text-white/60">Sign in to continue your quest.</p>
      {/* TODO: Implement LoginForm component */}
    </div>
  )
}
