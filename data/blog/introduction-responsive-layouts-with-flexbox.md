---
title: Introduction to responsive layouts with flexbox in CSS
date: '11-28-2021'
tags: ['css', 'code', 'learn', 'responsive', 'layouts']
draft: false
summary: Introduction to how a build responsive layouts with Flexbox in CSS
images: "https://i.imgur.com/iwhCOzZ.png"
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

É preciso entender esse conceito para conseguir seguir decentemente pro resto do artigo. No final do artigo tem as referências, caso tenha alguma dúvida pode consulta-las, além de evidentemente poder voltar para esse trecho e ler novamente.

### Flexbox direction

Com a propriedade `flex-direction` tem como especificar a direção do main axis, ou seja, em que direção os filhos da flexbox estarão arranjados. Por default o valor é row.

Se você definir `flex-direction: column;` no exemplo do projeto, ele vai ficar como quando não tinha nenhum flex.

### Flexbox wrap

Se você tiver elementos com a mesma largura e altura, e repetir a modo que quebre o layout, ou seja, sobrepondo o elemento pai, como no exemplo:

![flexbox-without-wrap](https://i.imgur.com/CoFHmht.png)

Como solução, existe a propriedade `flex-wrap: wrap`, e o resultado é o seguinte:

![flexbox-with-wrap](https://i.imgur.com/QEriUvf.png)

Com isso, sempre que ouver uma sopreposição, o elemento será movido para próxima linha.

Porém, somente dessa forma não vai se ajustar como deveria. Caso eu maximaxe essa tela no meu monitor ultrawide, metade da tela ficaria em branco. Para solucionar isso, você pode definir um `flex: 200px` no elemento filho. O resultado é o seguinte:

![flexpx-wrap](https://i.imgur.com/QrM6GSz.png)

### Forma abreviada: `flex-flow`

Agora que conhecemos algumas regras flexbox, saiba que você pode encurtar o `flex-direction` e `flex-wrap`, que normalmente ocupariam duas linhas, para apenas uma linha.

para isso, use:

```css
flex-flow: row wrap;
```



#### References:

- [Understanding Basic Concepts of CSS Flexbox](https://codeburst.io/understanding-basic-concepts-of-css-flexbox-ffa657dc39c1)

- [Flexbox](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Flexbox)