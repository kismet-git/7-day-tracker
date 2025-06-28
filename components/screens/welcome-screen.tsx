"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Play, Zap } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
  completedDays: number
}

export function WelcomeScreen({ onStart, completedDays }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            <Zap className="w-16 h-16 mx-auto text-yellow-400 drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
            Your 7-Day
            <br />
            <span style={{ color: "#000099" }}>ChatGPT</span>
            <br />
            Habit Builder
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-medium">You don't need to learn AI — just start using it.</p>

          {completedDays > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-green-50 rounded-xl border border-green-200 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-semibold">{completedDays} of 7 days completed</span>
            </div>
          )}
        </div>

        {/* Instructions Card */}
        <Card className="mb-6 shadow-xl rounded-2xl border-0 bg-white">
          <CardContent className="p-6">
            {/* Clear Instructions */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r-xl">
              <h3 className="font-bold text-blue-900 mb-2">How This Works:</h3>
              <ul className="space-y-1 text-blue-800 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Complete one simple ChatGPT task each day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Fill in your custom prompt and ChatGPT's response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Unlock the next day by completing both required fields</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Build confidence and skills over 7 days</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-gray-700 mb-6 leading-relaxed">
              <p>
                This isn't a course or complicated tutorial. It's simply 7 days of trying ChatGPT with one small task
                each day.
              </p>
              <p>
                Each day, you'll get a simple prompt to try. Use it, see what happens, and jot down your thoughts.
                That's it.
              </p>
              <p className="font-semibold text-gray-900">
                By the end of the week, you'll have built the habit and confidence to use AI as a helpful tool in your
                daily life.
              </p>
            </div>

            {/* Prompt Building Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">🎯 The Secret to Great Prompts</h3>
              <div className="grid md:grid-cols-3 gap-3 text-gray-700 text-sm">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="font-bold text-gray-900 mb-1">Context:</p>
                  <p>Give ChatGPT background info ("I'm a marketing manager...")</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="font-bold text-gray-900 mb-1">Details:</p>
                  <p>Be specific about what you want ("3 bullet points, professional tone")</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="font-bold text-gray-900 mb-1">Goal:</p>
                  <p>Explain what you'll use it for ("for a client presentation")</p>
                </div>
              </div>
            </div>

            <Button
              onClick={onStart}
              className="w-full text-white font-bold py-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              style={{
                backgroundColor: "#000099",
                borderRadius: "16px",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FF2E56"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#000099"
              }}
            >
              <Play className="w-5 h-5 mr-2" />
              {completedDays > 0 ? "Continue Challenge" : "Start 7-Day Challenge"}
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <img
            src="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/created%20by%20AI%20Beginner%20Mode_bk.png"
            alt="Created by AI Beginner Mode"
            className="mx-auto h-8 opacity-80"
          />
        </div>
      </div>
    </div>
  )
}
