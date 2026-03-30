/**
 * Carrega fragmentos de tools/slides/components/marp/*.md para composição em decks.
 * Remove o bloco de documentação inicial (Componente: …) e reescreve caminhos.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPTS_DIR = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_MARP = join(SCRIPTS_DIR, "../components/marp");

/** @typedef {'generated' | 'decks'} MarpPathVariant */

const PATH_REPLACEMENTS = {
  /** Desde decks/_generated/<id>.md */
  generated: {
    "../../../public/assets/icone-grande.png": "../../../../public/assets/icone-grande.png",
    "../../../public/assets/icone-pequeno.png": "../../../../public/assets/icone-pequeno.png",
    "../icons/svg/": "../../icons/svg/",
  },
  /** Desde tools/slides/decks/*.md (identidade nos ficheiros .md dos componentes) */
  decks: {},
};

const DOC_COMMENT_RE = /^\s*<!--\s*\r?\n\s*Componente:[\s\S]*?-->\s*\r?\n/u;

/**
 * @param {string} name - Nome do ficheiro sem .md (ex.: "title")
 * @param {MarpPathVariant} [variant]
 * @returns {string}
 */
export function loadMarpFragment(name, variant = "generated") {
  const path = join(COMPONENTS_MARP, `${name}.md`);
  let raw = readFileSync(path, "utf8");
  raw = raw.replace(DOC_COMMENT_RE, "");
  const map = PATH_REPLACEMENTS[variant] ?? {};
  for (const [from, to] of Object.entries(map)) {
    raw = raw.split(from).join(to);
  }
  return raw.trim();
}
