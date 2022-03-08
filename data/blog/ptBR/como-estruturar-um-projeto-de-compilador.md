---
title: Como estruturar um projeto de compilador?
date: '03-02-2022'
tags: ['Tutorials']
draft: false
summary: Como estruturar um projeto de compilador? - Escrevendo a própria linguagem de programação
images: https://i.imgur.com/XgpVWwW.png
---

1. Como criar minha linguagem de programação?
   1. [Introdução a compiladores](/blog/ptBR/introducao-a-compiladores)
   2. _Como estruturar um projeto de compilador?_
   3. ~Escrevendo um Lexer e Parser usando OCamllex e Menhir~
   4. ~Uma introdução à teoria de tipos e implementação de um verificador de tipos~
   5. ~Tutorial sobre análise de fluxo de dados de vivacidade e alias~
   6. ~Pegando nossa linguagem de alto nível e simplificando~
   7. ~Tutorial do Protobuf para OCaml e C++~
   8. ~Guia para LLVM para criadores de linguagem de programação~
   9. ~Implementando a simultaneidade e nossa biblioteca de tempo de execução~
   10. ~Adicionando polimorfismo~
   11. ~Adicionando herança e Substituição de Método na nossa linguagem~

## Use a linguagem correta, não a que você gosta mais

Pode parecer inicialmente mais fácil escrever um compilador na linguagem que você domina e prefere, pois é uma coisa a menos para aprender, mas isso é ganho short time.

JavaScript é uma ótima linguagem para web apps, e é fácil de aprender para iniciantes, inclusive quando me perguntam o que eu recomendo para aprender a programar, sempre falo JavaScript. Mas você escreveria um compilador com JS? Evidentemente que não. Mas ele simplesmente não atende ao nosso requisito.

O que nos importa ao construir um compilador?

- Coverage : precisamos considerar todas as expressões possíveis e garantir que lidamos com todos os casos - não é bom se nosso compilador travar em programas que esquecemos de considerar. Nossa linguagem nos ajuda a acompanhar isso?
- Data representation: como representamos e manipulamos expressões Bolt no compilador?
- Tooling: nossa linguagem tem bibliotecas que podemos usar para nosso compilador? Há um equilíbrio entre aprender fazendo e reinventar a roda desnecessariamente.
- Speed: existem dois aspectos diferentes. Em primeiro lugar, quão rápido é o código Bolt compilado? Em segundo lugar, quão rápido é o compilador (quanto tempo leva para compilar o código Bolt)? Há uma compensação - para obter um código compilado mais rápido, você precisa incluir mais etapas de otimização em seu compilador, tornando o compilador mais lento.

Não há bala de prata! Cada projeto de compilador inerentemente tem suas compensações. Eu escolhi escrever meu compilador principalmente em OCaml.

## Por que OCaml?

OCaml é uma linguagem de programação funcional com um pederoso sistema de tipos. Você provavelmente tem duas perguntas: por que programação funcional e o que quero fizer com sistema de tipos poderoso?

Em um grande compilador, há muitas partes móveis e acompanhar o estado torna nossas vidas mais difíceis. A programação funcional é mais fácil de raciocinar: se você passar a mesma entrada para uma função, ela sempre retornará a mesma saída. Com a programação funcional, não precisamos nos preocupar com efeitos colaterais ou estado, e isso nos permite focar no design de alto nível.

Outra alternativa é escreer o compilador em Rust por motivos de desempenho. Embora você possa ter um compilador mais rápido, não acho que a velocidade justifique os detalhes adicionais de baixo nível, como o gerenciamento de memória, que o Rust exige que você rastreie. Pessoalmente, como não estou escrevendo milhares de linhas de código Bolt, não estou muito preocupado com quanto tempo o compilador Bolt leva para compilar programas.

## Os tipos permitem emparelhar o programa com o compilador

Se você vem de uma linguagem de tipagem dinâmica como JS ou Python, os tipos do OCaml podem parecer estranhos. A maneira como penso sobre os tipos no OCaml é que eles fornecem ao compilador OCaml mais informações sobre o seu programa - quanto mais você diz, mais ele pode ajudar!

Voltando ao nosso programa de coverage, o que queremos dizer é que uma expressão Bolt é um inteiro, uma expressão if-else, uma chmada de método, um loop while etc.
Normalmente para representar algo assim, você usaria um `enum` e uma declaração `switch`. No OCaml, adicionamos esse "enum" ao nosso sistema de tipos usando `tipos variantes`. Podemos codificar a estrutura de cada expressão dentro do tipo. Por exemplo, para acessar uma variável você só precisa saber o seu nome `X`. Para acessar o campo de um objeto, você precisa saber tanto seu nome `x`, quando o campo que está acessando. Podemos então combinar padrões com base em cada caso: pense nisso como uma declaração `switch`.

```javascript
type identifier =
| Variable of Var_name.t
| ObjField of Var_name.t * Field_name.t

let do_something id = match id with
| Var(x) -> ...
| ObjField(x,f) -> ...
```

Como codificamos nossa estrutura de expressão Bolt em um tipo, o compilador OCaml verificará se cobrimos todos os casos. Isso é uma coisa a menos para nos preocuparmos.

Então OCaml cuida da cobertura, e decidimos que vamos codificar expressões Bolt como tipos de variantes, então essa é a representação de dados classificada. O OCaml também tem ótimas ferramentas para os lexer e parser do compilador que marca outro dos nossos critérios do por que OCaml.

## Segmentação de desempenho com LLVM

Tocamos no fato de que realmente nãos nos importamos com o desempenho do compilador em si. No enquanto, queremos que nosso código Bolt compilado seja rápido. Conforme abordado no post anterior, não precisamos reinventar a roda. Ao direcionar o `LLVM IR`, podemos nos conectar à cadeia de ferramentas C/C++ e obter nossas otmizações.

O LLVM fornece APIs para que os autores da linguagem gerem o LLVM - a API nativa está em C++. O LLVM também oferece ligações com OCaml.

## Por que o back-end do compilador é escrito em C++?

Uma pergunta natural é: por que não está tudo em OCaml?

As ligações OCaml do LLVM mapeiam apenas algumas das APIs C++. No momento da implementação não havia suporte para implementação de memory fences (uma instrução de máquina necessária para implementar bloqueios corretamente), então fui forçado a escrever esta parte do compilador em C++. Eu também estava experimentando algumas outras instruções de consistência de memória mais sofisticadas, presentes apenas na API C++ nativa.

As ligações OCaml LLVM provavelmente são o suficiente para sua linguagem, e você pode usar isso. A desvantagem com o a abordagem que tivemos é que agora temos que passar dados entre o frontend do compilador OCaml e o backend do compilador C++ usando Protobuf. Sim, a API C++ tem mais poder, mas resulta em um compilador mais complexo.
