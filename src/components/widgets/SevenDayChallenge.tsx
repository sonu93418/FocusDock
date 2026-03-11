"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Check,
  Trash2,
  ChevronDown,
  ChevronRight,
  Trophy,
  Target,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

type DayTasks = {
  [key: number]: Task[];
};

export default function SevenDayChallenge() {
  const [dayTasks, setDayTasks] = useLocalStorage<DayTasks>(
    "focusdock_tasks",
    {},
  );
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [newTaskText, setNewTaskText] = useState("");
  const [addingToDay, setAddingToDay] = useState<number | null>(null);

  const handleUpdateDayTasks = (dayNumber: number, tasks: Task[]) => {
    setDayTasks({
      ...dayTasks,
      [dayNumber]: tasks,
    });
  };

  const handleAddTask = (dayNumber: number) => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
      };
      const currentTasks = dayTasks[dayNumber] || [];
      handleUpdateDayTasks(dayNumber, [...currentTasks, newTask]);
      setNewTaskText("");
      setAddingToDay(null);
    }
  };

  const handleToggleTask = (dayNumber: number, taskId: string) => {
    const tasks = dayTasks[dayNumber] || [];
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    handleUpdateDayTasks(dayNumber, updatedTasks);
  };

  const handleDeleteTask = (dayNumber: number, taskId: string) => {
    const tasks = dayTasks[dayNumber] || [];
    handleUpdateDayTasks(
      dayNumber,
      tasks.filter((task) => task.id !== taskId),
    );
  };

  const getDayStatus = (dayNumber: number) => {
    const tasks = dayTasks[dayNumber] || [];
    if (tasks.length === 0) return { status: "empty", progress: 0 };
    const completed = tasks.filter((t) => t.completed).length;
    const progress = (completed / tasks.length) * 100;
    if (progress === 100) return { status: "completed", progress };
    if (progress > 0) return { status: "inProgress", progress };
    return { status: "started", progress: 0 };
  };

  const completedDays = Array.from({ length: 7 }, (_, i) => i + 1).filter(
    (day) => {
      const { status } = getDayStatus(day);
      return status === "completed";
    },
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="glass-card p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-accent to-blue-accent rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-poppins font-bold gradient-text">
              7-Day Challenge
            </h2>
            <p className="text-xs text-gray-400">
              Track your goals and build momentum
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold gradient-text">
            {completedDays}/7
          </div>
          <div className="text-[10px] text-gray-400">Days Done</div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="mb-5">
        <div className="relative h-2 bg-white bg-opacity-5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedDays / 7) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-accent via-pink-500 to-blue-accent rounded-full"
            style={{
              boxShadow:
                completedDays > 0 ? "0 0 15px rgba(139, 92, 246, 0.5)" : "none",
            }}
          />
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-2">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => {
          const tasks = dayTasks[day] || [];
          const { status, progress } = getDayStatus(day);
          const isExpanded = expandedDay === day;
          const completedCount = tasks.filter((t) => t.completed).length;

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: day * 0.03 }}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                status === "completed"
                  ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30"
                  : status === "inProgress"
                    ? "bg-gradient-to-r from-purple-accent/10 to-blue-accent/10 border-purple-accent/30"
                    : "bg-white bg-opacity-5 border-white border-opacity-10"
              }`}
            >
              {/* Day Header */}
              <motion.button
                onClick={() => setExpandedDay(isExpanded ? null : day)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-white hover:bg-opacity-5 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                      status === "completed"
                        ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                        : status === "inProgress"
                          ? "bg-gradient-to-br from-purple-accent to-blue-accent text-white"
                          : "bg-white bg-opacity-10 text-gray-400"
                    }`}
                  >
                    {status === "completed" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      day
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-poppins font-semibold text-sm">
                      Day {day}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {tasks.length === 0
                        ? "No goals set"
                        : `${completedCount}/${tasks.length} goals completed`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {tasks.length > 0 && (
                    <div className="text-xs font-medium text-gray-400">
                      {Math.round(progress)}%
                    </div>
                  )}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Day Progress Bar */}
              {tasks.length > 0 && (
                <div className="h-1 bg-white bg-opacity-5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${
                      status === "completed"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-purple-accent to-blue-accent"
                    }`}
                  />
                </div>
              )}

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 space-y-2 bg-black bg-opacity-20">
                      {/* Tasks List */}
                      {tasks.length > 0 ? (
                        <div className="space-y-1.5">
                          {tasks.map((task) => (
                            <motion.div
                              key={task.id}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              className="flex items-center gap-2 p-2 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-all group"
                            >
                              <button
                                onClick={() => handleToggleTask(day, task.id)}
                                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                                  task.completed
                                    ? "bg-gradient-to-br from-purple-accent to-blue-accent border-transparent"
                                    : "border-gray-500 hover:border-purple-accent"
                                }`}
                              >
                                {task.completed && (
                                  <Check className="w-2.5 h-2.5 text-white" />
                                )}
                              </button>
                              <span
                                className={`flex-1 text-xs ${
                                  task.completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-200"
                                }`}
                              >
                                {task.text}
                              </span>
                              <button
                                onClick={() => handleDeleteTask(day, task.id)}
                                className="p-1 opacity-0 group-hover:opacity-100 hover:bg-white hover:bg-opacity-10 rounded transition-all"
                              >
                                <Trash2 className="w-3 h-3 text-red-400" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-3 text-xs text-gray-500">
                          <Target className="w-5 h-5 mx-auto mb-1 opacity-50" />
                          No goals yet for Day {day}
                        </div>
                      )}

                      {/* Add Task Input */}
                      {addingToDay === day ? (
                        <div className="flex gap-2 pt-2">
                          <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddTask(day)
                            }
                            placeholder="Enter your goal..."
                            className="flex-1 px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-accent transition-all"
                            autoFocus
                          />
                          <button
                            onClick={() => handleAddTask(day)}
                            className="px-3 py-2 bg-gradient-to-r from-purple-accent to-blue-accent rounded-lg text-xs font-medium"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setAddingToDay(null);
                              setNewTaskText("");
                            }}
                            className="px-3 py-2 bg-white bg-opacity-10 rounded-lg text-xs font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAddingToDay(day)}
                          className="w-full py-2 border border-dashed border-gray-600 rounded-lg flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:border-purple-accent hover:text-purple-accent transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Goal for Day {day}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedDays === 7 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-5 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 text-center"
        >
          <Trophy className="w-10 h-10 mx-auto mb-2 text-green-400" />
          <p className="text-lg font-poppins font-bold gradient-text">
            🎉 Challenge Complete!
          </p>
          <p className="text-xs text-gray-300 mt-1">
            Amazing work! You&apos;ve completed all 7 days!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
