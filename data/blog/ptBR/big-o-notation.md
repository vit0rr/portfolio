---
title: Por que você escreve código lento?
date: '12-04-2022'
tags: ['Essay']
draft: false
summary: Uma introdução a como medir a complexidade de algoritmos com big o notation e como isso pode te ajudar a escrever código mais rápido.
images: /static/images/banners/big-o-notation.jpg
---

![banner theta notation](/static/images/banners/big-o-notation.jpg)

### Introdução

Neste post, vamos explorar o conceito de eficiência de algoritmos e como medir essa eficiência utilizando a big O notation. Além disso, veremos como isso pode ajudar a escrever códigos mais performáticos. A big O notation nos permite avaliar o desempenho de um algoritmo de acordo com o tamanho do seu conjunto de dados.

### O que é big O notation notation e eficiência de algoritmos?

A eficiência de um algoritmo é a capacidade de resolver um problema em um tempo razoável e com o uso eficiente de recursos computacionais, como processamento e memória. A big O notation, é uma forma de medir a eficiência de um algoritmo, descrevendo o comportamento assintótico de uma função. Isso significa que podemos avaliar a taxa de crescimento da função, comparando com outros algoritmos.

A big O notation é representada pela letra O e é utilizada da seguinte forma: `Θ(f(n))`, onde `f(n)` é a medida em que o tamanho da entrada (n) aumenta. Por exemplo, um algoritmo que cresce quadraticamente, ou seja, que aumenta proporcionalmente ao quadrado de cada entrada adicional, é representado por `Θ(n²)`.

- Tempo constante: `Θ(1)`
- Tempo linear: `Θ(n)`
- Tempo logarítmico: `Θ(log(n))`
- Tempo quadrático: `Θ(n²)`

### Big O notation em código

Suponha que você tenha uma lista e precise encontrar um determinado elemento 'x'. Esse algoritmo é chamado de sequential search.

Outro exemplo é quando é preciso ordenar uma lista. Esse algoritmo é chamado de insertion sort.

<details open>
<summary>Sequential search example</summary>
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
</details>

<details>
<summary>Insertion sort example</summary>
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
</details>

Ambos os códigos funcionam e resolvem o problema proposto, mas um é mais performático que o outro. O primeiro código é linear, o que significa que o loop `for` será executado por uma quantidade de vezes diretamente proporcional ao tamanho do array. Isso quer dizer que, se o array tem `n` elementos, o loop será executado `n` vezes, o que pode ser representado por `Θ(n)`.

A vantagem dessa abordagem é que, em caso de arrays maiores, o código será executado mais rapidamente, pois o número de iterações é proporcional ao tamanho do array. Isso faz com que a complexidade de tempo do código seja limitada pelo tamanho do array, o que resulta em um gráfico de crescimento menos acentuado em comparação com um código de complexidade quadrática. Em outras palavras, o primeiro código é mais performático e eficiente em situações onde o array pode ser muito grande.

![image](/static/images/posts/big-o-notation.jpeg)

O segundo código é um exemplo de complexidade quadrática `Θ(n²)`. Isso significa que o loop `for` dentro do loop `for` será executado por uma quantidade de vezes proporcional ao quadrado do tamanho do array. Em outras palavras, se o array tem `n` elementos, o loop interno será executado `n * n` vezes, o que pode ser representado por `Θ(n²)`.

As implicações dessa complexidade são que, em arrays maiores, o gráfico de crescimento será mais acentuado, o que resulta em um código mais lento e mais complexo quanto maior o input.

Agora, vejamos alguns exemplos de códigos com complexidades logarítmicas `O(log(n))` e `O(n log(n))`.

Suponha que você receba uma lista de números e precise encontrar um determinado número x na lista. Para isso, pode-se utilizar o algoritmo de binary search, que tem complexidade `O(log(n))`.

Outro exemplo é quando é preciso ordenar uma lista de números de forma logarítmica. Para isso, pode-se utilizar o algoritmo de merge sort, que tem complexidade `O(n log(n))`.

Esses algoritmos são mais performáticos e eficientes do que abordagens lineares ou quadráticas em situações onde o tamanho da entrada pode ser muito grande.

<details>
<summary>Binary search example</summary>
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
</details>

<details>
<summary>Merge sort example</summary>
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
</details>

Ambos os exemplos são válidos, mas apresentam complexidades de tempo diferentes. O primeiro é `O(log(n))`, o que significa que o tempo de execução aumenta de forma logarítmica em relação ao tamanho do input. Em outras palavras, no pior dos casos, se o array tem 8 elementos, o algoritmo será executado 3 vezes. Por exemplo: log2(8) = 3.

O segundo exemplo, `O(n log(n))`, é uma notação que indica que o tempo de execução de um algoritmo aumenta de forma proporcional ao produto do tamanho dos dados de entrada e do logaritmo desse tamanho. Isso significa que, no pior dos casos, se o array tem 8 elementos, o algoritmo será executado 24 vezes. Por exemplo: 8 * log2(8) = 24.

No entanto, é importante lembrar que a complexidade temporal de um algoritmo não implica necessariamente em maior ou menor velocidade. É possível que um algoritmo com uma pior complexidade seja mais rápido que um algoritmo com uma melhor complexidade, dependendo do input específico. No entanto, em geral, é seguro dizer que quanto menor a complexidade, mais rápido o algoritmo será, de acordo com o que o input aumente.

Para quem quiser se aprofundar mais no assunto, recomendo a leitura do livro "Introduction to Algorithms" do Thomas H. Cormen.

#### Referências

- [Big O notation ](https://en.wikipedia.org/wiki/Big_O_notation)
- [introduction to algorithms](https://www.amazon.com.br/Introduction-Algorithms-Thomas-H-Cormen/dp/0262033844)
