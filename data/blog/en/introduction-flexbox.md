---
title: Introduction to flexbox in CSS
date: '11-28-2021'
tags: ['css', 'code', 'learn', 'responsive', 'layouts', 'flex']
draft: false
summary: Introduction to build flexible layouts in CSS
images: 'https://i.imgur.com/iwhCOzZ.png'
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

With the `flex-direction` property, you can specify the direction of the main axis, that is, in which direction the flexbox children will be arranged. By default the value is row.

If you define `flex-direction: column;` in the example of the project, it will be like when there was no flex.

### Flexbox wrap

If you have elements with the same width and height, and repeat so that it breaks the layout, that is, overlapping the parent element, as in the example:

![flexbox-without-wrap](https://i.imgur.com/CoFHmht.png)

As a solution, there is the flex-wrap `property: wrap`, and the result is the following:

![flexbox-with-wrap](https://i.imgur.com/QEriUvf.png)

Thus, whenever you hear an overlay, the element will be moved to the next line.

However, only in this way will it not fit as it should. If I zoomed in on this screen on my ultrawide monitor, half the screen would be blank. To work around this, you can define a `flex: 200px` on the child element. The result is as follows:

![flexpx-wrap](https://i.imgur.com/QrM6GSz.png)

### Forma abreviada: `flex-flow`

Now that we know some flexbox rules, be aware that you can shorten `flex-direction` and `flex-wrap`, which would normally take up two lines, to just one line.

for that, use:

```css
flex-flow: row wrap;
```

### A flex navbar

Let's now build a very simple navbar, as a way to apply more or less what we saw.

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

Here I just remove the browser's default margin and spacing, so the navbar will be glued to the edges.

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

In order, I set a background to a shade of blue, the font size, a minimum height, set the display to flex, align the items to the center, and spacing 10 pixels.

```css
.ListItem,
.LastItem {
  color: #ebebeb;
  text-decoration: none;
}
```

Here just set the color and text-decoration to none to remove the underline from the links.

```css
.ListItem {
  margin-right: 1rem;
}

.LastItem {
  margin-left: auto;
}
```

Here I define the ListItem with margin so they have a distance from each other and don't get pasted and margin-left auto in the LastItem which is the Contact Us. Thus, the result is as follows:

![flexnav](https://i.imgur.com/CkZifvk.png)

Now, in case we want to turn things around? It's quite simple. Just put a `flex-direction: row-reverse;` in `MenuWrap` and change `margin-left: auto;` for `margin-right: auto;` and the result will be:

![inv-flex-nav](https://i.imgur.com/P6ZxJCt.png)

#### References:

- [Understanding Basic Concepts of CSS Flexbox](https://codeburst.io/understanding-basic-concepts-of-css-flexbox-ffa657dc39c1)

- [Flexbox](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Flexbox)
