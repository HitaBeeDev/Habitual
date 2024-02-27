import { useState } from "react";
import usePersistantState from "../../usePersistentState";

function HabitTrackerPageV2() {
  const [habitInput, setHabitInput] = useState("");
  const [habits, setHabits] = usePersistantState("habits", []);
  const [editIndex, setEditIndex] = useState(-1);
  const [editInput, setEditInput] = useState("");

  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentWeekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + index);
    return date;
  });

  const handleInputChange = (e) => {
    setHabitInput(e.target.value);
  };

  const handleAddClick = () => {
    if (!habitInput) return;
    setHabits([...habits, { name: habitInput, days: [] }]);
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
        {currentWeekDates.map((date, index) => (
          <div key={index} className="col-span-1 text-center bg-colorA2">
            <p
              style={{
                fontWeight:
                  date.toDateString() === today.toDateString()
                    ? "bold"
                    : "normal",
              }}
            >
              {`${
                daysOfWeek[date.getDay()]
              } ${date.getDate()} ${date.toLocaleString("default", {
                month: "short",
              })}`}
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
          {currentWeekDates.map((date, i) => (
            <div
              key={i}
              className="col-span-1 flex justify-center items-center"
            >
              <div className="w-5 h-5 bg-colorD1"></div>
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
          <div className="col-span-1 text-center bg-colorC1">STATUS</div>
        </div>
      ))}

      <div className="bg-colorC2">STATUS</div>
    </div>
  );
}

export default HabitTrackerPageV2;
