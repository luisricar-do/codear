#!/usr/bin/env node
/**
 * CLI genérico para decks CODEAR: diagramas Mermaid → generate.mjs → Marp PDF.
 * Ver `tools/slides/registry.json` e `sources/<id>/`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLIDES_ROOT = path.resolve(__dirname, "..");

function resolveRegistryFile() {
  const main = path.join(SLIDES_ROOT, "registry.json");
  const example = path.join(SLIDES_ROOT, "registry.example.json");
  if (fs.existsSync(main)) return main;
  if (fs.existsSync(example)) return example;
  throw new Error(
    "Falta registry.json em tools/slides. Copie registry.example.json para registry.json e defina `decks`.",
  );
}

function loadRegistry() {
  const p = resolveRegistryFile();
  const raw = fs.readFileSync(p, "utf8");
  const { decks } = JSON.parse(raw);
  if (!Array.isArray(decks)) {
    throw new Error("registry: propriedade `decks` deve ser um array.");
  }
  return decks;
}

function getDeck(registry, id) {
  const d = registry.find((x) => x.id === id);
  if (!d) {
    const ids = registry.map((x) => x.id).join(", ");
    throw new Error(`Deck desconhecido: "${id}". Disponíveis: ${ids}`);
  }
  return d;
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: SLIDES_ROOT,
    stdio: "inherit",
    shell: true,
    ...opts,
  });
  if (r.error) throw r.error;
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function mermaidDir(id) {
  return path.join(SLIDES_ROOT, "sources", id, "mermaid");
}

function svgDir(id) {
  return path.join(SLIDES_ROOT, "sources", id, "svg");
}

function renderDiagrams(id) {
  const mDir = mermaidDir(id);
  if (!fs.existsSync(mDir)) {
    console.warn(`[slides] Sem pasta mermaid (${mDir}); diagramas ignorados.`);
    return;
  }
  const files = fs.readdirSync(mDir).filter((f) => f.endsWith(".mmd"));
  if (files.length === 0) {
    console.warn(`[slides] Nenhum .mmd em ${mDir}; diagramas ignorados.`);
    return;
  }
  const outDir = svgDir(id);
  fs.mkdirSync(outDir, { recursive: true });
  const mermaidCfg = path.join(SLIDES_ROOT, "mermaid-config.json");
  const cfgArg = fs.existsSync(mermaidCfg) ? ["-c", mermaidCfg] : [];
  for (const f of files) {
    const base = f.slice(0, -4);
    const input = path.join(mDir, f);
    /* PNG: o PDF do Marp/Chromium falha com <foreignObject> dentro de SVG Mermaid. */
    const output = path.join(outDir, `${base}.png`);
    run("npx", [
      "mmdc",
      "-i",
      input,
      "-o",
      output,
      "-w",
      "1280",
      "-H",
      "720",
      "-s",
      "2",
      "-b",
      "transparent",
      ...cfgArg,
    ]);
  }
  console.log(`[slides] Diagramas PNG: ${id} (${files.length} ficheiros)`);
}

function generatedDeckPath(id) {
  return path.join(SLIDES_ROOT, "decks", "_generated", `${id}.md`);
}

/** Caminho POSIX relativo: de decks/_generated/<id>.md → sources/<id>/svg */
function svgRelPathForDeck(id) {
  return path.posix.join("..", "..", "sources", id, "svg");
}

async function runGenerate(id) {
  const genFile = path.join(SLIDES_ROOT, "sources", id, "generate.mjs");
  if (!fs.existsSync(genFile)) {
    throw new Error(`Falta generate.mjs: ${genFile}`);
  }
  const mod = await import(pathToFileURL(genFile).href);
  const fn = mod.default;
  if (typeof fn !== "function") {
    throw new Error(`${genFile} deve exportar default function (ctx) => string`);
  }
  const outPath = generatedDeckPath(id);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const md = await fn({
    deckId: id,
    svgRelPath: svgRelPathForDeck(id),
    slidesRoot: SLIDES_ROOT,
  });
  const text = typeof md === "string" ? md : String(md);
  fs.writeFileSync(outPath, text.endsWith("\n") ? text : `${text}\n`, "utf8");
  console.log(`[slides] Deck gerado: ${path.relative(SLIDES_ROOT, outPath)}`);
}

function exportPdf(id, deck) {
  const relDeck = path.join("decks", "_generated", `${id}.md`);
  if (!fs.existsSync(path.join(SLIDES_ROOT, relDeck))) {
    throw new Error(`Corre generate antes do PDF: falta ${relDeck}`);
  }
  const pdfAbs = path.resolve(SLIDES_ROOT, deck.pdf);
  fs.mkdirSync(path.dirname(pdfAbs), { recursive: true });
  const relPdf = path.relative(SLIDES_ROOT, pdfAbs);
  run("npx", [
    "marp",
    "--no-stdin",
    relDeck,
    "--theme",
    "theme/codear.css",
    "--allow-local-files",
    "--pdf",
    "-o",
    relPdf,
  ]);
  console.log(`[slides] PDF: ${relPdf}`);
}

async function cmdList() {
  const decks = loadRegistry();
  for (const d of decks) {
    console.log(d.id);
  }
}

async function cmdDiagrams(registry, targetIds) {
  for (const id of targetIds) {
    getDeck(registry, id);
    renderDiagrams(id);
  }
}

async function cmdGenerate(registry, targetIds) {
  for (const id of targetIds) {
    getDeck(registry, id);
    await runGenerate(id);
  }
}

async function cmdBuild(registry, targetIds) {
  for (const id of targetIds) {
    const deck = getDeck(registry, id);
    renderDiagrams(id);
    await runGenerate(id);
    exportPdf(id, deck);
  }
}

function parseTargets(registry, argv) {
  if (argv.includes("--all")) {
    return registry.map((d) => d.id);
  }
  const rest = argv.filter((a) => a !== "--all");
  if (rest.length === 0) {
    console.error(
      "Uso: node tools/slides/scripts/slides-cli.mjs <comando> <deckId> [deckId...]\n" +
      "     node tools/slides/scripts/slides-cli.mjs <comando> --all\n\n" +
      "Comandos: list | diagrams | generate | build\n" +
      "Exemplo: npm run slides:build -- etapa-2-colocando-em-pratica",
    );
    process.exit(1);
  }
  return rest;
}

const cmd = process.argv[2];
const argvRest = process.argv.slice(3);

(async () => {
  const registry = loadRegistry();
  switch (cmd) {
    case "list":
      await cmdList();
      break;
    case "diagrams": {
      const ids = parseTargets(registry, argvRest);
      await cmdDiagrams(registry, ids);
      break;
    }
    case "generate": {
      const ids = parseTargets(registry, argvRest);
      await cmdGenerate(registry, ids);
      break;
    }
    case "build": {
      const ids = parseTargets(registry, argvRest);
      await cmdBuild(registry, ids);
      break;
    }
    default:
      console.error(
        "Comando inválido. Use: list | diagrams | generate | build\n" +
        "Na raiz: npm run slides:list | slides:diagrams | slides:generate | slides:build -- <id>",
      );
      process.exit(1);
  }
})().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
