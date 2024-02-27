import { useState } from "react";
import usePersistantState from "../../usePersistentState";

function HabitTrackerPageV2() {
  const [habitInput, setHabitInput] = useState("");
  const [habits, setHabits] = usePersistantState("habits", []);
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

  const weekDates = getWeekDates();

  const formatDate = (date) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const today = new Date();
  const formattedToday = formatDate(today);

  const calculateHabitCompletion = () => {
    let totalHabits = habits.length;
    let completedHabits = habits.filter((habit) =>
      habit.days.every((day) => day)
    ).length;
    return { totalHabits, completedHabits };
  };

  const { totalHabits, completedHabits } = calculateHabitCompletion();

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
            {/* Calculate and display the completion percentage */}
            {`${Math.round(
              (habit.days.filter((day) => day).length / 7) * 100
            )}%`}
          </div>
        </div>
      ))}

      {/* Displaying the status for each day of the week */}
      <div className="bg-colorC2 grid grid-cols-12 gap-1">
        <div className="col-span-2 bg-colorC3">STATUS</div>
        {weekDates.map((date, index) => {
          const markedHabits = habits.filter(
            (habit) => habit.days[index]
          ).length;
          const totalHabitsCount = habits.length;
          const percentage =
            totalHabitsCount !== 0
              ? Math.round((markedHabits / totalHabitsCount) * 100)
              : 0;

          return (
            <div key={index} className="col-span-1 text-center bg-colorA">
              <p>{percentage}%</p>
            </div>
          );
        })}
        <div className="col-span-3 bg-colorA1">Qoute</div>
      </div>

      <div className="bg-colorC2 grid grid-cols-12 gap-2">
        <div className="col-span-3 bg-colorD1 text-center">
          You did {completedHabits} of {totalHabits} habits completely.
        </div>
        <div className="col-span-3 bg-colorD2 text-center">
          {bestDayMessage}
        </div>
        <div className="col-span-3 bg-colorD5 text-center">
          Your best habit/s is/are ...
        </div>
        <div className="col-span-3 bg-colorD4 text-center">
          Your result of the week is:
        </div>
      </div>
    </div>
  );
}

export default HabitTrackerPageV2;
