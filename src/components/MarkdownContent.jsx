import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renderiza markdown com Tailwind Typography (prose). Tema alinhado ao site (cores, font-mono em títulos).
 * @param {{ content: string, className?: string }} props
 */
export function MarkdownContent({ content, className = "" }) {
  return (
    <article
      className={`prose prose-codear max-w-none prose-lg
        prose-headings:font-mono prose-headings:tracking-tight
        prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:pb-2 prose-h1:border-b prose-h1:border-[var(--color-border)]
        prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[var(--color-border)]
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-relaxed prose-p:mb-4 prose-p:font-normal
        prose-a:text-[var(--color-primary)] prose-a:no-underline prose-a:font-medium hover:prose-a:underline
        prose-strong:font-semibold prose-strong:text-[var(--color-text)]
        prose-ul:my-6 prose-ol:my-6 prose-li:my-1.5 prose-li:marker:text-[var(--color-primary)]
        prose-blockquote:border-l-[var(--color-primary)] prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[var(--color-text-muted)]
        prose-code:rounded-md prose-code:bg-[var(--color-bg-elevated)] prose-code:px-2 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:text-[var(--color-primary)] prose-code:font-mono
        prose-pre:bg-[var(--color-bg-elevated)] prose-pre:border prose-pre:border-[var(--color-border)] prose-pre:rounded-xl prose-pre:shadow-inner
        prose-hr:border-[var(--color-border)] prose-hr:my-8
        prose-table:border-collapse prose-th:border prose-th:border-[var(--color-border)] prose-th:bg-[var(--color-bg-elevated)] prose-th:px-4 prose-th:py-2 prose-th:text-left
        prose-td:border prose-td:border-[var(--color-border)] prose-td:px-4 prose-td:py-2
        ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
