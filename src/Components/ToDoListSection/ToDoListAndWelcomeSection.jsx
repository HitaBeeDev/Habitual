import { useTasks } from "../../ContextAPI/TasksContext";
import AddModal from "./AddModal";
import WelcomeBanner from "./WelcomeBanner";
import ToDoList from "./ToDoList";

function ToDoListAndWelcomeSection() {
  const { showModal } = useTasks();

  return (
    <div className="col-span-8 mb-5">
      <WelcomeBanner />

      {showModal && <AddModal />}

      <ToDoList />
    </div>
  );
}

export default ToDoListAndWelcomeSection;
