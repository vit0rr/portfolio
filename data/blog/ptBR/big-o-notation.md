---
title: Por que você escreve código lento?
date: '12-04-2022'
tags: ['Essay']
draft: false
summary: Entenda com "big O notation" porque você escreve código lento
images: /static/images/banners/big-o-notation.jpg
---

![banner theta notation](/static/images/banners/big-o-notation.jpg)

### Introdução

Nesse post, vamos explorar o conceito de eficiência de algoritmos e como medir essa eficiência com big O notation, e como isso pode te ajudar a escrever códigos mais performáticos.

### O que é big O notation notation e eficiência de algoritmos?

Nós chamamos um algoritmo de eficiente, quando ele consegue resolver um problema em um tempo razoável e sem requerir muito poder de processamento e memória.

Uma forma de medir a eficiência de um algoritmo é usando big O notation. Big O notation é uma notação matemática usada para descrever o comportamento assintótico de funções. Ou seja, podemos medir a taxa de crescimento dessas funções, de diferentes algoritmos, e comparar essas taxas de crescimento.

Big O notation é representada pela letra O e usada da seguinte forma: `Θ(f(n))`. Onde `f(n)` é à medida que o tamanho da entrada (n) cresce. Por exemplo, um algoritmo cresce quadraticamente, ou seja, o algoritmo cresce 2 vezes mais por entrada, é representado por `Θ(n²)`.

- Tempo constante: `Θ(1)`
- Tempo linear: `Θ(n)`
- Tempo logarítmico: `Θ(log(n))`
- Tempo quadrático: `Θ(n²)`

### Big O notation em código

Suponha que você tenha uma lista de números, e você precisa ordenar essa lista. Ou seja, o input [5, 2, 4, 6, 1, 3] precisa ser ordenado para [1, 2, 3, 4, 5, 6]. Esse algoritmo é chamado de insertion sort.

```typescript
// linear time
function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i]
    let j = i - 1
    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j]
      j -= 1
    }
    arr[j + 1] = key
  }
  return arr
}
```

```typescript
// quadratic time
function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i]
    for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = currentVal

    console.log(arr)
  }

  return arr
}

insertionSort([5, 2, 4, 6, 1, 3])
```

Ambos os códigos funcionam e resolvem o problema que propomos, mas um é mais performático que outro.
O primeiro código é linear. Na prática isso significa que o loop `while` dentro do loop `for` vai rodar por uma quantidade de vezes diretamente proporcional ao tamanho do array.

Ou seja, se um array tem `n` elementos, o loop interno (`while`) vai rodar `n` vezes. Logo, Θ(n).

A vantagem disso, é que em caso de arrays maiores, o código vai rodar mais rápido, pelo número de iteração ser proporcional ao tamanho do array. Logo, a complexidade de tempo está limitada pelo tamanho do array, e não vai ter um gráfico de crescimento tão alto comparado à um código de complexidade quadrática.

![image](/static/images/posts/big-o-notation.jpeg)

O segundo código, é um exemplo de complexidade quadrática Θ(n²). O loop `for` dentro do loop `for` vai rodar de forma proporcional ao quadrado do tamanho do array.

Ou seja, se um array tem `n` elementos, o loop interno vai rodar `n * n` vezes. Logo, Θ(n²).

As implicações disso, é que em arrays maiores, o gráfico de crescimento será maior, logo, mais lento e mais complexo quanto maior o input.

Para quem quiser se aprofundar mais no assunto, recomendo a leitura do livro "Introduction to Algorithms" do Thomas H. Cormen.

#### Referências
- [Big O notation ](https://en.wikipedia.org/wiki/Big_O_notation)
- [introduction to algorithms](https://www.amazon.com.br/Introduction-Algorithms-Thomas-H-Cormen/dp/0262033844)