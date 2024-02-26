export default function HabitStats({
  completedHabitsCount,
  bestDayOfWeek,
  bestHabit,
  totalScoreOfWeek,
  habits,
}) {
  return (
    <div className="w-full lg:grid lg:grid-cols-4 flex flex-col mt-2 lg:mt-5 lg:gap-4 gap-1 items-center">
      <div className="bg-colorA1 text-xs p-2 text-center">
        YOU HAVE DONE {completedHabitsCount} OF {habits.length} HABITS
        COMPLETELY
      </div>
      <div className="bg-colorD2 text-xs p-2 text-center">
        BEST DAY OF THIS WEEK: {bestDayOfWeek}
      </div>
      <div className="bg-colorD3 text-xs p-2 text-center">
        BEST HABIT OF THE WEEK IS{" "}
        {bestHabit.habit ? bestHabit.habit.name : "N/A"}
      </div>
      <div className="bg-colorD5 text-xs p-2 text-center">
        TOTAL SCORE OF WEEK IS: {`(${totalScoreOfWeek}%)`}%
      </div>
    </div>
  );
}
