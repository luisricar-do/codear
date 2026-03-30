---
name: slides-codear
description: >-
  Gera e exporta slides em PDF para o CODEAR usando Marp (tools/slides), tema codear,
  layout alinhado ao template HTML e aos fragmentos em tools/slides/components/marp/
  (registry.json), com destino content/cursos/.../slides.pdf. Usar quando o pedido
  envolve criar ou atualizar slides de curso, deck didático, exportar PDF para módulo
  ou aula, ou trabalhar em tools/slides/decks, components, templates ou icons (Lucide SVG).
---

# Slides CODEAR (Marp → PDF)

## Pré-requisitos

- Dependências do toolchain: `npm install` dentro de [`tools/slides`](tools/slides) (ou já instalado após clone).
- Export PDF usa Chromium (Puppeteer). Se falhar em CI ou ambiente restrito, executar o mesmo comando na máquina local.

## Componentes (preferir a improvisação)

- **Catálogo:** [`tools/slides/components/registry.json`](tools/slides/components/registry.json) — cada `id` aponta para um fragmento em [`tools/slides/components/marp/`](tools/slides/components/marp/).
- **Como usar:** copiar o conteúdo do `.md` do componente para o deck (entre `---`), ajustar só texto e caminhos. Instruções e tabela de paths: [`tools/slides/components/README.md`](tools/slides/components/README.md).
- **Front matter:** o [`tools/slides/decks/TEMPLATE.md`](tools/slides/decks/TEMPLATE.md) inclui `html: true` (necessário para HTML cru nos slides).

## Referência de layout (obrigatória para consistência)

Antes de estruturar ou redesenhar slides, abrir e seguir **[`tools/slides/templates/slides-layout-reference.html`](tools/slides/templates/slides-layout-reference.html)** (preview no browser). É a fonte de verdade visual para o mesmo modelo que os componentes espelham:

- **Tipografia:** títulos em **Fira Code**; corpo em **JetBrains Sans** (no Marp, alinhar [`tools/slides/theme/codear.css`](tools/slides/theme/codear.css) quando possível ou HTML embutido no deck).
- **Logo:** [`public/assets/icone-grande.png`](public/assets/icone-grande.png) — nos slides de conteúdo/agenda/comparativo, canto inferior direito; capa e encerramento com uso central ou em destaque, como no HTML.
- **Comportamento:** bloco principal **centrado** no slide (vertical e horizontal), exceto quando o próprio modelo for só título cheio (ex.: capa).
- **Variantes** (espelhar no Markdown/HTML do Marp): `slide--title` (capa), `slide--content`, `slide--section`, `slide--agenda`, `slide--quote`, `slide--dark`, `slide--split`, `slide--closing`.

Caminho da imagem a partir de `tools/slides/decks/*.md`: `../../../public/assets/icone-grande.png` (export com `--allow-local-files`).

## Ícones (Lucide → SVG)

- Biblioteca em [`tools/slides/icons/`](tools/slides/icons/): `manifest.json` (lista em kebab-case), **`svg/*.svg`** gerados, [`icons/README.md`](tools/slides/icons/README.md) com exemplos Marp/HTML.
- Regenerar após alterar o manifest: **`npm run slides:icons`** na raiz do repo (ou `npm run icons:build` em `tools/slides`).
- Nos decks: `![](../icons/svg/<nome>.svg)` ou `<img src="../icons/svg/<nome>.svg" width="48" height="48" alt="" />` com **`--allow-local-files`**.

## Fluxo

