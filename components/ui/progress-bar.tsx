interface ProgressBarProps {
  current: number
  total: number
  percentage: number
}

export function ProgressBar({ current, total, percentage }: ProgressBarProps) {
  return (
    <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 z-10 shadow-sm">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">
            {current} of {total} days
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
          <div
            className="h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{
              width: `${percentage}%`,
              backgroundColor: "#000099",
            }}
          />
        </div>
      </div>
    </div>
  )
}
