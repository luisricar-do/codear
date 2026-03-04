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
import { ArrowLeft, Loader2 } from "lucide-react";

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
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          <Link
            to={courseSlug ? `/cursos/${courseSlug}` : "/cursos"}
            className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao curso
          </Link>

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
              {markdown && (
                <div className="mb-8">
                  <MarkdownContent content={markdown} />
                </div>
              )}
              <div className="mt-8">
                <PDFViewer file={slidesUrl ?? undefined} />
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
