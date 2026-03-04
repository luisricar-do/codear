import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MarkdownContent } from "../components/MarkdownContent";
import { getManifest, getCourseMarkdown } from "../data/content";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, FileText, Loader2, List } from "lucide-react";

export function Curso() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState(null);
  const [markdown, setMarkdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseSlug) return;
    getManifest()
      .then((m) => {
        setManifest(m);
        if (!m.courses[courseSlug]) {
          setError("Curso não encontrado");
          return;
        }
        return getCourseMarkdown(courseSlug);
      })
      .then((md) => md && setMarkdown(md))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [courseSlug]);

  const course = manifest?.courses?.[courseSlug];
  const modulesRef = useRef(null);

  const scrollToModules = () => {
    modulesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12 px-4">
          <div className="mx-auto max-w-2xl text-center py-16">
            <p className="text-[var(--color-text-muted)] mb-4">{error}</p>
            <button
              type="button"
              onClick={() => navigate("/cursos")}
              className="text-[var(--color-primary)] hover:underline"
            >
              Voltar aos cursos
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-24 lg:pb-12">
        <div className="mx-auto max-w-6xl lg:max-w-7xl">
          <Link
            to="/cursos"
            className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar aos cursos
          </Link>

          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
            </div>
          )}

          {!loading && course && (
            <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-14">
              {/* Conteúdo do curso (markdown) */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-w-0 lg:pr-4"
              >
                {markdown && (
                  <MarkdownContent content={markdown} className="mb-10" />
                )}
              </motion.div>

              {/* Sidebar: módulos (desktop) */}
              <aside
                aria-label="Módulos do curso"
                className="hidden lg:block lg:sticky lg:top-24 lg:self-start"
              >
                <h2 className="font-mono text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[var(--color-primary)]" />
                  Módulos
                </h2>
                <ul className="space-y-3">
                  {course.modules.map((mod, i) => (
                    <motion.li
                      key={mod.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={`/cursos/${courseSlug}/${mod.slug}`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 shadow-sm transition hover:border-[var(--color-primary)]/50"
                      >
                        <span className="flex items-center gap-3 min-w-0 flex-1">
                          <BookOpen className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                          <span className="text-[var(--color-text)] leading-snug break-words">{mod.title}</span>
                        </span>
                        <span className="text-[var(--color-text-muted)] text-sm shrink-0">Abrir →</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </aside>

              {/* Seção módulos (mobile): só aparece em telas pequenas, para o botão scrollar até aqui */}
              <section
                ref={modulesRef}
                className="lg:hidden"
              >
                <h2 className="font-mono text-lg font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[var(--color-primary)]" />
                  Módulos
                </h2>
                <ul className="space-y-3">
                  {course.modules.map((mod, i) => (
                    <motion.li
                      key={mod.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={`/cursos/${courseSlug}/${mod.slug}`}
                        className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 shadow-sm transition hover:border-[var(--color-primary)]/50"
                      >
                        <span className="flex items-center gap-3">
                          <BookOpen className="h-4 w-4 text-[var(--color-primary)]" />
                          <span className="text-[var(--color-text)]">{mod.title}</span>
                        </span>
                        <span className="text-[var(--color-text-muted)] text-sm">Abrir →</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>

        {/* Botão flutuante "Ver módulos" (só em mobile) */}
        {!loading && course && course.modules.length > 0 && (
          <div className="lg:hidden fixed bottom-6 left-4 right-4 z-10 flex justify-center">
            <motion.button
              type="button"
              onClick={scrollToModules}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
            >
              <List className="h-4 w-4" />
              Ver módulos
            </motion.button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
