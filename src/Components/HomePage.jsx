import HabitWidget from "./HabitSection/HabitWidget";
import TasksWidget from "./ToDoListSection/TasksWidget";
import TimeTrackerWidget from "./TimeTracker/TimeTrackerWidget";
import WelcomeCard from "./WelcomeCard/WelcomeCard";
import ArticlesSection from "./ArticlesSection/ArticlesSection";
import ReportWidgets from "./ReportsSection/ReportWidgets";
import { Link } from "react-router-dom";

function HomePage() {
  const widgets = [
    {
      component: HabitWidget,
      colSpan: "lg:col-span-2",
      path: "/habit-tracker",
    },
    { component: TasksWidget, colSpan: "lg:col-span-3", path: "/ToDo-List" },
    {
      component: TimeTrackerWidget,
      colSpan: "lg:col-span-3",
      path: "/Time-Tracker",
    },
    { component: ReportWidgets, colSpan: "lg:col-span-2" },
    { component: ArticlesSection, colSpan: "lg:col-span-2" },
  ];

  return (
    <div className="flex flex-col mt-24 lg:mt-5 lg:mb-5 gap-10 lg:p-4 lg:grid lg:grid-cols-12 overflow-x-hidden">
      <div className="lg:col-span-12">
        <WelcomeCard />
      </div>
      <div className="flex flex-col lg:col-span-12 lg:grid lg:grid-cols-12 gap-5">
        {widgets.map(({ component: Widget, colSpan, path }, index) => (
          <div key={index} className={colSpan}>
            {path ? (
              <Link to={path}>
                <Widget />
              </Link>
            ) : (
              <Widget />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
