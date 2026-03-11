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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-4"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-poppins font-semibold gradient-text">
          Your Mission
        </h3>
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsEditing(true);
              setTempMission(mission);
            }}
            className="p-1.5 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-gray-400" />
          </motion.button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={tempMission}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTempMission(e.target.value)
            }
            placeholder="Write your 7-day mission..."
            className="w-full px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-accent resize-none transition-all duration-200"
            rows={2}
            autoFocus
          />
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="flex-1 py-1.5 bg-gradient-to-r from-purple-accent to-blue-accent rounded-lg font-medium text-sm flex items-center justify-center gap-1.5 transition-all duration-200"
            >
              <Check className="w-3.5 h-3.5" />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="flex-1 py-1.5 bg-white bg-opacity-10 rounded-lg font-medium text-sm flex items-center justify-center gap-1.5 transition-all duration-200"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <p className="text-gray-300 font-inter text-sm leading-relaxed">
          {mission || "Click edit to set your 7-day mission..."}
        </p>
      )}
    </motion.div>
  );
}
