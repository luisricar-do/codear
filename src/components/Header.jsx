import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center font-mono text-lg font-semibold text-[var(--color-text)] transition hover:opacity-90"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/icone-grande.png`}
            alt="Codear"
            className="h-10 w-auto sm:h-12"
          />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/#metodologia"
            className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
          >
            Metodologia
          </Link>
          <Link
            to="/#jornada"
            className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
          >
            Jornada
          </Link>
          <Link
            to="/cursos"
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            Começar Agora
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
