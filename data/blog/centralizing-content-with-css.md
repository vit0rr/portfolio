---
title: Centralizing elements with CSS
date: '11-26-2021'
tags: ['css', 'code', 'learn']
draft: false
summary: How to centralize elements using CSS (vertically and horizontally)
images: https://i.giphy.com/media/13XW2MJE0XCoM0/giphy.gif
---

<h2>[pt-br](/blog/centralizing-content-with-cssPtBr) | en</h2>

### Vertically centralizing 

We can do it using `left-margin` and `right-margin`. 

Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <p class="example">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Eveniet dolorem architecto in optio natus quae iste quos 
        inventore soluta eligendi reiciendis unde, esse laboriosam 
        ducimus minima cumque veritatis. Illum, earum.
    </p>

</body>
</html>
```

```css
body {
    text-align: center;
}

p {
    width: 300px;
    padding: 50px;
    border: 20px solid rgb(31, 31, 145);
}

p.example {
    margin: 10px auto 10px auto;
    text-align: left;
}
```

![margin-center](https://raw.githubusercontent.com/vit0rr/portfolio/c59e3aaa4bb315b22c38061ad66b8fc54c3a625d/public/static/images/margin.png)

Set margins to left and right like 'auto' will make the browser put an equal space on two sides. If you don't see yet `margin: 10px auto 10px auto`, this code work like -> top, right, bottom, left

### Horizontally centralizing

We need first to understand an important concept of CSS: the value `absolute`.

When the `position` receives the value `absolute`, the box is removed from the normal flow and does not affect another element's position. Is like the element does not exist.

The displacement properties: `top`, `bottom`, `left` e `right` specify where the element should appear about the container element. In other words, its relative parent element will be the basis for it to be absolute.
Example:
```css 
h1 {
    position: absolute;
    top: 0px;
    left: 500px;
    width: 250px;
}
```

Here, the title has been positioned at the top of the page and 500 pixels from its left edge. The width is defined as 250 pixels. And you could change `top` to any other value and be navigating the page with the element

With that in mind, to fully center an element on the screen, it's possible with `position: absolute`.

Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <p class="example">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Eveniet dolorem architecto in optio natus quae iste quos 
        inventore soluta eligendi reiciendis unde, esse laboriosam 
        ducimus minima cumque veritatis. Illum, earum.
    </p>

</body>
</html>
```

```css
body {
    text-align: center;
}

p {
    width: 300px;
    padding: 50px;
    border: 20px solid rgb(31, 31, 145);
}

p.example {
    height: 120px;
    position: absolute;
    margin: auto;
    text-align: left;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    
}
```

![absolute](https://raw.githubusercontent.com/vit0rr/portfolio/23ca09aa8fa467bcdbc03c9ed9a8b9c798560a44/public/static/images/absolute.png)

Without the `margin`, this would not be possible. He was responsible for leaving all the margins on automatic and the element did the calculation for him to leave in the middle. Another thing is that this only applies if the element has height and width. It was defined in `p`.

### Using flex

As flex is a little more complex concept about CSS, I intend to explain it in a separate post dedicated to that. However, it is simpler to center something using flex.

Example:

```html
<body>
    <div class="example">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, aliquam?</p>
    </div>
</body>
```

```css
* {
    margin: 0px;
    padding: 0px;
}

.example {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
```
![flex](https://github.com/vit0rr/portfolio/blob/393b5dc4a6619fa0c3475d96e226a449eb54b1e8/public/static/images/flex.png?raw=true)

#### References:
- [HTML and CSS: Design and Build Websites](https://www.amazon.com.br/HTML-CSS-Design-Build-Websites/dp/1118008189)
- [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [Flexbox](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Flexbox)