"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Minimize2, Pin } from "lucide-react";
import { getGreeting } from "@/utils/helpers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import LiveClock from "@/components/widgets/LiveClock";
import Clock from "@/components/widgets/Clock";
import RealTimer from "@/components/widgets/RealTimer";
import MissionCard from "@/components/widgets/MissionCard";
import DayCard, { Task } from "@/components/widgets/DayCard";
import ProgressBar from "@/components/widgets/ProgressBar";
import MiniWidget from "@/components/widgets/MiniWidget";

interface DashboardProps {
  userName: string;
}

type DayTasks = {
  [key: number]: Task[];
};

export default function Dashboard({ userName }: DashboardProps) {
  const [dayTasks, setDayTasks] = useLocalStorage<DayTasks>(
    "focusdock_tasks",
    {},
  );
  const [showMiniWidget, setShowMiniWidget] = useState(false);
  const [alwaysOnTop, setAlwaysOnTop] = useState(false);

  const handleUpdateDayTasks = (dayNumber: number, tasks: Task[]) => {
    setDayTasks({
      ...dayTasks,
      [dayNumber]: tasks,
    });
  };

  const toggleAlwaysOnTop = () => {
    const newState = !alwaysOnTop;
    setAlwaysOnTop(newState);

    // For web version, keep window focused
    if (newState) {
      window.focus();

      // If running as Chrome extension, send message to background
      if (typeof chrome !== "undefined" && chrome.runtime) {
        chrome.runtime
          .sendMessage({
            type: "TOGGLE_ALWAYS_ON_TOP",
            enabled: newState,
          })
          .catch(() => {
            // Not in extension mode, that's okay
          });
      }

      // For web version, periodically refocus
      const focusInterval = setInterval(() => {
        if (!document.hidden && newState) {
          window.focus();
        }
      }, 1000);

      return () => clearInterval(focusInterval);
    }
  };

  const completedDays = Array.from({ length: 7 }, (_, i) => i + 1).filter(
    (day) => {
      const tasks = dayTasks[day] || [];
      return tasks.length > 0 && tasks.every((task) => task.completed);
    },
  ).length;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen w-full p-4 pb-16"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-accent to-blue-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-poppins font-bold">
                    {getGreeting()}, {userName}
                  </h1>
                  <p className="text-gray-400 text-xs">Ready to focus?</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleAlwaysOnTop}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all duration-200 ${
                  alwaysOnTop
                    ? "bg-gradient-to-r from-purple-accent to-blue-accent"
                    : "bg-white bg-opacity-10 hover:bg-opacity-15"
                }`}
              >
                <Pin
                  className={`w-3.5 h-3.5 ${alwaysOnTop ? "rotate-45" : ""} transition-transform duration-200`}
                />
                Always on Top
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowMiniWidget(!showMiniWidget)}
                className="px-3 py-1.5 bg-white bg-opacity-10 rounded-lg flex items-center gap-1.5 hover:bg-opacity-15 transition-all duration-200 text-xs font-medium"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                Mini Widget
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-4">
          {/* Mission */}
          <MissionCard />

          {/* Time Widgets - Compact Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LiveClock />
            <Clock />
            <RealTimer />
          </div>

          {/* Progress Bar */}
          <ProgressBar completedDays={completedDays} totalDays={7} />

          {/* 7-Day Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-xl font-poppins font-bold mb-4 gradient-text">
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
      <MiniWidget
        isOpen={showMiniWidget}
        onClose={() => setShowMiniWidget(false)}
      />
    </>
  );
}
