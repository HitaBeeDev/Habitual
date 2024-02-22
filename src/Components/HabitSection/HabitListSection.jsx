import { useState } from "react";
import usePersistentState from "../../usePersistentState";
import WeekDaysList from "./WeekDaysList";
import CustomizeHabitList from "./CustomizeHabitList";
import HabitList from "./HabitList";

function HabitListSection() {
  const [isCustomize, setIsCustomize] = useState(false);
  const [habits, setHabits] = usePersistentState("habits", []);

  const handleCustomizeClick = () => {
    setIsCustomize(true);
  };

  const handleDoneClick = () => {
    setIsCustomize(false);
  };

  return (
    <>
      {!isCustomize ? (
        <div className="flex flex-col bg-colorC1 rounded-lg h-full shadow-xl">
          <div className="flex flex-row items-center bg-colorC2">
            <WeekDaysList />
          </div>
          <div className="bg-colorC5">
            <div className="flex flex-row justify-between">
              <p>
                Today is{" "}
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="flex flex-row gap-5 items-center">
                <button onClick={handleCustomizeClick}>CUSTOMIZE</button>
              </div>
            </div>
            <div className="flex flex-col">
              <HabitList habits={habits} />
            </div>
          </div>
        </div>
      ) : (
        <CustomizeHabitList
          habits={habits}
          setHabits={setHabits}
          handleDoneClick={handleDoneClick}
        />
      )}
    </>
  );
}

export default HabitListSection;
