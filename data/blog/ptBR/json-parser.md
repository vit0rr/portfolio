---
title: Construindo um parser JSON do zero
date: '01-30-2023'
tags: ['Tutorials']
draft: false
summary: Como construir um parser JSON do zero
images: '/static/images/banners/json-parser.jpg'
---

### Lexing

Um `lexer` vai ser responsável por converter uma expressão, seja ela qual for, em tokens. Esses tokens são elementos identificáveis que possuem um significado atribuído.

Você pode dividir esses tokens de algumas formas, como [identifer](<https://en.wikipedia.org/wiki/Identifier_(computer_languages)>), [keyword](https://en.wikipedia.org/wiki/Reserved_word), [delimiter](https://en.wikipedia.org/wiki/Delimiter), [operator](<https://en.wikipedia.org/wiki/Operator_(computer_programming)>), [literal](<https://en.wikipedia.org/wiki/Literal_(computer_programming)>), e [comment](<https://en.wikipedia.org/wiki/Comment_(computer_programming)>).

`{ "type": "LEFT_BRACE", "value": undefined },` é um exemplo de delimiter.
`{ "type": "STRING", "value": "name" }` é um exemplo de literal.

Exemplo: `{"name":"Vitor","age":18}`

```json
[
  { "type": "LEFT_BRACE", "value": undefined },
  { "type": "STRING", "value": "name" },
  { "type": "COLON", "value": undefined },
  { "type": "STRING", "value": "Vitor" },
  { "type": "COMMA", "value": undefined },
  { "type": "STRING", "value": "age" },
  { "type": "COLON", "value": undefined },
  { "type": "NUMBER", "value": "18" },
  { "type": "RIGHT_BRACE", "value": undefined }
]
```

Note que na análise léxica, você separa sua expressão em tokens, e cada token tem sua identificação.

Para codificar isso, antes vamos entender o que vamos fazer efetivamente.
A ideia da função `lexer`, é receber um argumento do tipo String, e retornar um Array de tokens, que vai ser o nosso JSON dividido que representam tipos específicos de informações, como já vimos e falamos.

Para isso, vamos criar uma variável `current`, que vai armazenar a posição atual do caractere no `input`, que está sendo analisada pelo lexer. Ou seja, a posição que ele está no nosso JSON. E também a constante `token`, que vai ser um array onde no final terá todos os nossos tokens.

```typescript
export const lexer = (input: string): Token[] => {
let current = 0;
const tokens: Token:[] = [];

}
```

Agora, precisamos rodar um loop que vai iterar até que todos os caracteres do `input` tenham sido processdas.

> Note que é possível refatorar todos esses blocos de `if` para um `switch`. Porém eu segui um estilo imperativo, e `if` soa mais natural.

```typescript
export const lexer = (input: string): Token[] => {
  let current = 0
  const tokens: Token[] = []

  while (current < input.length) {
    let char = input[current]

    if (char === '{') {
      tokens.push(createToken(TOKEN_TYPES.LEFT_BRACE))
      current++
      continue
    }

    if (char === '}') {
      tokens.push(createToken(TOKEN_TYPES.RIGHT_BRACE))
      current++
      continue
    }

    if (char === '[') {
      tokens.push(createToken(TOKEN_TYPES.LEFT_BRACKET))
      current++
      continue
    }

    if (char === ']') {
      tokens.push(createToken(TOKEN_TYPES.RIGHT_BRACKET))
      current++
      continue
    }

    if (char === ':') {
      tokens.push(createToken(TOKEN_TYPES.COLON))
      current++
      continue
    }

    if (char === ',') {
      tokens.push(createToken(TOKEN_TYPES.COMMA))
      current++
      continue
    }

    const WHITESPACE = /\s/

    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value = ''
      while (NUMBERS.test(char)) {
        value += char

        char = input[++current]
      }
      tokens.push(createToken(TOKEN_TYPES.NUMBER, value))
      continue
    }

    if (char === '"') {
      let value = ''
      char = input[++current]
      while (char !== '"') {
        value += char
        char = input[++current]
      }
      char = input[++current]
      tokens.push(createToken(TOKEN_TYPES.STRING, value))
      continue
    }

    if (
      char === 't' &&
      input[current + 1] === 'r' &&
      input[current + 2] === 'u' &&
      input[current + 3] === 'e'
    ) {
      tokens.push(createToken(TOKEN_TYPES.TRUE))
      current += 4
      continue
    }

    if (
      char === 'f' &&
      input[current + 1] === 'a' &&
      input[current + 2] === 'l' &&
      input[current + 3] === 's' &&
      input[current + 4] === 'e'
    ) {
      tokens.push(createToken(TOKEN_TYPES.FALSE))
      current += 5
      continue
    }

    if (
      char === 'n' &&
      input[current + 1] === 'u' &&
      input[current + 2] === 'l' &&
      input[current + 3] === 'l'
    ) {
      tokens.push(createToken(TOKEN_TYPES.NULL))
      current += 4
      continue
    }

    throw new TypeError('I dont know what this character is: ' + char)
  }

  return tokens
}
```

Esse código pode parecer complicado mas é bem simples. Dentro do meu loop, eu começo definindo a variável `char`, que é onde vai ficar armazenado o caractere que está sendo analisado naquele momento do loop. E então, para cada tipo de caracter, queremos uma ação.

Caso o `char` seja igual a `{`, demos um push no array de tokens, passando para ele o ENUM de Tokens, que vai ser o nome de cada token.

```typescript
export enum TOKEN_TYPES {
  LEFT_BRACE = 'LEFT_BRACE',
  RIGHT_BRACE = 'RIGHT_BRACE',
  LEFT_BRACKET = 'LEFT_BRACKET',
  RIGHT_BRACKET = 'RIGHT_BRACKET',
  COLON = 'COLON',
  COMMA = 'COMMA',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  NULL = 'NULL',
}
```

Na função `createToken`, que só retorna um objeto com o `type`, ou `value`, caso tenha.

```typescript
export const createToken = (type: TOKEN_TYPES, value?: string): Token => {
  return {
    type,
    value,
  }
}
```

E depois, incrementa +1 no `current`, para ir para o próximo `char` da nossa string.
Isso é bem repetitivo é lógico, eu não vou explicar cada um deles, mas vale a atenção aos que saem um pouco do padrão.

```typescript
if (char === '"') {
  let value = ''
  char = input[++current]
  while (char !== '"') {
    value += char
    char = input[++current]
  }

  char = input[++current]
  tokens.push(createToken(TOKEN_TYPES.STRING, value))
  continue
}

if (
  char === 't' &&
  input[current + 1] === 'r' &&
  input[current + 2] === 'u' &&
  input[current + 3] === 'e'
) {
  tokens.push(createToken(TOKEN_TYPES.TRUE))
  current += 4
  continue
}

if (
  char === 'f' &&
  input[current + 1] === 'a' &&
  input[current + 2] === 'l' &&
  input[current + 3] === 's' &&
  input[current + 4] === 'e'
) {
  tokens.push(createToken(TOKEN_TYPES.FALSE))
  current += 5
  continue
}

if (
  char === 'n' &&
  input[current + 1] === 'u' &&
  input[current + 2] === 'l' &&
  input[current + 3] === 'l'
) {
  tokens.push(createToken(TOKEN_TYPES.NULL))
  current += 4
  continue
}
```

Se o `char`, for igual a `"`, vamos pro loop, para continuar lendo os caracteres sequentes até encontrarmos outra aspas, pois isso indica o fim da string. Todos os caracteres lido durante esse loop, são concatenados na variável `value`. E então, um novo token é adicionado ao `tokens`.

As outras linhas, são para definir os booleanos, para caso o caractere atual for "f", e os sequentes formarem a palavra `false`, adicionamos no array de `tokens` o `false`. E o mesmo se repete ao `true`.

Em todos os casos, `current`, é incrementada para apontar o próximo caractere a ser processado, assim como fizemos em todo o resto do nosso código.
