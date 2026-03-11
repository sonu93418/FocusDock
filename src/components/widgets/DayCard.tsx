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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: dayNumber * 0.03 }}
      className="glass-card p-3 hover:bg-white hover:bg-opacity-5 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-200 ${
              isCompleted
                ? "bg-gradient-to-br from-green-500 to-emerald-500 shadow-md"
                : "bg-white bg-opacity-5"
            }`}
          >
            {isCompleted ? <Check className="w-5 h-5" /> : dayNumber}
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-sm">
              Day {dayNumber}
            </h4>
            <p className="text-[10px] text-gray-400">
              {completedCount} / {totalCount} tasks
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 mb-2 min-h-[80px] max-h-[150px] overflow-y-auto">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              {editingId === task.id ? (
                <div className="flex gap-1.5">
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
                    className="flex-1 px-2 py-1.5 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-accent transition-all duration-200"
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white bg-opacity-5 rounded-lg p-2 hover:bg-opacity-10 transition-all duration-200">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      task.completed
                        ? "bg-gradient-to-br from-purple-accent to-blue-accent border-transparent"
                        : "border-gray-500"
                    }`}
                  >
                    {task.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-2.5 h-2.5 text-white" />
                      </motion.div>
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
                  <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleEditTask(task.id)}
                      className="p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors duration-200"
                    >
                      <Edit2 className="w-3 h-3 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors duration-200"
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
        <div className="flex gap-1.5">
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
            className="flex-1 px-2 py-1.5 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-accent transition-all duration-200"
            autoFocus
          />
          <button
            onClick={handleAddTask}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-accent to-blue-accent rounded-lg text-xs font-medium transition-all duration-200"
          >
            Add
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewTaskText("");
            }}
            className="px-3 py-1.5 bg-white bg-opacity-10 rounded-lg text-xs font-medium transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setIsAdding(true)}
          className="w-full py-2 border border-dashed border-gray-600 rounded-lg flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:border-purple-accent hover:text-purple-accent transition-all duration-200"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Task
        </motion.button>
      )}
    </motion.div>
  );
}
