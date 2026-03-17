import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative border-t border-[var(--color-border)] bg-[var(--color-bg)] py-12 px-4"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" aria-hidden />
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
        >
          <Code2 className="h-4 w-4" />
          CODEAR — Do Zero ao Código
        </Link>
        <p className="text-sm text-[var(--color-text-muted)]">
          Luis Ricardo — <Link to="https://luisr.com.br" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">luisr.com.br</Link>
        </p>
      </div>
    </motion.footer>
  );
}
