---
title: Como funciona o JSON.parse()
date: '09-13-2021'
tags: ['javascript', 'code']
draft: true
summary: Entendendo JSON.parse() e o motivo de JSON.parse("false") ser false e Boolean("false") ser true
---

<h3>[en](/blog/en/jsonParse) | ptBR</h3>

### JSON

JSON é definido recursivamente (função recursiva é chamada a si mesma até encontrar algo que pare). Todo `Boolean`, `String`, `Number`, `Array` (com JSON válidos), objetos cujas chaves são strings e cujos valores são JSONs válidos e `Null` são JSONs válidos.

### .parse()

Inicialmente, é importante entender o que seria o `parse` da função. Em JavaScript, ele interpreta uma `String`, fazendo com que o conteúdo dela seja lido corretamente pelo computador.
Por essa razão, a sintaxe de transformar a String `"2"` em Number, é `parseInt()`.

### O que é JSON.parse()

O método `JSON.parse()` é utilizado quando se quer analisar uma String JSON, e interpretá-la como valor/objeto em JavaScript. Isso implica numa dúvida sobre o funcionamento de outras funções em JavaScript, como `Boolean()`. `JSON.parse()` pega a representação em string de um JSON válido.

Exemplo:

```javascript
console.log(typeof JSON.parse('true')) // boolean
console.log(typeof JSON.parse('false')) // boolean
console.log(typeof JSON.parse('20')) // number

console.log(Boolean('false')) // true
```

Como dito, o `JSON.parse()` consegue transformar a `String` JSON em um valor/objeto em JavaScript, o que é completamente diferente de conversões como a do `Boolean()`.

### Se JSON.parse("false") é false, por que Boolean("false") é true?

Exatamente pelo `Boolean()` não estar tratando uma String JSON para valor/objeto em JavaScript, e sim validando entre as condições de `false` ou `true` do JavaScript. Isso significa que, para algo ser `false`, ele precisa ser: `0`, `-0`, `false`, `NaN`, `undefined` ou `null`, todo o resto, como valores, objetos, array vazio e uma `String` não vazia é `true`, independente do conteúdo que nela esteja.

Entender esses conceitos auxilia no uso do JavaScript, com um entendimento melhor de como a linguagem funciona, consequentemente te tornando um melhor programador, evitando discussões desnecessárias em redes sociais.

##### Agradecimentos:

- [coproduto](https://twitter.com/coproduto)
