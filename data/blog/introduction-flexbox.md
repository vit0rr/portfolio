---
title: Introduction to flexbox in CSS
date: '11-28-2021'
tags: ['css', 'code', 'learn', 'responsive', 'layouts']
draft: false
summary: Introduction to build flexible layouts in CSS
images: "https://i.imgur.com/iwhCOzZ.png"
---

<h2>[pt-br](/blog/introduction-flexbox-PtBr) | en</h2>

### Introduction

Most, or all of the examples will be based on an example page, it is available [here](https://gist.github.com/vit0rr/7409ea0efdf47b56728e7125a2644cb1).

The page:

![example-flexbox-page](https://i.imgur.com/CVBWOTS.png)

### Introduction to flexbox

To use flexbox, it needs to be applied to the parent alement of the elements you want to affect. The result of the `display: flex` in the example on this page is as follows:
```css
.flexbox-example {
    display: flex;
}
```
![example-displayFlex](https://i.imgur.com/OnUZvoM.png)

This single line of CSS using flex menages to create a responsive layout, with space between elements equal to each other being side by side. 

### Flexible boxes - axis

![flex_terms.png](https://i.imgur.com/upLbBGL.png)

- Main axis: Axis that runs in the direction the flex-items are arranged. This axis can be changed with `flex-direction`.

- Cross axsis: Axis that runs perpendicular to the main axis. If you main axis is set to `flex-direction: column`, the cross axis will rotate through the lines, and vice versa.

- Flex container: is the parent element defined by `display: flex`. That is, in our case it is `<div class="flexbox-example">`.

- Flex items: the items started as flexible boxes inside the flex container are flex items. In our case it is `<div class="example">`.

You need to understand this concept to be able to proceed decently for the rest of the article. At the end of the article, you have the references, if you have any doubts you can consult them, and of course, you can go back to this excerpt and read it again.

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

### A flex navbar

Vamos construir agora uma navbar bem simples, como forma de aplicar mais ou menos o que vimos.

```html
<div class="MenuWrap">
        <a href="#" class="ListItem">Home</a>
        <a href="#" class="ListItem">About Us</a>
        <a href="#" class="ListItem">Products</a>
        <a href="#" class="ListItem">Policy</a>
        <a href="#" class="LastItem">Contact Us</a>
</div>
```

```css
* {
    padding: 0px;
    margin: 0px;
}
```

Aqui eu apenas removo a margem e espaçamento padrão do navegador, assim a navbar vai ficar colada nas pontas.

```css 
.MenuWrap {
    background-color: rgb(30, 32, 163);
    font-size: 1rem;
    min-height: 2.75rem;
    display: flex;
    align-items: center;
    padding: 10px
}
```

Em ordem, defino um background com uma tonalidade de azul, o tamanho da fonte, uma altura mínima, defino o display como flex, alinho os itens no centro e um espaçamento de 10 pixels.

```css
.ListItem,
.LastItem {
            color: #ebebeb;
            text-decoration: none;
        }
```

Aqui é apenas definido a cor e text decoration como none para remover o underline dos links.

```css
    .ListItem {
            margin-right: 1rem;
        }

    .LastItem {
            margin-left: auto;
        }
```

Aqui defino o ListItem com margin para eles terem uma distância entre si e não ficarem colado e margin-left auto no LastItem que é o Contact Us. Dessa forma, o resultado é o seguinte:


![flexnav](https://i.imgur.com/CkZifvk.png)


Agora, caso a gente queira inverter as coisas? É bem simples. Basta colocar um `flex-direction: row-reverse;` em `MenuWrap` e mudar `margin-left: auto;` para `margin-right: auto;` e o resultado será:

![inv-flex-nav](https://i.imgur.com/P6ZxJCt.png)



#### References:

- [Understanding Basic Concepts of CSS Flexbox](https://codeburst.io/understanding-basic-concepts-of-css-flexbox-ffa657dc39c1)

- [Flexbox](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Flexbox)