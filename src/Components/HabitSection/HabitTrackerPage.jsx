import HabitTracker from "./HabitTracker";

function HabitTrackerPage() {
  return (
    <div className="mt-5 gap-5 grid grid-cols-12 grid-rows-12">
      <div className="col-span-12 row-span-10">
        <HabitTracker />
      </div>
    </div>
  );
}

export default HabitTrackerPage;
