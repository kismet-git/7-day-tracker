"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, RotateCcw, ExternalLink } from "lucide-react"
import type { DayData } from "@/components/habit-builder-app"

interface CompletionScreenProps {
  onRestart: () => void
  daysData: DayData[]
}

// Simple confetti animation component
function ConfettiAnimation() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>(
    [],
  )

  useEffect(() => {
    const colors = ["#000099", "#ff3333", "#ffff33", "#00ff00", "#ff00ff", "#00ffff"]
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)

    // Remove animation after 3 seconds
    const timer = setTimeout(() => setParticles([]), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: "2s",
          }}
        />
      ))}
    </div>
  )
}

export function CompletionScreen({ onRestart, daysData }: CompletionScreenProps) {
  const completedDays = daysData.filter((day) => day.completed).length

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <ConfettiAnimation />
      <div className="max-w-2xl w-full">
        {/* Celebration */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Congratulations!</h1>
          <p className="text-xl text-gray-700 mb-6">
            You've completed your 7-day ChatGPT habit builder. You're now ready to take your AI skills to the next
            level.
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Trophy className="w-6 h-6" style={{ color: "#000099" }} />
            <span className="text-lg font-semibold text-gray-900">{completedDays} of 7 days completed</span>
          </div>
        </div>

        {/* Progress Summary */}
        <Card className="mb-6 shadow-lg rounded-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Journey Summary</h2>
            <div className="space-y-3">
              {daysData.map((day) => (
                <div key={day.day} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <span className="text-2xl">{day.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Day {day.day}</div>
                    <div className="text-sm text-gray-600">{day.task}</div>
                  </div>
                  {day.completed && (
                    <div style={{ color: "#000099" }}>
                      <Trophy className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="mb-6 shadow-lg rounded-xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready for More?</h3>
            <p className="text-gray-600 mb-6">
              Get access to our complete Prompt Pack with 1000+ proven prompts for every situation.
            </p>

            <Button
              className="w-full font-semibold py-3 mb-4 transition-all duration-200 shadow-lg"
              style={{
                backgroundColor: "#000099",
                color: "#fff",
                borderRadius: "999px",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FF2E56"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#000099"
              }}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Get the Full Prompt Pack
            </Button>

            <div className="text-sm text-gray-500 mb-4">Visit: prompts.aibeginnermode.com</div>

            <Button
              variant="outline"
              onClick={onRestart}
              className="w-full font-semibold transition-all duration-200 bg-transparent"
              style={{
                backgroundColor: "#ff3333",
                color: "#fff",
                borderRadius: "10px",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d7e022"
                e.currentTarget.style.color = "#000"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ff3333"
                e.currentTarget.style.color = "#fff"
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mb-4">
          Keep building your AI confidence, one prompt at a time.
        </div>
        <div className="text-center">
          <img
            src="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/created%20by%20AI%20Beginner%20Mode_bk.png"
            alt="Created by AI Beginner Mode"
            className="mx-auto h-8"
          />
        </div>
      </div>
    </div>
  )
}
