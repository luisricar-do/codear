import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--color-bg)_100%)] from-[var(--color-bg-elevated)]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl text-center"
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}assets/icone-pequeno.png`}
          alt=""
          className="mx-auto mb-6 h-24 w-auto sm:h-32"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <h1 className="font-mono text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl">
          CODEAR
        </h1>
        <p className="mt-2 font-mono text-2xl font-medium text-[var(--color-primary)] sm:text-3xl">
          Do Zero ao Código
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-1.5 text-sm text-[var(--color-text-muted)] shadow-sm"
        >
          <Terminal className="h-4 w-4 text-[var(--color-primary)]" />
          Luis Ricardo
        </motion.div>
        <p className="mt-6 text-lg text-[var(--color-text-muted)] sm:text-xl">
          O Superpoder da Programação: Hackeando a Realidade
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <Link
            to="/cursos"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-8 py-4 font-medium text-white shadow-lg shadow-orange-500/20 transition hover:bg-[var(--color-primary-hover)] hover:shadow-orange-500/30"
          >
            Iniciar Jornada
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
