import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cursos } from "./pages/Cursos";
import { Curso } from "./pages/Curso";
import { Modulo } from "./pages/Modulo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/cursos/:courseSlug" element={<Curso />} />
        <Route path="/cursos/:courseSlug/:moduleSlug" element={<Modulo />} />
        <Route path="/aula/1" element={<Navigate to="/cursos/codear-logica/logica-programacao" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
