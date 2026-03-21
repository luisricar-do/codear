Esta aula corresponde ao tema **“O Mapa do Código: Introdução aos Fluxogramas”** do material Codear. O objetivo é **desenhar o caminho do programa antes de codificar**: o computador executa exatamente o que você define; sem um mapa claro, o fluxo vira um labirinto difícil de manter.

## Resumo da aula

1. **Por que fluxograma?** Planejar com um diagrama ajuda a ver entradas, saídas, cálculos e decisões em um só lugar.
2. **Símbolos básicos**
   - **Elipse** — início e fim do algoritmo.
   - **Paralelogramo** — entrada (usuário fornece dados) e saída (exibir na tela).
   - **Retângulo** — processamento (cálculos, atribuições).
   - **Losango** — decisão: uma condição que pode ser **verdadeira** ou **falsa**, dividindo o fluxo (ideia do **se** / **senão**).
3. **Na prática** Você lê dados, avalia condições (por exemplo, idade ou senha) e escolhe qual mensagem mostrar conforme o resultado.

Nas próximas aulas deste módulo você verá mais tópicos (por exemplo, pseudocódigo e decisões mais ricas), cada um com sua própria lista de exercícios.

---

## Ferramenta prática: Portugol no navegador

O **[Portugol Webstudio](https://portugol.dev)** é uma IDE online para a linguagem **Portugol** (português estruturado), alinhada ao ambiente do Portugol Studio. Use para **testar o mesmo raciocínio do fluxograma** em código: `leia`, `escreva`, `se` / `senao`.

Abra o link, cole o exemplo abaixo, execute e experimente alterar idades e respostas.

### Exemplo base (idade na festa)

Fluxo: **início** → pedir idade → **se** idade ≥ 18 mostrar “Pode entrar na festa”, **senão** mostrar “Volte para casa, criança!” → **fim**.

```text
programa
{
  funcao inicio()
  {
    inteiro idade

    escreva("Qual é a sua idade? ")
    leia(idade)

    se (idade >= 18)
    {
      escreva("Pode entrar na festa\n")
    }
    senao
    {
      escreva("Volte para casa, criança!\n")
    }
  }
}
```

---

## Lista de exercícios — Etapa 1

Estes problemas são **independentes dos exemplos da aula** (festa, cofre, etc.), mas usam os **mesmos tipos de passo**: entrada, processamento, saída e, quando indicado, **decisão** (losango).

Para cada item, desenhe o **fluxograma completo** (elipse início/fim, símbolos corretos, fim). Nos que tiverem decisão, os dois caminhos devem sair do losango de forma clara. Depois, se quiser, implemente no [Portugol Webstudio](https://portugol.dev) e confira com os exemplos abaixo.

**Legenda dos exemplos:** *Entrada* = o que o usuário fornece (em ordem, se houver mais de um valor). *Saída* = o que o programa exibe (texto exato pode variar levemente, desde que a lógica bata).

| # | Enunciado (resumo) | Entrada (exemplo) | Saída (exemplo) |
|---|-------------------|-------------------|-----------------|
| **1** | Peça o **primeiro nome** da pessoa e mostre: `Olá, [nome]! Prazer em te conhecer.` | `Ana` | `Olá, Ana! Prazer em te conhecer.` |
| **2** | Peça a **cidade** onde mora e o **estado** (sigla ou nome). Mostre numa linha: `Você mora em [cidade] / [estado].` | `Recife` e `PE` | `Você mora em Recife / PE.` |
| **3** | Peça **preço unitário** (número) e **quantidade** (inteiro). Calcule e mostre: `Total: R$ [valor]` (use o resultado do cálculo). | `12,50` e `4` | `Total: R$ 50` (ou `50,00`, conforme você formatar) |
| **4** | Peça **horas trabalhadas** e **valor da hora**. Calcule o salário do dia e mostre: `Pagamento do dia: R$ [valor].` | `6` e `35` | `Pagamento do dia: R$ 210.` |
| **5** | Peça a **temperatura** em °C. Se for **maior que 30**, mostre `Alerta: calor extremo.` Caso contrário, mostre `Temperatura dentro da faixa usual.` | `32` → primeira mensagem; `22` → segunda | — |
| **6** | Peça um **número inteiro**. Se for **múltiplo de 2** (par), mostre `Número par.` Senão, mostre `Número ímpar.` | `8` / `7` | `Número par.` / `Número ímpar.` |
| **7** | Peça **duas notas** (0 a 10). Calcule a **média**. Se a média for **maior ou igual a 7**, mostre `Situação: aprovado.` Senão, mostre `Situação: em recuperação.` | `8` e `6` (média 7) | `Situação: aprovado.` |
| **8** | Peça o **ano de nascimento** e o **ano atual**. Calcule a **idade** (aproximada). Se idade **≥ 16**, mostre `Pode votar (opcional).` Senão, mostre `Voto ainda não opcional.` | Nascimento `2010`, atual `2026` | Idade 16 → `Pode votar (opcional).` |
| **9** | Peça **saldo da conta** e **valor do saque**. Se o saque for **menor ou igual** ao saldo, calcule o novo saldo e mostre `Saque OK. Saldo restante: R$ [valor].` Senão, mostre `Saldo insuficiente.` | Saldo `100`, saque `40` | `Saque OK. Saldo restante: R$ 60.` |
| **10** | Peça **peso (kg)** e **altura (m)**. Calcule **IMC = peso / (altura × altura)**. Se IMC **< 18,5**, mostre `Abaixo do peso ideal.` Senão, mostre `IMC na faixa usual ou acima (ver orientação médica).` | Peso `55`, altura `1,75` | IMC ≈ 17,96 → `Abaixo do peso ideal.` |
| **11** | Peça **hora** do dia (0 a 23, inteiro). Se **hora < 12**, mostre `Bom dia.` Se **hora < 18**, mostre `Boa tarde.` Senão, mostre `Boa noite.` *(Dois losangos em sequência ou equivalente.)* | `9` / `15` / `21` | `Bom dia.` / `Boa tarde.` / `Boa noite.` |
| **12** | Peça **valor da compra**. Se **≥ 150**, aplique **10% de desconto** e mostre `Total com desconto: R$ [valor].` Senão, mostre `Sem desconto. Total: R$ [valor].` | `200` | Desconto 20 → `Total com desconto: R$ 180.` |
| **13** | Peça **código do produto**: `1` ou `2`. Se `1`, preço base **R$ 10**; se `2`, **R$ 25**; se for outro código, mostre `Código inválido.` e **não** mostre preço. Em seguida (se válido), peça **quantidade** e mostre `Total: R$ [valor].` | `2` e `3` | `Total: R$ 75.` |
| **14** | Peça **idade** e **classificação do filme**: `L` (livre), `12`, `16`. Regra: só pode assistir se a idade for **≥** ao número da classificação (para `L`, qualquer idade **≥ 0**). Se puder, mostre `Ingresso liberado.` Senão, mostre `Classificação não permitida para sua idade.` | Idade `14`, classificação `16` | `Classificação não permitida para sua idade.` |
| **15** | Peça **dia da semana** (número 1=domingo … 7=sábado) e **valor da corrida**. Se for **sábado ou domingo** (1 ou 7), some **taxa extra de R$ 5,00** ao valor e mostre `Total a pagar: R$ [valor].` Caso contrário, mostre `Total a pagar: R$ [valor]` **sem** taxa extra. | `7` e `20` | `Total a pagar: R$ 25.` |

### Como praticar (sugestão)

1. **Fluxograma** — um desenho por exercício (papel, [draw.io](https://app.diagrams.net/), etc.).
2. **Portugol** — implemente os que tiverem decisão e compare: cada losango ↔ `se` / `senao` (e encadeamentos nos itens 11 a 15).
3. **Pseudocódigo** — reescreva 3 a 5 exercícios à sua escolha em linguagem natural estruturada (`início`, `leia`, `escreva`, `se`…, `fim`).

---

*Material de referência: Codear — Lógica de Programação — Módulo 2 (slides da aula de fluxogramas).*
