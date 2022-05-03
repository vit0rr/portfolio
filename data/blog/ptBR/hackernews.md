---
title: Tutorial fullstack com NodeJS, TypeScript, Helix, GraphQL e SQLite
date: '05-02-2022'
tags: ['Tutorials']
draft: false
summary: Tutorial node-typescript-helix
images: '/static/images/banners/introduction-graphql.png'
---

### Overview

Esse tutorial é uma tradução com notas adicionais dos meus estudos nessas respectivas tecnologias. Ou seja, além da tradução, vai ter pontos adicionais que eu achar útil conforme minhas dificuldades. O tutorial original e em inglês pode ser conferido [aqui](https://www.howtographql.com/typescript-helix/0-introduction/)

GraphQL é uma alternativa popular ao REST como design de API.

Nesse tutorial, a ideia é conseguir construir um servidor GraphQL inteiramente do zero.

As tecnologias que vamos usar é:
- [Node.js](https://nodejs.org/en/): engine e runtime para o nosso servidor
- [TypeScript](https://www.typescriptlang.org/): JavaScript fortemente tipado.
- [fasfity](https://www.fastify.io/): framework web bem rápido e eficiente 
- [graphql-js](https://github.com/graphql/graphql-js): GraphQL para JavaScript
- [graphql-helix](https://github.com/contra/graphql-helix): coleção de funções para construir seu próprio servidor HTTP GraphQL.
- [Prisma](https://www.prisma.io/): Substitui os ORMs tradicionais. Use o Prisma Client para acessar seu banco de dados entro dos GraphQL resolvers.
- GraphiQL: Um "GraphQL IDE" que permite explorar interativamente as funcionalidades de uma API GraphQL. É semelhante ao Postman, que oferece funcionalidade comparável para APIs REST. Entre outras coisas, GraphiQL:
    - Gera automaticamente documentação abrangente para todas as operações de API disponíveis
    - Fornece um editor onde você pode escrever consultas, mutações e assinaturas, como preechimento automático e realce de sintaxe.
