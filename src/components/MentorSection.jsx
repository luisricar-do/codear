import { motion } from "framer-motion";
import { User, Award, GraduationCap, Building2 } from "lucide-react";

export function MentorSection() {
  return (
    <section className="border-t border-[var(--color-border)] bg-white py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-2xl font-bold text-[var(--color-primary)] text-center mb-12"
        >
          Quem sou?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center gap-8 sm:flex-row sm:items-start"
        >
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-bg-elevated)]">
            <User className="h-16 w-16 text-[var(--color-muted)]" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-mono text-xl font-semibold text-[var(--color-text)]">
              Luis Ricardo
            </h3>
            <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Building2 className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                Gerente de DevOps e DPO — Tech For Humans
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <GraduationCap className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                Mestrando em IA — UNIFEI
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Award className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                Galactic Local Mentor — NASA International Space Apps Challenge 2025
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
