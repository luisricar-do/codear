import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-white via-[var(--color-primary-soft)]/50 to-amber-50/30 px-6 py-14 text-center shadow-lg shadow-orange-500/10 sm:px-12 sm:py-16"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-400/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-sky-200/20 blur-3xl"
            aria-hidden
          />
          <div className="codear-grid-bg pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />

          <div className="relative">
            <p className="font-mono text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              Próximo passo
            </p>
            <h2 className="mt-3 font-mono text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl md:text-4xl">
              Comece hoje — sem cartão, sem pegadinhas
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              Entre na plataforma, escolha um curso e avance módulo a módulo. Se quiser falar com quem
              mantém o projeto, o contato está aberto.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/cursos"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-600/25 transition hover:bg-[var(--color-primary-hover)]"
              >
                Ver cursos gratuitos
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="https://luisr.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border-2 border-[var(--color-border-strong)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]/40 hover:bg-white"
              >
                Contato
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
