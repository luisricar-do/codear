import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getManifest } from "../data/content";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Loader2 } from "lucide-react";

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

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-mono text-2xl font-bold text-[var(--color-text)] mb-2">
            Cursos
          </h1>
          <p className="text-[var(--color-text-muted)] mb-8">
            Escolha um curso e acesse os módulos com material e slides.
          </p>

          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4 text-amber-200">
              {error}. Verifique se <code className="rounded bg-black/30 px-1">public/content/cursos/manifest.json</code> existe (rode <code className="rounded bg-black/30 px-1">npm run content:manifest</code>).
            </div>
          )}

          {manifest && Object.keys(manifest.courses).length === 0 && (
            <p className="text-[var(--color-text-muted)]">Nenhum curso cadastrado ainda.</p>
          )}

          {manifest && Object.keys(manifest.courses).length > 0 && (
            <ul className="space-y-4">
              {Object.entries(manifest.courses).map(([slug, course], i) => (
                <motion.li
                  key={slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/cursos/${slug}`}
                    className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 shadow-sm transition hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-elevated)]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/20">
                        <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />
                      </span>
                      <span className="font-mono font-medium text-[var(--color-text)]">
                        {course.title}
                      </span>
                    </span>
                    <span className="text-[var(--color-text-muted)] text-sm">
                      {course.modules.length} módulo(s)
                    </span>
                    <ChevronRight className="h-5 w-5 text-[var(--color-text-muted)]" />
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
