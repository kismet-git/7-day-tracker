"use client"

import { useState, useEffect } from "react"
import { WelcomeScreen } from "@/components/screens/welcome-screen"
import { DayScreen } from "@/components/screens/day-screen"
import { CompletionScreen } from "@/components/screens/completion-screen"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Navigation } from "@/components/ui/navigation"
import { AchievementPopup } from "@/components/ui/achievement-popup"
import { analytics } from "@/lib/analytics"
import { checkAchievements, getNewAchievements, type Achievement } from "@/lib/achievements"
import { calculateStreak } from "@/lib/streak-calculator"
import { safeStorage, sanitizeInput, validateInputLength, rateLimiter } from "@/lib/security"

export interface DayData {
  day: number
  task: string
  context: string
  icon: string
  template: string
  templateExample: string
  completed: boolean
  userResponse: string
  userPrompt: string
  completedAt?: number
}

const initialDaysData: DayData[] = [
  {
    day: 1,
    task: "Ask ChatGPT to summarize a long article or email",
    context:
      "Copy and paste any long text and ask: 'Summarize this in 3 key points.' Perfect for busy professionals who need to process information quickly.",
    icon: "📄",
    template:
      "I'm a [YOUR ROLE] and I need to quickly understand this [TYPE OF DOCUMENT]. Please summarize this in [NUMBER] key points that focus on [WHAT'S MOST IMPORTANT TO YOU]:\n\n[PASTE YOUR TEXT HERE]",
    templateExample:
      "I'm a project manager and I need to quickly understand this client email. Please summarize this in 3 key points that focus on action items and deadlines:\n\n[Your long email text here]",
    completed: false,
    userResponse: "",
    userPrompt: "",
  },
  {
    day: 2,
    task: "Get help writing a professional response",
    context:
      "Try: 'Help me write a polite response to this email' or 'Make this message sound more professional.' See how it improves your communication.",
    icon: "💼",
    template:
      "I need to write a [TYPE OF MESSAGE] to [WHO YOU'RE WRITING TO]. The tone should be [PROFESSIONAL/FRIENDLY/FORMAL] and I need to [YOUR MAIN GOAL]. Here's the context: [BACKGROUND INFO]\n\nPlease help me write this message.",
    templateExample:
      "I need to write a follow-up email to a potential client. The tone should be professional but friendly and I need to schedule a meeting. Here's the context: We met at a conference last week and discussed their marketing challenges.\n\nPlease help me write this message.",
    completed: false,
    userResponse: "",
    userPrompt: "",
  },
  {
    day: 3,
    task: "Ask ChatGPT to explain something work-related in simple terms",
    context:
      "Stuck on a concept? Ask: 'Explain [industry term/process] like I'm new to this field.' Turn complex jargon into clear understanding.",
    icon: "🧠",
    template:
      "I'm [YOUR BACKGROUND/ROLE] and I need to understand [CONCEPT/TERM/PROCESS]. Please explain this like I'm [YOUR EXPERIENCE LEVEL] and focus on [WHAT YOU NEED TO KNOW MOST]. Also include [HOW YOU'LL USE THIS INFO].",
    templateExample:
      "I'm a new marketing coordinator and I need to understand conversion rate optimization. Please explain this like I'm a beginner and focus on practical steps I can take. Also include how this impacts our monthly reporting.",
    completed: false,
    userResponse: "",
    userPrompt: "",
  },
  {
    day: 4,
    task: "Create a quick to-do list or action plan",
    context:
      "Try: 'Help me break down [your project] into 5 actionable steps.' Let AI help you organize overwhelming tasks into manageable pieces.",
    icon: "✅",
    template:
      "I need to [YOUR BIG GOAL/PROJECT] by [DEADLINE]. I have [TIME AVAILABLE] and my main constraints are [LIMITATIONS]. Please break this down into [NUMBER] actionable steps, prioritized by [WHAT'S MOST IMPORTANT].",
    templateExample:
      "I need to launch a new employee onboarding program by next month. I have 2 hours per week and my main constraints are limited budget and no design skills. Please break this down into 5 actionable steps, prioritized by impact on new hire experience.",
    completed: false,
    userResponse: "",
    userPrompt: "",
  },
  {
    day: 5,
    task: "Get ideas for solving a real problem you're facing",
    context:
      "Ask: 'I'm struggling with [specific challenge]. What are 3 different approaches I could try?' Use AI as your brainstorming partner.",
    icon: "💡",
    template:
      "I'm struggling with [SPECIFIC PROBLEM]. My goal is [WHAT SUCCESS LOOKS LIKE] but I'm facing [MAIN OBSTACLES]. I've already tried [WHAT YOU'VE DONE] but [WHY IT DIDN'T WORK]. What are [NUMBER] different approaches I could try?",
    templateExample:
      "I'm struggling with low team engagement in our weekly meetings. My goal is to have productive discussions where everyone contributes but I'm facing people being distracted and not participating. I've already tried shorter meetings but people still seem disengaged. What are 4 different approaches I could try?",
    completed: false,
    userResponse: "",
    userPrompt: "",
  },
  {
    day: 6,
    task: "Have ChatGPT help you prepare for something",
    context:
      "Try: 'Help me prepare talking points for [meeting/presentation]' or 'What questions should I ask in [situation]?' Get ready with AI's help.",
    icon: "🎯",
    template:
      "I'm preparing for [EVENT/MEETING/SITUATION] with [WHO YOU'RE MEETING]. My main objectives are [YOUR GOALS]. The audience cares most about [THEIR PRIORITIES]. Please help me prepare [WHAT YOU NEED] and anticipate [POTENTIAL CHALLENGES].",
    templateExample:
      "I'm preparing for a quarterly review meeting with my manager. My main objectives are to show my progress and discuss a promotion. The audience cares most about results and team impact. Please help me prepare talking points and anticipate questions about my performance.",
    completed: false,
    userResponse: "",
    userPrompt: "",
  },
  {
    day: 7,
    task: "Ask for feedback on your own writing or ideas",
    context:
      "Paste something you wrote and ask: 'How can I make this clearer and more persuasive?' Learn to use AI as your personal editor and advisor.",
    icon: "✨",
    template:
      "I wrote this [TYPE OF CONTENT] for [AUDIENCE]. My goal is to [WHAT YOU WANT TO ACHIEVE]. Please review this and suggest how to make it [MORE CLEAR/PERSUASIVE/ENGAGING]. Focus on [SPECIFIC AREAS YOU'RE CONCERNED ABOUT]:\n\n[PASTE YOUR CONTENT HERE]",
    templateExample:
      "I wrote this proposal email for my boss. My goal is to get approval for a new software tool. Please review this and suggest how to make it more persuasive. Focus on addressing potential budget concerns:\n\n[Your email content here]",
    completed: false,
    userResponse: "",
    userPrompt: "",
  },
]

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000
const STORAGE_KEY = "chatgpt-habit-builder"

