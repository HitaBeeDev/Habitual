export default function HabitEdit({
  habit,
  index,
  editingIndex,
  editValue,
  setEditValue,
  toggleDay,
  handleEditClick,
  handleCancelClick,
  handleSaveClick,
  handleDeleteClick, // Add this prop
}) {
  return (
    <div className="w-full overflow-hidden h-12 flex flex-row items-center bg-colorC5 justify-between">
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
          className={`w-32 flex justify-center items-center bg-colorB1 cursor-pointer ${
            dayIndex > 0 ? "lg:flex hidden" : "flex"
          }`}
        >
          <div className={`w-5 h-5 ${marked ? "bg-colorA1" : "bg-colorA3"}`} />
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
          <div className="flex flex-row justify-between">
            <button onClick={() => handleEditClick(index)}>Edit</button>
            <button onClick={() => handleDeleteClick(index)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
