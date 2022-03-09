---
title: Escrevendo um Lexer e Parser usando OCamllex e Menhir
date: '03-09-2022'
tags: ['Tutorials']
draft: false
summary: Escrevendo um Lexer e Parser com OCamllex e Menhir - Escrevendo a própria linguagem de programação
images: https://i.imgur.com/pCBSiRJ.png
---

1. Como criar minha linguagem de programação?
   1. [Introdução a compiladores](/blog/ptBR/introducao-a-compiladores)
   2. [Como estruturar um projeto de compilador?](/blog/ptBR/como-estruturar-um-projeto-de-compilador)
   3. _Escrevendo um Lexer e Parser usando OCamllex e Menhir_
   4. ~Uma introdução à teoria de tipos e implementação de um verificador de tipos~
   5. ~Tutorial sobre análise de fluxo de dados de vivacidade e alias~
   6. ~Pegando nossa linguagem de alto nível e simplificando~
   7. ~Tutorial do Protobuf para OCaml e C++~
   8. ~Guia para LLVM para criadores de linguagem de programação~
   9. ~Implementando a simultaneidade e nossa biblioteca de tempo de execução~
   10. ~Adicionando polimorfismo~
   11. ~Adicionando herança e Substituição de Método na nossa linguagem~

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

```javascript
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

## Regexes

Em seguida, precisamos especificar as expressões regulares que estamos usando para corresponder aos tokens. Para a maioria dos tokens, esta é uma string simples, por exemplo, `true` para o token `TRUE`. No entando, outros tokens têm regexes mais complexas, por exemploi, para inteiros e indentificadores. A sintaxe regex do OCamllex é como a maioria das bibliotecas regex:

```javascript
// lexer.mll

(* Definir regexes auxiliares *)
let digit = ['0'-'9']
let alpha = ['a'-'z' 'A'-'Z']

let int = '-'? digit+  (* regex para inteiros *)
let id = (alpha) (alpha|digit|'_')* (* regex para  identificador*)
let whitespace = [' ' '\t']+
let newline = '\r' | '\n' | "\r\n"
```

## Regras de Lexing

Em seguida, precisamos especificar regras para o OCamllex verificar a entrada; Cada regra é especificada em um formato de correspondência de padrões e especificamos oes regexes em ordem de prioridade (mais alta primeiro):

```javascript
rule <rule_name> = parse
| <regex>  {  TOKEN_NAME } (* output a token *)
| <regex>  { ... } (* or execute other code *)

and <another_rule> = parse
  | ...
```

As regras são recursivas: uma vez ue ele corresponde a um token, ele chama a si mesmo para recomeçar e corresponder ao próximo token. Múltiplas regras são mutuamente recursivas, ou seja, podemos chamar cada regra recurviamente na definição de outra. Ter várias regras é útil se você quiser tratar o fluxo de caracteres de maneira diferente em diferentes casos.

Por exemplo, queremos que nossa regra principal leia tokens. No entanto, queremos tratar os comentários de forma diferente, não emitindo nenhum token até chegarmos ao final do comentário. Outro caso são as strings no Bolt: queremos tratar os caracteres que estamos lendo como parte de uma string, não como um token correspondente. Esses casos podem ser vistsos no seguinte código Bolt:

```java
let x = 4 //comentário

/*
  comentário
 */

 printf("valor de x é %d", x)
```

Agora que temos nossos requisitos para nosso lexer, podemos definir as regras em nosso arquivo de especificação OCamllex. Os pontos-chave são:

- Temos 4 regras: `read_token`, `read_single_line_comment`, `read_milti_line_comment`, `read_string`.
- Precisamos lidar com `eof` explicitamente (isso significa o fim do arquivo) e incluir um caso `_` genérico para corresponder a todos os outros regexes.
- Usamos `Lexing.lexeme lexbuf` para obter a strinf correspondida pela regex.
- Para `read_string`, criamos outro buffer para armazenar os caracteres: não usamos `Lexing.lexeme lexbuf` porque queremos manipular explicitamente os caracteres do escape. `Buffer.create 17` aloca um buffer redimensionável que inicialmente tem um tamanho de 17 bytes.
- Usamos `raise SuntaxError` para tratamento de erros (caracteres de entrada inesperados).
- Ao ler tokens, pulamos os espaços em branco chamando `read_token lexbuf` em vez de omitir um token. Da mesma forma, para uma nova linha chamamos nossa função aximilar `next_line` para pular o caractere de nova linha.

```python
// lexer.mll

rule read_token =
  parse
  | "(" { LPAREN }
  | "printf" {PRINTF }
  | "whitespace" { read_token lexbuf }
  | "//" { single_line_comment lexbuf }
  | "/*" { multi_line_comment lexbuf }
  | "int" { INT (int_of_string (Lexing.lexeme lexbuf))}
  | "id" { ID (Lexing.lexeme lexbuf) }
    | '"'      { read_string (Buffer.create 17) lexbuf }
  | "newline" { next_line lexbuf; read_token lexbuf }
  | eof { EOF }
  | _ {raise (SyntaxError ("Lexer - Illegal character: " ^ Lexing.lexeme lexbuf)) }

and read_single_line_comment = parse
  | "newline" { next_line lexbuf; read_token lexbuf }
  | eof { EOF }
  | _ { read_single_line_comment lexbuf }

and read_multi_line_comment = parse
  | "*/" { read_token lexbuf }
  | "newline" { next_line lexbuf; read_multi_line_comment lexbuf }
  | eof { raise (SyntaxError ("Lexer - Unexpected EOF - please terminate your comment.")) }
  | _ { read_multi_line_comment lexbuf }

and read_string buf = parse
  | '"'       { STRING (Buffer.contents buf) }
  | '\\' 'n'  { Buffer.add_char buf '\n'; read_string buf lexbuf }
   (* Other regexes to handle escaping special characters *)
  | [^ '"' '\\']+
    { Buffer.add_string buf (Lexing.lexeme lexbuf);
      read_string buf lexbuf
    }
  | _ { raise (SyntaxError ("Illegal string character: " ^ Lexing.lexeme lexbuf)) }
  | eof { raise (SyntaxError ("String is not terminated")) }
```

Após ter criado manualmente esse arquivo, chamado `lexer.mll`, você pode copiar e colar o código acima. Espero que nesse ponto já tenha instalado OCaml, e vamos precisamos o opam, para instalar o ocamllex. Com tudo isso instalado, você vou conseguir rodar o comando `ocamllex lexer.mll`, e ai ele vai gerar um lexer.ml caso tudo tenha dado certo.

## Saída do OCamllex

O OCamllex gera um `Lexer` módulo do `lexer.mlll`, a partir do qual você pode chamar `Lexer.read_token` ou qualquer uma das outras regras, bem como as funções auxiliares definidas no cabeçalho. Se você estiver curioso, depois de executar `make build`, poderá ver o módulo gerado na `lexer.ml` em `_build` ou na pasta que gerar o `lexer.ml`, como a root.
