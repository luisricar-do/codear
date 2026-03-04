const BASE = "/content/cursos";

/**
 * @returns {Promise<{ courses: Record<string, { title: string, modules: { slug: string, title: string, hasSlides: boolean }[] }> }>}
 */
export async function getManifest() {
  const res = await fetch(`${BASE}/manifest.json`);
  if (!res.ok) throw new Error("Manifest não encontrado");
  return res.json();
}

/**
 * @param {string} courseSlug
 * @returns {Promise<string>} markdown do curso
 */
export async function getCourseMarkdown(courseSlug) {
  const res = await fetch(`${BASE}/${courseSlug}/curso.md`);
  if (!res.ok) throw new Error("Curso não encontrado");
  return res.text();
}

/**
 * @param {string} courseSlug
 * @param {string} moduleSlug
 * @returns {Promise<string>} markdown do módulo
 */
export async function getModuleMarkdown(courseSlug, moduleSlug) {
  const res = await fetch(`${BASE}/${courseSlug}/${moduleSlug}/README.md`);
  if (!res.ok) throw new Error("Módulo não encontrado");
  return res.text();
}

/**
 * URL do PDF de slides do módulo (para usar em <Document file={...} />).
 * @param {string} courseSlug
 * @param {string} moduleSlug
 */
export function getModuleSlidesUrl(courseSlug, moduleSlug) {
  return `${BASE}/${courseSlug}/${moduleSlug}/slides.pdf`;
}
