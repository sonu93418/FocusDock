"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

export default function RealTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="glass-card p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-4 h-4 text-blue-accent" />
        <h3 className="text-sm font-poppins font-semibold gradient-text">
          Stopwatch
        </h3>
      </div>

      <div className="text-center mb-3">
        <motion.div
          animate={isRunning ? { scale: [1, 1.01, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl font-mono font-bold gradient-text"
        >
          {formatTime(seconds)}
        </motion.div>
        <div className="text-[10px] text-gray-400 mt-1 font-inter">
          {isRunning ? "Running" : "Paused"}
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleToggle}
          className={`
            px-4 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all text-xs
            ${
              isRunning
                ? "bg-white bg-opacity-10 hover:bg-opacity-15"
                : "bg-gradient-to-r from-purple-accent to-blue-accent hover:shadow-md"
            }
          `}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Start</span>
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleReset}
          className="px-3 py-1.5 bg-white bg-opacity-10 rounded-lg font-medium flex items-center gap-1.5 hover:bg-opacity-15 transition-all text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
