import { useHabits } from "../../ContextAPI/HabitContext";

function ReportWidgets() {
  const { averagePercentageForWeek, bestDayMessage, bestHabitMessage } =
    useHabits();

  return (
    <div className="grid grid-rows-3 mb-5 lg:h-full h-64 gap-3">
      <div className="rounded-md p-3 flex justify-center items-center bg-colorI2">
        <>
          {averagePercentageForWeek >= 75 &&
            averagePercentageForWeek <= 100 && (
              <p className="text-sm font-medium text-center">
                Fantastic job! Your result of the week is:{" "}
                <span className="font-bold">
                  {averagePercentageForWeek.toFixed(2)}%
                </span>
                . Keep up the amazing work, you're on fire! 🔥
              </p>
            )}
          {averagePercentageForWeek >= 50 && averagePercentageForWeek < 75 && (
            <p className="text-sm font-medium text-center">
              Great work! Your result of the week is:{" "}
              <span className="font-bold">
                {averagePercentageForWeek.toFixed(2)}%
              </span>
              . You're doing well, keep pushing towards your goals! 💪
            </p>
          )}
          {averagePercentageForWeek >= 25 && averagePercentageForWeek < 50 && (
            <p className="text-sm font-medium text-center">
              Good effort! Your result of the week is:{" "}
              <span className="font-bold">
                {averagePercentageForWeek.toFixed(2)}%
              </span>
              . Remember, progress is progress, keep going! 🌟
            </p>
          )}
          {averagePercentageForWeek >= 0 && averagePercentageForWeek < 25 && (
            <p className="text-sm font-medium text-center text-colorI1">
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

      <div className="bg-colorH5 rounded-md p-3 flex justify-center items-center">
        <p className="text-sm text-colorH3 font-medium text-center">
          {" "}
          {bestDayMessage}
        </p>
      </div>

      <div className="bg-colorH2 rounded-md p-3 flex justify-center items-center">
        <p className="text-sm text-colorB4 font-medium text-center">
          {bestHabitMessage}
        </p>
      </div>
    </div>
  );
}

export default ReportWidgets;
