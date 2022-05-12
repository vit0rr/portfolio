---
title: Queues com NestJS
date: '05-12-2022'
tags: ['Tutorials']
draft: true
summary: O que é queues e como funciona no NestJS
images: '/static/images/banners/queues.png'
---

### Queues

Queues definido de forma objetiva é para ajudar na escalabilidade do projeto e desempenho do serviço.

Alguns problemas comuns que queues podem resolver:

- Picos de processamento: se no seu serviço, o usuário consegue iniciar tarefas com alto uso de recursos em momentos não fixos, você pode adicionar uma `queue` invés de tratar tudo de forma síncrona. Em seguida, executar processos que peguem tarefas dessa `queue` de forma controlada. 

- Dividir tarefas monolíticas: primeiro que tarefas monolíticas é uma tarefa única que roda em um único processo. Ou seja, um sistema monolítico, é onde todas as funcionalidades estão em apenas um processo.

Sabendo disso, existem algumas tarefas que podem bloquear o loop de eventos do NOdeJS por exemplo, se alguma tarefa do usuário exigir um alto nível de CPU , você pode delegar essa tarefa para outros processos. 

No NestJS usamos o pacote `@nestjs/bull`, que é uma abstração do [Bull](https://github.com/OptimalBits/bull). Que por sua vez é um sistema de queue baseado em NodeJS.