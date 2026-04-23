# Etapa 3 — Revisão Lógica e Preparação para C

Esta aula fecha o módulo de fluxogramas e abre a porta para **C**. A ideia é **consolidar** o que foi visto nas etapas 1 e 2 (fluxograma + pseudocódigo) e **introduzir loops** — a estrutura que faltava para resolver problemas reais — mostrando de cara como esse mesmo raciocínio aparece em C.

- **Duração sugerida:** 2h
- **Formato:** aula expositiva + atividade guiada em dupla
- **Pré-requisito:** ter feito as etapas 1 e 2 do módulo (ou equivalente)
- **PDF dos slides:** [slides.pdf](./slides.pdf)

## Objetivos de aprendizagem

Ao final da aula o aluno deve conseguir:

1. **Reconhecer um loop** em um problema (quando e por que usar).
2. **Escolher** entre `ENQUANTO` e `PARA` a partir do enunciado.
3. **Identificar** as três partes obrigatórias de todo loop: início da variável, condição de parada e passo.
4. **Ler** um trecho simples de C (`printf`, `scanf`, `if`, `while`, `for`) e mapear para o fluxograma equivalente.
5. **Desenhar** fluxograma e escrever pseudocódigo para o jogo **Adivinhe o número** usando `ENQUANTO` + `SE`.

## Roteiro (2h)

| Parte | Tempo | Conteúdo |
| --- | --- | --- |
| 1. Recap | ~20 min | Símbolos do fluxograma, pseudocódigo básico, `SE` / `SENAO`. Problema motivador: "e se eu quiser somar 100 notas?" |
| 2. Loops | ~35 min | `ENQUANTO` (while) e `PARA` (for): estrutura, exemplos, fluxogramas, comparação, armadilha do loop infinito. |
| 3. Ponte para C | ~30 min | Dicionário pseudocódigo → C (tabela), exemplos lado a lado: leitura, decisão, `for`, `while`. **Não é cobrança de sintaxe** — é familiaridade. |
| 4. Atividade | ~35 min | Jogo **Adivinhe o número**: ingredientes → fluxograma → pseudocódigo → preview em C. Fechamento + desafios extras. |

## Atividade principal — Adivinhe o número

O computador tem um número secreto (inicialmente "chumbado", ex.: `secreto = 42`). O jogador tenta adivinhar. A cada tentativa o programa dá a dica `"É maior!"` ou `"É menor!"`. Quando acerta, mostra **quantas tentativas** precisou.

Cada aluno (ou dupla) entrega:

1. **Fluxograma em papel** com `ENQUANTO`, `SE` e contador de tentativas.
2. **Pseudocódigo** correspondente — testado no **[Portugol Webstudio](https://portugol.dev)** quando possível.
3. Identificar, em cima do pseudocódigo, **qual trecho viraria qual comando em C** (`if`, `while`, `printf`, `scanf`).

### Desafios extras (bônus, escolher 1)

- **Pedra, papel, tesoura** — dois jogadores digitam `1`/`2`/`3`, programa decide o vencedor com vários `SE`.
- **Tabuada interativa** — usuário escolhe um número, programa imprime a tabuada de 1 a 10 usando `PARA`.
- **Jogo da senha (3 tentativas)** — `ENQUANTO` combinado com contador; depois de 3 erros mostra `"Conta bloqueada"`.

## Mensagem-chave para os alunos

> Se você entende o fluxograma, você já entende o programa em C. Só falta a tradução.

A próxima aula do curso começa a escrever **C de verdade** — quem sair desta aula com o fluxograma do Adivinhe o número na cabeça já sai na frente.
