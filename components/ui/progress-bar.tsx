import { StreakDisplay } from "@/components/ui/streak-display"
import { ShareButton } from "@/components/ui/share-button"

interface ProgressBarProps {
  current: number
  total: number
  percentage: number
  streakDays: number
}

export function ProgressBar({ current, total, percentage, streakDays }: ProgressBarProps) {
  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-3 z-20 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-700">Progress</span>
          <span className="text-sm font-bold text-gray-700">
            {current} of {total} days
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div
            className="h-3 rounded-full transition-all duration-500 ease-out shadow-sm relative overflow-hidden"
            style={{
              width: `${percentage}%`,
              backgroundColor: "#000099",
            }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Streak and Share Section */}
        <div className="flex items-center justify-between mt-2">
          <StreakDisplay streakDays={streakDays} />
          {current > 0 && <ShareButton completedDays={current} />}
        </div>

        {percentage === 100 && (
          <div className="text-center mt-1">
            <span className="text-xs font-bold text-green-600">🎉 Challenge Complete!</span>
          </div>
        )}
      </div>
    </div>
  )
}
