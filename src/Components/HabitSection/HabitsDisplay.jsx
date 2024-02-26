import HabitEdit from "./HabitEdit";
import DayOfWeek from "./DayOfWeek";

export default function HabitsDisplay({
  habits,
  weekDates,
  editingIndex,
  editValue,
  setEditValue,
  toggleDay,
  handleEditClick,
  handleCancelClick,
  handleSaveClick,
  handleDeleteClick,
}) {
  return (
    <div className="flex flex-col items-center justify-between">
      <DayOfWeek weekDates={weekDates} />
      <ul
        className="bg-colorB4 w-full flex flex-col items-center text-center gap-5 overflow-y-auto"
        style={{ maxHeight: "550px" }}
      >
        {habits.map((habit, index) => (
          <HabitEdit
            key={index}
            habit={habit}
            index={index}
            editingIndex={editingIndex}
            editValue={editValue}
            setEditValue={setEditValue}
            toggleDay={toggleDay}
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </ul>
    </div>
  );
}
