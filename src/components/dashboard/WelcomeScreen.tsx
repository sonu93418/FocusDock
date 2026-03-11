"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen h-full w-full flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="glass-card p-12 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="inline-block mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-accent to-blue-accent rounded-full flex items-center justify-center glow-effect">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-4xl font-poppins font-bold mb-3 gradient-text"
        >
          Welcome to FocusDock
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400 mb-8 font-inter"
        >
          Your personal productivity operating system
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-3 text-left text-gray-300">
              Enter your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Your name..."
              className="w-full px-6 py-4 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-accent focus:border-transparent transition-all backdrop-blur-xl"
              autoFocus
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-accent to-blue-accent rounded-2xl font-semibold font-poppins text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Started
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
