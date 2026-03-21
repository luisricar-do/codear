import { motion } from "framer-motion";
import { BookMarked, Code2, HeartHandshake, ExternalLink } from "lucide-react";
import { GITHUB_REPO_URL } from "../site";

const ways = [
  {
    title: "Conteúdo",
    icon: BookMarked,
    text: "Sugira temas, aponte erros ou proponha melhorias nos textos e materiais dos cursos.",
  },
  {
    title: "Código e site",
    icon: Code2,
    text: "O site é aberto: correções de layout, acessibilidade ou novas funcionalidades são bem-vindas via pull request.",
  },
  {
    title: "Comunidade",
    icon: HeartHandshake,
    text: "Ajude a divulgar, apoie quem está começando ou ofereça mentoria alinhada à nossa metodologia.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

export function ParticipateSection() {
  return (
    <section
      id="participe"
      className="relative border-t border-[var(--color-border)] bg-[var(--color-bg)] py-20 px-4 sm:py-24"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="font-mono text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]"
          >
            Participe
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 font-mono text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl"
          >
            O projeto também é seu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-[var(--color-text-muted)] leading-relaxed"
          >
            O Codear cresce com quem estuda, ensina e quer democratizar o acesso à programação. Não
            precisa ser expert — toda contribuição conta.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {ways.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="codear-card codear-card-hover flex flex-col p-6 sm:p-7"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-1 ring-orange-200/60">
                <item.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-mono text-lg font-bold text-[var(--color-text)]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-text)] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 sm:w-auto"
          >
            Ver repositório no GitHub
            <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
          </a>
          <a
            href="https://luisr.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border-2 border-[var(--color-border-strong)] bg-[var(--color-bg-card)] px-6 py-3.5 text-sm font-semibold text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]/40 sm:w-auto"
          >
            Falar sobre como colaborar
          </a>
        </motion.div>
      </div>
    </section>
  );
}
