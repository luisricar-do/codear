/**
 * Gera ficheiros SVG estáticos a partir dos nomes em icons/manifest.json (Lucide).
 * Uso: node scripts/icons-build.mjs  |  npm run icons:build
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { icons } from "lucide";
import defaultAttributes from "lucide/dist/esm/defaultAttributes.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "icons/manifest.json");
const outDir = join(root, "icons/svg");
const indexPath = join(root, "icons/index.json");

function kebabToPascal(name) {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function formatAttrs(attrs) {
  return Object.entries(attrs)
    .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
    .join(" ");
}

function buildSvg(iconNode) {
  const svgAttrs = { ...defaultAttributes, stroke: "currentColor" };
  const inner = iconNode
    .map(([tag, attrs]) => `  <${tag} ${formatAttrs(attrs)}/>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg ${formatAttrs(svgAttrs)}>\n${inner}\n</svg>\n`;
}

const raw = JSON.parse(await readFile(manifestPath, "utf8"));
const names = raw.icons;
if (!Array.isArray(names) || names.length === 0) {
  console.error("icons/manifest.json: campo \"icons\" deve ser um array não vazio.");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const errors = [];
for (const kebab of names) {
  const pascal = kebabToPascal(kebab);
  const iconNode = icons[pascal];
  if (!iconNode) {
    errors.push(`Ícone desconhecido: "${kebab}" → "${pascal}"`);
    continue;
  }
  await writeFile(join(outDir, `${kebab}.svg`), buildSvg(iconNode), "utf8");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const lucideVer =
  pkg.devDependencies?.lucide?.replace(/^[\^~]/, "") ?? "unknown";

await writeFile(
  indexPath,
  `${JSON.stringify(
    {
      generated: new Date().toISOString().slice(0, 10),
      lucide: lucideVer,
      svgDir: "svg",
      icons: [...names].sort(),
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Ícones: ${names.length} SVG em ${outDir}`);
console.log(`Índice: ${indexPath}`);
