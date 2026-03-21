import { useParams } from "react-router-dom";
import { Aula } from "./Aula";

export function AulaRoute() {
  const { courseSlug, moduleSlug, lessonSlug } = useParams();
  return <Aula key={`${courseSlug}-${moduleSlug}-${lessonSlug}`} />;
}
