import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[var(--color-border)] bg-white px-6 py-12 text-center shadow-lg shadow-orange-500/10 sm:p-14"
        >
          <h2 className="font-mono text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            Pronto para começar sua jornada?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-text-muted)]">
            Junte-se a centenas de pessoas que transformaram suas vidas através da
            programação e agora multiplicam esse conhecimento.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/cursos"
              className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)] px-6 py-3.5 font-medium text-white shadow-lg shadow-orange-500/25 transition hover:bg-[var(--color-primary-hover)] hover:shadow-orange-500/40"
            >
              Inscreva-se Agora
              <span aria-hidden>&gt;</span>
            </Link>
            <a
              href="https://luisr.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border-2 border-[var(--color-primary)] bg-transparent px-6 py-3.5 font-medium text-[var(--color-primary)] transition hover:bg-[var(--color-primary)]/10"
            >
              Falar com a Equipe
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
