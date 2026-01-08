import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import MostrarDisponibilidad from "./pages/disponibilidad.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disponibilidad" element={<MostrarDisponibilidad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

