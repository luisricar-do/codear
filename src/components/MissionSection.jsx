import { motion } from "framer-motion";
import { BookOpen, Rocket, Users, Terminal, Lightbulb, Heart } from "lucide-react";

const quoteIcons = [{ icon: Terminal }, { icon: Lightbulb }, { icon: Heart }];

const steps = [
  {
    step: "01",
    title: "Aprender",
    icon: BookOpen,
    text: "Domine os fundamentos da programação através de projetos práticos e desafios reais.",
  },
  {
    step: "02",
    title: "Aprofundar",
    icon: Rocket,
    text: "Consolide seu conhecimento construindo aplicações completas e resolvendo problemas complexos.",
  },
  {
    step: "03",
    title: "Ensinar",
    icon: Users,
    text: "Torne-se mentor e multiplique o conhecimento, completando o ciclo de aprendizado.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export function MissionSection() {
  return (
    <section
      id="metodologia"
      className="relative border-t border-[var(--color-border)] bg-[var(--color-bg-card)] py-20 px-4 sm:py-24"
    >
      <div className="codear-grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="font-mono text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]"
          >
            Metodologia
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl"
          >
            Um ciclo que transforma estudo em ensino
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-[var(--color-text-muted)] leading-relaxed"
          >
            Acreditamos que a melhor forma de aprender é ensinando. Nossa jornada é contínua: você
            pratica, consolida e compartilha — e o conhecimento se multiplica.
          </motion.p>
        </div>

        <div className="relative mt-16 grid gap-6 sm:grid-cols-3">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-[2.25rem] hidden h-px bg-gradient-to-r from-transparent via-[var(--color-border-strong)] to-transparent sm:block"
            aria-hidden
          />
          {steps.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="codear-card codear-card-hover relative flex flex-col p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-1 ring-orange-200/60">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-sm font-bold text-[var(--color-muted)]">
                  {item.step}
                </span>
              </div>
              <h3 className="font-mono text-lg font-bold text-[var(--color-text)]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-14 overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-[var(--color-primary-soft)] via-white to-amber-50/40 p-8 shadow-lg shadow-orange-500/10 sm:p-10 md:flex md:items-center md:justify-between md:gap-10"
        >
          <div className="md:flex-1">
            <blockquote className="font-mono text-xl font-bold leading-snug text-[var(--color-text)] sm:text-2xl">
              &ldquo;Aprender fazendo para poder ensinar&rdquo;
            </blockquote>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              O foco é na prática — não só para absorver o conteúdo, mas para ganhar confiança ao
              transmitir. Quando você ensina, você aprende duas vezes.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4 md:mt-0 md:flex-shrink-0">
            {quoteIcons.map((row, i) => (
              <span key={i} className="flex items-center gap-3 sm:gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm ring-1 ring-orange-200/80 sm:h-14 sm:w-14">
                  <row.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                {i < quoteIcons.length - 1 ? (
                  <span className="text-lg font-medium text-[var(--color-primary)]/70" aria-hidden>
                    →
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
