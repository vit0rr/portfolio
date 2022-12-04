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

Suponha que você tenha uma lista, e precisa encontrar o elemento 'x'. Esse algoritmo se chama sequential search.
E outro que, dado uma lista, você precisa retornar ela ordenada. Esse algoritmo se chama insertion sort.

```typescript
// linear time
function sequentialSearch(arr: number[], x: number) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) {
      return i
    }
  }
  return -1
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
```

Ambos os códigos funcionam e resolvem o problema que propomos, mas um é mais performático que outro.
O primeiro código é linear. Na prática isso significa que o loop `for` vai rodar por uma quantidade de vezes diretamente proporcional ao tamanho do array.

Ou seja, se um array tem `n` elementos, o loop vai rodar `n` vezes. Logo, Θ(n).

A vantagem disso, é que em caso de arrays maiores, o código vai rodar mais rápido, pelo número de iteração ser proporcional ao tamanho do array. Logo, a complexidade de tempo está limitada pelo tamanho do array, e não vai ter um gráfico de crescimento tão alto comparado à um código de complexidade quadrática.

![image](/static/images/posts/big-o-notation.jpeg)

O segundo código, é um exemplo de complexidade quadrática Θ(n²). O loop `for` dentro do loop `for` vai rodar de forma proporcional ao quadrado do tamanho do array.

Ou seja, se um array tem `n` elementos, o loop interno vai rodar `n * n` vezes. Logo, Θ(n²).

As implicações disso, é que em arrays maiores, o gráfico de crescimento será maior, logo, mais lento e mais complexo quanto maior o input.

Agora, exemplo de código com complexidade logarítmica O(log(n)) e O(n log(n))

Suponha que você receba uma lista de números, e precise achar x número nessa lista. Esse é o algoritmo de binary search O(log(n)).

Agora suponha que você receba uma lista de números, e tenha que ordenar ela (de forma logarítmica). Esse é o algoritmo de merge sort O(n log(n)).

```typescript
// O(log(n))
function binarySearch(arr: number[], x: number) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] === x) {
      return mid
    }
    if (arr[mid] < x) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}
```

```typescript
// O(n log(n))
function mergeSort(arr: number[]) {
  if (arr.length === 1) {
    return arr
  }

  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left: number[], right: number[]) {
  let result = []
  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j))
}
```

Ambos válidos, mas apresentam uma complexidade de tempo diferente.
O primeiro é O(log(n)), isso significa que o tempo de execução aumenta logaritmicamente com o tamanho do input.
Ou seja, no pior dos casos, dado um array de 8 ítens, o algoritmo vai rodar 3 vezes. Exemplo: log2(8) = 3.

No segundo exemplo, O(n log(n)) é uma notação que indica que o tempo de execução de um algoritmo aumenta de maneira proporcional ao produto do tamanho dos dados de entrada e do logaritmo desse tamanho. Isso significa que, no pior dos casos, dado um array de 8 ítens, o algoritmo vai rodar 24 vezes. Exemplo: 8 * log2(8) = 24. 

Porém, note que a complexidade temporal não implica necessariamente em maior ou menor velocidade.
Um algoritmo com uma pior complexidade, é possível que seja mais rápido que um algoritmo com uma melhor complexidade, **dependendo do input**. No entando, uma afirmação mais segura, seria de que, em geral, códigos com uma complexidade melhor (menor), serão mais eficientes e mais rápidos a medida que o input aumente.

Para quem quiser se aprofundar mais no assunto, recomendo a leitura do livro "Introduction to Algorithms" do Thomas H. Cormen.

#### Referências

- [Big O notation ](https://en.wikipedia.org/wiki/Big_O_notation)
- [introduction to algorithms](https://www.amazon.com.br/Introduction-Algorithms-Thomas-H-Cormen/dp/0262033844)
