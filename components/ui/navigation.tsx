"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, RotateCcw, Lock, Clock } from "lucide-react"
import type { DayData } from "@/components/habit-builder-app"

interface NavigationProps {
  currentDay: number
  daysData: DayData[]
  onDaySelect: (day: number) => void
  onReset: () => void
  isDayUnlocked: (day: number) => boolean
  getTimeUntilUnlock: (day: number) => number
}

// Countdown timer component
function CountdownTimer({ timeRemaining }: { timeRemaining: number }) {
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
    <div className="flex items-center gap-1 text-xs text-gray-500">
      <Clock className="w-3 h-3" />
      <span>
        {hours}h {minutes}m {seconds}s
      </span>
    </div>
  )
}

export function Navigation({
  currentDay,
  daysData,
  onDaySelect,
  onReset,
  isDayUnlocked,
  getTimeUntilUnlock,
}: NavigationProps) {
  const [, forceUpdate] = useState({})

  // Force re-render every second to update countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({})
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sticky top-16 bg-white/95 backdrop-blur-md border-b border-gray-200 p-3 z-10 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-black text-gray-900">7-Day Challenge</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-transparent text-sm"
            style={{
              backgroundColor: "#ff3333",
              color: "#fff",
              borderRadius: "12px",
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
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>

        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {daysData.map((day) => {
            const isUnlocked = isDayUnlocked(day.day)
            const isCurrent = currentDay === day.day
            const timeUntilUnlock = getTimeUntilUnlock(day.day)
            const isTimeLocked = !isUnlocked && day.day > 1 && daysData[day.day - 2]?.completed

            return (
              <div key={day.day} className="flex-shrink-0 flex flex-col items-center gap-1">
                <Button
                  variant={isCurrent ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDaySelect(day.day)}
                  disabled={!isUnlocked}
                  className="relative font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-xs sm:text-sm"
                  style={{
                    backgroundColor: isCurrent ? "#000099" : isUnlocked ? "#fff" : "#f5f5f5",
                    color: isCurrent ? "#fff" : isUnlocked ? "#000099" : "#999",
                    borderColor: isUnlocked ? "#000099" : "#ccc",
                    borderRadius: "12px",
                    minWidth: "60px",
                    padding: "8px 12px",
                  }}
                >
                  {!isUnlocked && <Lock className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />}
                  <span className="hidden sm:inline">Day </span>
                  {day.day}
                  {day.completed && (
                    <CheckCircle
                      className="w-2 h-2 sm:w-3 sm:h-3 ml-1"
                      style={{ color: isCurrent ? "#fff" : "#22c55e" }}
                    />
                  )}
                </Button>

                {/* Countdown timer for time-locked days */}
                {isTimeLocked && timeUntilUnlock > 0 && <CountdownTimer timeRemaining={timeUntilUnlock} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
