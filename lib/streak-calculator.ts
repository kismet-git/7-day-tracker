// Calculate streak days
export const calculateStreak = (daysData: any[]): number => {
  let streak = 0

  for (let i = 0; i < daysData.length; i++) {
    if (daysData[i].completed) {
      streak++
    } else {
      break
    }
  }

  return streak
}

// Calculate days until next milestone
export const getDaysUntilMilestone = (completedDays: number): { days: number; milestone: string } => {
  if (completedDays < 3) return { days: 3 - completedDays, milestone: "3-day streak" }
  if (completedDays < 5) return { days: 5 - completedDays, milestone: "5-day streak" }
  if (completedDays < 7) return { days: 7 - completedDays, milestone: "completion" }
  return { days: 0, milestone: "completed" }
}
