import { motion } from "framer-motion";
import { BookOpen, Rocket, Users, Terminal, Lightbulb, Heart } from "lucide-react";

const quoteIcons = [
  { Icon: Terminal },
  { Icon: Lightbulb },
  { Icon: Heart },
];

const steps = [
  {
    step: "Etapa 1",
    title: "Aprender",
    icon: BookOpen,
    text: "Domine os fundamentos da programação através de projetos práticos e desafios reais.",
  },
  {
    step: "Etapa 2",
    title: "Aprofundar",
    icon: Rocket,
    text: "Consolide seu conhecimento construindo aplicações completas e resolvendo problemas complexos.",
  },
  {
    step: "Etapa 3",
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
    <section id="metodologia" className="relative border-t border-[var(--color-border)] py-20 px-4 bg-white">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
        >
          Nossa Metodologia
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-muted)]"
        >
          Acreditamos que a melhor forma de aprender é ensinando. Por isso, nossa
          metodologia é baseada em um ciclo contínuo de aprendizado.
        </motion.p>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm hover:border-[var(--color-primary)]/30 transition-colors"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                <item.icon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                {item.step}
              </p>
              <h3 className="mt-1 font-mono text-lg font-bold text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Card da frase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-14 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-lg shadow-orange-500/10 sm:p-8 md:flex md:items-center md:justify-between md:gap-8"
        >
          <div className="md:flex-1">
            <blockquote className="font-mono text-xl font-bold text-[var(--color-text)] sm:text-2xl">
              &ldquo;Aprender fazendo para poder ensinar&rdquo;
            </blockquote>
            <p className="mt-4 text-[var(--color-text-muted)]">
              O foco é na prática, não apenas para absorver o conteúdo, mas para
              ganhar a confiança necessária para transmiti-lo. Quando você
              ensina, você aprende duas vezes.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 md:mt-0 md:flex-shrink-0">
            {quoteIcons.map(({ Icon }, i) => (
              <span key={i} className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] shadow-sm">
                  <Icon className="h-7 w-7" />
                </span>
                {i < quoteIcons.length - 1 ? (
                  <span
                    className="text-lg font-medium text-[var(--color-primary)]/70"
                    aria-hidden
                  >
                    &gt;
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
