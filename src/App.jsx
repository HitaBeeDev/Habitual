import { BrowserRouter } from "react-router-dom";
import Container from "./Components/Container";
import "./index.css";
import { HabitProvider } from "./ContextAPI/HabitContext";
import { TaskProvider } from "./ContextAPI/TasksContext";

function App() {
  return (
    <BrowserRouter>
      <HabitProvider>
        <TaskProvider>
          <Container />
        </TaskProvider>
      </HabitProvider>
    </BrowserRouter>
  );
}

export default App;
