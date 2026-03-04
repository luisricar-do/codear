import { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function usePageWidth() {
  const [width, setWidth] = useState(800);
  useEffect(() => {
    const update = () => setWidth(Math.min(window.innerWidth * 0.85, 800));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Loader2,
  FileWarning,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

/**
 * @param {{ file?: string }} props - file = URL do PDF (ex: /content/cursos/.../slides.pdf). Se omitido, não renderiza documento.
 */
export function PDFViewer({ file }) {
  const pageWidth = usePageWidth();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!!file);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setError(null);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    setError(err?.message || "Erro ao carregar o PDF.");
    setIsLoading(false);
  }, []);

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => Math.min(numPages ?? 1, p + 1));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  if (!file) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 text-center text-[var(--color-text-muted)] shadow-sm">
        Este módulo não possui PDF de slides.
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 text-center shadow-sm"
      >
        <FileWarning className="h-16 w-16 text-amber-500" />
        <h3 className="font-mono text-lg font-semibold text-[var(--color-text)]">
          PDF não encontrado
        </h3>
        <p className="max-w-md text-sm text-[var(--color-text-muted)]">
          {error} Verifique se o arquivo <code className="rounded bg-gray-100 px-2 py-1 text-[var(--color-primary)]">slides.pdf</code> está na pasta do módulo.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={pageNumber <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] transition hover:bg-[var(--color-bg-elevated)] disabled:opacity-40 disabled:pointer-events-none shadow-sm"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[80px] text-center font-mono text-sm text-[var(--color-text-muted)]">
            {pageNumber} / {numPages ?? "—"}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={pageNumber >= (numPages ?? 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] transition hover:bg-[var(--color-bg-elevated)] disabled:opacity-40 disabled:pointer-events-none shadow-sm"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text)] shadow-sm"
          aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
          {isFullscreen ? "Sair" : "Tela cheia"}
        </button>
      </div>

      <div className="flex justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 sm:p-6 shadow-sm">
        {isLoading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-[var(--color-primary)]" />
          </div>
        )}
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          className="flex justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pageNumber}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center"
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth}
                renderTextLayer
                renderAnnotationLayer
                className="shadow-lg"
              />
            </motion.div>
          </AnimatePresence>
        </Document>
      </div>
    </motion.div>
  );
}
