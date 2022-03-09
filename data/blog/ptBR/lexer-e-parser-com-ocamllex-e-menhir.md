---
title: Escrevendo um Lexer e Parser usando OCamllex e Menhir
date: '03-09-2022'
tags: ['Tutorials']
draft: true
summary: Escrevendo um Lexer e Parser com OCamllex e Menhir - Escrevendo a própria linguagem de programação
images: https://i.imgur.com/pCBSiRJ.png
---

## Tokens de Lexing

Os caracteres individuais não significam muito, então primeiro precisamos dividir o fluxo em tokens (que são análogos a "palavras" em frases). Esses tokens atribuem significados: esse grupo de caracteres é uma palavra-chave específica em nossa linguagem (`if`, `int`, `class`) ou é um identificador (`banana`)?

Os tokens também reduzem substancialmente nosso espaço de problemas: eles padronizam a representação. Não precisamos mais nos preocupar com espaços em branco (`x == 0` e `x == 0` ambos se tornam `IDENTIFIER(x) EQUAL EQUAL INT(0)) e podemos filtrar comentários do nosso código.

Como dividemos o fluxo de caracteres em tokens? Combinamos com o padrão. Você pode pensar nisso como uma análise de caso massiva. No entanto, como a análise do caso é ambígua (vários tokens podem corresponder ao mesmo conjunto de caracteres), temos duas regras adicionais que devemos considerar:

1. Ordem de prioridade: ordenamos nossos tokens por prioriedade. Por exemplo, queremos que `int` seja correspondido com uma palavra-chave, não um nome de variável.

2. Correspondência de padrão mais longa: lemos `else` como uma palavra-chave em vez de dividi-la em dois nomes de variáveis `el` e `se`. Da mesma forma, `intMax` é um nome de variável: não deve ser lido como `int` e `Max`.

Aqui está um lexer bem simples que reconhece as palavras-chave "IN", "INT" e identificadores (nomes de variáveis / função), e os tokens são separados por espaços. Observe que verificamos o caso IN antes do caso da variável "default" (ordem e prioridade).

````python
// é um pseudocódigo para explicar um lexer simplificado

charsSeenSoFar = "in"
while(streamHasMoreCharacters){
  nextChar = readCharFromStream()
  if(nextChar == " "){
      // we've found a token
      switch(charsSeenSoFar):
        case "in":
          output "IN"
          break
      case: "int":
        output "INT"
        break
      default:
        output ID(charsSeenSoFar)
        // not "in" or "int" keywords so must be an identifier
      charSeenSoFar= ""  // start matching another token
  } else {
    // longest match: we'll try to pattern match "int" next iteration
    charSeenSoFar += nextChar
  }
}

## OCamlllex

Embora você possa simplificar manualmente um pseudocódigo de pattern-matching, na prática é bastante complicado, especialmente à medida que nossa linguagem fica maior. Em vez disso, vamos usar o gerador de lexer OCamllex. OCamllex é uma biblioteca OCaml que podemos usar em nosso compilador adicionando-a como uma dependência ao nosso arquivo de compilação Dune.

```dune
( ocamllex lexer )
````

A especificação para o lexer está no lexer.mll.

## Cabeçalho OCaml

Para começar, opcionalmente fornecemos um cabeçalho contendo o código auxiliar OCaml. Definimos uma `SyntaxError` exceção e uma função `nextline`, que move o ponteiro para a próxima linha do buffer `lexbuf` em que o programa é lido:

```f#
//lexer.mll
{
open Lexing
open Parser

exception SyntaxError of string

let next_line lexbuf =
  let pos = lexbuf.lex_curr_p in
  lexbuf.lex_curr_p <-
    { pos with pos_bol = lexbuf.lex_curr_pos;
               pos_lnum = pos.pos_lnum + 1
    }
}
```
