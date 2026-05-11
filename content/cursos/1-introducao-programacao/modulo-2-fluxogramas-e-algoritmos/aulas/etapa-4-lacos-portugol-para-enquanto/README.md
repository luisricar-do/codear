# Etapa 4 — Aula prática: laços em Portugol (PARA e ENQUANTO)

Esta aula é um **laboratório guiado** com **10 exercícios** que combinam **fluxograma**, **pseudocódigo** e implementação no **[Portugol Webstudio](https://portugol.dev)**. É o complemento natural da [Etapa 3 — Revisão lógica e preparação para C](../etapa-3-revisao-logica-preparacao-c/README.md): aqui o foco é **praticar** `PARA` e `ENQUANTO` até ficarem automáticos.

- **PDF dos slides:** [slides.pdf](./slides.pdf)

## Objetivo

Para cada exercício:

1. Ler o enunciado e a saída esperada.
2. Desenhar o **fluxograma** (incluindo o laço e, quando houver, decisões).
3. Codificar no Portugol e testar com mais de um caso (incluindo cantos: zero, negativo se fizer sentido, valores grandes simples).

## Quando usar PARA vs ENQUANTO

| Situação | Laço usual |
| --- | --- |
| Sabes **quantas** repetições fazer (ou o intervalo é fixo) | **PARA** |
| A parada depende de **dados** que só aparecem ao executar (ex.: acertar o número, ler até 0) | **ENQUANTO** |

## Soluções de referência (Portugol Webstudio)

Abaixo, exemplos completos no estilo `programa { funcao inicio() { … } }` alinhado às etapas anteriores do módulo. Ajusta nomes e mensagens se quiseres; mantém a **lógica** igual ao fluxograma.

### 1 — Contar de 1 a 10

```text
programa
{
  funcao inicio()
  {
    inteiro i
    para (i = 1; i <= 10; i++)
    {
      escreva(i, "\n")
    }
  }
}
```

### 2 — Contagem regressiva (10 a 1)

```text
programa
{
  funcao inicio()
  {
    inteiro i
    para (i = 10; i >= 1; i--)
    {
      escreva(i, "\n")
    }
  }
}
```

### 3 — Soma de 1 até N

```text
programa
{
  funcao inicio()
  {
    inteiro n, i, soma
    escreva("Digite N: ")
    leia(n)
    soma = 0
    para (i = 1; i <= n; i++)
    {
      soma = soma + i
    }
    escreva("Soma: ", soma, "\n")
  }
}
```

### 4 — Tabuada de N (1 a 10)

```text
programa
{
  funcao inicio()
  {
    inteiro n, i
    escreva("Número: ")
    leia(n)
    para (i = 1; i <= 10; i++)
    {
      escreva(n, " x ", i, " = ", n * i, "\n")
    }
  }
}
```

### 5 — Pares entre 1 e N

```text
programa
{
  funcao inicio()
  {
    inteiro n, i
    escreva("Digite N: ")
    leia(n)
    para (i = 1; i <= n; i++)
    {
      se (i % 2 == 0)
      {
        escreva(i, "\n")
      }
    }
  }
}
```

### 6 — Fatorial com ENQUANTO

```text
programa
{
  funcao inicio()
  {
    inteiro n, i, fat
    escreva("Digite N: ")
    leia(n)
    fat = 1
    i = 1
    enquanto (i <= n)
    {
      fat = fat * i
      i = i + 1
    }
    escreva(n, "! = ", fat, "\n")
  }
}
```

### 7 — Adivinhe o número

```text
programa
{
  funcao inicio()
  {
    inteiro secreto, chute
    secreto = 42
    escreva("Adivinhe: ")
    leia(chute)
    enquanto (chute != secreto)
    {
      se (chute > secreto)
      {
        escreva("Muito alto!\n")
      }
      senao
      {
        escreva("Muito baixo!\n")
      }
      escreva("Tente de novo: ")
      leia(chute)
    }
    escreva("Parabéns, acertou!\n")
  }
}
```

### 8 — Somar até ler 0

```text
programa
{
  funcao inicio()
  {
    inteiro numero, soma, cont
    soma = 0
    cont = 0
    escreva("Digite (0 para sair): ")
    leia(numero)
    enquanto (numero != 0)
    {
      soma = soma + numero
      cont = cont + 1
      escreva("Digite (0 para sair): ")
      leia(numero)
    }
    escreva("Soma: ", soma, "\n")
    escreva("Quantidade: ", cont, "\n")
  }
}
```

### 9 — Número primo

```text
programa
{
  funcao inicio()
  {
    inteiro n, i, div
    escreva("Digite N: ")
    leia(n)
    div = 0
    para (i = 1; i <= n; i++)
    {
      se (n % i == 0)
      {
        div = div + 1
      }
    }
    se (div == 2)
    {
      escreva("É primo!\n")
    }
    senao
    {
      escreva("Não é primo!\n")
    }
  }
}
```

### 10 — N primeiros termos de Fibonacci

```text
programa
{
  funcao inicio()
  {
    inteiro n, a, b, temp, conta
    escreva("Quantos termos? ")
    leia(n)
    a = 0
    b = 1
    conta = 0
    enquanto (conta < n)
    {
      escreva(a, "\n")
      temp = a + b
      a = b
      b = temp
      conta = conta + 1
    }
  }
}
```

---

*Material alinhado ao deck PDF desta aula (10 exercícios, PARA e ENQUANTO).*
