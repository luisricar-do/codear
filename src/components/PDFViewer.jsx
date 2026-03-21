import { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Loader2,
  FileWarning,
  X,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function usePageWidth(isFullscreen) {
  const [width, setWidth] = useState(800);
  useEffect(() => {
    const update = () => {
      setWidth(
        isFullscreen
          ? Math.min(window.innerWidth, window.innerHeight * 1.2)
          : Math.min(window.innerWidth * 0.85, 800)
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isFullscreen]);
  return width;
}

function loadSavedPage(storageKey) {
  if (!storageKey || typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw == null) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 1 ? n : null;
  } catch {
    return null;
  }
}

function savePage(storageKey, pageNumber) {
  if (!storageKey || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(storageKey, String(pageNumber));
  } catch {
    // localStorage unavailable — ignore
  }
}

function SlidePicker({ pageNumber, total, isFullscreen, pickerRef, open, onToggle, onSelect }) {
  const buttonClass = isFullscreen
    ? "flex min-w-[7rem] items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
    : "flex min-w-[7rem] items-center justify-center gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text)]";

  const listClass = isFullscreen
    ? "absolute bottom-full left-1/2 z-50 mb-1 max-h-56 min-w-[8rem] -translate-x-1/2 overflow-y-auto rounded-lg border border-white/20 bg-neutral-900 py-1 shadow-xl"
    : "absolute bottom-full left-1/2 z-50 mb-1 max-h-56 min-w-[8rem] -translate-x-1/2 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] py-1 shadow-lg";

  const optionClass = (active) =>
    isFullscreen
      ? `w-full px-4 py-2 text-left text-sm transition ${active ? "bg-white/20 font-medium text-white" : "text-white/80 hover:bg-white/10"}`
      : `w-full px-4 py-2 text-left text-sm transition ${active ? "bg-[var(--color-primary)]/15 font-medium text-[var(--color-primary)]" : "text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)]"}`;

  return (
    <div className="relative flex-1 flex justify-center" ref={pickerRef}>
      <button
        type="button"
        onClick={() => total > 0 && onToggle()}
        className={buttonClass}
        aria-label="Escolher slide"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        Slide {pageNumber} de {total || "—"}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && total > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            aria-label="Ir para slide"
            className={listClass}
          >
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
              <li key={n} role="option" aria-selected={pageNumber === n}>
                <button
                  type="button"
                  onClick={() => onSelect(n)}
                  className={optionClass(pageNumber === n)}
                >
                  Slide {n}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PDFViewer({ file, storageKey }) {
  const fullscreenRef = useRef(null);
  const pickerRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(() =>
    storageKey ? loadSavedPage(storageKey) ?? 1 : 1
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!!file);
  const [showControls, setShowControls] = useState(false);
  const [slidePickerOpen, setSlidePickerOpen] = useState(false);

  useEffect(() => {
    if (!isFullscreen) return;
    queueMicrotask(() => setShowControls(true));
    const t = setTimeout(() => setShowControls(false), 2500);
    return () => clearTimeout(t);
  }, [isFullscreen]);

  useEffect(() => {
    if (!slidePickerOpen) return;
    const onPointerDown = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setSlidePickerOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [slidePickerOpen]);

  const pageWidth = usePageWidth(isFullscreen);

  useEffect(() => {
    if (numPages == null) return;
    queueMicrotask(() =>
      setPageNumber((p) => Math.min(Math.max(1, p), numPages))
    );
  }, [numPages]);

  useEffect(() => {
    if (storageKey && pageNumber >= 1) savePage(storageKey, pageNumber);
  }, [storageKey, pageNumber]);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setError(null);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((err) => {
    setError(err?.message || "Erro ao carregar o PDF.");
    setIsLoading(false);
  }, []);

  const goPrev = useCallback(() => setPageNumber((p) => Math.max(1, p - 1)), []);
  const goNext = useCallback(() => setPageNumber((p) => Math.min(numPages ?? 1, p + 1)), [numPages]);

  const toggleFullscreen = useCallback(() => {
    if (!fullscreenRef.current) return;
    if (!document.fullscreenElement) {
      fullscreenRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => { });
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => { });
    }
  }, []);

  useEffect(() => {
    const onChange = () => {
      const el = fullscreenRef.current;
      setIsFullscreen(!!(document.fullscreenElement && el && document.fullscreenElement === el));
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") { goPrev(); e.preventDefault(); }
      else if (e.key === "ArrowRight" || e.key === " ") { goNext(); e.preventDefault(); }
      else if (e.key === "Escape" && document.fullscreenElement) document.exitFullscreen?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

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
          {error} Verifique se o arquivo{" "}
          <code className="rounded bg-gray-100 px-2 py-1 text-[var(--color-primary)]">
            slides.pdf
          </code>{" "}
          está na pasta do módulo.
        </p>
      </motion.div>
    );
  }

  const total = numPages ?? 0;
  const progress = total > 0 ? (pageNumber / total) * 100 : 0;

  const slideContent = (
    <>
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
    </>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
      {!isFullscreen && (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text)] shadow-sm"
            aria-label="Apresentação (tela cheia)"
          >
            <Maximize2 className="h-4 w-4" />
            Apresentação
          </button>
        </div>
      )}

      <div
        ref={fullscreenRef}
        className={
          "flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-sm overflow-hidden " +
          (isFullscreen
            ? "!fixed !inset-0 !z-50 !rounded-none bg-neutral-950 flex items-center justify-center"
            : "p-4 sm:p-6")
        }
        onMouseEnter={() => isFullscreen && setShowControls(true)}
        onMouseLeave={() => isFullscreen && setShowControls(false)}
      >
        <div className={isFullscreen ? "flex-1 flex items-center justify-center min-h-0 w-full" : "flex justify-center"}>
          {slideContent}
        </div>

        <div
          className={
            isFullscreen
              ? `absolute bottom-0 left-0 right-0 flex flex-col bg-black/80 text-white transition-opacity duration-200 ${showControls ? "opacity-100" : "opacity-0"}`
              : "mt-4"
          }
        >
          <div className={`h-1 w-full overflow-hidden ${isFullscreen ? "bg-white/20" : "bg-[var(--color-border)]"}`}>
            <motion.div
              className="h-full bg-[var(--color-primary)]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", duration: 0.2 }}
            />
          </div>

          <div className={isFullscreen ? "flex items-center justify-between px-4 py-2" : "flex flex-col gap-2 mt-2"}>
            <div className="flex items-center justify-between gap-4">
              {!isFullscreen && (
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={pageNumber <= 1}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text)] transition hover:bg-[var(--color-bg-card)] disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <SlidePicker
                pageNumber={pageNumber}
                total={total}
                isFullscreen={isFullscreen}
                pickerRef={pickerRef}
                open={slidePickerOpen}
                onToggle={() => setSlidePickerOpen((o) => !o)}
                onSelect={(n) => { setPageNumber(n); setSlidePickerOpen(false); }}
              />

              {!isFullscreen && (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={pageNumber >= (numPages ?? 1)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text)] transition hover:bg-[var(--color-bg-card)] disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Próximo slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}

              {isFullscreen && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={pageNumber <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={pageNumber >= (numPages ?? 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => document.exitFullscreen?.()}
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20"
                    aria-label="Sair da apresentação"
                  >
                    <X className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>

            {!isFullscreen && total > 0 && total <= 24 && (
              <div className="flex flex-wrap justify-center gap-1" role="tablist" aria-label="Slides">
                {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="tab"
                    aria-selected={pageNumber === n}
                    aria-label={`Ir para slide ${n}`}
                    onClick={() => setPageNumber(n)}
                    className={`h-2 rounded-full transition-all ${pageNumber === n
                      ? "w-6 bg-[var(--color-primary)]"
                      : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {!isFullscreen && storageKey && (
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          Seu progresso é salvo automaticamente. Use as setas do teclado para navegar.
        </p>
      )}
    </motion.div>
  );
}
