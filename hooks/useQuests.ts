"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState, useCallback } from "react"
import { useAuth } from "@/hooks/useAuth"
import type { Quest } from "@/types/quest"

/**
 * useQuests — fetches and manages the current user's quests.
 */
export function useQuests() {
  const { user }              = useAuth()
  const [quests, setQuests]   = useState<Quest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  const fetchQuests = useCallback(async () => {
    if (!user) return
    setIsLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from("quests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) setError(error.message)
    else setQuests((data as Quest[]) ?? [])
    setIsLoading(false)
  }, [user])

  useEffect(() => { fetchQuests() }, [fetchQuests])

  return { quests, isLoading, error, refetch: fetchQuests }
}
