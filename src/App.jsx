import { BrowserRouter } from "react-router-dom";
import Container from "./Components/Container";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Container />
      </div>
    </BrowserRouter>
  );
}

export default App;
