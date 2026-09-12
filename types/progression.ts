export interface ProgressionState {
  level:          number
  xp:             number
  xpToNextLevel:  number
  levelProgress:  number   // 0–100 percentage
  gold:           number
  streak:         number
  isStreakActive: boolean
}

export interface LevelUpEvent {
  previousLevel: number
  newLevel:      number
  xpGained:      number
  goldGained:    number
}
