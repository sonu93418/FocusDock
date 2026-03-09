'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Minimize2 } from 'lucide-react'
import { getGreeting } from '@/utils/helpers'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Clock from '@/components/widgets/Clock'
import FocusTimer from '@/components/widgets/FocusTimer'
import MissionCard from '@/components/widgets/MissionCard'
import DayCard, { Task } from '@/components/widgets/DayCard'
import ProgressBar from '@/components/widgets/ProgressBar'
import MiniWidget from '@/components/widgets/MiniWidget'

interface DashboardProps {
  userName: string
}

type DayTasks = {
  [key: number]: Task[]
}

export default function Dashboard({ userName }: DashboardProps) {
  const [dayTasks, setDayTasks] = useLocalStorage<DayTasks>('focusdock_tasks', {})
  const [showMiniWidget, setShowMiniWidget] = useState(false)

  const handleUpdateDayTasks = (dayNumber: number, tasks: Task[]) => {
    setDayTasks({
      ...dayTasks,
      [dayNumber]: tasks,
    })
  }

  const completedDays = Array.from({ length: 7 }, (_, i) => i + 1).filter((day) => {
    const tasks = dayTasks[day] || []
    return tasks.length > 0 && tasks.every((task) => task.completed)
  }).length

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen p-6 pb-20"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-accent to-blue-accent rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-poppins font-bold">
                    {getGreeting()}, {userName}
                  </h1>
                  <p className="text-gray-400 text-sm">Ready to focus?</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMiniWidget(!showMiniWidget)}
              className="px-4 py-2 bg-white bg-opacity-10 rounded-xl flex items-center gap-2 hover:bg-opacity-20 transition-all"
            >
              <Minimize2 className="w-4 h-4" />
              Mini Widget
            </motion.button>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Mission */}
          <MissionCard />

          {/* Clock and Timer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Clock />
            <FocusTimer />
          </div>

          {/* Progress Bar */}
          <ProgressBar completedDays={completedDays} totalDays={7} />

          {/* 7-Day Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-poppins font-bold mb-6 gradient-text">
              7-Day Challenge
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
                <DayCard
                  key={day}
                  dayNumber={day}
                  tasks={dayTasks[day] || []}
                  onUpdateTasks={(tasks) => handleUpdateDayTasks(day, tasks)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-7xl mx-auto mt-12 text-center text-gray-500 text-sm"
        >
          <p>FocusDock • Your Productivity Operating System</p>
        </motion.div>
      </motion.div>

      {/* Mini Widget */}
      <MiniWidget isOpen={showMiniWidget} onClose={() => setShowMiniWidget(false)} />
    </>
  )
}
