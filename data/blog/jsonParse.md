---
title: Como funciona o JSON.parse()
date: '09-13-2021'
tags: ['javascript', 'code']
draft: false
summary: Por que ao usar JSON.parse("0") retorna o tipo "correto" e não uma String?
---

### JSON

JSON é definido recursivamente (função recursiva é chamada a si mesma até encontrar algo que pare). Todo `Boolean`, `String`, `Number`, `Array` (com JSON válidos), objetos cujas chaves são strings e cujos valores são JSONs válidos e `Null` são JSONs válidos.

### .parse()

Inicialmente, é importante entender o que seria o `parse` da função. Em JavaScript, ele interpreta uma `String`, fazendo com que o conteúdo dela seja lido corretamente pelo computador.
Por essa razão, a sintaxe de transformar a String `"2"` em Number, é `parseInt()`.

### O que é JSON.parse()

O método `JSON.parse()` é utilizado quando se quer analisar uma String JSON, e interpretá-la como valor/objeto em JavaScript. Isso implica numa dúvida sobre o funcionamento de outras funções em JavaScript, como `Boolean()`. `JSON.parse()` pega a representação em string de um JSON válido.<br/>
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

- <span class="block">[coproduto](https://twitter.com/coproduto)</span> [<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-6 w-6 inline"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>](https://twitter.com/coproduto)[<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-6 w-6 inline"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>](https://github.com/coproduto)
