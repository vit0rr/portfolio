---
title: Centralizando conteúdo com CSS
date: '11-26-2021'
tags: ['css', 'code', 'learn']
draft: true
summary: Como centralizar conteúdos corretamente usando CSS
---

<h2>pt-br | [en](/blog/centralizing-content-with-css)</h2>

### Centralizando verticalmente

Essa é a mais simples. A gente pode fazer usando `left-margin` e `right-margin`. 

Exemplo:

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

Inserir as margens na esqueda e direita como `auto` fará o navegador inserir um espaço igual dos dois lados. Caso não esteja familiarizado com `margin: 10px auto 10px auto;`, ele trabalha de forma horária, ou seja, top, direita, baixo, esquerda.

### Centralizando horizontalmente

Para isso, vamos precisar entender primeiro um conceito importante de CSS que é o valor `absolute`.

Quando `position` recebe o valor `absolute`, a caixa é removida do fluxo normal e não afeta a posição dos outros elementos da página, é com se ele não existisse.

As propriedades de deslocamento: `top`, `bottom`,`left` e `right` especificam onde o elemento deve aparecer em relação ao elemento contêiner. Ou seja, o elemento pai relativo dele, vai ser a base para ele ficar absoluto. 
Exemplo:
```css 
h1 {
    position: absolute;
    top: 0px;
    left: 500px;
    width: 250px;
}
```

Aqui, o título foi posicionado no topo da página e a 500 pixels a partir da sua borda esqueda. A largura é definida como 250 pixels. E você poderia mudar o `top` para qualquer outro valor e ficar navegando pela página com o elemento

Pensando nisso, para centralizar um elemento totalmente na tela, é possível com `position: absolute`. 

Exemplo:

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

Vale pontuar que sem o `margin`, isso não seria possível. Ele foi o responsável por deixar todas as margens no automático e o elemento fez o cálculo para ele deixar no meio. Outra coisa, é que isso só vale se o elemento tiver altura e largura. Ela foi definida no `p`.


### Usando flex

Como flex é um conceito um pouco mais complexo de CSS, pretendo explicar ele num blog post separado, dedicado nisso. Porém, é mais simples centralizar algo usando flex.

Exemplo:

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


#### Referências:
- [HTML & CSS Projete e construa websites](https://www.amazon.com.br/HTML-CSS-Design-Build-Websites/dp/1118008189)
- [posição](https://developer.mozilla.org/pt-BR/docs/Web/CSS/position)
- [Flexbox](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Flexbox)