'use client'

import { motion } from 'framer-motion'
import { useClock } from '@/hooks/useClock'

export default function Clock() {
  const { hours, minutes, seconds } = useClock()

  const digitVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-8 text-center glow-effect"
    >
      <p className="text-sm font-inter text-gray-400 mb-4 uppercase tracking-wider">
        Current Time
      </p>
      <div className="flex items-center justify-center gap-3 font-mono text-6xl md:text-7xl font-bold">
        <motion.div
          key={hours}
          variants={digitVariants}
          initial="initial"
          animate="animate"
          className="bg-white bg-opacity-5 px-4 py-2 rounded-xl"
        >
          {hours}
        </motion.div>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-purple-accent"
        >
          :
        </motion.span>
        <motion.div
          key={minutes}
          variants={digitVariants}
          initial="initial"
          animate="animate"
          className="bg-white bg-opacity-5 px-4 py-2 rounded-xl"
        >
          {minutes}
        </motion.div>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          className="text-blue-accent"
        >
          :
        </motion.span>
        <motion.div
          key={seconds}
          variants={digitVariants}
          initial="initial"
          animate="animate"
          className="bg-white bg-opacity-5 px-4 py-2 rounded-xl"
        >
          {seconds}
        </motion.div>
      </div>
    </motion.div>
  )
}
