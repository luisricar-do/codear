import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-12 px-4"
    >
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
        >
          <Code2 className="h-4 w-4" />
          CODEAR — Do Zero ao Código
        </Link>
        <p className="text-sm text-[var(--color-text-muted)]">
          Luis Ricardo — @luisricar_do
        </p>
      </div>
    </motion.footer>
  );
}
