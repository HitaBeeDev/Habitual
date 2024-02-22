import { useState, useEffect } from "react";

// Array of pastel colors and their related darker and similar colors
const pastelColors = [
  { pastel: "#FFC3A0", darker: "#E69A7C", similar: "#FFB47B" },
  { pastel: "#FFACB7", darker: "#E78992", similar: "#FF9AA8" },
  { pastel: "#A0E7E5", darker: "#7AC9C7", similar: "#9FE3E1" },
  // Add more pastel colors here...
];

function CustomizeHabitList({ habits, setHabits, handleDoneClick }) {
  const [newHabit, setNewHabit] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedHabit, setEditedHabit] = useState("");
  const [habitColors, setHabitColors] = useState([]);

  // Generate color mappings for each habit
  useEffect(() => {
    const colors = habits.map((habit, index) => {
      const colorIndex = index % pastelColors.length;
      return {
        habitIndex: index,
        backgroundColor: pastelColors[colorIndex].pastel,
        checkboxColor: pastelColors[colorIndex].darker,
      };
    });
    setHabitColors(colors);
  }, [habits]);

  const handleInputChange = (event) => {
    setNewHabit(event.target.value);
  };

  const handleAddClick = () => {
    if (newHabit.trim() !== "") {
      setHabits([...habits, newHabit.trim()]);
      setNewHabit("");
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedHabit(habits[index]);
  };

  const handleEditChange = (event) => {
    setEditedHabit(event.target.value);
  };

  const handleSaveEdit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index] = editedHabit.trim();
    setHabits(updatedHabits);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedHabit("");
  };

  const handleDeleteClick = (index) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
  };

  return (
    <div className="flex flex-col bg-colorC1 rounded-lg h-full shadow-xl">
      <div className="flex flex-row justify-between items-center p-4">
        <input
          type="text"
          placeholder="Add new habit"
          className="text-input"
          value={newHabit}
          onChange={handleInputChange}
        />
        <button onClick={handleAddClick}>ADD</button>
        <button onClick={handleDoneClick}>DONE!</button>
      </div>
      <div className="flex flex-col p-4">
        <ul>
          {habits.map((habit, index) => (
            <li
              key={index}
              style={{
                backgroundColor: habitColors[index]?.backgroundColor,
                padding: "5px",
                borderRadius: "5px",
              }}
              className="flex flex-row justify-between items-center bg-colorD1 mb-2"
            >
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedHabit}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => handleSaveEdit(index)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{habit}</p>

                  <button onClick={() => handleEditClick(index)}>EDIT</button>
                  <button onClick={() => handleDeleteClick(index)}>
                    DELETE
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomizeHabitList;
