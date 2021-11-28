---
title: Introduction to responsive layouts with flexbox in CSS
date: '11-28-2021'
tags: ['css', 'code', 'learn', 'responsive', 'layouts']
draft: false
summary: Introduction to how a build responsive layouts with Flexbox in CSS
---

### Introduction

A maioria ou todos os exemplos serão baseados numa página de exemplo, ela está disponível [aqui](https://gist.github.com/vit0rr/7409ea0efdf47b56728e7125a2644cb1).

Ela é a seguinte:

![example-flexbox-page](https://i.imgur.com/CVBWOTS.png)

### Introduction to flexbox

Para usar flexbox, precisa ser aplicado no elemento pai dos elementos que você quer afetar. O resultado do `display: flex` no exemplo dessa página é o seguinte:
```css
.flexbox-example {
    display: flex;
}
```
![example-displayFlex](https://i.imgur.com/OnUZvoM.png)

Essa única linha de CSS usando flex consegue criar um layout responsivo, com espaço entre os elementos iguais entre si estando lado a lado. Genial.

### Flexible boxes - eixos

![flex_terms.png](https://i.imgur.com/upLbBGL.png)

- Main axis: Eixo que corre na direção em que os flex-items estão dispostos. Esse eixo pode ser alterado com `flex-direction`.

- Cross axsis: Eixo que corre perpendicular ao main exis. Se o seu main axis tiver definido para `flex-direction: column`, o cross axis vai rodar pelas linhas, e vice versa.

- Flex container: é o elemento pai definido por `display: flex`. Ou seja, no nosso caso é `<div class="flexbox-example">`.

- Flex items: os itens iniciados como flexible boxes dentro do flex container são os flex items. No nosso caso é `<div class="example">`.

É preciso entender esse conceito para conseguir seguir decentemente pro resto do artigo. No final do artigo tem as referências, caso tenha alguma dúvida pode consulta-las, além de evidentemente poder voltar para esse treixo e ler novamente.