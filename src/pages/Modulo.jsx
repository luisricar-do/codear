import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MarkdownContent } from "../components/MarkdownContent";
import { PDFViewer } from "../components/PDFViewer";
import {
  getManifest,
  getModuleMarkdown,
  getModuleSlidesUrl,
} from "../data/content";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";

export function Modulo() {
  const { courseSlug, moduleSlug } = useParams();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseSlug || !moduleSlug) return;
    getManifest()
      .then((m) => {
        setManifest(m);
        const course = m.courses[courseSlug];
        if (!course) {
          setError("Curso não encontrado");
          return;
        }
        const mod = course.modules.find((x) => x.slug === moduleSlug);
        if (!mod) {
          setError("Módulo não encontrado");
          return;
        }
        return getModuleMarkdown(courseSlug, moduleSlug);
      })
      .then((md) => md && setMarkdown(md))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [courseSlug, moduleSlug]);

  const course = manifest?.courses?.[courseSlug];
  const moduleInfo = course?.modules?.find((m) => m.slug === moduleSlug);
  const slidesUrl =
    course && moduleInfo?.hasSlides
      ? getModuleSlidesUrl(courseSlug, moduleSlug)
      : null;

  const lessons = moduleInfo?.lessons ?? [];
  const hasLessons = lessons.length > 0;

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12 px-4">
          <div className="mx-auto max-w-2xl text-center py-16">
            <p className="text-[var(--color-text-muted)] mb-4">{error}</p>
            <button
              type="button"
              onClick={() => navigate(courseSlug ? `/cursos/${courseSlug}` : "/cursos")}
              className="text-[var(--color-primary)] hover:underline"
            >
              Voltar
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pb-16">
        <div className="relative border-b border-[var(--color-border)] bg-[var(--color-bg-card)] pt-20 pb-8 sm:pt-24">
          <div className="codear-grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
            <Link
              to={courseSlug ? `/cursos/${courseSlug}` : "/cursos"}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              Voltar ao curso
            </Link>
            {!loading && moduleInfo ? (
              <div className="mt-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                  Módulo
                </p>
                <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
                  {moduleInfo.title}
                </h1>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-10">
          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
            </div>
          )}

          {!loading && moduleInfo && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {slidesUrl ? (
                <div className="mb-8">
                  <PDFViewer
                    file={slidesUrl}
                    storageKey={`codear-slides-${courseSlug}-${moduleSlug}`}
                  />
                </div>
              ) : null}
              {markdown && (
                <div className={hasLessons ? "mb-10" : ""}>
                  <MarkdownContent content={markdown} />
                </div>
              )}

              {hasLessons && (
                <section aria-labelledby="aulas-heading">
                  <h2
                    id="aulas-heading"
                    className="font-mono text-lg font-semibold text-[var(--color-text)] mb-4"
                  >
                    Aulas
                  </h2>
                  <ul className="space-y-3">
                    {lessons.map((aula, i) => (
                      <motion.li
                        key={aula.slug}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={`/cursos/${courseSlug}/${moduleSlug}/${aula.slug}`}
                          className="codear-card-hover flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3.5 shadow-sm transition hover:border-[var(--color-primary)]/45"
                        >
                          <span className="flex items-center gap-3 min-w-0 flex-1">
                            <BookOpen className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                            <span className="text-[var(--color-text)] leading-snug break-words">
                              {aula.title}
                            </span>
                          </span>
                          <span className="text-[var(--color-text-muted)] text-sm shrink-0">
                            Abrir →
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </section>
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
