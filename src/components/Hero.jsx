import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

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
  keyword: "text-sky-600",
  string: "text-[var(--color-primary)]",
  function: "text-violet-600",
  plain: "text-[var(--color-text)]",
};

export function Hero() {
  const codeRef = useRef(null);
  const codeInView = useInView(codeRef, { once: true, margin: "-60px" });

  return (
    <section className="relative min-h-[min(100vh,920px)] overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24">
      <div className="codear-mesh codear-grid-bg absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:text-left">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]/90 px-4 py-2 text-sm text-[var(--color-text-muted)] shadow-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[var(--color-primary)]" aria-hidden />
                <span className="font-medium text-[var(--color-text)]">100% gratuito</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">Aprenda no seu ritmo</span>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
              <h1 className="font-mono text-[2rem] font-bold leading-[1.1] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]">
                <motion.span variants={item} className="block">
                  Aprenda a programar.
                </motion.span>
                <motion.span variants={item} className="mt-1 block text-[var(--color-primary)]">
                  Ensine o mundo.
                </motion.span>
              </h1>

              <motion.p
                variants={item}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg lg:mx-0"
              >
                Plataforma de cursos aberta: conteúdo prático para você dominar fundamentos,
                ganhar confiança e repassar o que aprendeu.
              </motion.p>

              <motion.div
                variants={item}
                className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/cursos"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/25 transition hover:bg-[var(--color-primary-hover)]"
                  >
                    Explorar cursos
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/#metodologia"
                    className="inline-flex items-center rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] px-6 py-3.5 text-sm font-semibold text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary-soft)]"
                  >
                    Ver metodologia
                  </Link>
                </motion.div>
              </motion.div>

              <motion.dl
                variants={item}
                className="mt-12 grid grid-cols-3 gap-4 border-t border-[var(--color-border)] pt-10 sm:gap-8 lg:max-w-lg"
              >
                {[
                  { k: "Acesso", v: "Aberto" },
                  { k: "Foco", v: "Prática" },
                  { k: "Objetivo", v: "Multiplicar" },
                ].map(({ k, v }) => (
                  <div key={k}>
                    <dt className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
                      {k}
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-bold text-[var(--color-text)] sm:text-base">
                      {v}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </motion.div>
          </div>

          <motion.div
            ref={codeRef}
            initial={{ opacity: 0, y: 32 }}
            animate={codeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-14 min-w-0 lg:mt-0"
          >
            <div className="codear-card codear-card-hover overflow-hidden rounded-2xl border-[var(--color-border)]">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/80 px-4 py-3 backdrop-blur-sm">
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
                <span className="font-mono text-xs text-[var(--color-text-muted)] sm:text-sm">
                  primeiro-projeto.py
                </span>
              </div>

              <div className="bg-[var(--color-bg-elevated)] p-4 font-mono text-sm sm:p-5 sm:text-[0.9375rem]">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate={codeInView ? "show" : "hidden"}
                  transition={{ staggerChildren: 0.06, delayChildren: 0.35 }}
                  className="space-y-0.5"
                >
                  {codeByLine.map((line, lineIndex) => (
                    <motion.div key={lineIndex} variants={lineItem} className="flex flex-wrap">
                      {line.length === 0 ? (
                        <span className="block h-4" aria-hidden />
                      ) : (
                        line.map((part, i) => (
                          <span
                            key={i}
                            className={TOKEN_CLASSES[part.type] ?? TOKEN_CLASSES.plain}
                          >
                            {part.text}
                          </span>
                        ))
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
