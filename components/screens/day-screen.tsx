"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, ChevronLeft, ChevronRight, CheckCircle, Lock, AlertCircle, Clock } from "lucide-react"
import type { DayData } from "@/components/habit-builder-app"

interface DayScreenProps {
  dayData: DayData
  onComplete: (day: number, userPrompt: string, userResponse: string) => void
  onNext: () => void
  onPrev: () => void
  daysData: DayData[]
  isDayUnlocked: (day: number) => boolean
  getTimeUntilUnlock: (day: number) => number
}

// Countdown component for next day unlock
function NextDayCountdown({ timeRemaining }: { timeRemaining: number }) {
  const [timeLeft, setTimeLeft] = useState(timeRemaining)

  useEffect(() => {
    setTimeLeft(timeRemaining)

    if (timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1000
        return newTime <= 0 ? 0 : newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining])

  if (timeLeft <= 0) return null

  const hours = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
      <Clock className="w-5 h-5 text-blue-600" />
      <div className="text-center">
        <div className="font-bold text-blue-900 text-lg">
          {hours}h {minutes}m {seconds}s
        </div>
        <div className="text-blue-700 text-sm">until Day unlocks</div>
      </div>
    </div>
  )
}

export function DayScreen({
  dayData,
  onComplete,
  onNext,
  onPrev,
  daysData,
  isDayUnlocked,
  getTimeUntilUnlock,
}: DayScreenProps) {
  const [userPrompt, setUserPrompt] = useState("")
  const [userResponse, setUserResponse] = useState("")
  const [showFollowUps, setShowFollowUps] = useState(false)
  const [showError, setShowError] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [, forceUpdate] = useState({})

  // Force re-render every second to update countdown
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({})
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Sync local state with dayData when day changes - CRITICAL for input field independence
  useEffect(() => {
    setUserPrompt(dayData.userPrompt || "")
    setUserResponse(dayData.userResponse || "")
    setShowError(false)
    setShowFollowUps(false) // Reset follow-ups when changing days
  }, [dayData.day]) // Only depend on day number to ensure clean reset

  const followUpTips = {
    1: [
      "Ask: 'Can you make this summary even shorter?'",
      "Try: 'What's the most important point here?'",
      "Follow up: 'Explain this like I'm explaining it to my boss'",
    ],
    2: [
      "Ask: 'Can you make this more/less formal?'",
      "Try: 'What if I need to say no politely?'",
      "Follow up: 'Help me add a call-to-action to this'",
    ],
    3: [
      "Ask: 'Can you give me a real-world example?'",
      "Try: 'What questions should I ask about this?'",
      "Follow up: 'How does this connect to [related topic]?'",
    ],
    4: [
      "Ask: 'What's the most important step to start with?'",
      "Try: 'How long should each step take?'",
      "Follow up: 'What could go wrong and how do I prevent it?'",
    ],
    5: [
      "Ask: 'Which approach would be fastest?'",
      "Try: 'What are the pros and cons of each?'",
      "Follow up: 'Help me choose between option 1 and 2'",
    ],
    6: [
      "Ask: 'What questions might they ask me?'",
      "Try: 'Help me practice my responses'",
      "Follow up: 'What if the conversation goes off-topic?'",
    ],
    7: [
      "Ask: 'What's the weakest part of this?'",
      "Try: 'How can I make this more persuasive?'",
      "Follow up: 'What would my audience want to know?'",
    ],
  }

  const currentFollowUps = followUpTips[dayData.day as keyof typeof followUpTips] || []

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(dayData.template)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy template:", err)
    }
  }

  // Enhanced validation - both fields must have meaningful content
  const isFormValid = userPrompt.trim().length > 10 && userResponse.trim().length > 10

  const handleComplete = () => {
    if (!isFormValid) {
      setShowError(true)
      return
    }
    setShowError(false)
    onComplete(dayData.day, userPrompt.trim(), userResponse.trim())
  }

  // Check if next day is unlocked
  const isNextDayUnlocked = dayData.day === 7 || isDayUnlocked(dayData.day + 1)
  const nextDayTimeRemaining = dayData.day < 7 ? getTimeUntilUnlock(dayData.day + 1) : 0

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-gray-50 to-white min-h-screen overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{dayData.icon}</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 break-words">
            Day {dayData.day}
          </h1>
          {dayData.completed && (
            <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-xl border border-green-200 shadow-sm inline-flex mb-4">
              <CheckCircle className="w-5 h-5" style={{ color: "#000099" }} />
              <span className="font-bold" style={{ color: "#000099" }}>
                Completed
              </span>
            </div>
          )}
        </div>

        {/* Time Lock Message for Completed Day */}
        {dayData.completed && dayData.day < 7 && nextDayTimeRemaining > 0 && (
          <Card className="mb-6 shadow-xl rounded-2xl border-0 bg-white">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Great Job!</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You've completed Day {dayData.day}! To build a consistent habit, the next day will unlock in:
              </p>
              <NextDayCountdown timeRemaining={nextDayTimeRemaining} />
              <p className="text-sm text-gray-600 mt-4">
                This 24-hour spacing helps you develop a sustainable daily AI habit. Use this time to practice what you
                learned today!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Task Card */}
        <Card className="mb-6 shadow-xl rounded-2xl border-0 bg-white">
          <CardContent className="p-6">
            <div
              className="border-l-4 p-4 mb-4 rounded-r-xl shadow-sm"
              style={{ borderLeftColor: "#000099", backgroundColor: "#f8f9ff" }}
            >
              <h3 className="font-bold text-gray-900 mb-2">Today's Task:</h3>
              <p className="text-lg text-gray-800 font-semibold leading-relaxed">{dayData.task}</p>
            </div>
            <p className="text-gray-700 leading-relaxed">{dayData.context}</p>
          </CardContent>
        </Card>

        {/* Template Card */}
        <Card className="mb-6 shadow-xl rounded-2xl border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">📝 Copy & Fill This Template:</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={copyTemplate}
                className="rounded-full bg-transparent font-semibold transition-all duration-200 hover:shadow-md"
                style={{
                  borderColor: "#000099",
                  color: copySuccess ? "#22c55e" : "#000099",
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copySuccess ? "Copied!" : "Copy"}
              </Button>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-4 shadow-inner overflow-x-auto">
              <pre className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed break-words">
                {dayData.template}
              </pre>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2 text-sm">Example:</h4>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">
                {dayData.templateExample}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Required Fields Card */}
        <Card className="mb-6 shadow-xl rounded-2xl border-0 bg-white">
          <CardContent className="p-6">
            {/* Enhanced instructional message */}
            <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-900 mb-1">Complete Both Sections to Continue</p>
                  <p className="text-red-800 text-sm leading-relaxed">
                    You must fill in both your custom prompt and ChatGPT's response to complete this day. Each field
                    requires at least 10 characters of meaningful content.
                  </p>
                  <p className="text-red-600 font-semibold mt-1 text-sm">* Both fields are required</p>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-3">
              Your Custom Prompt: <span style={{ color: "#ff3333" }}>*</span>
            </h3>
            <Textarea
              placeholder="Paste your customized prompt here... (minimum 10 characters)"
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value)
                setShowError(false)
              }}
              className="mb-4 min-h-[100px] rounded-xl border-2 focus:border-blue-400 transition-colors"
            />

            <h3 className="font-bold text-gray-900 mb-3">
              ChatGPT's Response & Your Notes: <span style={{ color: "#ff3333" }}>*</span>
            </h3>
            <Textarea
              placeholder="Paste ChatGPT's response and add your thoughts, key takeaways, or how you'll use this... (minimum 10 characters)"
              value={userResponse}
              onChange={(e) => {
                setUserResponse(e.target.value)
                setShowError(false)
              }}
              className="min-h-[150px] rounded-xl border-2 focus:border-blue-400 transition-colors"
            />

            {showError && (
              <div className="mt-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" style={{ color: "#ff3333" }} />
                  <p className="font-semibold text-sm" style={{ color: "#ff3333" }}>
                    Please complete both sections with meaningful content (at least 10 characters each) before
                    proceeding.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Follow-up Tips */}
        <Card className="mb-6 shadow-xl rounded-2xl border-0 bg-white">
          <CardContent className="p-6">
            <Button
              variant="outline"
              onClick={() => setShowFollowUps(!showFollowUps)}
              className="w-full mb-4 font-bold py-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                backgroundColor: showFollowUps ? "#000" : "#ffff33",
                color: showFollowUps ? "#fff" : "#000",
                borderRadius: "16px",
                border: "none",
              }}
              onMouseEnter={(e) => {
                if (!showFollowUps) {
                  e.currentTarget.style.backgroundColor = "#000"
                  e.currentTarget.style.color = "#fff"
                }
              }}
              onMouseLeave={(e) => {
                if (!showFollowUps) {
                  e.currentTarget.style.backgroundColor = "#ffff33"
                  e.currentTarget.style.color = "#000"
                }
              }}
            >
              💡 {showFollowUps ? "Hide" : "Show"} Follow-up Tips
            </Button>

            {showFollowUps && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3">Don't Stop There - Try These Follow-ups:</h4>
                <ul className="space-y-2">
                  {currentFollowUps.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span style={{ color: "#000099" }} className="mr-2 font-bold">
                        •
                      </span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={dayData.day === 1}
            className="w-full sm:w-auto rounded-xl bg-white font-semibold py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-200 border-2"
            style={{
              borderColor: dayData.day === 1 ? "#ccc" : "#000099",
              color: dayData.day === 1 ? "#999" : "#000099",
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleComplete}
            disabled={!isFormValid}
            className="w-full sm:w-auto font-bold py-3 px-6 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            style={{
              backgroundColor: isFormValid ? "#000099" : "#ccc",
              color: "#fff",
              borderRadius: "16px",
              border: "none",
            }}
            onMouseEnter={(e) => {
              if (isFormValid) {
                e.currentTarget.style.backgroundColor = "#FF2E56"
              }
            }}
            onMouseLeave={(e) => {
              if (isFormValid) {
                e.currentTarget.style.backgroundColor = "#000099"
              }
            }}
          >
            {dayData.completed ? "Update Day" : "Complete Day"}
            <CheckCircle className="w-4 h-4 ml-2" />
          </Button>

          <Button
            variant="outline"
            onClick={onNext}
            disabled={dayData.day === 7 || !isNextDayUnlocked}
            className="w-full sm:w-auto rounded-xl bg-white font-semibold py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-200 border-2"
            style={{
              borderColor: dayData.day === 7 || !isNextDayUnlocked ? "#ccc" : "#000099",
              color: dayData.day === 7 || !isNextDayUnlocked ? "#999" : "#000099",
            }}
          >
            {dayData.day === 7 || !isNextDayUnlocked ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                {dayData.day === 7 ? "Final Day" : "Locked"}
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
