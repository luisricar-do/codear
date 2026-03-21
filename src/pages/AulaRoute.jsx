import { useParams } from "react-router-dom";
import { Aula } from "./Aula";

/** Remonta a página ao trocar de aula para resetar estado sem setState no início do efeito. */
export function AulaRoute() {
  const { courseSlug, moduleSlug, lessonSlug } = useParams();
  return (
    <Aula key={`${courseSlug}-${moduleSlug}-${lessonSlug}`} />
  );
}
