"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [importantDays, setImportantDays] = useLocalStorage<{
    [key: string]: boolean;
  }>("focusdock_important_days", {});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(displayMonth);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const handlePrevMonth = () => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1),
    );
  };

  const isToday = (day: number) => {
    return (
      day === currentDate.getDate() &&
      displayMonth.getMonth() === currentDate.getMonth() &&
      displayMonth.getFullYear() === currentDate.getFullYear()
    );
  };

  const getDayKey = (day: number) => {
    return `${displayMonth.getFullYear()}-${displayMonth.getMonth()}-${day}`;
  };

  const toggleImportantDay = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = getDayKey(day);
    setImportantDays({
      ...importantDays,
      [key]: !importantDays[key],
    });
  };

  const isImportant = (day: number) => {
    return importantDays[getDayKey(day)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-accent" />
          <h3 className="text-sm font-poppins font-semibold gradient-text">
            Calendar
          </h3>
        </div>
        <div className="text-xs text-gray-400 font-inter">
          {currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevMonth}
          className="p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
        <div className="text-center">
          <div className="text-sm font-poppins font-semibold">
            {monthNames[displayMonth.getMonth()]} {displayMonth.getFullYear()}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNextMonth}
          className="p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day, i) => (
          <div
            key={i}
            className="text-center text-[10px] text-gray-500 font-semibold"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startingDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const today = isToday(day);
          const important = isImportant(day);

          return (
            <div key={day} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => toggleImportantDay(day, e)}
                className={`
                  w-full aspect-square rounded-md flex items-center justify-center text-xs font-medium
                  transition-all duration-200
                  ${today ? "bg-gradient-to-br from-purple-accent to-blue-accent text-white font-bold shadow-md" : ""}
                  ${important && !today ? "bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-500 border-opacity-30" : ""}
                  ${!today && !important ? "hover:bg-white hover:bg-opacity-10 text-gray-300" : ""}
                `}
              >
                {day}
              </motion.button>
              {important && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-0.5 -right-0.5"
                >
                  <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-[10px] text-gray-500 text-center font-inter">
        Click day to mark as important
      </div>
    </motion.div>
  );
}
