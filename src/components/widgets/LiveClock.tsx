"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const date = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-purple-accent" />
        <span className="text-xs font-poppins text-gray-400 uppercase tracking-wide">
          Live Time
        </span>
      </div>

      <div className="flex items-center justify-center gap-2 mb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={hours}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white bg-opacity-5 px-3 py-1.5 rounded-lg"
          >
            <span className="text-3xl font-mono font-bold gradient-text">
              {hours}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-bold text-purple-accent"
        >
          :
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.div
            key={minutes}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white bg-opacity-5 px-3 py-1.5 rounded-lg"
          >
            <span className="text-3xl font-mono font-bold gradient-text">
              {minutes}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          className="text-2xl font-bold text-blue-accent"
        >
          :
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.div
            key={seconds}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white bg-opacity-5 px-3 py-1.5 rounded-lg"
          >
            <span className="text-3xl font-mono font-bold gradient-text">
              {seconds}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center text-xs text-gray-400 font-inter">{date}</div>
    </motion.div>
  );
}
