import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getManifest } from "../data/content";
import { BookOpen, ChevronRight, Loader2 } from "lucide-react";

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
    <section className="border-t border-[var(--color-border)] bg-white py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-2xl font-bold text-[var(--color-primary)] text-center mb-12"
        >
          Cursos
        </motion.h2>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
          </div>
        )}

        {!loading && courses.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)]">
            Nenhum curso disponível no momento.
          </p>
        )}

        {!loading && courses.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map(([slug, course], i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/cursos/${slug}`}
                  className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 shadow-sm transition hover:border-[var(--color-primary)]/50 hover:shadow-md"
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/20">
                    <BookOpen className="h-6 w-6 text-[var(--color-primary)]" />
                  </span>
                  <h3 className="font-mono text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4">
                    {course.modules.length} módulo{course.modules.length !== 1 ? "s" : ""}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                    Ver curso
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
