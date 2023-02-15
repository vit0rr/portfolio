---
title: O que é, e qual a diferença entre State e Event no ReactJS
date: '5-4-2022'
tags: ['Tutorial']
draft: true
summary: Explicando o que é e a diferença entre State e Event no ReactJS
images: /static/images/banners/difference-between-state.jpg
---

<h3>[en](/blog/en/difference-between-state-event) | ptBR</h3>

### A lógica dos componentes em React

_Exemplos de código foram importados [daqui](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/synchronizing-with-effects)._

Você precisa estar familiarizado com dois tipos de lógica:

- O código de renderização é o que fica no topo do seu componente. É aqui que você pega os adereços e o estado, os transforma e retorna o JSX que deseja ver na tela. [Mantenha os componentes puros](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/keeping-components-pure). Deve apenas calcular o resultado, nada mais.

- [Event handling](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers) são funções que fazem algo em vez de apenas calculá-los. Um manipulador de eventos contém [side effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)#>) que podem alterar o estado do programa e são causados ​​por uma ação específica do usuário, como um clique de botão ou digitação.

Mas isso não é suficiente. Um ChatRoom, por exemplo, deve se conectar ao servidor de chat sempre que estiver visível na tela. Conectar-se a um servidor de bate-papo é um efeito colateral, então não pode acontecer durante a renderização do componente. Mas, não há um único evento como um clique ou digitação que fez com que o ChatRoom fosse exibido. E agora?

Os efeitos permitem que você especifique os efeitos colaterais renderizados por si mesmos e não por um evento específico como um clique. Enviar alguma mensagem no chat é um evento porque é causado diretamente por alguma ação do usuário, como o clique no botão ou algo assim. A configuração de um servidor é um efeito porque acontece a conexão com a qual a interação faz com que o componente apareça. Vale a pena saber que os efeitos são executados no final do [processo de renderização](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/render-and-commit) após a atualização da tela. Aqui está um bom momento para sincronizar o componente React com algum sistema externo como uma rede.

> Tenho em mim todos os sonhos do mundo.
