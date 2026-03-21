import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { GITHUB_REPO_URL } from "../site";

const navLinks = [
  { to: "/#metodologia", label: "Metodologia" },
  { to: "/#jornada", label: "Jornada" },
  { to: "/#participe", label: "Participe" },
  { to: "/cursos", label: "Cursos" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-muted)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-block transition hover:opacity-90">
              <img
                src={`${import.meta.env.BASE_URL}assets/icone-grande.png`}
                alt="Codear"
                className="h-10 w-auto sm:h-11"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Plataforma de cursos gratuitos em programação. Conteúdo pensado para quem aprende
              melhor na prática e quer repassar o conhecimento.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
              Navegação
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition hover:text-[var(--color-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
              Projeto
            </h3>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-[var(--color-primary)]"
              >
                <Github className="h-4 w-4 shrink-0" aria-hidden />
                Código no GitHub
              </a>
              <a
                href="https://luisr.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-[var(--color-primary)]"
              >
                luisr.com.br
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 text-xs text-[var(--color-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} Codear. Conteúdo educacional gratuito.</p>
          <p className="text-center sm:text-right">Feito com foco em acessibilidade e clareza.</p>
        </div>
      </div>
    </motion.footer>
  );
}
