"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import type { Profile, Attributes } from "@/types/profile"

/**
 * useProfile — fetches and caches the current user's profile and attributes.
 */
export function useProfile() {
  const { user }                    = useAuth()
  const [profile, setProfile]       = useState<Profile | null>(null)
  const [attributes, setAttributes] = useState<Attributes | null>(null)
  const [isLoading, setIsLoading]   = useState(true)
  const [error, setError]           = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("attributes").select("*").eq("user_id", user.id).single(),
    ])
      .then(([{ data: profileData }, { data: attrData }]) => {
        setProfile(profileData)
        setAttributes(attrData)
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [user])

  return { profile, attributes, isLoading, error }
}
