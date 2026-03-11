"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock as ClockIcon,
  Calendar,
  Sparkles,
  Target,
} from "lucide-react";
import { getGreeting } from "@/utils/helpers";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface MiniWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniWidget({ isOpen, onClose }: MiniWidgetProps) {
  const [time, setTime] = useState(new Date());
  const [mission] = useLocalStorage<string>("focusdock_mission", "");
  const [userName] = useLocalStorage<string>("focusdock_username", "");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const dayName = time.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = time.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const motivationalMessages = [
    "Stay Focused! 💪",
    "You Got This! 🚀",
    "Keep Going! ⭐",
    "One Step at a Time! 🎯",
    "Believe in Yourself! ✨",
  ];

  const randomMessage =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
          className="fixed bottom-6 right-6 w-72 shadow-2xl z-50"
          drag
          dragMomentum={false}
        >
          {/* Main Card */}
          <div className="glass-card p-4 relative overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, #8b5cf6 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, #60a5fa 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, #8b5cf6 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, #60a5fa 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-6 h-6 bg-gradient-to-br from-purple-accent to-blue-accent rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </motion.div>
                <h3 className="text-sm font-poppins font-bold gradient-text">
                  FocusDock
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Greeting */}
              {userName && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-xs text-gray-400">{getGreeting()}</p>
                  <p className="text-lg font-poppins font-bold gradient-text">
                    {userName}
                  </p>
                </motion.div>
              )}

              {/* Live Clock - Large Display */}
              <motion.div
                className="bg-gradient-to-br from-purple-accent/10 to-blue-accent/10 rounded-2xl p-4 border border-white border-opacity-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ClockIcon className="w-4 h-4 text-purple-accent" />
                  <span className="text-xs text-gray-400 font-medium">
                    Current Time
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <motion.div
                    key={hours}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white bg-opacity-10 px-3 py-2 rounded-lg"
                  >
                    <span className="text-3xl font-mono font-bold gradient-text">
                      {hours}
                    </span>
                  </motion.div>

                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl font-bold text-purple-accent"
                  >
                    :
                  </motion.span>

                  <motion.div
                    key={minutes}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white bg-opacity-10 px-3 py-2 rounded-lg"
                  >
                    <span className="text-3xl font-mono font-bold gradient-text">
                      {minutes}
                    </span>
                  </motion.div>

                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.75,
                    }}
                    className="text-2xl font-bold text-blue-accent"
                  >
                    :
                  </motion.span>

                  <motion.div
                    key={seconds}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white bg-opacity-10 px-3 py-2 rounded-lg"
                  >
                    <span className="text-3xl font-mono font-bold gradient-text">
                      {seconds}
                    </span>
                  </motion.div>
                </div>
                <div className="text-center text-xs text-gray-400">
                  {dayName}, {monthDay}
                </div>
              </motion.div>

              {/* Mission Display */}
              {mission && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white bg-opacity-5 rounded-xl p-3 border border-white border-opacity-5"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-accent" />
                    <span className="text-xs text-gray-400 font-medium">
                      Your Mission
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {mission}
                  </p>
                </motion.div>
              )}

              {/* Motivational Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-purple-accent/20 to-blue-accent/20 rounded-xl p-3 text-center border border-purple-accent/30"
              >
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm font-poppins font-semibold gradient-text"
                >
                  {randomMessage}
                </motion.p>
              </motion.div>
            </div>

            {/* Drag Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-center text-[10px] text-gray-500 relative z-10"
            >
              Drag to move • Click X to close
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
