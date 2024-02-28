import { useHabits } from "../../ContextAPI/HabitContext";

function ResultsReport() {
  const {
    totalHabits,
    completedHabits,
    bestDayMessage,
    bestHabitMessage,
    averagePercentageForWeek,
  } = useHabits();

  return (
    <div className="lg:grid lg:grid-cols-12 mt-5 lg:mt-0 flex flex-col items-center gap-5">
      <div className="w-full lg:col-span-3 rounded-lg shadow-xl text-sm flex items-center justify-center font-semibold h-28 p-5 bg-colorC2/70 text-center">
        {completedHabits === 0
          ? "🌻 No habits done? No worries! Every day's a new start. We're with you. Let's begin together! 🎈"
          : `✨ You've nailed ${completedHabits} out of ${totalHabits} habits! Your dedication is heartwarming. Keep it up! 💖`}
      </div>

      <div className="w-full lg:col-span-3 rounded-lg shadow-xl text-sm flex items-center justify-center font-semibold h-28 p-5 bg-colorB3/70 text-center">
        {bestHabitMessage}
      </div>

      <div className="w-full lg:col-span-3 rounded-lg shadow-xl text-sm flex items-center justify-center font-semibold h-28 p-5 bg-colorB5/90 text-center">
        {bestDayMessage}
      </div>

      <div className="w-full lg:col-span-3 rounded-lg shadow-xl text-sm flex items-center justify-center font-semibold h-28 p-5 bg-colorC1/70 text-center">
        <>
          {averagePercentageForWeek >= 75 &&
            averagePercentageForWeek <= 100 && (
              <p>
                Fantastic job! Your result of the week is:{" "}
                <span className="font-bold">
                  {averagePercentageForWeek.toFixed(2)}%
                </span>
                . Keep up the amazing work, you're on fire! 🔥
              </p>
            )}
          {averagePercentageForWeek >= 50 && averagePercentageForWeek < 75 && (
            <p>
              Great work! Your result of the week is:{" "}
              <span className="font-bold">
                {averagePercentageForWeek.toFixed(2)}%
              </span>
              . You're doing well, keep pushing towards your goals! 💪
            </p>
          )}
          {averagePercentageForWeek >= 25 && averagePercentageForWeek < 50 && (
            <p>
              Good effort! Your result of the week is:{" "}
              <span className="font-bold">
                {averagePercentageForWeek.toFixed(2)}%
              </span>
              . Remember, progress is progress, keep going! 🌟
            </p>
          )}
          {averagePercentageForWeek >= 0 && averagePercentageForWeek < 25 && (
            <p>
              No worries! Your result of the week is:{" "}
              <span className="font-bold">
                {averagePercentageForWeek.toFixed(2)}%
              </span>
              . Building habits takes time, you're doing great! Keep it up next
              week! 👍
            </p>
          )}
        </>
      </div>
    </div>
  );
}

export default ResultsReport;
