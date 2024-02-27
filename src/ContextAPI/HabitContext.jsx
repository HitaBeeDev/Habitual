import { createContext, useContext, useState } from "react";
import usePersistentState from "../usePersistentState";

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
  const [habitInput, setHabitInput] = useState("");
  const [habits, setHabits] = usePersistentState("habits", []);
  const [editIndex, setEditIndex] = useState(-1);
  const [editInput, setEditInput] = useState("");

  const handleInputChange = (e) => {
    setHabitInput(e.target.value);
  };

  const handleAddClick = () => {
    if (!habitInput) return;
    setHabits([...habits, { name: habitInput, days: Array(7).fill(false) }]);
    setHabitInput("");
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditInput(habits[index].name);
  };

  const handleSaveClick = () => {
    const updatedHabits = [...habits];
    updatedHabits[editIndex].name = editInput;
    setHabits(updatedHabits);
    setEditIndex(-1);
  };

  const handleCancelClick = () => {
    setEditIndex(-1);
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleDeleteClick = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  const toggleDayMark = (habitIndex, dayIndex) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].days[dayIndex] =
      !updatedHabits[habitIndex].days[dayIndex];
    setHabits(updatedHabits);
  };

  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    const dates = [monday];
    for (let i = 1; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatDayOfWeek = (date) => {
    const options = { weekday: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const calculateHabitCompletion = () => {
    let totalHabits = habits.length;
    let completedHabits = habits.filter((habit) =>
      habit.days.every((day) => day)
    ).length;
    return { totalHabits, completedHabits };
  };

  const { totalHabits, completedHabits } = calculateHabitCompletion();
  const weekDates = getWeekDates();
  const today = new Date();
  const formattedToday = formatDate(today);

  const markedHabitsArray = weekDates.map(
    (date, index) => habits.filter((habit) => habit.days[index]).length
  );
  const totalHabitsCount = habits.length;
  const percentages = markedHabitsArray.map((markedHabits) =>
    totalHabitsCount !== 0
      ? Math.round((markedHabits / totalHabitsCount) * 100)
      : 0
  );

  const bestDays = [];
  percentages.forEach((percentage, index) => {
    if (percentage === 100) {
      bestDays.push(formatDayOfWeek(weekDates[index]));
    }
  });

  const bestDayMessage =
    bestDays.length > 0
      ? bestDays.length === 1
        ? `Your best day of the week was: ${bestDays[0]}`
        : `Your best days of the week were: ${bestDays.join(", ")}`
      : "You don't have any day with 100% completion.";

  const bestHabits = habits.filter((habit) => habit.days.every((day) => day));

  const bestHabitMessage =
    bestHabits.length > 0
      ? bestHabits.map((habit) => habit.name).join(", ")
      : "No habits with 100% completion this week.";

  const calculateAveragePercentageForWeek = () => {
    let totalPercentageForWeek = 0;
    percentages.forEach((percentage) => (totalPercentageForWeek += percentage));
    const averagePercentageForWeek = totalPercentageForWeek / 7;
    return Math.round(averagePercentageForWeek);
  };

  const averagePercentageForWeek = calculateAveragePercentageForWeek();

  return (
    <HabitContext.Provider
      value={{
        habits,
        editIndex,
        editInput,
        habitInput,
        handleInputChange,
        handleAddClick,
        handleEditClick,
        handleSaveClick,
        handleCancelClick,
        handleEditInputChange,
        handleDeleteClick,
        toggleDayMark,
        getWeekDates,
        formatDate,
        formatDayOfWeek,
        calculateHabitCompletion,
        calculateAveragePercentageForWeek,
        totalHabits,
        formattedToday,
        completedHabits,
        bestDayMessage,
        bestHabitMessage,
        averagePercentageForWeek,
        weekDates,
        percentages,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export default HabitContext;
