"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, RotateCcw, Lock } from "lucide-react"
import type { DayData } from "@/components/habit-builder-app"

interface NavigationProps {
  currentDay: number
  daysData: DayData[]
  onDaySelect: (day: number) => void
  onReset: () => void
}

export function Navigation({ currentDay, daysData, onDaySelect, onReset }: NavigationProps) {
  return (
    <div className="sticky top-16 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 z-10 shadow-sm">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">7-Day Challenge</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="font-semibold transition-all duration-200 bg-transparent"
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
            Reset
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {daysData.map((day) => {
            const isUnlocked = day.day === 1 || daysData[day.day - 2]?.completed
            const isCurrent = currentDay === day.day

            return (
              <Button
                key={day.day}
                variant={isCurrent ? "default" : "outline"}
                size="sm"
                onClick={() => onDaySelect(day.day)}
                disabled={!isUnlocked}
                className="flex-shrink-0 relative font-semibold transition-all duration-200 rounded-full"
                style={{
                  backgroundColor: isCurrent ? "#000099" : isUnlocked ? "#fff" : "#f5f5f5",
                  color: isCurrent ? "#fff" : isUnlocked ? "#000099" : "#999",
                  borderColor: isUnlocked ? "#000099" : "#ccc",
                }}
              >
                {!isUnlocked && <Lock className="w-3 h-3 mr-1" />}
                Day {day.day}
                {day.completed && <CheckCircle className="w-3 h-3 ml-1 text-green-500" />}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
