'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  completedDays: number
  totalDays: number
}

export default function ProgressBar({ completedDays, totalDays }: ProgressBarProps) {
  const progress = (completedDays / totalDays) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-poppins font-semibold">Weekly Progress</h3>
        <span className="text-2xl font-bold gradient-text">
          {completedDays} / {totalDays}
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-4">Days Completed</p>

      <div className="relative h-4 bg-white bg-opacity-5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-accent via-pink-500 to-blue-accent rounded-full"
          style={{
            boxShadow: progress > 0 ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none',
          }}
        />
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        {Array.from({ length: totalDays }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              i < completedDays
                ? 'bg-gradient-to-br from-purple-accent to-blue-accent text-white'
                : 'bg-white bg-opacity-5 text-gray-500'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
