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

export function MissionSection() {
  return (
    <section className="border-t border-[var(--color-border)] py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-2xl font-bold text-[var(--color-primary)] text-center mb-12"
        >
          A Missão
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 shadow-sm transition hover:border-[var(--color-primary)]/50"
            >
              <item.icon className="h-10 w-10 text-[var(--color-primary)] mb-4" />
              <h3 className="font-mono text-lg font-semibold text-[var(--color-text)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
