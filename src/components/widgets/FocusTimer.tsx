'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { formatTime, triggerNotification } from '@/utils/helpers'

const DEFAULT_TIME = 25 * 60 // 25 minutes in seconds

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsCompleted(true)
            triggerNotification('Focus Session Completed! 🎉', 'Great work! Time for a break.')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handleStart = () => {
    setIsRunning(true)
    setIsCompleted(false)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(DEFAULT_TIME)
    setIsCompleted(false)
  }

  const progress = ((DEFAULT_TIME - timeLeft) / DEFAULT_TIME) * 100
  const circumference = 2 * Math.PI * 120

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-8 text-center"
    >
      <p className="text-sm font-inter text-gray-400 mb-6 uppercase tracking-wider">
        Focus Timer
      </p>

      <div className="relative inline-block mb-8">
        <svg className="w-64 h-64 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference - (progress / 100) * circumference,
            }}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={isRunning ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <div className="text-5xl font-mono font-bold gradient-text">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {isCompleted ? 'Completed!' : isRunning ? 'Focus Mode' : 'Ready'}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        {!isRunning ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-8 py-3 bg-gradient-to-r from-purple-accent to-blue-accent rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <Play className="w-5 h-5" />
            Start
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePause}
            className="px-8 py-3 bg-white bg-opacity-10 rounded-xl font-semibold flex items-center gap-2 hover:bg-opacity-20 transition-all"
          >
            <Pause className="w-5 h-5" />
            Pause
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="px-8 py-3 bg-white bg-opacity-10 rounded-xl font-semibold flex items-center gap-2 hover:bg-opacity-20 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </motion.button>
      </div>
    </motion.div>
  )
}
