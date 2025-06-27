"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Play } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
  completedDays: number
}

export function WelcomeScreen({ onStart, completedDays }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Your 7-Day
            <br />
            <span className="text-yellow-500">ChatGPT</span>
            <br />
            Habit Builder
          </h1>
          <p className="text-xl text-gray-600 mb-6">No lessons. Just use it — and get better fast.</p>

          {completedDays > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">{completedDays} of 7 days completed</span>
            </div>
          )}
        </div>

        {/* Welcome Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your AI Journey</h2>
            <div className="space-y-4 text-gray-700 mb-6">
              <p>
                This isn't a course or complicated tutorial. It's simply 7 days of trying ChatGPT with one small task
                each day.
              </p>
              <p>
                Each day, you'll get a simple prompt to try. Use it, see what happens, and jot down your thoughts.
                That's it.
              </p>
              <p>
                By the end of the week, you'll have built the habit and confidence to use AI as a helpful tool in your
                daily life.
              </p>
            </div>

            {/* Prompt Building Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">🎯 The Secret to Great Prompts</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Context:</strong> Give ChatGPT background info ("I'm a marketing manager...")
                </p>
                <p>
                  <strong>Details:</strong> Be specific about what you want ("3 bullet points, professional tone")
                </p>
                <p>
                  <strong>Goal:</strong> Explain what you'll use it for ("for a client presentation")
                </p>
              </div>
            </div>

            <Button
              onClick={onStart}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              {completedDays > 0 ? "Continue Challenge" : "Start 7-Day Challenge"}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">AI Beginner Mode</div>
      </div>
    </div>
  )
}
