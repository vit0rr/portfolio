---
title: Construindo um parser de JSON do zero
date: '01-30-2023'
tags: ['Tutorials']
draft: false
summary: Introdução a parsers - Como criar um parser de JSON do zero
images: '/static/images/banners/json-parser.jpg'
---

### Introdução
Um parser pode ter diversas aplicabilidades no dia a dia, e você provavelmente usa diariamente algum parser. [Babel](https://babeljs.io/), [webpack](https://webpack.js.org/), [eslint](https://eslint.org/), [prettier](https://prettier.io/), e [jscodeshift](https://github.com/facebook/jscodeshift). Todos eles por baixo dos panos rodam um parser que vai manipular uma AST (Abstract Syntax Tree) para fazer o que você precisa - vamos falar disso posteriormente, não se preocupe.

A ideia desse texto é introduzir ao conceito de lexing e parsing, implementar eles usando JavaScript para analisar expressões em JSON. O objetivo vai ser separar esse processo em funções, explicar essas funções e no final você ter um parser de JSON implementado gerando uma AST.

Vale lembrar que meu repositório é aberto, e você pode acessar ele [aqui](https://github.com/vit0rr/json-parser).

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

> Note que é possível refatorar todos esses blocos de `if` para um `switch`. Porém eu segui um estilo imperativo.

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
Isso é bem repetitivo e lógico. Eu não vou explicar cada um deles, mas vale a atenção aos que saem um pouco do padrão.

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

Se o `char`, for igual a `"`, vamos pro loop, para continuar lendo os caracteres sequentes até encontrarmos outra aspas, pois isso indica o fim da string. Todos os caracteres lidos durante esse loop, são concatenados na variável `value`. E então, um novo token é adicionado ao `tokens`.

As outras linhas, são para definir os booleanos, para caso o caractere atual for "f", e os sequentes formarem a palavra `false`, adicionamos no array de `tokens` o `false`. E o mesmo se repete ao `true`.

Em todos os casos, `current`, é incrementada para apontar o próximo caractere a ser processado, assim como fizemos em todo o resto do nosso código.

### Parsing

Um `parser` é responsável por transformar uma sequência de tokens em uma estrutura de dados. No caso, uma [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

> Ilustração de AST retirada do livro Modern Compiler Implementation in ML.

![ast](/static/images/posts/json-parser/ast.png)

Uma AST é uma estrutura de dados que vai representar a estrutura sintática de um programa. Dentro da AST existem vários nós, e cada nó representa uma construção sintática válida do programa. Exemplo:

```json
parser: {
  "type": "Program",
  "body": [
    {
      "type": "ObjectExpression",
      "properties": [
        {
          "type": "Property",
          "key": {
            "type": "STRING",
            "value": "name"
          },
          "value": {
            "type": "StringLiteral",
            "value": "Vitor"
          }
        },
        {
          "type": "Property",
          "key": {
            "type": "STRING",
            "value": "age"
          },
          "value": {
            "type": "NumberLiteral",
            "value": "18"
          }
        }
      ]
    }
  ]
}
```

Essa é a AST do JSON que exemplifiquei lá no começo. E nesse exemplo temos 8 nós no total. O nó `Program`, representa o programa principal. `ObjectExpression` representa um objeto, `Property` representa uma propriedade em um objeto, tendo chave e valor, `STRING` representa uma string que é usada como chave, `StringLiteral` representa uma string em uma propriedade, `NumberLiteral` representa um valor numérico em uma propriedade.

Através de uma AST, é possível otimizar um código, transformar um código em outro, fazer análise estática, gerar código etc. Exemplo: você poderia implementar uma sintaxe nova, fazer um parser, e cuspir um código em JavaScript, que seria executado normalmente.

Para gerar nossa AST, vamos precisar de uma função vai receber nosso array de tokens, percorrer ele, e ir gerando a AST de acordo com os tokens que ele encontrar. Para isso, criaremos uma função `walk`, que vai _andar_ pelos tokens e retornando os nós da AST.

```typescript
export const parser = (tokens: Array<{ type: string; value?: any }>) => {
    let current = 0;

    const walk = () => {
        let token = tokens[current];

        if (token.type === TOKEN_TYPES.LEFT_BRACE) {
            token = tokens[++current];

            const node: {
                type: string;
                properties?: Array<{ type: string; key: any; value: any }>;
            } = {
                type: 'ObjectExpression',
                properties: [],
            };

            while (token.type !== TOKEN_TYPES.RIGHT_BRACE) {
                const property: { type: string; key: any; value: any } = {
                    type: 'Property',
                    key: token,
                    value: null,
                };

                token = tokens[++current];

                token = tokens[++current];
                property.value = walk();
                node.properties.push(property);

                token = tokens[current];
                if (token.type === TOKEN_TYPES.COMMA) {
                    token = tokens[++current];
                }
            }

            current++;
            return node;
        }
```

A primeira verificação que fazemos é se o token atual é um `{`. Se for, criamos um novo nó do tipo `ObjectExpression`, e itera pelos tokens seguintes, adicionando como propriedade do objeto até encontrar o final da chave, ou seja, o `}`. E cada propriedade é representada por um nó do tipo `Property`. Esse tipo `Property`, têm um valor que foi gerado pela função `walk()`, que é chamada recursivamente.

Note que uso `tokens[++current]`. Isso é para avançar o cursor para o próximo token. E se um token do tipo `,` for encontrado, avançamos o cursor novamente, para ignorar a vírgula.

O resto do código é bem semelhante ao que expliquei agora, então vale o esforço de olhar e tentar entender, ou implementar o resto por conta própria. Não é muito complexo.

Por último, crio a constante `ast`, que vai conter o tipo `Program`, e o corpo da AST, que é gerado pela função `walk()`. O while é para garantir que o `current` não vai passar do tamanho do array de tokens.

Depois, basta retornar a AST.

```typescript
export const parser = (tokens: Array<{ type: string; value?: any }>) => {
  let current = 0

  const walk = () => {
    let token = tokens[current]

    if (token.type === TOKEN_TYPES.LEFT_BRACE) {
      token = tokens[++current]

      const node: {
        type: string
        properties?: Array<{ type: string; key: any; value: any }>
      } = {
        type: 'ObjectExpression',
        properties: [],
      }

      while (token.type !== TOKEN_TYPES.RIGHT_BRACE) {
        const property: { type: string; key: any; value: any } = {
          type: 'Property',
          key: token,
          value: null,
        }

        token = tokens[++current]

        token = tokens[++current]
        property.value = walk()
        node.properties.push(property)

        token = tokens[current]
        if (token.type === TOKEN_TYPES.COMMA) {
          token = tokens[++current]
        }
      }

      current++
      return node
    }

    if (token.type === TOKEN_TYPES.RIGHT_BRACE) {
      current++
      return {
        type: 'ObjectExpression',
        properties: [],
      }
    }

    if (token.type === TOKEN_TYPES.LEFT_BRACKET) {
      token = tokens[++current]

      const node: {
        type: string
        elements?: Array<{ type?: string; value?: any }>
      } = {
        type: 'ArrayExpression',
        elements: [],
      }

      while (token.type !== TOKEN_TYPES.RIGHT_BRACKET) {
        node.elements.push(walk())
        token = tokens[current]

        if (token.type === TOKEN_TYPES.COMMA) {
          token = tokens[++current]
        }
      }

      current++
      return node
    }

    if (token.type === TOKEN_TYPES.STRING) {
      current++
      return {
        type: 'StringLiteral',
        value: token.value,
      }
    }

    if (token.type === TOKEN_TYPES.NUMBER) {
      current++
      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }

    if (token.type === TOKEN_TYPES.TRUE) {
      current++
      return {
        type: 'BooleanLiteral',
        value: true,
      }
    }

    if (token.type === TOKEN_TYPES.FALSE) {
      current++
      return {
        type: 'BooleanLiteral',
        value: false,
      }
    }

    if (token.type === TOKEN_TYPES.NULL) {
      current++
      return {
        type: 'NullLiteral',
        value: null,
      }
    }

    throw new TypeError(token.type)
  }

  const ast = {
    type: 'Program',
    body: [],
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}
```

```typescript
const tokens = lexer('{"name":"Vitor","age":18}')
console.log('tokens', tokens)
const json = parser(tokens)

console.log('parser:', JSON.stringify(json, null, 2))
```

Parsing pode ser divertido, mas na realidade é pouco escrito, e você provavelmente não precisa escrever seu próprio parser. Se estiver implementando uma linguagem de programação por exemplo, já existem diversas ferramentas que vão fazer esse papel para você, como OCamllex, Menhir ou Nearley.

Também é importante notar que, como é um artigo introdutório, eu não abordei as diferentes técnicas de tokenização e parsing, com parsers [LR(0)](https://en.wikipedia.org/wiki/LR_parser), [LR(1)](https://en.wikipedia.org/wiki/Canonical_LR_parser), [SLR(1)](https://en.wikipedia.org/wiki/SLR_grammar), etc. Mas fique ciente que existem, e você pode pesquisar mais sobre, e existem diversos livros que abordam esses assuntos.

Se quiser ver como é a AST de linguagens mais populares, recomendo o [AST Explorer](https://astexplorer.net/). Tem suporte a diversas linguagens, e você consegue ver a AST completa, e navegar pelos nós. Se quiser ir mais além, pode tentar copiar alguma lógica de algum parser, e implementar no seu, como calcular uma expressão em ordem de precedência, por exemplo: `1 + 2 * 3` (que é 7, e não 9).

Caso tenha interesse em algum material, recomendo o livro "Modern Compiler Implementation in ML". Vale a nota de que, apesar do título ser em ML, tem como você seguir estudando por ele sem necessariamente escrever código ML, e existem outras versões escritas e C, C++ e Java.