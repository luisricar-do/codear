# Componentes de slide (CODEAR)

Objetivo: **montar decks copiando fragmentos** já alinhados a [`../templates/slides-layout-reference.html`](../templates/slides-layout-reference.html) e ao tema Marp [`../theme/codear.css`](../theme/codear.css), em vez de reinventar markup ou classes.

## Fluxo

1. Abrir o HTML de referência no browser (pré-visualização 16:9 e tipografia).
2. Escolher o componente em [`registry.json`](registry.json) (campo `id` → ficheiro em `marp/`).
3. Copiar o conteúdo do `.md` do componente para o teu deck (entre separadores `---` de slides).
4. Ajustar só texto, listas, caminhos de imagem e blocos de código.

## Caminhos (importante)

| Origem do ficheiro `.md` | Logo grande (capa / escuro) | Logo canto | Ícones Lucide |
|--------------------------|----------------------------|------------|---------------|
| `tools/slides/decks/*.md` | `../../../public/assets/icone-grande.png` | `../../../public/assets/icone-pequeno.png` | `../icons/svg/<nome>.svg` |
| `tools/slides/decks/_generated/*.md` | `../../../../public/assets/icone-grande.png` | `../../../../public/assets/icone-pequeno.png` | `../../icons/svg/<nome>.svg` |

Export PDF: na raiz do repo, `npm run slides:export -- ... --allow-local-files` (obrigatório para imagens locais).

## Ficheiros em `marp/`

Cada ficheiro documenta no topo **quando usar** e **o equivalente no HTML** (`slide--…`). Inclui `html: true` no exemplo de front matter quando o slide usa HTML cru (ex.: duas colunas de código).

## Deck novo

Copiar [`../decks/TEMPLATE.md`](../decks/TEMPLATE.md) para `decks/<slug>.md` e preencher com blocos desta pasta.

## Decks gerados (`sources/<id>/generate.mjs`)

O script [`../scripts/marp-fragment-loader.mjs`](../scripts/marp-fragment-loader.mjs) expõe `loadMarpFragment(nome, "generated")`, que lê `components/marp/<nome>.md`, remove o cabeçalho `Componente:` e reescreve caminhos para `decks/_generated/<id>.md`. Exemplo: [`../sources/etapa-2-colocando-em-pratica/generate.mjs`](../sources/etapa-2-colocando-em-pratica/generate.mjs).
