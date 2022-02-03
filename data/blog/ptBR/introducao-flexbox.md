---
title: Introdução a flexbox em CSS
date: '11-28-2021'
tags: ['Tutorials']
draft: true
summary: Introdução a construção de layouts flexíveis em CSS
images: 'https://i.imgur.com/iwhCOzZ.png'
---

<h3>[en](/blog/en/introduction-flexbox) | ptBR</h3>

### Introdução

A maioria ou todos os exemplos serão baseados numa página de exemplo, ela está disponível [aqui](https://gist.github.com/vit0rr/7409ea0efdf47b56728e7125a2644cb1).

Ela é a seguinte:

![example-flexbox-page](https://i.imgur.com/CVBWOTS.png)

### Introdução a flexbox

Para usar flexbox, precisa ser aplicado no elemento pai dos elementos que você quer afetar. O resultado do `display: flex` no exemplo dessa página é o seguinte:

```css
.flexbox-example {
  display: flex;
}
```

![example-displayFlex](https://i.imgur.com/OnUZvoM.png)

Essa única linha de CSS usando flex consegue criar um layout responsivo, com espaço entre os elementos iguais entre si estando lado a lado.

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

### Flex navbar

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
  padding: 10px;
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

#### Referências:

- [Understanding Basic Concepts of CSS Flexbox](https://codeburst.io/understanding-basic-concepts-of-css-flexbox-ffa657dc39c1)

- [Flexbox](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Flexbox)
