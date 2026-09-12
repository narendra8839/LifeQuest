"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import type { Achievement, UserAchievement } from "@/types/achievement"

/**
 * useAchievements — fetches all achievements and the user's unlocked ones.
 */
export function useAchievements() {
  const { user }                              = useAuth()
  const [achievements, setAchievements]       = useState<Achievement[]>([])
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([])
  const [isLoading, setIsLoading]             = useState(true)
  const [error, setError]                     = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    setIsLoading(true)

    const queries: Promise<void>[] = [
      supabase
        .from("achievements")
        .select("*")
        .then(({ data, error }) => {
          if (error) setError(error.message)
          else setAchievements(data ?? [])
        }),
    ]

    if (user) {
      queries.push(
        supabase
          .from("user_achievements")
          .select("*, achievement:achievements(*)")
          .eq("user_id", user.id)
          .then(({ data, error }) => {
            if (error) setError(error.message)
            else setUserAchievements((data as UserAchievement[]) ?? [])
          })
      )
    }

    Promise.all(queries).finally(() => setIsLoading(false))
  }, [user])

  const unlockedIds = userAchievements.map((ua) => ua.achievement_id)

  return { achievements, userAchievements, unlockedIds, isLoading, error }
}
