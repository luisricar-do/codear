import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/#metodologia", label: "Metodologia" },
  { to: "/#jornada", label: "Jornada" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t-2 border-[var(--color-primary)]/20 bg-white py-14 px-4"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Coluna 1: Marca */}
          <div>
            <Link
              to="/"
              className="inline-block transition hover:opacity-90"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/icone-grande.png`}
                alt="Codear"
                className="h-10 w-auto sm:h-11"
              />
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-muted)] leading-relaxed">
              Desmistificando a programação e capacitando pessoas a se tornarem
              multiplicadores de conhecimento.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h3 className="font-mono font-bold text-[var(--color-text)]">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h3 className="font-mono font-bold text-[var(--color-text)]">
              Contato
            </h3>
            <div className="mt-4 text-sm text-[var(--color-text-muted)]">
              <a
                href="https://luisr.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[var(--color-primary)]"
              >
                luisr.com.br
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
