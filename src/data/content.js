const BASE = `${import.meta.env.BASE_URL}content/cursos`;

/**
 * Lista só os slugs das pastas de curso. Cada curso continua com o seu
 * `manifest.json` em `content/cursos/<slug>/` (evita manifest global pesado).
 * @typedef {{ slug: string, title: string, hasSlides?: boolean }} LessonRef
 * @typedef {{ slug: string, title: string, hasSlides?: boolean, lessons?: LessonRef[] }} ModuleRef
 * @typedef {{ title: string, modules: ModuleRef[] }} CourseRef
 * @returns {Promise<{ courses: Record<string, CourseRef> }>}
 */
export async function getManifest() {
  const indexRes = await fetch(`${BASE}/index.json`);
  if (!indexRes.ok) throw new Error("Registo de cursos (index.json) não encontrado");
  /** @type {{ slugs: string[] }} */
  const index = await indexRes.json();
  const slugs = Array.isArray(index.slugs) ? index.slugs : [];

  const pairs = await Promise.all(
    slugs.map(async (slug) => {
      const res = await fetch(`${BASE}/${slug}/manifest.json`);
      if (!res.ok) throw new Error(`Manifest do curso "${slug}" não encontrado`);
      const data = await res.json();
      return [slug, data];
    })
  );
  pairs.sort((a, b) => a[0].localeCompare(b[0]));
  return { courses: Object.fromEntries(pairs) };
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
 * Markdown de uma aula dentro do módulo (`aulas/<lessonSlug>/README.md`).
 * @param {string} courseSlug
 * @param {string} moduleSlug
 * @param {string} lessonSlug
 */
export async function getLessonMarkdown(courseSlug, moduleSlug, lessonSlug) {
  const res = await fetch(
    `${BASE}/${courseSlug}/${moduleSlug}/aulas/${lessonSlug}/README.md`
  );
  if (!res.ok) throw new Error("Aula não encontrada");
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

/**
 * URL do PDF de slides de uma aula (`aulas/<lessonSlug>/slides.pdf`).
 * @param {string} courseSlug
 * @param {string} moduleSlug
 * @param {string} lessonSlug
 */
export function getLessonSlidesUrl(courseSlug, moduleSlug, lessonSlug) {
  return `${BASE}/${courseSlug}/${moduleSlug}/aulas/${lessonSlug}/slides.pdf`;
}
