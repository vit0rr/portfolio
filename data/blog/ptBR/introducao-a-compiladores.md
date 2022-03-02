---
title: Introdução a compiladores
date: '02-27-2022'
tags: ['Tutorials']
draft: true
summary: Como eu escrevi minha própria linguagem de programação?
---

### Introdução

Estou fazendo esse artigo para mim. Tenho interesse nos assuntos tratados no artigo [How I wrote my own "proper" programming language](https://mukulrathi.com/create-your-own-programming-language/intro-to-compiler/) e pretendo estudar ele por completo, passando por todos os passos.

Como a melhor forma de aprender e estudar algo é escrevendo sobre isso (pelo menos para mim), eu vou traduzir o artigo para que eu possa entender melhor. Não é uma tradução direta, vou mudar, remover ou acrescentar coisas durante o texto.

### Como eu escrevi minha linguagem de programação?

![img](https://mukulrathi.com/static/67552b3afe850eb6515a639276f98f47/00ea0/compiler-pipeline.webp)

A imagem acima é ó compilador da linguagem "Bolt" que vamos construir.

Você não precisa saber muita coisa sobre C++ e OCaml, vamos ir aprendendo durante o processo.

A ideia é criar uma linguagem realmente funcional. Uma coisa que me incomoda é que os tutorias sobre criação de linguagem de programação envolvem criar uma linguagem de brinquedo que apenas faz operações como adição e multiplicação e isso é ok, mas e uma linguagem real como Java?

Então é isso que vamos fazer. A linguagem Bolt é semelhante ao Java, ela é oritentada a objetos. Alguns destaques são:

- Implementamos objetos e classes, como sobreposição de herança e método
- Simultaneidade (até onde eu sei ao escrever isso, nenhum outro tutorial de linguagem de programação cobriu isso)
- Generics: ser capaz de escrever uma classe do tipo `LinkedList<T>` e então instaciá-la com `LinkedList<int>`, `LinkedList<Person>` e assim por diante.
- Uma introdução sobre como os tipos são verificados em um compilador
- Compilando para LLVM - LLVM é usado por C, C++, Swift, Rust entre muitas outras linguagens.

### Por que você deveria escrever sua linguagem de programação?

Possíveis respostas:

- É divertido
- É legal ter sua própria linguagem de programação
- É um bom projeto paralelo

### Modelos mentais

Além dos que citei, existem um muito maior, que é: ter os modelos mentais certos. Veja, quando você aprende sua primeira linguagem de programação, você vê a programação através das lentes dessa linguagem. Avanço rápido para a sua segunda linguagem e parece dífícil, você precisa aprender novamente a sintaxe e essa nova lang faz as coisas de maneira diferente. Usando mais langs, você percebe que elas compartilham temas comuns. Java e Python têm objetos, Python e JavaScript não exigem que você escreva tipos, a lista é enorme. Mergulhando ainda mais na teoria da lang de programação, você lê sobre as construções de linguagem presentes - Java e Python são langs de programção orientadas a objetos, e Python e JavaScript são tipadas dinamicamente.

As linguagens de programação que você está usando na verdade se baseiam nas ideias presentes em linguagens mais antigas das quais você pode nem ter ouvido falar. Simula e Smalltalk introduziram o conceito de orientação a objetos. Lisp introduziu o conceito de tipagem dinâmica. E há novas langs de pesquisa chegando o tempo todo que introduzem novos conceitos. Um exemplo mais comum: Rust cria memory-safety em uma linguagem de programação de baixo nível.

Construir sua própria lang ajuda você a pensar de forma mais crítica sobre o design da linguagem, então quando você aprende um novi idioma, é muito mais fácil.

### O que são compiladores

Ok, você tem uma ideia e agora projetou a sua linguagem genial de programação. Mas tem uma detalhe, como você executa ela? Esse é o papel do compilador. Para explicar como os compiladores funcionam, vamos primeiro relembrar o século 19, na era do telégrafo. Aqui temos este novo telégrafo, mas como enviamos mensagens? É o mesmo problema que temos ao escrever nossa lang. O operador de telégrafo precisa receber a fala e convertê-la em código morse e digitar o código. A primeira coisa que o operador faz é dar sentido ao discurso - ele o divide em palavras (lexing) e então entende como essas palavras são usadas em uma frase (parse) - fazem parte de um sistagma nominal, de uma oração subordinada etc. Eles verificam se faz sentido classificando as palavras em cateorigas ou tipos (verbo, substantivo etc.) e verificam se a frase faz sentido gramatical (type-check). Finalmente, eles traduziem (compilam) cada palavra em pontos e traços (código morse), que é então transmitido ao longo do fio.

Muito disso é automático para os humanos. os compiladores funcionam da mesma maneira, exceto que temos que programar explicitamente os computadores para fazer isso. O exemplo do telégrafo descreve um compilador simples que consiste em 4 estágios: lex, parse, type-check e então traduz em instruções de máquina. O operador também precisa de algumas ferramentas adicionais para realmente extrair o código Morse. Para linguagens de programação, este é o ambiente de tempo de execusão.

Em muitas linguagens práticas, você não pode simplesmente ir diretamente de código-fonte para código de máquina, há uma redução, onde remove as construções de linguagem estágio por estágio, até ficarmos com um pequeno conjunto de instruções que podem ser executadas. Essa redução torna os estágios posteriores mais fáceis, pois eles operam de forma mais simples. Os estágios do compilador são agrupados em front-end, middle-end e back-end, onde front-end faz grande parte da análise/verificação de tipos, middle e back-end simplificam e otimizam o código.

### Opções de design do compilador

O operador traduz as palavras dinamicamente em código Morse à medida que as transmitem ou converte as palavras em código Morse antecipadamente e depois transmitem o código Morse? Linguagens interpretadas como Python fazem o primeiro, enquanto linguagens compiladas adiantadas como C fazem o último. java na verdade está entre os dois - ele usa um compilador just-in-time que faz a maior parte do trabalho de antemão, traduzindo programas para bytecode e então em tempo de execução compila bytecode para código de máquina.

o LLVM IR atua como um trampolim entre o programa e o código de máquina. C, C++, Rust e uma série de outras linguagens tem como alvo o LLVM IR, que então compila o código para uma vaeriedade de arquitetura de processadores. Aqui uma ilustração representando o processo de envolvendo LLVM:

![llvm](https://i.imgur.com/ujTIIzp.png)

Static vs dynamic typing?

No primeiro caso, o operador verifica se as palavras fazem sentido antes de começar a tocar. Ou, eles não fazem e então no meio do caminho eles reclamam de que algo não faz sentido e param. A digitação dinâmica pode ser vista como maios rápida para experimentar (Python e JS), mas quando você envia essa mensagem, você não sabe se o operador irá parar no meio do caminho. Ou seja, se ele vai crashar.

Em termos um pouco mais técnicos, tipagem dinâmica é quando a verificação de tipo, é realizada em tempo de execução, e não em tempo de compilação.

A estática, é o contrário da dinâmica. Os tipos são verificados em tempo de compilação.

### Tipos

Na analogia com o telégrafo, o operador classifica as palavras em adjetivos, verbos etc, e o nosso sistema de tipo faz isso. Classificamos os valores do programa com base no comportamento que gostaríamos que ele tivesse. Por exemplo, `int`, para números que podem ser multiplicados juntos, `String` para fluxos de caracteres que podem ser concatenados juntos. A função do verificador de tipos é evitar que um comportamento indesejável aconteça, como concatenar `int` ou multiplicar `String`. Essas operações não fazem sentido, portanto, não devem ser permitidas. Com a verificação de tipo, o programador anota valores com tipos e o compilador verifica se estão corretos. Com inferência de tipos, o compilador infere e verifica os tipos. Chamamos as regras que verificam de typing judgements, e uma coleção delas (junto com os tipos) formam um sistemma de tipos.

Porém, sistemas de tipos não verificam apenas se é `int` ou `String`. Sistemas de tipos são mais ricos, complexos. O sistema de tipos do Rust por exemplo, garante a segurança da memória e a liberdade de corrida de dados, além de verificar os tipos tradicionais que citamos `int` e `String`.
