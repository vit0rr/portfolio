---
title: Introdução ao PHP
date: '10-18-2021'
tags: ['php', 'code', 'learn']
draft: false
summary: Introdução ao PHP baseado no começo dos meus estudos na linguagem.
---

### Motivo

Comecei a estudar PHP e resolvi escrever o que vou aprendendo aqui. Pessoalmente explicar e escrever sobre o tema ajuda a ter um feedback sobre o quanto eu realmente entendi do assunto e, caso tenha entendido, solidifica melhor escrevendo.

Como estou seguindo a [documentação do PHP](https://www.php.net/manual/pt_BR/langref.php), as info. terão a mesma ordem, então em suma será o mesmo conteúdo, mas com algumas partes resumidas ou explicadas com as minhas palavras.

### Sumário

    - [Tipos](#tipos)
        - [Definir tipos](#defTipos)
        - [Boolenos](#boolean)

<h3 id="tipos">Introdução - Tipos</h3>
Aqui é parecido com JavaScript. PHP suporta dez tipos primitivos, sendo eles:
##### Quatro tipos escalares
- `bool`
- `int`
- `float`, ou `double`
- `string`
##### Quatro tipos compostos
- `array`
- `object`
- `callable` (callback)
- `iterable` (pseudo-type)
##### Dois tipos especiais
- `resource`
- `null`

PHP é dinamicamente tipado, o que significa que não necessariamente você precisa definir o tipo das coisas, assim como acontece com JavaScript, então geralmente não se define esse tipo de coisa e ela é decidida em tempo de execução.

> Checar tipos é importante. Para chegar os tipos de [expressões](https://www.php.net/manual/pt_BR/language.expressions.php) - será abordado posteriormente, usa-se a função `var_dump()`. Em depuração, usa-se a função `gettype()`, ela retorna o tipo. Caso queira criar condições, verificar por um tipo, usa-se `is_type`, e **_não_** `gettype()`.

Exemplos:

```php
    <?php
        $a_bool = TRUE;   // um booleano
        $a_str  = "foo";  // uma string
        $a_str2 = 'foo';  // uma string
        $an_int = 12;     // um inteiro

        echo gettype($a_bool); // mostra:  boolean
        echo gettype($a_str);  // mostra:  string

        // Se ele é um inteiro, incrementa-o com quatro
        if (is_int($an_int)) {
            $an_int += 4;
        }

        // Se $bool é uma string, mostre-a
        // (não imprime nada)
        if (is_string($a_bool)) {
            echo "String: $a_bool";
}
    ?>
```

A primeira parte define as variáveis com $nome e em seguida seu tipo:

```php
        $a_bool = TRUE;   // um booleano
        $a_str  = "foo";  // uma string
        $a_str2 = 'foo';  // uma string
        $an_int = 12;
```

Em seguida, é usado `echo gettype($a_bool)`, que escreve _boolean_ na tela. A mesma coisa com `echo gettype($a_str)`.

Como dito na nota, não se usa `gettype()` para comparação e verificação de tipos. Para isso, assim como Ruby, existe o _`is_type`_. No exemplo, foi o `is_int`, ou seja, se ele é inteiro. Com o _if_ no exemplo, ele verifica se _`$an_int`_ é um inteiro. Ele faz isso com `is_int($an_int)`. E, caso verdadeiro, incrementa-se o valor da variável com 4.

Algo semelhante é feito no último exemplo, mas no caso, verificando se a variável _`$a_bool`_ é um inteiro e, caso verdadeiro, `echo "String: $a_bool"`, e evidentemente ele não mostra nada, pois é uma comparação falsa.

<h3 id="defTipos">Definir tipos</h3>
Se for necessário forçar a conversão de uma variável para um tipo, [converta](https://www.php.net/manual/pt_BR/language.types.type-juggling.php#language.types.typecasting) a variável ou se a função [`settype()`](https://www.php.net/manual/pt_BR/function.settype.php)

Para converter, é da seguinte maneira:

```php
    <?php
        $foo = 10; // $foo é um INTEIRO
        $bar = (boolean) $foo; // $bar é um BOOLEANO
    ?>
```

Para usar a função `settype()`:

```php
    <?php
        $foo = "5bar"; // string
        $bar = true;   // boolean

        settype($foo, "integer"); // $foo é agora 5   (integer)
        settype($bar, "string");  // $bar é agora "1" (string)
    ?>
```

<h3 id="boolean">Booleanos</h3>
Booleanos expressão valores de verdade. Pode ser `true` ou `false`
Em uso prático, ambos são case-insensitive:

```php
    <?php
        $foo = True;
    ?>
```

Normalmente usar valores booleanos são resultados de estruturas de controle, como `if, else`. Exemplo:

```php
    <?php
        // == É um operador que testa
        // igualdade e retorna um booleano.
        if ($action == "mostrar_versao") {
            echo "A versão é 1.23";
        }

        // isto não é necessário ...
        if ($exibir_separadores == TRUE) {
            echo "<hr>\n";
        }

        // ... porque você pode simplesmente escrever isso:
        if ($exibir_separadores) {
            echo "<hr>\n";
        }
    ?>
```

O segundo exemplo não é necessário pois estruturas condicionais automaticamente presumem como verdadeiro. variável é igual a X? Se for verdade faça tal coisa, caso contrário, faça outra. O padrão, sem precisar declarar, já é verdadeiro.
Também vale lembrar que é false, além de evidentemente o booleano `false`, qualquer número com `0`, uma `string` vazia ou uma `string "0"`.

```php
    <?php
        var_dump((bool) "");        // bool(false)
        var_dump((bool) 1);         // bool(true)
        var_dump((bool) -2);        // bool(true)
        var_dump((bool) "foo");     // bool(true)
        var_dump((bool) 2.3e5);     // bool(true)
        var_dump((bool) array(12)); // bool(true)
        var_dump((bool) array());   // bool(false)
        var_dump((bool) "false");   // bool(true)
    ?>
```
