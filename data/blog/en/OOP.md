---
title: Understanding Object Oriented Programming (OOP) with Java
date: '09-23-2021'
tags: ['Tutorials']
draft: false
summary: Discussion of OOP with Java
images: /static/images/posts/oop/46jF8Xd.png
---

<h3>en | [ptBR](/blog/ptBR/OOPPtBr)</h3>

![image](/static/images/posts/oop/46jF8Xd.png)

### What is an object?

Languages like C, which follow a structured programming paradigm, that is, have data structures and program instructions act on these data. In an object-oriented language - such as Java, JavaScript and others - we combine data and its instructions into objects.

Data and programming logic are `combined` into one object. It is a self-contained entity containing attributes and behaviors. This type of paradigm is a logical extension of older structural programming techniques and abstract data types. However, it is worth pointing out that the object is not necessarily an abstract data with the addition of polymorphism and inheritance. This generalization is done in some articles the `wrong` way.

### Heritage

### Polymorphism

Generally speaking, it means "various ways", and this in the context of programming means being able to do "a certain thing" in various ways. The point is this "certain thing". We're talking about method calls, so in Java polymorphism is only expressed in method calls. In other words, polymorphism is a piece of code that works with multiple data.

Being an object does not imply having polymorphism. Every object is polymorphic as its interface is. But this does not necessarily imply that every object has polymorphism.

Polymorphism is a single [interface](<https://en.wikipedia.org/wiki/Interface_(computing)>) for data of different types or a symbol representing several different types. In practice this occurs with the three main classes of polymorphism, which are:

- [`Ad hoc polymorphism`](https://en.wikipedia.org/wiki/Ad_hoc_polymorphism)
- [`Parametric polymorphism`](https://en.wikipedia.org/wiki/Parametric_polymorphism)
- [`Subtyping`](https://en.wikipedia.org/wiki/Subtyping)

Polymorphism allows abstract class type references to represent the behavior of concrete classes they reference. In this way, it is possible to treat multiple types in the same way. That is, it is characterized as polymorphism, when more than two _distinct_ classes have methods of the same name, so that a function can use an object of any of the polymorphic classes, without having to treat it differently according to the object's class.

A little more practically, think of an object "a" that calls the "speak()" method of an object "b", in this way, the object "b" defines the way to implement such a method, that is, the `type` of object "b" is what really matters.

Examples of polymorphic call:

1. Object "a" creates "b"

```java
class A {
    void facaAlgo(){
        Falador b;
        if(...) {
            b = new Pessoa();
        } else {
            b = new Crianca();
        }
        b.falar(); // chamada polimórfica
    }
}
```

2. Object "a" receives object "b" from object "c"

```java
class A {
    void facaAlgo(){
        Gritador b = c.meDêUmGritador(); // "c" é um objeto qualquer para o qual tenha referência
        b.grita(); // chamada polimórfica
    }
}
```

3. Object "a" receives object "b" in a method call

```java
class A {
    void facaAlgo(Gritador b){
        b.grita(); // chamda polimórfica
    }
}
```

The general point of the examples is to be able to show that "a" has a reference to "b".
Another thing is that, in Java, _all_ method calls to objects are polymorphic. This in the case of OBJECT methods, in the case of static methods or also called class methods there is no polymorphism.

##### Fontes:

- [Polymorphism em Java](https://beginnersbook.com/2013/03/polymorphism-in-java/)
- [Polymorphism](<https://en.wikipedia.org/wiki/Polymorphism_(computer_science)>)
- [Object(Computer_science)](<https://en.wikipedia.org/wiki/Object_(computer_science)>)
