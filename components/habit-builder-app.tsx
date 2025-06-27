"use client"

import { useState, useEffect } from "react"
import { WelcomeScreen } from "@/components/screens/welcome-screen"
import { DayScreen } from "@/components/screens/day-screen"
import { CompletionScreen } from "@/components/screens/completion-screen"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Navigation } from "@/components/ui/navigation"

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

export function HabitBuilderApp() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "day" | "completion">("welcome")
  const [currentDay, setCurrentDay] = useState(1)
  const [daysData, setDaysData] = useState<DayData[]>(initialDaysData)

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("chatgpt-habit-builder")
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setDaysData(parsed.daysData || initialDaysData)
      setCurrentDay(parsed.currentDay || 1)
      setCurrentScreen(parsed.currentScreen || "welcome")
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      "chatgpt-habit-builder",
      JSON.stringify({
        daysData,
        currentDay,
        currentScreen,
      }),
    )
  }, [daysData, currentDay, currentScreen])

  const completedDays = daysData.filter((day) => day.completed).length
  const progressPercentage = (completedDays / 7) * 100

  const startChallenge = () => {
    setCurrentScreen("day")
    setCurrentDay(1)
  }

  const goToDay = (day: number) => {
    // Progressive unlock logic - only allow access to completed days + next day
    const canAccess = day === 1 || daysData[day - 2]?.completed
    if (canAccess) {
      setCurrentDay(day)
      setCurrentScreen("day")
    }
  }

  const completeDay = (dayNumber: number, userPrompt: string, userResponse: string) => {
    setDaysData((prev) =>
      prev.map((day) => (day.day === dayNumber ? { ...day, completed: true, userPrompt, userResponse } : day)),
    )

    if (dayNumber === 7) {
      setCurrentScreen("completion")
    } else {
      setCurrentDay(dayNumber + 1)
    }
  }

  const resetProgress = () => {
    setDaysData(initialDaysData)
    setCurrentDay(1)
    setCurrentScreen("welcome")
    localStorage.removeItem("chatgpt-habit-builder")
  }

  if (currentScreen === "welcome") {
    return <WelcomeScreen onStart={startChallenge} completedDays={completedDays} />
  }

  if (currentScreen === "completion") {
    return <CompletionScreen onRestart={resetProgress} daysData={daysData} />
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        <ProgressBar current={completedDays} total={7} percentage={progressPercentage} />
        <Navigation currentDay={currentDay} daysData={daysData} onDaySelect={goToDay} onReset={resetProgress} />
        <DayScreen
          dayData={daysData[currentDay - 1]}
          onComplete={completeDay}
          onNext={() => currentDay < 7 && setCurrentDay(currentDay + 1)}
          onPrev={() => currentDay > 1 && setCurrentDay(currentDay - 1)}
          daysData={daysData}
        />
      </div>
    </div>
  )
}
