export default function HabitInputSection({
  currentHabit,
  handleInputChange,
  handleAddHabit,
}) {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between bg-colorD2">
      <p>Welcome ...</p>
      <div className="flex flex-row lg:justify-between">
        <input
          type="text"
          placeholder="add a habit"
          value={currentHabit}
          onChange={handleInputChange}
        />
        <button onClick={handleAddHabit}>ADD</button>
      </div>
    </div>
  );
}
