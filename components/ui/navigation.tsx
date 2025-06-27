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
                className="flex-shrink-0 relative font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                style={{
                  backgroundColor: isCurrent ? "#000099" : isUnlocked ? "#fff" : "#f5f5f5",
                  color: isCurrent ? "#fff" : isUnlocked ? "#000099" : "#999",
                  borderColor: isUnlocked ? "#000099" : "#ccc",
                  borderRadius: "12px",
                  minWidth: "70px",
                }}
              >
                {!isUnlocked && <Lock className="w-3 h-3 mr-1" />}
                Day {day.day}
                {day.completed && (
                  <CheckCircle className="w-3 h-3 ml-1" style={{ color: isCurrent ? "#fff" : "#22c55e" }} />
                )}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
