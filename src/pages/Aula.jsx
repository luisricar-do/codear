import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MarkdownContent } from "../components/MarkdownContent";
import { PDFViewer } from "../components/PDFViewer";
import {
  getManifest,
  getLessonMarkdown,
  getLessonSlidesUrl,
  getModuleSlidesUrl,
} from "../data/content";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export function Aula() {
  const { courseSlug, moduleSlug, lessonSlug } = useParams();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseSlug || !moduleSlug || !lessonSlug) return;
    let cancelled = false;
    getManifest()
      .then((m) => {
        if (cancelled) return;
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
        const lessons = mod.lessons ?? [];
        const ok = lessons.some((l) => l.slug === lessonSlug);
        if (!ok) {
          setError("Aula não encontrada neste módulo");
          return;
        }
        return getLessonMarkdown(courseSlug, moduleSlug, lessonSlug);
      })
      .then((md) => {
        if (cancelled) return;
        if (md) setMarkdown(md);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [courseSlug, moduleSlug, lessonSlug]);

  const course = manifest?.courses?.[courseSlug];
  const moduleInfo = course?.modules?.find((m) => m.slug === moduleSlug);
  const lessons = moduleInfo?.lessons ?? [];
  const lessonIndex = lessons.findIndex((l) => l.slug === lessonSlug);
  const lessonMeta = lessonIndex >= 0 ? lessons[lessonIndex] : null;
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex >= 0 && lessonIndex < lessons.length - 1
      ? lessons[lessonIndex + 1]
      : null;

  const slidesUrl = (() => {
    if (!course || !moduleInfo || !lessonMeta) return null;
    if (lessonMeta.hasSlides) {
      return getLessonSlidesUrl(courseSlug, moduleSlug, lessonSlug);
    }
    if (moduleInfo.hasSlides) {
      return getModuleSlidesUrl(courseSlug, moduleSlug);
    }
    return null;
  })();

  const slidesStorageKey = slidesUrl
    ? lessonMeta?.hasSlides
      ? `codear-slides-${courseSlug}-${moduleSlug}-${lessonSlug}`
      : `codear-slides-${courseSlug}-${moduleSlug}`
    : undefined;

  const base = `/cursos/${courseSlug}/${moduleSlug}`;

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12 px-4">
          <div className="mx-auto max-w-2xl text-center py-16">
            <p className="text-[var(--color-text-muted)] mb-4">{error}</p>
            <button
              type="button"
              onClick={() => navigate(base)}
              className="text-[var(--color-primary)] hover:underline"
            >
              Voltar ao módulo
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <Link
              to={courseSlug ? `/cursos/${courseSlug}` : "/cursos"}
              className="inline-flex items-center gap-2 text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Curso
            </Link>
            <span className="text-[var(--color-text-muted)]">/</span>
            <Link
              to={base}
              className="text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
            >
              {moduleInfo?.title ?? "Módulo"}
            </Link>
            {lessonMeta && (
              <>
                <span className="text-[var(--color-text-muted)]">/</span>
                <span className="text-[var(--color-text)] font-medium">
                  {lessonMeta.title}
                </span>
              </>
            )}
          </div>

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
              <div className="mb-8">
                <PDFViewer
                  file={slidesUrl ?? undefined}
                  storageKey={slidesStorageKey}
                />
              </div>
              {markdown && (
                <div>
                  <MarkdownContent content={markdown} />
                </div>
              )}

              {(prevLesson || nextLesson) && (
                <nav
                  className="mt-12 flex flex-col gap-3 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:justify-between"
                  aria-label="Navegação entre aulas"
                >
                  {prevLesson ? (
                    <Link
                      to={`${base}/${prevLesson.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-sm text-[var(--color-text)] transition hover:border-[var(--color-primary)]/50"
                    >
                      <ChevronLeft className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                      <span className="min-w-0 truncate">{prevLesson.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {nextLesson ? (
                    <Link
                      to={`${base}/${nextLesson.slug}`}
                      className="inline-flex items-center justify-end gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-sm text-[var(--color-text)] transition hover:border-[var(--color-primary)]/50 sm:text-right"
                    >
                      <span className="min-w-0 truncate">{nextLesson.title}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    </Link>
                  ) : null}
                </nav>
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
