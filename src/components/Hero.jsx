import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const titleChars = "CODEAR".split("");
const subtitle = "Do Zero ao Código";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      {/* Background: gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/15 blur-[80px] animate-gradient-shift"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-[350px] w-[350px] translate-x-1/4 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[70px] animate-gradient-shift"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 h-[300px] w-[300px] -translate-x-1/2 translate-y-1/4 rounded-full bg-orange-600/10 blur-[60px] animate-gradient-shift"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] animate-grid-pulse"
        aria-hidden
      />

      {/* Gradient fade to bg */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--color-bg)_70%,var(--color-bg)_100%)] from-[var(--color-bg-elevated)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl text-center"
      >
        <motion.div
          variants={item}
          className="mb-6 flex justify-center"
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}assets/icone-pequeno.png`}
            alt=""
            className="h-24 w-auto sm:h-32 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
        </motion.div>

        <motion.h1
          className="font-mono text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl flex flex-wrap justify-center gap-0.5 sm:gap-1"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              variants={item}
              className="inline-block"
              whileHover={{ y: -2, color: "var(--color-primary)" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-2 font-mono text-2xl font-medium text-[var(--color-primary)] sm:text-3xl tracking-wide"
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="my-4"
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]/90 px-4 py-1.5 text-sm text-[var(--color-text-muted)] shadow-sm backdrop-blur-sm animate-float"
            whileHover={{ scale: 1.03, borderColor: "var(--color-primary)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Terminal className="h-4 w-4 text-[var(--color-primary)]" />
            Luis Ricardo
          </motion.div>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 text-lg text-[var(--color-text-muted)] sm:text-xl max-w-xl mx-auto"
        >
          O Superpoder da Programação: Hackeando a Realidade
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              to="/cursos"
              className="group inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 font-medium text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-[var(--color-primary-hover)] hover:shadow-orange-500/40 hover:shadow-xl"
            >
              Iniciar Jornada
              <motion.span
                initial={0}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
