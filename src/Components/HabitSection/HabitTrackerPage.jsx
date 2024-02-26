import { useHabits } from "../../ContextAPI/HabitContext";
import {
  calculateCompletedHabitsCount,
  calculateDayCompletionStatus,
  findBestDayIndex,
  findBestHabit,
  calculateTotalScoreOfWeek,
} from "./habitUtils";
import HabitInputSection from "./HabitInputSection";
import HabitsDisplay from "./HabitsDisplay";
import HabitStats from "./HabitStats";

function HabitTracker() {
  const {
    habits,
    weekDates,
    currentHabit,
    handleInputChange,
    handleAddHabit,
    toggleDay,
    editingIndex,
    editValue,
    setEditValue,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleDeleteClick,
  } = useHabits();

  const completedHabitsCount = calculateCompletedHabitsCount(habits);
  const dayCompletionStatus = calculateDayCompletionStatus(habits);
  const bestDayOfWeek = findBestDayIndex(dayCompletionStatus, weekDates);
  const bestHabit = findBestHabit(habits);
  const totalScoreOfWeek = calculateTotalScoreOfWeek(habits);

  return (
    <div className="mt-5 mb-5 ml-16 w-full flex flex-col bg-colorD1 h-11/12 lg:-ml-0">
      <HabitInputSection
        currentHabit={currentHabit}
        handleInputChange={handleInputChange}
        handleAddHabit={handleAddHabit}
      />
      <HabitsDisplay
        habits={habits}
        weekDates={weekDates}
        editingIndex={editingIndex}
        editValue={editValue}
        setEditValue={setEditValue}
        toggleDay={toggleDay}
        handleEditClick={handleEditClick}
        handleCancelClick={handleCancelClick}
        handleSaveClick={handleSaveClick}
        handleDeleteClick={handleDeleteClick}
      />
      <HabitStats
        completedHabitsCount={completedHabitsCount}
        bestDayOfWeek={bestDayOfWeek}
        bestHabit={bestHabit}
        totalScoreOfWeek={totalScoreOfWeek}
        habits={habits}
      />
    </div>
  );
}

export default HabitTracker;
