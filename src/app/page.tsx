'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomeScreen from '@/components/dashboard/WelcomeScreen'
import Dashboard from '@/components/dashboard/Dashboard'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function Home() {
  const [userName, setUserName] = useLocalStorage<string>('focusdock_username', '')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-deep-navy flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-purple-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-poppins gradient-text">Loading FocusDock...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-deep-navy via-[#0f1333] to-deep-navy">
      <AnimatePresence mode="wait">
        {!userName ? (
          <WelcomeScreen key="welcome" onComplete={setUserName} />
        ) : (
          <Dashboard key="dashboard" userName={userName} />
        )}
      </AnimatePresence>
    </main>
  )
}
