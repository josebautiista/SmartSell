import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "./pages/Registro";
import Login from "./pages/Login";

function App() {
  Registro;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
