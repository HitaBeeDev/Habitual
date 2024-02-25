import { BrowserRouter } from "react-router-dom";
import Container from "./Components/Container";
import "./index.css";
import { HabitProvider } from "./ContextAPI/HabitContext";

function App() {
  return (
    <BrowserRouter>
      <HabitProvider>
        <Container />
      </HabitProvider>
    </BrowserRouter>
  );
}

export default App;
