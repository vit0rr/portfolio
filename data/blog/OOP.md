---
title: Entendendo programação orientada a objeto (OOP) com Java
date: '09-23-2021'
tags: ['java', 'computer science', 'polymorphism', 'OOP']
draft: false
summary: Discussão sobre OOP com Java
---

# EM DESENVOLVIMENTO

### O que é um objeto?

Linguagens como C, que seguem um paradigma de programação estruturada, ou seja, possuem estruturas de dados e instruções do programa atuam nesses dados. Já numa linguagem orientada a objetos - como Java, JavaScript entre outras - combinamos dados e suas instruções em objetos.

Dados e lógica de programação são `combinados` em um objeto. É uma entidade autocontida contendo atributos e comportamentos. Esse tipo de paradigma é uma extensão lógica de antigas técnicas da programação estrutural e tipos de dados abstratos. Um objeto é um tipo de dado abstrato com a adição de `polimorfismo` e `herança`.

### Polimorfismo

De forma genérica, significa "várias formas", e isso no contexto da programação representa poder fazer "certa coisa" de várias formas. O ponto é essa "certa coisa". Estamos falando de chamadas de métodos, portanto, em Java, o polimorfismo é expresso apenas em chamdas de métodos. Ou seja, polimorfismo representa que uma chamada de método pode ser executada de várias formas diferentes. **O objeto que recebeu a chamada quem decide "a forma"**.

Polimorfismo é uma única [interface](<https://en.wikipedia.org/wiki/Interface_(computing)>) para dados de diferentes tipos ou um símbolo que represente vários tipos diferentes. Na prática isso ocorre com as três principais classes de polimorfismo, que são:

- [`Ad hoc polymorphism`](https://en.wikipedia.org/wiki/Ad_hoc_polymorphism)
- [`Parametric polymorphism`](https://en.wikipedia.org/wiki/Parametric_polymorphism)
- [`Subtyping`](https://en.wikipedia.org/wiki/Subtyping)

Polimorfismo permite que referências de tipos de classes abstratas representem o comportamento de classes concretas que refenciam. Dessa forma, é possível tratar múltiplos tipos de uma mesma forma. Ou seja, é caracterizado como polimorfismo, quando mais de duas classes _distintas_ têm métodos do mesmo nome, fazendo com que uma função possa utilizar um objeto de qualquer uma das classes polimórficas, sem precisar tratar de forma diferente conforme a classe do objeto

De forma um pouco mais prática, pense num objeto "a" que chama o método "falar()" de um objeto "b", dessa forma, o objeto "b" define a forma de implementação de tal método, ou seja, o `tipo` do objeto "b" é o que de fato importa.

Exemplos de chamda polimórfica:

1. Objeto "a" cria o "b"

```java
class A {
    void façaAlgo(){
        Falador b;
        if(...) {
            b = new Pessoa();
        } else {
            b = new Criança();
        }
        b.falar(); // chamada polimórfica
    }
}
```

2. Objeto "a" recebe o objeto "b" de um objeto "c"

```java
class A {
    void façaAlgo(){
        Gritador b = c.meDêUmGritador(); // "c" é um objeto qualquer para o qual tenha referência
        b.grita(); // chamada polimórfica
    }
}
```

3. O objeto "a" recebe o objeto "b" numa chamda de método

```java
class A {
    void façaAlgo(Gritador b){
        b.grita(); // chamda polimórfica
    }
}
```

O ponto geral dos exemplos é conseguir exibir que "a" tem uma refência a "b".
Outra coisa é que, em Java, _todas_ as chamdas de métodos a objetos são polimórficas. Isso no caso em métodos de OBJETOS, no caso de métodos estáticos ou também chamados de métodos de classes não há polimorfismo.

##### Fontes:

- [Polymorphism em Java](https://beginnersbook.com/2013/03/polymorphism-in-java/)
- [Polymorphism](<https://en.wikipedia.org/wiki/Polymorphism_(computer_science)>)
- [Object(Computer_science)](<https://en.wikipedia.org/wiki/Object_(computer_science)>)