1. **Manifest** — Abrir `content/cursos/<slug-do-curso>/manifest.json` e localizar o módulo (`modules[].slug`) e, se aplicável, a aula (`lessons[].slug`) e `hasSlides: true`.
2. **Deck** — Ou **manual**: `tools/slides/decks/<nome>.md` (ponto de partida [`tools/slides/decks/TEMPLATE.md`](tools/slides/decks/TEMPLATE.md); slides = blocos de [`tools/slides/components/marp/`](tools/slides/components/marp/)). Ou **gerado**: regista o deck em [`tools/slides/registry.json`](tools/slides/registry.json), cria `tools/slides/sources/<deckId>/mermaid/*.mmd` e `generate.mjs` (export default que devolve o Markdown Marp; opcionalmente importar [`tools/slides/scripts/marp-fragment-loader.mjs`](tools/slides/scripts/marp-fragment-loader.mjs) com `loadMarpFragment(..., "generated")` para montar a partir dos mesmos fragmentos). O `.md` sai em `decks/_generated/<deckId>.md` (não versionar).
3. **Export** — Na **raiz do repositório**:

   **Slides do módulo** (`slides.pdf` na pasta do módulo):

   ```bash
   npm run slides:export -- decks/<ficheiro>.md --theme theme/codear.css --allow-local-files --pdf -o ../../content/cursos/<slug-curso>/<slug-modulo>/slides.pdf
   ```

   **Slides só da aula** (`aulas/<slug-aula>/slides.pdf`):

   ```bash
   npm run slides:export -- decks/<ficheiro>.md --theme theme/codear.css --allow-local-files --pdf -o ../../content/cursos/<slug-curso>/<slug-modulo>/aulas/<slug-aula>/slides.pdf
   ```

   O script corre Marp com **cwd** `tools/slides`; por isso `decks/...` e `../../content/...` estão corretos como acima.

4. **Consistência** — Confirmar que o PDF existe no caminho que o site resolve em [`src/data/content.js`](src/data/content.js) (`getModuleSlidesUrl` / `getLessonSlidesUrl`). Se for conteúdo novo, atualizar `manifest.json` e, se for curso novo, `content/cursos/index.json`, conforme a regra de cursos e módulos do projeto.

5. **Imagens locais** — Preferir caminhos relativos ao ficheiro do deck; usar `--allow-local-files` no comando de export.

6. **Decks gerados (genérico)** — [`tools/slides/registry.json`](tools/slides/registry.json) lista cada deck com `id` e `pdf` (caminho relativo a `tools/slides`). Por deck: `sources/<id>/mermaid/*.mmd`, `sources/<id>/generate.mjs`, saída **PNG** dos diagramas em `sources/<id>/svg/*.png` (pasta `svg/` histórica; ignorada no Git) — o PDF do Marp não renderiza bem `foreignObject` dentro de SVG Mermaid. Na **raiz**: `npm run slides:list` — IDs registados; `npm run slides:build -- <deckId>` — diagramas + generate + PDF; `npm run slides:build -- --all` — todos; `slides:diagrams` / `slides:generate` com os mesmos argumentos. Se o `mmdc` reclamar do Chrome: `cd tools/slides && npx puppeteer browsers install chrome-headless-shell`. PDFs em `content/.../aulas/.../slides.pdf` estão no `.gitignore` (gerar antes de `npm run build` do site ou em CI).

## Alinhar tema Marp ao template

- Tema base: [`tools/slides/theme/codear.css`](tools/slides/theme/codear.css) — manter cores e hierarquia coerentes com o HTML de referência (fundo claro `#f7f7f7` em conteúdo, navy/laranja da marca, rabiscos/canto quando usar HTML custom por slide).
- Se o PDF divergir do template (fontes, centragem, logo), ajustar primeiro o **tema** ou **`<style>` / HTML por slide** no `.md`, não improvisar outro estilo paralelo.
- Screenshots ou notas adicionais: [`tools/slides/template/`](tools/slides/template/) (opcional, complementa o HTML).

## Mais detalhes

- Regra Cursor: [`.cursor/rules/slides-marp.mdc`](.cursor/rules/slides-marp.mdc).
- Estrutura de pastas e `hasSlides`: [`.cursor/rules/cursos-e-modulos.mdc`](.cursor/rules/cursos-e-modulos.mdc).
