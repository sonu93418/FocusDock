"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit2, Check, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function MissionCard() {
  const [mission, setMission] = useLocalStorage<string>(
    "focusdock_mission",
    "",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tempMission, setTempMission] = useState(mission);

  // Sync tempMission with mission when it changes from localStorage
  useEffect(() => {
    setTempMission(mission);
  }, [mission]);

  const handleSave = () => {
    setMission(tempMission);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempMission(mission);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card glass-card-hover p-6 shimmer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-poppins font-semibold gradient-text">
          Your Mission
        </h3>
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsEditing(true);
              setTempMission(mission);
            }}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-400" />
          </motion.button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={tempMission}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTempMission(e.target.value)
            }
            placeholder="Write your 7-day mission..."
            className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-accent resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex-1 py-2 bg-gradient-to-r from-purple-accent to-blue-accent rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex-1 py-2 bg-white bg-opacity-10 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <p className="text-gray-300 font-inter leading-relaxed">
          {mission || "Click edit to set your 7-day mission..."}
        </p>
      )}
    </motion.div>
  );
}
