"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import type { Achievement, UserAchievement } from "@/types/achievement"

/**
 * useAchievements — fetches all achievements and the user's unlocked ones.
 */
export function useAchievements() {
  const { user }                                = useAuth()
  const [achievements, setAchievements]         = useState<Achievement[]>([])
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([])
  const [isLoading, setIsLoading]               = useState(true)
  const [error, setError]                       = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const supabase = createClient()
    setIsLoading(true)

    async function loadData() {
      try {
        const { data: achData, error: achError } = await supabase
          .from("achievements")
          .select("*")

        if (achError) {
          if (mounted) setError(achError.message)
        } else if (mounted) {
          setAchievements((achData as Achievement[]) ?? [])
        }

        if (user) {
          const { data: uAchData, error: uAchError } = await supabase
            .from("user_achievements")
            .select("*, achievement:achievements(*)")
            .eq("user_id", user.id)

          if (uAchError) {
            if (mounted) setError(uAchError.message)
          } else if (mounted) {
            setUserAchievements((uAchData as UserAchievement[]) ?? [])
          }
        }
      } catch (err: any) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [user])

  const unlockedIds = userAchievements.map((ua) => ua.achievement_id)

  return { achievements, userAchievements, unlockedIds, isLoading, error }
}
