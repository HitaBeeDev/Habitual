import useHabits from "../";

function ReportWidgets() {
  const {
    totalHabits,
    completedHabits,
    bestDayMessage,
    bestHabitMessage,
    averagePercentageForWeek,
  } = useHabits();

  return (
    <div className="grid grid-rows-3 xl:h-full h-64 gap-3">
      <div className="rounded-md p-2 bg-colorA1">
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

      <div className="bg-colorA2 rounded-md p-2">
        5 / 7 habits of today is done! Bravo!
      </div>

      <div className="bg-colorA3 rounded-md p-2">
        72 hours of productivity this week!
      </div>
    </div>
  );
}

export default ReportWidgets;
