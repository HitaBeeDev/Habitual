import HabitWidget from "./HabitSection/HabitWidget";
import TasksWidget from "./ToDoListSection/TasksWidget";
import TimeTrackerWidget from "./TimeTracker/TimeTrackerWidget";
import WelcomeCard from "./WelcomeCard/WelcomeCard";
import ArticlesSection from "./ArticlesSection/ArticlesSection";
import ReportWidgets from "./ReportsSection/ReportWidgets";

function HomePage() {
  const widgets = [
    { component: HabitWidget, colSpan: "lg:col-span-2" },
    { component: TasksWidget, colSpan: "lg:col-span-3" },
    { component: TimeTrackerWidget, colSpan: "lg:col-span-3" },
    { component: ReportWidgets, colSpan: "lg:col-span-2" },
    { component: ArticlesSection, colSpan: "lg:col-span-2" },
  ];

  return (
    <div className="flex flex-col mt-24 lg:mt-5 lg:mb-5 gap-10 lg:shadow-xl lg:bg-colorA3 lg:border lg:rounded-lg lg:p-4 lg:grid lg:grid-cols-12 overflow-x-hidden">
      <div className="lg:col-span-12">
        <WelcomeCard />
      </div>
      <div className="flex flex-col lg:col-span-12 lg:grid lg:grid-cols-12 gap-5">
        {widgets.map(({ component: Widget, colSpan }, index) => (
          <div key={index} className={colSpan}>
            <Widget />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
