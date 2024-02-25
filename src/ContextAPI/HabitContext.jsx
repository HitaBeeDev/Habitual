// src/contexts/HabitContext.js
import { createContext, useContext, useState, useEffect } from "react";
import usePersistentState from "../usePersistentState";

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

function calculateAveragePercentage(habits) {
  const sumPercentageOfDay = Array(7).fill(0);
  habits.forEach((habit) => {
    habit.days.forEach((day, index) => {
      if (day) {
        sumPercentageOfDay[index] += Math.ceil((1 / habits.length) * 100);
      }
    });
  });
  return Math.ceil(sumPercentageOfDay.reduce((acc, curr) => acc + curr, 0) / 7);
}

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = usePersistentState("habits", []);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [currentHabit, setCurrentHabit] = useState("");
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const getWeekDates = () => {
      const now = new Date();
      const firstDayOfWeek =
        now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1);
      const week = [];

      for (let i = 0; i < 7; i++) {
        let day = new Date(
          now.getFullYear(),
          now.getMonth(),
          firstDayOfWeek + i
        );
        week.push(day);
      }

      return week.map((day) => ({
        dayAbbr: day.toLocaleDateString("en-US", { weekday: "short" }),
        dayFull: day.toLocaleDateString("en-US", { weekday: "long" }),
        date: day.getDate(),
        month: day
          .toLocaleDateString("en-US", { month: "short" })
          .toUpperCase(),
        isToday: day.toDateString() === new Date().toDateString(),
      }));
    };

    setWeekDates(getWeekDates());
  }, []);

  const handleInputChange = (event) => {
    setCurrentHabit(event.target.value);
  };

  const handleAddHabit = () => {
    if (currentHabit.trim() !== "") {
      setHabits((prevHabits) => [
        ...prevHabits,
        { name: currentHabit, days: Array(7).fill(false) },
      ]);
      setCurrentHabit("");
    }
  };

  const toggleDay = (habitIndex, dayIndex) => {
    const newHabits = habits.map((habit, index) => {
      if (index === habitIndex) {
        const newDays = habit.days.map((day, i) =>
          i === dayIndex ? !day : day
        );
        return { ...habit, days: newDays };
      }
      return habit;
    });
    setHabits(newHabits);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValue(habits[index].name);
  };

  const handleCancelClick = () => {
    setEditingIndex(-1);
    setEditValue("");
  };

  const handleSaveClick = () => {
    const updatedHabits = habits.map((habit, index) => {
      if (index === editingIndex) {
        return { ...habit, name: editValue };
      }
      return habit;
    });
    setHabits(updatedHabits);
    setEditingIndex(-1);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        editingIndex,
        editValue,
        currentHabit,
        weekDates,
        handleInputChange,
        handleAddHabit,
        toggleDay,
        handleEditClick,
        handleCancelClick,
        handleSaveClick,
        calculateAveragePercentage, // Provided here for completeness, ensure it's used appropriately.
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
