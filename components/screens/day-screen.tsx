"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, ChevronLeft, ChevronRight, CheckCircle, Lock } from "lucide-react"
import type { DayData } from "@/components/habit-builder-app"

interface DayScreenProps {
  dayData: DayData
  onComplete: (day: number, userPrompt: string, userResponse: string) => void
  onNext: () => void
  onPrev: () => void
  daysData: DayData[]
}

export function DayScreen({ dayData, onComplete, onNext, onPrev, daysData }: DayScreenProps) {
  const [userPrompt, setUserPrompt] = useState("")
  const [userResponse, setUserResponse] = useState("")
  const [showFollowUps, setShowFollowUps] = useState(false)
  const [showError, setShowError] = useState(false)

  // Sync local state with dayData when day changes
  useEffect(() => {
    setUserPrompt(dayData.userPrompt || "")
    setUserResponse(dayData.userResponse || "")
    setShowError(false)
  }, [dayData.day, dayData.userPrompt, dayData.userResponse])

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

  const copyTemplate = () => {
    navigator.clipboard.writeText(dayData.template)
  }

  const isFormValid = userPrompt.trim() !== "" && userResponse.trim() !== ""

  const handleComplete = () => {
    if (!isFormValid) {
      setShowError(true)
      return
    }
    setShowError(false)
    onComplete(dayData.day, userPrompt, userResponse)
  }

  // Check if next day is unlocked
  const isNextDayUnlocked = dayData.day === 7 || daysData[dayData.day]?.completed || dayData.completed

  return (
    <div className="p-4 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{dayData.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Day {dayData.day}</h1>
          {dayData.completed && (
            <div className="flex items-center justify-center gap-2" style={{ color: "#000099" }}>
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Completed</span>
            </div>
          )}
        </div>

        {/* Task Card */}
        <Card className="mb-6 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div
              className="border-l-4 p-4 mb-4 rounded-r-lg shadow-sm"
              style={{ borderLeftColor: "#000099", backgroundColor: "#f8f9ff" }}
            >
              <h3 className="font-semibold text-gray-900 mb-2">Today's Task:</h3>
              <p className="text-lg text-gray-800 font-medium">{dayData.task}</p>
            </div>
            <p className="text-gray-700 mb-4">{dayData.context}</p>
          </CardContent>
        </Card>

        {/* Template Card */}
        <Card className="mb-6 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">📝 Copy & Fill This Template:</h3>
              <Button variant="outline" size="sm" onClick={copyTemplate} className="rounded-full bg-transparent">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4 mb-4 shadow-sm">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{dayData.template}</pre>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Example:</h4>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono">{dayData.templateExample}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Required Fields Notice */}
        <Card className="mb-6 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> You must complete both sections below before continuing to the next day.
                <span className="text-red-600 ml-2">* Required</span>
              </p>
            </div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Your Custom Prompt: <span className="text-red-600">*</span>
            </h3>
            <Textarea
              placeholder="Paste your customized prompt here..."
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value)
                setShowError(false)
              }}
              className="mb-4 min-h-[100px] rounded-lg"
            />

            <h3 className="font-semibold text-gray-900 mb-4">
              ChatGPT's Response & Your Notes: <span className="text-red-600">*</span>
            </h3>
            <Textarea
              placeholder="Paste ChatGPT's response and add your thoughts, key takeaways, or how you'll use this..."
              value={userResponse}
              onChange={(e) => {
                setUserResponse(e.target.value)
                setShowError(false)
              }}
              className="min-h-[150px] rounded-lg"
            />

            {showError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm" style={{ color: "#ff3333" }}>
                  Please complete both sections before proceeding.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Follow-up Tips */}
        <Card className="mb-6 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <Button
              variant="outline"
              onClick={() => setShowFollowUps(!showFollowUps)}
              className="w-full mb-4 font-semibold transition-all duration-200"
              style={{
                backgroundColor: showFollowUps ? "#000" : "#ffff33",
                color: showFollowUps ? "#fff" : "#000",
                borderRadius: "999px",
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Don't Stop There - Try These Follow-ups:</h4>
                <ul className="space-y-2">
                  {currentFollowUps.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <span style={{ color: "#000099" }} className="mr-2">
                        •
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={dayData.day === 1}
            className="rounded-full bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleComplete}
            disabled={!isFormValid}
            className="font-semibold transition-all duration-200 shadow-lg"
            style={{
              backgroundColor: isFormValid ? "#000" : "#ccc",
              color: "#fff",
              borderRadius: "999px",
              border: "none",
            }}
            onMouseEnter={(e) => {
              if (isFormValid) {
                e.currentTarget.style.backgroundColor = "#FF2E56"
              }
            }}
            onMouseLeave={(e) => {
              if (isFormValid) {
                e.currentTarget.style.backgroundColor = "#000"
              }
            }}
          >
            {dayData.completed ? "Update" : "Complete Day"}
            <CheckCircle className="w-4 h-4 ml-2" />
          </Button>

          <Button
            variant="outline"
            onClick={onNext}
            disabled={dayData.day === 7 || !isNextDayUnlocked}
            className="rounded-full bg-transparent"
          >
            {dayData.day === 7 || !isNextDayUnlocked ? (
              <Lock className="w-4 h-4 mr-2" />
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
