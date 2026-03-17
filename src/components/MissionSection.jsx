import { motion } from "framer-motion";
import { Target, Rocket, BookOpen } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Propósito",
    text: "Iniciar um movimento de aprendizado em tecnologia, capacitando pessoas de todas as idades a darem os primeiros passos como programadores e a se tornarem multiplicadores desse conhecimento em suas comunidades.",
  },
  {
    icon: Rocket,
    title: "Missão",
    text: "Desmistificar a tecnologia e a programação, provando que qualquer pessoa pode aprender. Oferecendo uma jornada prática que transforma alunos em mentores, completando o ciclo de \"aprender, aprofundar e ensinar\".",
  },
  {
    icon: BookOpen,
    title: "Metodologia",
    text: "\"Aprender fazendo para poder ensinar\". O foco é na prática, não apenas para absorver o conteúdo, mas para ganhar a confiança necessária para transmiti-lo.",
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
      when: "beforeChildren",
    },
  }),
};

export function MissionSection() {
  return (
    <section className="relative border-t border-[var(--color-border)] py-20 px-4 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-2xl font-bold text-[var(--color-primary)] text-center mb-12"
        >
          A Missão
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-lg hover:shadow-orange-500/5"
            >
              <motion.span
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                whileHover={{ scale: 1.08, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <item.icon className="h-6 w-6" />
              </motion.span>
              <h3 className="font-mono text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
