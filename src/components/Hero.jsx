import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const lineItem = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};

const codeByLine = [
  [{ type: "comment", text: "# Sua jornada começa aqui" }],
  [
    { type: "keyword", text: "def " },
    { type: "function", text: "aprender" },
    { type: "plain", text: "(dedicacao):" },
  ],
  [
    { type: "keyword", text: "    return " },
    { type: "string", text: '"conhecimento"' },
    { type: "plain", text: " + dedicacao" },
  ],
  [],
  [
    { type: "function", text: "print" },
    { type: "plain", text: "(" },
    { type: "string", text: '"Bem-vindo ao Codear!"' },
    { type: "plain", text: ")" },
  ],
];

const TOKEN_CLASSES = {
  comment: "text-[var(--color-muted)]",
  keyword: "text-blue-600",
  string: "text-orange-600",
  function: "text-violet-600",
  plain: "text-[var(--color-text)]",
};

export function Hero() {
  const codeRef = useRef(null);
  const codeInView = useInView(codeRef, { once: true, margin: "-60px" });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-elevated)] px-4 py-2 text-sm text-[var(--color-text-muted)]"
            animate={{ opacity: [1, 0.85, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
            Venha fazer parte dessa família
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h1 className="font-mono text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl lg:text-7xl">
            <motion.span variants={item} className="block">
              Aprenda a programar.
            </motion.span>
            <motion.span variants={item} className="block">
              Ensine o mundo.
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-center text-base text-[var(--color-text-muted)] sm:text-lg"
          >
            Desmistificamos a programação e transformamos alunos em mentores.
            Uma jornada prática onde você aprende fazendo para poder ensinar.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/cursos"
                className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)] px-6 py-3.5 font-medium text-white shadow-lg shadow-orange-500/25 transition hover:bg-[var(--color-primary-hover)] hover:shadow-orange-500/40"
              >
                Quero Participar
                <span className="ml-1" aria-hidden>→</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/#metodologia"
                className="inline-flex items-center rounded-lg border-2 border-[var(--color-primary)] bg-transparent px-6 py-3.5 font-medium text-[var(--color-primary)] transition hover:bg-orange-50"
              >
                Conhecer a Metodologia
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={codeRef}
          initial={{ opacity: 0, y: 40 }}
          animate={codeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-lg"
        >
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3">
            <div className="flex gap-1.5">
              {[
                { color: "bg-red-400", delay: 0.2 },
                { color: "bg-amber-400", delay: 0.25 },
                { color: "bg-emerald-400", delay: 0.3 },
              ].map(({ color, delay }) => (
                <motion.span
                  key={color}
                  className={`h-3 w-3 rounded-full ${color}`}
                  initial={{ scale: 0 }}
                  animate={codeInView ? { scale: 1 } : {}}
                  transition={{ delay, type: "spring", stiffness: 400 }}
                />
              ))}
            </div>
            <span className="font-mono text-sm text-[var(--color-text-muted)]">
              primeiro-projeto.py
            </span>
          </div>

          <div className="p-4 font-mono text-sm sm:text-base">
            <motion.div
              variants={container}
              initial="hidden"
              animate={codeInView ? "show" : "hidden"}
              transition={{ staggerChildren: 0.06, delayChildren: 0.35 }}
              className="space-y-0.5"
            >
              {codeByLine.map((line, lineIndex) => (
                <motion.div
                  key={lineIndex}
                  variants={lineItem}
                  className="flex flex-wrap"
                >
                  {line.length === 0 ? (
                    <span className="block h-4" aria-hidden />
                  ) : (
                    line.map((part, i) => (
                      <span key={i} className={TOKEN_CLASSES[part.type] ?? TOKEN_CLASSES.plain}>
                        {part.text}
                      </span>
                    ))
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
