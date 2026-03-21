import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getManifest } from "../data/content";
import { BookOpen, ChevronRight, Loader2, GraduationCap } from "lucide-react";

export function CoursesSection() {
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getManifest()
      .then(setManifest)
      .catch(() => setManifest({ courses: {} }))
      .finally(() => setLoading(false));
  }, []);

  const courses = manifest?.courses ? Object.entries(manifest.courses) : [];

  return (
    <section
      id="jornada"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] py-20 px-4 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border-strong)] to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] shadow-sm"
            >
              <GraduationCap className="h-3.5 w-3.5" aria-hidden />
              Jornada
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-4 font-mono text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl"
            >
              Cursos disponíveis
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-3 text-[var(--color-text-muted)] leading-relaxed"
            >
              Material estruturado em módulos, com leitura e slides quando disponíveis. Comece pelo
              que fizer mais sentido para você.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-8 shrink-0 lg:mt-0"
          >
            <Link
              to="/cursos"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-card)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]/35 hover:bg-[var(--color-primary-soft)]"
            >
              Ver todos
              <ChevronRight className="h-4 w-4 text-[var(--color-primary)]" />
            </Link>
          </motion.div>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
              <span className="text-sm text-[var(--color-text-muted)]">Carregando cursos...</span>
            </motion.div>
          </div>
        )}

        {!loading && courses.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-[var(--color-text-muted)]"
          >
            Nenhum curso disponível no momento.
          </motion.p>
        )}

        {!loading && courses.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(([slug, course], i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <Link
                  to={`/cursos/${slug}`}
                  className="group codear-card codear-card-hover flex h-full flex-col overflow-hidden"
                >
                  <div className="relative h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 opacity-90" />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-1 ring-orange-200/50 transition group-hover:ring-orange-300/80">
                        <BookOpen className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/80">
                        Grátis
                      </span>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-[var(--color-text)] transition group-hover:text-[var(--color-primary)]">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                      {course.modules.length} módulo{course.modules.length !== 1 ? "s" : ""} · conteúdo
                      progressivo
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
                      Acessar curso
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
