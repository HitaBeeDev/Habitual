import { BrowserRouter } from "react-router-dom";
import Container from "./Components/Container";
import "./index.css";
import { HabitProvider } from "./ContextAPI/HabitContext";
import { TaskProvider } from "./ContextAPI/TasksContext";
import { TimeTrackerProvider } from "./ContextAPI/TimeTrackerContext";

function App() {
  return (
    <BrowserRouter>
      <HabitProvider>
        <TaskProvider>
          <TimeTrackerProvider>
            <Container />
          </TimeTrackerProvider>
        </TaskProvider>
      </HabitProvider>
    </BrowserRouter>
  );
}

export default App;
