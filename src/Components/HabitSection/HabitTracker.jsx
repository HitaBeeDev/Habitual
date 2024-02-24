import { useEffect, useState } from "react";

function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [currentHabit, setCurrentHabit] = useState("");
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const getWeekDates = () => {
      const now = new Date();
      const firstDayOfWeek =
        now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1); // Adjust to set Monday as first day of week
      const week = [];

      for (let i = 0; i < 7; i++) {
        let day = new Date(now.setDate(firstDayOfWeek + i));
        week.push(day);
      }

      return week.map((day) => ({
        day: day
          .toLocaleDateString("en-US", { weekday: "short" })
          .toUpperCase(),
        date: day.getDate(),
        month: day
          .toLocaleDateString("en-US", { month: "short" })
          .toUpperCase(),
        isToday: day.toDateString() === new Date().toDateString(),
      }));
    };

    setWeekDates(getWeekDates());
  }, []);

  const handleInputChange = (event) => {
    setCurrentHabit(event.target.value);
  };

  const handleAddHabit = () => {
    if (currentHabit.trim() !== "") {
      setHabits([
        ...habits,
        { name: currentHabit, days: Array(7).fill(false) },
      ]);
      setCurrentHabit("");
    }
  };

  const toggleDay = (habitIndex, dayIndex) => {
    const newHabits = habits.map((habit, index) => {
      if (index === habitIndex) {
        const newDays = habit.days.map((day, i) =>
          i === dayIndex ? !day : day
        );
        return { ...habit, days: newDays };
      }
      return habit;
    });
    setHabits(newHabits);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValue(habits[index].name);
  };

  const handleCancelClick = () => {
    setEditingIndex(-1);
    setEditValue("");
  };

  const handleSaveClick = () => {
    const updatedHabits = habits.map((habit, index) => {
      if (index === editingIndex) {
        return { ...habit, name: editValue };
      }
      return habit;
    });
    setHabits(updatedHabits);
    setEditingIndex(-1);
  };

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
          {weekDates.map(({ day, date, month, isToday }, index) => (
            <p
              key={index}
              className={`w-32 text-center bg-colorA3 ${
                isToday ? "font-bold" : ""
              }`}
            >
              {`${day} ${date} ${month}`}
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
                <p className="text-xs">STATUS OF HABIT</p>
              </div>
            </div>
          ))}

          <div className="flex flex-row justify-center items-center">
            <p className="w-36 bg-colorD1">BOS</p>
            {Array.from({ length: 7 }).map((_, index) => (
              <p key={index} className="w-32 bg-colorD3">
                STATUS OF DAY
              </p>
            ))}
            <p className="w-32 bg-colorD4">BOS</p>
          </div>

          <div className="w-full grid grid-cols-4 gap-4 items-center">
            <div className="bg-colorA1 text-xs p-2 text-center">
              YOU HAVE DONE 5 OF 7 HABITS COMPLETELY
            </div>
            <div className="bg-colorD2 text-xs p-2 text-center">
              BEST DAY OF THIS WEEK: TUESDAY
            </div>
            <div className="bg-colorD3 text-xs p-2 text-center">
              BEST HABIT OF THE WEEK IS RUNNING
            </div>
            <div className="bg-colorD5 text-xs p-2 text-center">
              TOTAL SCORE OF WEEK IS: 85%
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default HabitTracker;
