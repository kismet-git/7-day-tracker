// Achievement system for gamification
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: number
}

export const checkAchievements = (daysData: any[], streakDays: number): Achievement[] => {
  return [
    {
      id: "first_day",
      title: "First Steps",
      description: "Complete your first day",
      icon: "🌱",
      earned: daysData.some((d) => d.completed),
      earnedAt: daysData.find((d) => d.completed)?.completedAt,
    },
    {
      id: "three_day_streak",
      title: "Building Momentum",
      description: "Complete 3 days in a row",
      icon: "🔥",
      earned: streakDays >= 3,
      earnedAt: daysData[2]?.completedAt,
    },
    {
      id: "halfway",
      title: "Halfway Hero",
      description: "Complete 4 days",
      icon: "⭐",
      earned: daysData.filter((d) => d.completed).length >= 4,
      earnedAt: daysData[3]?.completedAt,
    },
    {
      id: "seven_day_master",
      title: "AI Master",
      description: "Complete all 7 days",
      icon: "🏆",
      earned: daysData.filter((d) => d.completed).length === 7,
      earnedAt: daysData[6]?.completedAt,
    },
    {
      id: "dedicated",
      title: "Dedicated Learner",
      description: "Complete 3 days without skipping",
      icon: "💎",
      earned: streakDays >= 3,
      earnedAt: daysData[2]?.completedAt,
    },
  ]
}

export const getNewAchievements = (oldAchievements: Achievement[], newAchievements: Achievement[]): Achievement[] => {
  return newAchievements.filter(
    (newAch) => newAch.earned && !oldAchievements.find((old) => old.id === newAch.id && old.earned),
  )
}
