"use client"

import { Flame } from "lucide-react"
import { motion } from "framer-motion"

interface StreakDisplayProps {
  streakDays: number
  className?: string
}

export function StreakDisplay({ streakDays, className }: StreakDisplayProps) {
  if (streakDays === 0) return null

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg ${className}`}
    >
      <Flame className="w-5 h-5 text-white" />
      <div className="text-white font-bold">{streakDays} Day Streak!</div>
    </motion.div>
  )
}
