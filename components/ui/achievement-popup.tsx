"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Achievement } from "@/lib/achievements"

interface AchievementPopupProps {
  achievement: Achievement | null
  onClose: () => void
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full mx-4"
        >
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-6 border-4 border-white">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{achievement.icon}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(onClose, 300)
                }}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-black mb-2">Achievement Unlocked!</h3>
              <p className="text-xl font-bold mb-1">{achievement.title}</p>
              <p className="text-white/90">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
