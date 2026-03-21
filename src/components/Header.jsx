import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { to: "/#metodologia", label: "Metodologia" },
  { to: "/#jornada", label: "Jornada" },
  { to: "/#participe", label: "Participe" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setOpen(false);
    });
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)]/80 bg-[var(--color-bg-card)]/80 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.04)]"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-[4.25rem]">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-lg font-semibold text-[var(--color-text)] transition hover:opacity-90"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/icone-grande.png`}
            alt="Codear"
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text)]"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/cursos"
            className="ml-2 inline-flex items-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-[var(--color-primary-hover)]"
          >
            Começar grátis
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/cursos"
            className="rounded-lg bg-[var(--color-primary)] px-3 py-2 text-xs font-semibold text-white"
          >
            Cursos
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-[var(--color-border)] bg-[var(--color-bg-card)] md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {nav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)]"
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/cursos"
                className="mt-1 rounded-lg bg-[var(--color-primary)] px-3 py-3 text-center text-sm font-semibold text-white"
              >
                Começar grátis
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
