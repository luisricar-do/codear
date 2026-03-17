import { motion } from "framer-motion";
import { Award, GraduationCap, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const listItem = {
  hidden: { opacity: 0, x: -12 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.08 },
  }),
};

export function MentorSection() {
  return (
    <section className="relative border-t border-[var(--color-border)] bg-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--color-bg)_30%)] pointer-events-none" />
      <div className="mx-auto max-w-4xl relative">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-2xl font-bold text-[var(--color-primary)] text-center mb-12"
        >
          Quem sou?
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            show: {
              transition: { staggerChildren: 0.06 },
            },
          }}
          className="flex flex-col items-center gap-8 sm:flex-row sm:items-start"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
            }}
            className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 shadow-sm transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-lg hover:shadow-orange-500/5"
          >
            <h3 className="font-mono text-xl font-semibold text-[var(--color-text)]">
              Luis Ricardo
            </h3>
            <ul className="mt-4 space-y-3 text-[var(--color-text-muted)]">
              {[
                {
                  Icon: Building2,
                  text: "Senior Software Engineer / DevOps Manager — Tech For Humans",
                },
                {
                  Icon: GraduationCap,
                  text: "Formado em Sistemas de Informação — UNIFEI e Mestrando em IA — UNIFEI",
                },
                {
                  Icon: Award,
                  text: (
                    <>
                      Veja mais em{" "}
                      <Link
                        to="https://luisr.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] hover:underline font-medium"
                      >
                        luisr.com.br
                      </Link>
                    </>
                  ),
                },
              ].map(({ Icon, text }, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={listItem}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed sm:text-base">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
