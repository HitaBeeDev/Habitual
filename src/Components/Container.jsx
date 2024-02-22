import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import HomePage from "./HomePage";
import HabitTrackerPage from "./HabitSection/HabitTrackerPage";
import TasksPage from "./TasksSection/TasksPage";
import ReportsPage from "./ReportsSection/ReportSectionPage";

function Container() {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarWidth = isOpen ? "lg:w-48" : "lg:w-12";
  const contentMargin = isOpen
    ? "ml-10 mr-10 lg:ml-32"
    : "ml-10 mr-10 lg:ml-20";

  return (
    <div className="h-screen flex overflow-hidden">
      <div
        className={`fixed lg:static ${sidebarWidth} transition-width duration-300`}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div
        className={`flex-grow flex justify-center transition-margin duration-300 ${contentMargin}`}
      >
        <Routes>
          <Route path="/" element={<HomePage isOpen={isOpen} />} />
          <Route path="/dashboard" element={<HomePage isOpen={isOpen} />} />
          <Route path="/habit-tracker" element={<HabitTrackerPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default Container;
