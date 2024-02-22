import HabitList from "./HabitList";
import HabitReports from "./HabitReports";
import HabitsWeeklyReport from "./HabitsWeeklyReport";

function HabitTrackerPage() {
  return (
    <div className="mt-5 gap-5 grid grid-rows-12">
      <div className="grid grid-cols-12 row-span-10">
        <div className="col-span-5">
          <HabitList />
        </div>

        <div className="col-span-7">
          <HabitsWeeklyReport />
        </div>
      </div>

      <div className="row-span-2">
        <HabitReports />
      </div>
    </div>
  );
}

export default HabitTrackerPage;
