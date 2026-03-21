import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/Home.jsx").then((m) => ({ default: m.Home })));
const Cursos = lazy(() => import("./pages/Cursos.jsx").then((m) => ({ default: m.Cursos })));
const Curso = lazy(() => import("./pages/Curso.jsx").then((m) => ({ default: m.Curso })));
const Modulo = lazy(() => import("./pages/Modulo.jsx").then((m) => ({ default: m.Modulo })));
const AulaRoute = lazy(() => import("./pages/AulaRoute.jsx").then((m) => ({ default: m.AulaRoute })));

function RouteFallback() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3 bg-[var(--color-bg)] text-[var(--color-text-muted)]"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-9 w-9 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent"
        aria-hidden
      />
      <span className="text-sm">A carregar…</span>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/:courseSlug" element={<Curso />} />
          <Route path="/cursos/:courseSlug/:moduleSlug/:lessonSlug" element={<AulaRoute />} />
          <Route path="/cursos/:courseSlug/:moduleSlug" element={<Modulo />} />
          <Route path="/aula/1" element={<Navigate to="/cursos/codear-logica/logica-programacao" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
