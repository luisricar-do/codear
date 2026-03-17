import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect } from "react";

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

const stats = [
  { value: 500, suffix: "+", label: "Alunos formados" },
  { value: 85, suffix: "%", label: "Taxa de conclusão" },
  { value: 120, suffix: "+", label: "Mentores ativos" },
  { value: 8, suffix: "", label: "Semanas de curso" },
];

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

function CountUp({ value, suffix, inView }) {
  const motionValue = useMotionValue(0);
  const rounded = Math.round(motionValue.get());
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => motionValue.set(v),
    });
    return controls.stop;
  }, [inView, value, motionValue]);

  return (
    <span>
      {rounded}
      {suffix}
    </span>
  );
}

export function Hero() {
  const statsRef = useRef(null);
  const codeRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const codeInView = useInView(codeRef, { once: true, margin: "-60px" });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4">
        {/* Barra de notificação */}
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

        {/* Título principal */}
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

          {/* CTAs */}
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

        {/* Estatísticas 
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-mono text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} inView={statsInView} />
              </div>
              <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        */}


        {/* Editor de código */}
        <motion.div
          ref={codeRef}
          initial={{ opacity: 0, y: 40 }}
          animate={codeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-lg"
        >
          {/* Barra do editor */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3">
            <div className="flex gap-1.5">
              <motion.span
                className="h-3 w-3 rounded-full bg-red-400"
                initial={{ scale: 0 }}
                animate={codeInView ? { scale: 1 } : {}}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              />
              <motion.span
                className="h-3 w-3 rounded-full bg-amber-400"
                initial={{ scale: 0 }}
                animate={codeInView ? { scale: 1 } : {}}
                transition={{ delay: 0.25, type: "spring", stiffness: 400 }}
              />
              <motion.span
                className="h-3 w-3 rounded-full bg-emerald-400"
                initial={{ scale: 0 }}
                animate={codeInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
              />
            </div>
            <span className="font-mono text-sm text-[var(--color-text-muted)]">
              primeiro-projeto.py
            </span>
          </div>

          {/* Código */}
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
                      <span
                        key={i}
                        className={
                          part.type === "comment"
                            ? "text-[var(--color-muted)]"
                            : part.type === "keyword"
                              ? "text-blue-600"
                              : part.type === "string"
                                ? "text-orange-600"
                                : part.type === "function"
                                  ? "text-violet-600"
                                  : "text-[var(--color-text)]"
                        }
                      >
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