export function HabitBuilderApp() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "day" | "completion">("welcome")
  const [currentDay, setCurrentDay] = useState(1)
  const [daysData, setDaysData] = useState<DayData[]>(initialDaysData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [streakDays, setStreakDays] = useState(0)

  // Load saved progress with security validation
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const savedData = safeStorage.get(STORAGE_KEY)

        if (savedData) {
          setDaysData(savedData.daysData || initialDaysData)
          setCurrentDay(savedData.currentDay || 1)
          setCurrentScreen(savedData.currentScreen || "welcome")

          // Calculate streak
          const streak = calculateStreak(savedData.daysData || initialDaysData)
          setStreakDays(streak)

          // Load achievements
          const savedAchievements = checkAchievements(savedData.daysData || initialDaysData, streak)
          setAchievements(savedAchievements)
        }
        analytics.page("app_loaded")
      } catch (e: any) {
        console.error("Load error:", e)
        setError("Failed to load your progress. Your data may be corrupted.")
        analytics.track("error", { message: "load_failed", type: "load_data" })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Save progress with security validation
  useEffect(() => {
    if (!isLoading) {
      try {
        const success = safeStorage.set(STORAGE_KEY, {
          daysData,
          currentDay,
          currentScreen,
        })

        if (!success) {
          console.warn("Failed to save progress")
        }
      } catch (e: any) {
        console.error("Save error:", e)
        analytics.track("error", { message: "save_failed", type: "save_data" })
      }
    }
  }, [daysData, currentDay, currentScreen, isLoading])

  const completedDays = daysData.filter((day) => day.completed).length
  const progressPercentage = (completedDays / 7) * 100

  const isDayUnlocked = (dayNumber: number): boolean => {
    if (dayNumber === 1) return true
    const previousDay = daysData[dayNumber - 2]
    if (!previousDay?.completed || !previousDay?.completedAt) return false
    const now = Date.now()
    const timeSinceCompletion = now - previousDay.completedAt
    return timeSinceCompletion >= TWENTY_FOUR_HOURS
  }

  const getTimeUntilUnlock = (dayNumber: number): number => {
    if (dayNumber === 1) return 0
    const previousDay = daysData[dayNumber - 2]
    if (!previousDay?.completed || !previousDay?.completedAt) return 0
    const now = Date.now()
    const unlockTime = previousDay.completedAt + TWENTY_FOUR_HOURS
    return Math.max(0, unlockTime - now)
  }

  const startChallenge = () => {
    if (!rateLimiter.isAllowed("start_challenge", 5, 60000)) {
      console.warn("Rate limit exceeded for starting challenge")
      return
    }

    setCurrentScreen("day")
    setCurrentDay(1)
    analytics.track("challenge_started")
  }

  const goToDay = (day: number) => {
    if (!rateLimiter.isAllowed("navigate_day", 20, 60000)) {
      console.warn("Rate limit exceeded for day navigation")
      return
    }

    const canAccess = day === 1 || (daysData[day - 2]?.completed && isDayUnlocked(day))
    if (canAccess) {
      setCurrentDay(day)
      setCurrentScreen("day")
      analytics.track("day_viewed", { day })
    }
  }

  const completeDay = (dayNumber: number, userPrompt: string, userResponse: string) => {
    if (!rateLimiter.isAllowed(`complete_day_${dayNumber}`, 3, 60000)) {
      console.warn("Rate limit exceeded for completing day")
      return
    }

    // Validate and sanitize inputs
    if (!validateInputLength(userPrompt, 10000) || !validateInputLength(userResponse, 10000)) {
      setError("Input too long. Please keep your responses under 10,000 characters.")
      return
    }

    const sanitizedPrompt = sanitizeInput(userPrompt)
    const sanitizedResponse = sanitizeInput(userResponse)
    const completedAt = Date.now()

    setDaysData((prev) => {
      const updated = prev.map((day) =>
        day.day === dayNumber
          ? { ...day, completed: true, userPrompt: sanitizedPrompt, userResponse: sanitizedResponse, completedAt }
          : day,
      )

      // Calculate new streak
      const newStreak = calculateStreak(updated)
      setStreakDays(newStreak)

      // Check for new achievements
      const oldAchievements = achievements
      const newAchievements = checkAchievements(updated, newStreak)
      setAchievements(newAchievements)

      const justEarned = getNewAchievements(oldAchievements, newAchievements)
      if (justEarned.length > 0) {
        setNewAchievement(justEarned[0])
        analytics.track("achievement_earned", {
          achievement: justEarned[0].id,
          day: dayNumber,
        })
      }

      return updated
    })

    analytics.track("day_completed", {
      day: dayNumber,
      streak: streakDays + 1,
    })

    if (dayNumber === 7) {
      setCurrentScreen("completion")
      analytics.track("challenge_completed")
    }
  }

  const resetProgress = () => {
    if (!rateLimiter.isAllowed("reset_progress", 3, 60000)) {
      console.warn("Rate limit exceeded for reset")
      return
    }

    setDaysData(initialDaysData)
    setCurrentDay(1)
    setCurrentScreen("welcome")
    setAchievements([])
    setStreakDays(0)
    safeStorage.remove(STORAGE_KEY)
    analytics.track("progress_reset")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">⏳</div>
          <div className="text-lg font-semibold text-gray-700">Loading your progress...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-4xl mb-4">❌</div>
          <div className="text-lg font-semibold text-red-600 mb-4">{error}</div>
          <button
            onClick={() => {
              setError(null)
              window.location.reload()
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  if (currentScreen === "welcome") {
    return (
      <>
        <WelcomeScreen
          onStart={startChallenge}
          completedDays={completedDays}
          streakDays={streakDays}
          achievements={achievements}
        />
        <AchievementPopup achievement={newAchievement} onClose={() => setNewAchievement(null)} />
      </>
    )
  }

  if (currentScreen === "completion") {
    return (
      <>
        <CompletionScreen onRestart={resetProgress} daysData={daysData} achievements={achievements} />
        <AchievementPopup achievement={newAchievement} onClose={() => setNewAchievement(null)} />
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
          <ProgressBar current={completedDays} total={7} percentage={progressPercentage} streakDays={streakDays} />
          <Navigation
            currentDay={currentDay}
            daysData={daysData}
            onDaySelect={goToDay}
            onReset={resetProgress}
            isDayUnlocked={isDayUnlocked}
            getTimeUntilUnlock={getTimeUntilUnlock}
            completedDays={completedDays}
          />
          <DayScreen
            dayData={daysData[currentDay - 1]}
            onComplete={completeDay}
            onNext={() => {
              if (currentDay < 7 && isDayUnlocked(currentDay + 1)) {
                setCurrentDay(currentDay + 1)
              }
            }}
            onPrev={() => currentDay > 1 && setCurrentDay(currentDay - 1)}
            daysData={daysData}
            isDayUnlocked={isDayUnlocked}
            getTimeUntilUnlock={getTimeUntilUnlock}
          />
        </div>
      </div>
      <AchievementPopup achievement={newAchievement} onClose={() => setNewAchievement(null)} />
    </>
  )
}
