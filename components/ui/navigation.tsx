"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, RotateCcw } from "lucide-react"
import type { DayData } from "@/components/habit-builder-app"

interface NavigationProps {
  currentDay: number
  daysData: DayData[]
  onDaySelect: (day: number) => void
  onReset: () => void
}

export function Navigation({ currentDay, daysData, onDaySelect, onReset }: NavigationProps) {
  return (
    <div className="sticky top-16 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 z-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">7-Day Challenge</h2>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {daysData.map((day) => (
            <Button
              key={day.day}
              variant={currentDay === day.day ? "default" : "outline"}
              size="sm"
              onClick={() => onDaySelect(day.day)}
              className="flex-shrink-0 relative"
            >
              Day {day.day}
              {day.completed && <CheckCircle className="w-3 h-3 ml-1 text-green-500" />}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
