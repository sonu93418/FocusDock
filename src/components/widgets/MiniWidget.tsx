'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock as ClockIcon, Timer } from 'lucide-react'
import { useClock } from '@/hooks/useClock'
import { formatTime } from '@/utils/helpers'

interface MiniWidgetProps {
  isOpen: boolean
  onClose: () => void
}

export default function MiniWidget({ isOpen, onClose }: MiniWidgetProps) {
  const { hours, minutes, seconds } = useClock()
  const [timerSeconds] = useState(25 * 60)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
          className="fixed bottom-6 right-6 glass-card p-4 w-64 shadow-2xl z-50"
          drag
          dragMomentum={false}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-poppins font-semibold gradient-text">
              FocusDock Widget
            </h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-white bg-opacity-5 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="w-4 h-4 text-purple-accent" />
                <span className="text-xs text-gray-400">Current Time</span>
              </div>
              <div className="text-2xl font-mono font-bold">
                {hours}:{minutes}:{seconds}
              </div>
            </div>

            <div className="bg-white bg-opacity-5 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-blue-accent" />
                <span className="text-xs text-gray-400">Focus Timer</span>
              </div>
              <div className="text-2xl font-mono font-bold text-gray-400">
                {formatTime(timerSeconds)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
