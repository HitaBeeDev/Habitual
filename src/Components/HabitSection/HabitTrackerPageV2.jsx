import { useState } from "react";

function HabitTrackerPageV2() {
  const [habitInput, setHabitInput] = useState("");
  const [habits, setHabits] = useState([]);

  const handleInputChange = (e) => {
    setHabitInput(e.target.value);
  };

  const handleAddClick = () => {
    if (!habitInput) return;
    setHabits([...habits, habitInput]);
    setHabitInput("");
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
        <div className="col-span-1 text-center bg-colorA2">MONDAY</div>
        <div className="col-span-1 text-center bg-colorA3">TUESDAY</div>
        <div className="col-span-1 text-center bg-colorA4">WEDNESDAY</div>
        <div className="col-span-1 text-center bg-colorA5">THURSDAY</div>
        <div className="col-span-1 text-center bg-colorB1">FRIDAY</div>
        <div className="col-span-1 text-center bg-colorB2">SATURDAY</div>
        <div className="col-span-1 text-center bg-colorB3">SUNDAY</div>
        <div className="col-span-1 text-center bg-colorB4">edit</div>
        <div className="col-span-1 text-center bg-colorB5">delete</div>
        <div className="col-span-1 text-center bg-colorC1">STATUS</div>
      </div>

      {habits.map((habit, index) => (
        <div key={index} className="grid grid-cols-12 gap-1 items-center">
          <div className="col-span-2 text-center bg-colorA1">
            <p>{habit}</p>
          </div>
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="col-span-1 flex justify-center items-center"
            >
              <div className="w-5 h-5 bg-colorD1"></div>
            </div>
          ))}
          <div className="col-span-1 text-center bg-colorB4">edit</div>
          <div className="col-span-1 text-center bg-colorB5">delete</div>
          <div className="col-span-1 text-center bg-colorC1">STATUS</div>
        </div>
      ))}

      <div className="bg-colorC2">STATUS</div>
    </div>
  );
}

export default HabitTrackerPageV2;
