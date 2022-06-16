---
title: O que é, e qual a diferença entre State e Event no ReactJS
date: '5-4-2022'
tags: ['Tutorial']
draft: true
summary: Explicando o que é e a diferença entre State e Event no ReactJS
images: /static/images/banners/difference-between-state.jpg
---

<h3>[en](/blog/en/difference-between-state-event) | ptBR</h3>

![image](/static/images/banners/difference-between-state.jpg)

### A lógica dos componentes em React

_Exemplos de código foram importados [daqui](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/synchronizing-with-effects)._

Você precisa estar familiarizado com dois tipos de lógica:

- O código de renderização é o que fica no topo do seu componente. É aqui que você pega os adereços e o estado, os transforma e retorna o JSX que deseja ver na tela. [Mantenha os componentes puros](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/keeping-components-pure). Deve apenas calcular o resultado, nada mais.

- [Event handling](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers) são funções que fazem algo em vez de apenas calculá-los. Um manipulador de eventos contém [side effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)#>) que podem alterar o estado do programa e são causados ​​por uma ação específica do usuário, como um clique de botão ou digitação.
