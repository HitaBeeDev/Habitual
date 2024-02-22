import React, { useState } from "react";

// Array of pastel colors and their related darker and similar colors
const pastelColors = [
  { pastel: "#FFC3A0", darker: "#E69A7C", similar: "#FFB47B" },
  { pastel: "#FFACB7", darker: "#E78992", similar: "#FF9AA8" },
  { pastel: "#A0E7E5", darker: "#7AC9C7", similar: "#9FE3E1" },
  // Add more pastel colors here...
];

function HabitList({ habits }) {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleChecklistChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    if (updatedCheckedItems.includes(index)) {
      updatedCheckedItems.splice(updatedCheckedItems.indexOf(index), 1);
    } else {
      updatedCheckedItems.push(index);
    }
    setCheckedItems(updatedCheckedItems);
  };

  const getBackgroundColor = (index) => {
    if (checkedItems.includes(index)) {
      return pastelColors[index % pastelColors.length].pastel;
    } else {
      return "#FFFFFF"; // Default background color
    }
  };

  const getCheckboxColor = (index) => {
    if (checkedItems.includes(index)) {
      return pastelColors[index % pastelColors.length].darker;
    } else {
      return "#000000"; // Default checkbox color
    }
  };

  return (
    <div className="flex flex-col bg-colorC1 rounded-lg shadow-xl">
      <div className="flex flex-row items-center bg-colorC2">
        <h2>Habits:</h2>
      </div>
      <div className="flex flex-col">
        <ul>
          {habits.map((habit, index) => (
            <li
              key={index}
              className="flex flex-row justify-between items-center"
              style={{ backgroundColor: getBackgroundColor(index) }}
            >
              <div>
                <input
                  type="checkbox"
                  id={`habit_${index}`}
                  onChange={() => handleChecklistChange(index)}
                  style={{ backgroundColor: getBackgroundColor(index) }}
                />
                <label htmlFor={`habit_${index}`}>{habit}</label>
              </div>
              <p
                style={{
                  color: getCheckboxColor(index),
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                😀
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HabitList;
