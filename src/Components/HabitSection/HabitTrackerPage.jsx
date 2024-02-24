import HabitReports from "./HabitReports";
import HabitTracker from "./HabitTracker";


function HabitTrackerPage() {
  return (
    <div className="mt-5 gap-5 grid grid-cols-12 grid-rows-12">
      <div className="row-span-10 col-span-12">
        <HabitTracker/>
      </div>

      <div className="row-span-2 col-span-12">
        <HabitReports />
      </div>
    </div>
  );
}

export default HabitTrackerPage;
