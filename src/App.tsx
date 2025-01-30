import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
