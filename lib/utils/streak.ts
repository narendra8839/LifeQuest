/**
 * calculateStreak — computes the current streak based on an array of quest
 * completion timestamps (ISO strings), sorted newest first.
 *
 * A streak is maintained as long as there is at least one quest completed
 * each calendar day with no gaps.
 */
export function calculateStreak(completedAts: string[]): number {
  if (completedAts.length === 0) return 0

  const toDay = (iso: string) => new Date(iso).toISOString().slice(0, 10)

  // Get unique days in descending order
  const days = [...new Set(completedAts.map(toDay))].sort((a, b) => (a > b ? -1 : 1))

  let streak    = 1
  const today   = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)

  // If most recent completion is neither today nor yesterday, streak is broken
  if (days[0] !== today && days[0] !== yesterday) return 0

  for (let i = 0; i < days.length - 1; i++) {
    const curr = new Date(days[i])
    const prev = new Date(days[i + 1])
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86_400_000)
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

/**
 * isStreakActive — returns true if the player has completed at least one
 * quest today or yesterday (streak not yet broken).
 */
export function isStreakActive(completedAts: string[]): boolean {
  if (completedAts.length === 0) return false
  const today     = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
  return completedAts.some((iso) => {
    const day = new Date(iso).toISOString().slice(0, 10)
    return day === today || day === yesterday
  })
}
