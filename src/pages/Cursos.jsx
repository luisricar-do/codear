import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getManifest } from "../data/content";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Loader2, GraduationCap } from "lucide-react";

export function Cursos() {
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getManifest()
      .then(setManifest)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const count = manifest ? Object.keys(manifest.courses).length : 0;

  return (
    <>
      <Header />
      <main className="min-h-screen pb-16">
        <div className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-card)] pt-24 pb-12 sm:pt-28 sm:pb-16">
          <div className="codear-grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden />
              Catálogo
            </div>
            <h1 className="mt-4 max-w-2xl font-mono text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl md:text-[2.75rem] md:leading-tight">
              Escolha um curso e comece agora
            </h1>
            <p className="mt-4 max-w-xl text-[var(--color-text-muted)] leading-relaxed">
              Cada curso está organizado em módulos, com material em texto e slides quando
              disponíveis. Tudo aberto e gratuito.
            </p>
            {!loading && !error ? (
              <p className="mt-6 font-mono text-sm font-semibold text-[var(--color-muted)]">
                {count === 0 ? "Nenhum curso listado" : `${count} curso${count !== 1 ? "s" : ""} disponível${count !== 1 ? "eis" : ""}`}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
            </div>
          )}

          {error && (
            <div className="codear-card rounded-2xl border-amber-200 bg-amber-50 p-5 text-amber-950">
              <p className="font-medium">{error}</p>
              <p className="mt-2 text-sm text-amber-900/90">
                Verifique <code className="rounded bg-amber-100/80 px-1.5 py-0.5 font-mono text-xs">content/cursos/index.json</code> e os{" "}
                <code className="rounded bg-amber-100/80 px-1.5 py-0.5 font-mono text-xs">manifest.json</code> de cada curso.
              </p>
            </div>
          )}

          {manifest && Object.keys(manifest.courses).length === 0 && (
            <p className="text-center text-[var(--color-text-muted)]">Nenhum curso cadastrado ainda.</p>
          )}

          {manifest && Object.keys(manifest.courses).length > 0 && (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(manifest.courses).map(([slug, course], i) => (
                <motion.li
                  key={slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={`/cursos/${slug}`}
                    className="group codear-card codear-card-hover flex h-full flex-col overflow-hidden"
                  >
                    <div className="relative h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-1 ring-orange-200/60">
                          <BookOpen className="h-5 w-5" />
                        </span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200/80">
                          Grátis
                        </span>
                      </div>
                      <span className="font-mono text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
                        {course.title}
                      </span>
                      <span className="mt-2 text-sm text-[var(--color-text-muted)]">
                        {course.modules.length} módulo{course.modules.length !== 1 ? "s" : ""}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
                        Abrir
                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
