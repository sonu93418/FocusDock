"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  completedDays: number;
  totalDays: number;
}

export default function ProgressBar({
  completedDays,
  totalDays,
}: ProgressBarProps) {
  const progress = (completedDays / totalDays) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-poppins font-semibold">Weekly Progress</h3>
        <span className="text-lg font-bold gradient-text">
          {completedDays} / {totalDays}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-3">Days Completed</p>

      <div className="relative h-3 bg-white bg-opacity-5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-accent via-pink-500 to-blue-accent rounded-full"
          style={{
            boxShadow:
              progress > 0 ? "0 0 15px rgba(139, 92, 246, 0.4)" : "none",
          }}
        />
      </div>

      <div className="mt-3 flex justify-between">
        {Array.from({ length: totalDays }, (_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
              i < completedDays
                ? "bg-gradient-to-br from-purple-accent to-blue-accent text-white shadow-md"
                : "bg-white bg-opacity-5 text-gray-500"
            }`}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
