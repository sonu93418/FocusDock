"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Trash2, Edit2 } from "lucide-react";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface DayCardProps {
  dayNumber: number;
  tasks: Task[];
  onUpdateTasks: (tasks: Task[]) => void;
}

export default function DayCard({
  dayNumber,
  tasks,
  onUpdateTasks,
}: DayCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
      };
      onUpdateTasks([...tasks, newTask]);
      setNewTaskText("");
      setIsAdding(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    onUpdateTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId: string) => {
    onUpdateTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingId(taskId);
      setEditText(task.text);
    }
  };

  const handleSaveEdit = (taskId: string) => {
    if (editText.trim()) {
      onUpdateTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: editText.trim() } : task,
        ),
      );
      setEditingId(null);
      setEditText("");
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const isCompleted = totalCount > 0 && completedCount === totalCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: dayNumber * 0.05 }}
      className="glass-card glass-card-hover p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              isCompleted
                ? "bg-gradient-to-br from-green-500 to-emerald-500 glow-effect"
                : "bg-white bg-opacity-5"
            }`}
          >
            {isCompleted ? <Check className="w-6 h-6" /> : dayNumber}
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-lg">
              Day {dayNumber}
            </h4>
            <p className="text-xs text-gray-400">
              {completedCount} / {totalCount} tasks
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-3 min-h-[100px] max-h-[200px] overflow-y-auto">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="group"
            >
              {editingId === task.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditText(e.target.value)
                    }
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      e.key === "Enter" && handleSaveEdit(task.id)
                    }
                    onBlur={() => handleSaveEdit(task.id)}
                    className="flex-1 px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-accent"
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white bg-opacity-5 rounded-lg p-3 hover:bg-opacity-10 transition-all">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? "bg-gradient-to-br from-purple-accent to-blue-accent border-transparent"
                        : "border-gray-500"
                    }`}
                  >
                    {task.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </button>
                  <span
                    className={`flex-1 text-sm ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-200"
                    }`}
                  >
                    {task.text}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="p-1 hover:bg-white hover:bg-opacity-10 rounded"
                    >
                      <Edit2 className="w-3 h-3 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 hover:bg-white hover:bg-opacity-10 rounded"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isAdding ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTaskText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && handleAddTask()
            }
            placeholder="Enter task..."
            className="flex-1 px-3 py-2 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-accent"
            autoFocus
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-gradient-to-r from-purple-accent to-blue-accent rounded-lg text-sm font-semibold"
          >
            Add
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewTaskText("");
            }}
            className="px-4 py-2 bg-white bg-opacity-10 rounded-lg text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAdding(true)}
          className="w-full py-2 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm text-gray-400 hover:border-purple-accent hover:text-purple-accent transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </motion.button>
      )}
    </motion.div>
  );
}
