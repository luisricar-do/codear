const BASE = `${import.meta.env.BASE_URL}content/cursos`;

export async function getManifest() {
  const indexRes = await fetch(`${BASE}/index.json`);
  if (!indexRes.ok) throw new Error("Registo de cursos (index.json) não encontrado");
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

export async function getCourseMarkdown(courseSlug) {
  const res = await fetch(`${BASE}/${courseSlug}/curso.md`);
  if (!res.ok) throw new Error("Curso não encontrado");
  return res.text();
}

export async function getModuleMarkdown(courseSlug, moduleSlug) {
  const res = await fetch(`${BASE}/${courseSlug}/${moduleSlug}/README.md`);
  if (!res.ok) throw new Error("Módulo não encontrado");
  return res.text();
}

export async function getLessonMarkdown(courseSlug, moduleSlug, lessonSlug) {
  const res = await fetch(
    `${BASE}/${courseSlug}/${moduleSlug}/aulas/${lessonSlug}/README.md`
  );
  if (!res.ok) throw new Error("Aula não encontrada");
  return res.text();
}

export function getModuleSlidesUrl(courseSlug, moduleSlug) {
  return `${BASE}/${courseSlug}/${moduleSlug}/slides.pdf`;
}

export function getLessonSlidesUrl(courseSlug, moduleSlug, lessonSlug) {
  return `${BASE}/${courseSlug}/${moduleSlug}/aulas/${lessonSlug}/slides.pdf`;
}
