import WelcomeBanner from "./WelcomeBanner";
import WeekDaysHeader from "./WeekDaysHeader";
import HabitList from "./HabitList";
import SummaryStats from "./SummaryStats";
import ResultsReport from "./ResultsReport";

function HabitTrackerPage() {
  return (
    <div className="lg:mt-9 mb-5 mt-20 w-full flex flex-col gap-2 overflow-auto">
      <WelcomeBanner />

      <WeekDaysHeader />

      <HabitList />

      <SummaryStats />

      <ResultsReport />
    </div>
  );
}

export default HabitTrackerPage;
