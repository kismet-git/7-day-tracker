"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, RotateCcw, ExternalLink, Star } from "lucide-react"
import type { DayData } from "@/components/habit-builder-app"

interface CompletionScreenProps {
  onRestart: () => void
  daysData: DayData[]
}

// Optimized confetti animation component
function ConfettiAnimation() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      vx: number
      vy: number
      color: string
      delay: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    const colors = ["#000099", "#ff3333", "#ffff33", "#00ff00", "#ff00ff", "#00ffff", "#ffa500", "#ff69b4"]
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 + Math.random() * 20, // Start from top
      vx: (Math.random() - 0.5) * 2, // Horizontal velocity
      vy: Math.random() * 3 + 1, // Vertical velocity
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 0.8 + Math.random() * 0.2,
    }))
    setParticles(newParticles)

    // Animate particles falling
    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx * 0.5,
            y: particle.y + particle.vy,
            rotation: particle.rotation + particle.rotationSpeed,
            opacity: Math.max(0, particle.opacity - 0.01),
          }))
          .filter((particle) => particle.y < 120 && particle.opacity > 0),
      )
    }

    const interval = setInterval(animateParticles, 50)

    // Remove animation after 4 seconds
    const timer = setTimeout(() => {
      clearInterval(interval)
      setParticles([])
    }, 4000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-75 ease-out"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size}px ${particle.color}40`,
          }}
        />
      ))}

      {/* Floating stars */}
      {Array.from({ length: 15 }, (_, i) => (
        <Star
          key={`star-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: "#ffff33",
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: "2s",
            fontSize: `${Math.random() * 16 + 12}px`,
          }}
        />
      ))}
    </div>
  )
}

export function CompletionScreen({ onRestart, daysData }: CompletionScreenProps) {
  const completedDays = daysData.filter((day) => day.completed).length

  const handleGetPromptPack = () => {
    window.open("https://prompts.aibeginnermode.com/", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 overflow-x-hidden">
      <ConfettiAnimation />
      <div className="max-w-2xl w-full">
        {/* Celebration */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 break-words">
            Congratulations!
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
            You've completed your 7-day ChatGPT habit builder. You're now ready to take your AI skills to the next
            level.
          </p>

          <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg inline-flex">
            <Trophy className="w-6 h-6" style={{ color: "#000099" }} />
            <span className="text-xl font-black text-gray-900">{completedDays} of 7 days completed</span>
          </div>
        </div>

        {/* Progress Summary */}
        <Card className="mb-6 shadow-xl rounded-2xl border-0 bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Your Journey Summary</h2>
            <div className="grid gap-3">
              {daysData.map((day) => (
                <div
                  key={day.day}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <span className="text-xl sm:text-2xl flex-shrink-0">{day.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm sm:text-base">Day {day.day}</div>
                    <div className="text-xs sm:text-sm text-gray-600 leading-relaxed truncate">{day.task}</div>
                  </div>
                  {day.completed && (
                    <div style={{ color: "#000099" }} className="flex-shrink-0">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="mb-6 shadow-xl rounded-2xl border-0 bg-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready for More?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get access to our complete Prompt Pack with 1000+ proven prompts for every situation.
            </p>

            <Button
              onClick={handleGetPromptPack}
              className="w-full font-bold py-3 mb-4 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              style={{
                backgroundColor: "#000099",
                color: "#fff",
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
              <ExternalLink className="w-5 h-5 mr-2" />
              Get the Prompt Pack Bundle
            </Button>

            <div className="text-gray-500 mb-4 font-medium">Visit: prompts.aibeginnermode.com</div>

            <Button
              variant="outline"
              onClick={onRestart}
              className="w-full font-bold py-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-transparent"
              style={{
                backgroundColor: "#ff3333",
                color: "#fff",
                borderRadius: "16px",
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

        <div className="text-center text-gray-500 mb-4 font-medium">
          Keep building your AI confidence, one prompt at a time.
        </div>
        <div className="text-center">
          <img
            src="https://d7gtruneqk2qegaa.public.blob.vercel-storage.com/created%20by%20AI%20Beginner%20Mode_bk.png"
            alt="Created by AI Beginner Mode"
            className="mx-auto h-5 opacity-80"
          />
        </div>
      </div>
    </div>
  )
}
