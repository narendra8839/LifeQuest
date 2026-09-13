"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { soundEngine } from "@/lib/utils/audio"

export default function SignupPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGuestLogin = () => {
    soundEngine.playQuestComplete()
    if (typeof document !== "undefined") {
      document.cookie = "lifequest_guest_session=true; path=/; max-age=864000; SameSite=Lax"
    }
    router.push("/dashboard")
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    soundEngine.playClick()

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })

      if (authError) {
        setError(authError.message)
      } else {
        soundEngine.playQuestComplete()
        router.push("/dashboard")
      }
    } catch {
      handleGuestLogin()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-6 sm:p-8 space-y-6 rounded-2xl border border-white/10 bg-[#161829] shadow-2xl relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#641ea3]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#ffc659]/15 blur-3xl pointer-events-none" />

      <div className="text-center space-y-2 relative z-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffc659] to-[#e5a92b] shadow-lg shadow-[#ffc659]/25">
          <span className="material-symbols-rounded text-3xl text-black font-bold">shield</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold text-white text-glow-gold tracking-wide">
          Forge Your Legend
        </h1>
        <p className="text-xs text-[#d4c4ae]">
          Inscribe your name into the Vanguard rolls and begin your adventure.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4 relative z-10">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">
            Hero Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Arjun the Arcane"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ffc659] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">
            Ward Email
          </label>
          <input
            type="email"
            required
            placeholder="hero@realm.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ffc659] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-white/80">
            Cipher Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0c0e13] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ffc659] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-[#ffc659] to-[#e5a92b] py-3 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#ffc659]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? "Forging Record..." : "Create Account & Ascend"}
        </button>
      </form>

      <div className="relative z-10 pt-2 border-t border-white/10 space-y-3">
        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#57dffe]/30 bg-[#57dffe]/10 py-2.5 text-xs font-bold uppercase tracking-wider text-[#57dffe] hover:bg-[#57dffe]/20 shadow-md transition-all cursor-pointer"
        >
          <span className="material-symbols-rounded text-sm">bolt</span>
          ⚡ Enter as Guest Hero (Instant Demo)
        </button>

        <p className="text-center text-xs text-white/50">
          Already inscribed?{" "}
          <Link href="/login" className="text-[#ffc659] font-bold hover:underline">
            Resume Quest
          </Link>
        </p>
      </div>
    </div>
  )
}
