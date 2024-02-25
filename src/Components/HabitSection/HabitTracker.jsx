import { useHabits } from "../../ContextAPI/HabitContext";

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
  } = useHabits();

  // Count habits with all days marked
  const completedHabitsCount = habits.filter((habit) =>
    habit.days.every((day) => day)
  ).length;

  // Calculate completion status for each day
  const dayCompletionStatus = Array(7).fill(0);
  habits.forEach((habit) => {
    habit.days.forEach((day, index) => {
      if (day) {
        dayCompletionStatus[index]++;
      }
    });
  });

  const bestDayIndex = dayCompletionStatus.indexOf(
    Math.max(...dayCompletionStatus)
  );

  const bestDayOfWeek = weekDates[bestDayIndex]?.dayFull || "N/A";

  const bestHabit = habits.reduce(
    (best, habit) => {
      const numOfMarkedBoxes = habit.days.filter((day) => day === true).length;
      const completionPercentage = Math.ceil((numOfMarkedBoxes / 7) * 100);
      if (completionPercentage > best.completionPercentage) {
        return { habit, completionPercentage };
      }
      return best;
    },
    { habit: null, completionPercentage: -1 }
  );

  const sumPercentageOfDay = Array(7).fill(0);
  habits.forEach((habit) => {
    habit.days.forEach((day, index) => {
      if (day) {
        sumPercentageOfDay[index] += Math.ceil((1 / habits.length) * 100);
      }
    });
  });

  const averagePercentage = Math.ceil(
    sumPercentageOfDay.reduce((acc, curr) => acc + curr, 0) / 7
  );

  const totalScoreOfWeek = Math.ceil(
    (averagePercentage + calculateAveragePercentage(habits)) / 2
  );

  return (
    <div className="bg-colorD1">
      <div className="flex flex-row justify-between bg-colorD2">
        <p>Welcome ...</p>
        <div className="flex flex-row justify-between">
          <input
            type="text"
            placeholder="add a habit"
            value={currentHabit}
            onChange={handleInputChange}
          />
          <button onClick={handleAddHabit}>ADD</button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center items-center bg-colorA1">
          <p className="w-36 text-center bg-colorA2">Habits</p>
          {weekDates.map(({ dayAbbr, date, month, isToday }, index) => (
            <p
              key={index}
              className={`w-32 text-center bg-colorA3 ${
                isToday ? "font-bold" : ""
              }`}
            >
              {`${dayAbbr} ${date} ${month}`}
            </p>
          ))}
          <p className="w-32 text-center bg-colorA2">CUSTOMIZE</p>
        </div>

        <ul
          className="bg-colorB4 flex flex-col items-center text-center gap-5 overflow-y-auto"
          style={{ maxHeight: "600px" }}
        >
          {habits.map((habit, index) => (
            <div
              key={index}
              className="flex flex-row items-center bg-colorC5 justify-center h-14"
            >
              {editingIndex === index ? (
                <input
                  className="w-36 bg-colorB3"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <li className="w-36 bg-colorB3">{habit.name}</li>
              )}

              {habit.days.map((marked, dayIndex) => (
                <div
                  key={dayIndex}
                  onClick={() => toggleDay(index, dayIndex)}
                  className="w-32 flex justify-center items-center bg-colorB1 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 ${
                      marked ? "bg-colorA1" : "bg-colorA3"
                    }`}
                  ></div>
                </div>
              ))}

              <div className="w-16 flex justify-center items-center">
                {editingIndex === index ? (
                  <>
                    <button onClick={handleCancelClick} className="mr-2">
                      Cancel
                    </button>
                    <button onClick={handleSaveClick}>Save</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                )}
              </div>

              <div className="w-16 flex justify-center items-center">
                <p className="text-xs">
                  {(() => {
                    const numOfMarkedBoxes = habit.days.filter(
                      (day) => day === true
                    ).length;
                    const percentage = Math.ceil((numOfMarkedBoxes / 7) * 100);
                    return `(${percentage}%)`;
                  })()}
                </p>
              </div>
            </div>
          ))}

          <div className="flex flex-row justify-center items-center">
            <p className="w-36 bg-colorD1">{habits.length}</p>
            {Array.from({ length: 7 }).map((_, index) => {
              const markedBoxes = habits.reduce(
                (acc, habit) => acc + (habit.days[index] ? 1 : 0),
                0
              );
              const percentage = Math.ceil((markedBoxes / habits.length) * 100);
              return (
                <p key={index} className="w-32 bg-colorD3">
                  {`${markedBoxes}/${habits.length} = (${percentage}%)`}
                </p>
              );
            })}
            <p className="w-32 bg-colorD4">BOS</p>
          </div>

          <div className="w-full grid grid-cols-4 gap-4 items-center">
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
        </ul>
      </div>
    </div>
  );
}

function calculateAveragePercentage(habits) {
  const sumPercentageOfDay = Array(7).fill(0);
  habits.forEach((habit) => {
    habit.days.forEach((day, index) => {
      if (day) {
        sumPercentageOfDay[index] += Math.ceil((1 / habits.length) * 100);
      }
    });
  });

  const averagePercentage = Math.ceil(
    sumPercentageOfDay.reduce((acc, curr) => acc + curr, 0) / 7
  );

  return averagePercentage;
}

export default HabitTracker;
