import ToDoListAndWelcomeSection from "./ToDoListAndWelcomeSection";
import UpcomingTasks from "./UpcomingTasks";

function ToDoListPage() {
  return (
    <div className="lg:mt-5 overflow-auto scroll-smooth lg:mb-5 mt-20 w-full flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:justify-between">
      <ToDoListAndWelcomeSection />
      <UpcomingTasks />
    </div>
  );
}

export default ToDoListPage;
