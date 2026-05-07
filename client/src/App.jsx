import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:trainId" element={<div>Сторінка бронювання (в розробці)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
