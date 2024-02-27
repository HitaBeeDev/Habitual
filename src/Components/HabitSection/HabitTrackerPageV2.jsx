import { useState } from "react";
import usePersistantState from "../../usePersistentState";
import { useHabits } from "../../ContextAPI/HabitContext";

function HabitTrackerPageV2() {
  const {
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
  } = useHabits();

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-1 bg-colorD3">
      <div className="flex flex-row justify-between">
        <p>HELLO</p>
        <div>
          <input value={habitInput} onChange={handleInputChange} type="text" />
          <button onClick={handleAddClick}>ADD</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-2 text-center bg-colorA1">
          <p>HABITS</p>
        </div>
        {weekDates.map((date, index) => (
          <div key={index} className="col-span-1 text-center bg-colorA">
            <p
              style={{
                fontWeight:
                  formattedToday === formatDate(date) ? "bold" : "normal",
              }}
            >
              {formatDate(date)}
            </p>
          </div>
        ))}
        <div className="col-span-1 text-center bg-colorB4">edit</div>
        <div className="col-span-1 text-center bg-colorB5">delete</div>
        <div className="col-span-1 text-center bg-colorC1">STATUS</div>
      </div>

      {habits.map((habit, index) => (
        <div key={index} className="grid grid-cols-12 gap-1 items-center">
          <div className="col-span-2 text-center bg-colorA1">
            {editIndex === index ? (
              <input
                value={editInput}
                onChange={handleEditInputChange}
                type="text"
              />
            ) : (
              <p>{habit.name}</p>
            )}
          </div>

          {weekDates.map((_, dayIndex) => (
            <div
              key={dayIndex}
              className="col-span-1 flex justify-center items-center cursor-pointer"
              onClick={() => toggleDayMark(index, dayIndex)}
            >
              <div
                className={`w-5 h-5 ${
                  habit.days[dayIndex] ? "bg-colorA4" : "bg-colorA3"
                }`}
              ></div>
            </div>
          ))}

          {editIndex === index ? (
            <>
              <button
                className="col-span-1 text-center bg-colorB4"
                onClick={handleSaveClick}
              >
                save
              </button>
              <button
                className="col-span-1 text-center bg-colorB5"
                onClick={handleCancelClick}
              >
                cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="col-span-1 text-center bg-colorB4"
                onClick={() => handleEditClick(index)}
              >
                edit
              </button>
              <button
                className="col-span-1 text-center bg-colorB5"
                onClick={() => handleDeleteClick(index)}
              >
                delete
              </button>
            </>
          )}

          <div className="col-span-1 text-center bg-colorC1">
            {`${Math.round(
              (habit.days.filter((day) => day).length / 7) * 100
            )}%`}
          </div>
        </div>
      ))}

      <div className="bg-colorC2 grid grid-cols-12 gap-1">
        <div className="col-span-2 bg-colorC3">STATUS</div>
        {percentages.map((percentage, index) => (
          <div key={index} className="col-span-1 text-center bg-colorA">
            <p>{percentage}%</p>
          </div>
        ))}
        <div className="col-span-3 bg-colorA1">Quote</div>
      </div>

      <div className="bg-colorC2 grid grid-cols-12 gap-2">
        <div className="col-span-3 bg-colorD1 text-center">
          You did {completedHabits} of {totalHabits} habits completely.
        </div>

        <div className="col-span-3 bg-colorD5 text-center">
          Your best habit/s is/are: {bestHabitMessage}
        </div>

        <div className="col-span-3 bg-colorD2 text-center">
          {bestDayMessage}
        </div>

        <div className="col-span-3 bg-colorD4 text-center">
          Your result of the week is:{" "}
          <p>{averagePercentageForWeek.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}

export default HabitTrackerPageV2;
