import { useState } from "react";
import WeekDaysList from "./WeekDaysList";

function HabitList() {
  const [isCustomize, setIsCustomize] = useState(false);

  const handleCustomizeClick = () => {
    setIsCustomize(true);
  };

  const handleDoneClick = () => {
    setIsCustomize(false);
  };

  const currentDateFormatted = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {!isCustomize ? (
        <div className="flex flex-col bg-colorC1 rounded-lg h-full shadow-xl">
          <div className="flex flex-row items-center bg-colorC2">
            <WeekDaysList />
          </div>

          <div className="bg-colorC5">
            <div className="flex flex-row justify-between">
              <p>Today is {currentDateFormatted}</p>

              <div className="flex flex-row gap-5 items-center">
                <button onClick={handleCustomizeClick}>CUSTOMIZE</button>
              </div>
            </div>

            <div className="flex flex-col">
              <ul>
                <li className="flex flex-row justify-between bg-colorD1">
                  <button>DONE!</button>
                  <p>Workout!</p>
                  <p>😀</p>
                </li>

                <li className="flex flex-row justify-between bg-colorD1">
                  <button>DONE!</button>
                  <p>Workout!</p>
                  <p>😀</p>
                </li>

                <li className="flex flex-row justify-between bg-colorD1">
                  <button>DONE!</button>
                  <p>Workout!</p>
                  <p>😀</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-colorC1 rounded-lg h-full shadow-xl">
          <div className="flex flex-row justify-between items-center p-4">
            <input
              type="text"
              placeholder="Add new habit"
              className="text-input"
            />
            <button>select color</button>
            <button>ADD</button>
            <button onClick={handleDoneClick}>DONE!</button>
          </div>
          <div className="flex flex-col p-4">
            <ul>
              <li className="flex flex-row justify-between items-center bg-colorD1 mb-2">
                <button>DONE!</button>
                <p>Workout!</p>
                <p>😀</p>
                <button>EDIT</button>
                <button>DELETE</button>
              </li>

              <li className="flex flex-row justify-between items-center bg-colorD1 mb-2">
                <button>DONE!</button>
                <p>Workout!</p>
                <p>😀</p>
                <button>EDIT</button>
                <button>DELETE</button>
              </li>

              <li className="flex flex-row justify-between items-center bg-colorD1 mb-2">
                <button>DONE!</button>
                <p>Workout!</p>
                <p>😀</p>
                <button>EDIT</button>
                <button>DELETE</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default HabitList;
