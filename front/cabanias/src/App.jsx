import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MostrarDisponibilidad from "./pages/disponibilidad";


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
