---
title: Introdução ao GraphQL
date: '05-02-2022'
tags: ['Tutorials']
draft: false
summary: Uma introdução ao GraphQL
images: '/static/images/banners/introduction-graphql.png'
---

### Introdução

[GraphQL](https://graphql.org/) é um novo padrão de API que fornece mais eficiência, poder e uma alternativa flexível ao REST. Foi desenvolvida pelo Facebook e hoje é um projeto open-source mantido pela grande comunidade de companhias e indivíduos pelo mundo.

> API de forma curta, é o que define como o cliente vai carregar alguma informação do servidor. É um serviço que provém algum dado para outros serviços. Uma conversa entre dois pontos do seu sistema.

GraphQL permite _declarative data fetching_ onde o cliente consegue especificar exatamente que dado ele precisa da API. Isso significa que invés da sua aplicação ter diversos endpoints que retornam coisas fixas, um servidor GraphQL consegue retornar dados específicos que o client pediu, com um único endpoint.

### GraphQL - Uma linguagem de consultas para APIs

A maioria das aplicações hoje precisam buscar dados de um servidor, onde esses dados estão num banco de dados. A API é responsável por fornecer uma interface para os dados que atenda com as necessidades da aplicação.

E aqui é onde surge alguns equívocos. Algumas pessoas confundem como se GraphQL fosse uma tecnologia de banco de dados, e não é. Ela é uma linguagem de consulta para APIs, e não para banco de dados. Nesse sentido, GraphQL é independente de banco de dados e pode ser usado efetivamente em qualquer contexto, desde que uma API seja usada.

Se quiser um artigo mais completo dos motivos do uso de GrapQL, leia [esse artigo](https://www.prisma.io/blog/top-5-reasons-to-use-graphql-b60cfa683511)
### Uma alternativa mais eficiente ao REST

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) tem sindo a maneira mais popular de expor dados de um servidor. Quando esse conceito foi desenvolvido, as aplicações eram bem mais simples que as de hoje. REST, portanto, foi um bom ajuste para muitas aplicações. Mas o cenário de APIs mudou bastante nos últimos anos. Existem três fatores que desafiam a maneira como as APIs são projetadas:

1. **Carregamento de dados mais eficientes pelo aumento do uso de dados móveis**


   O aumento do uso móvel (celular), dispositivos de baixa potência e redes desleixadas foram as razões inicias pelas quais o Facebook desenvolveu o GraphQL. O GraphQL minimiza a quantidade de dados que precisam ser transferidos pela rede e, portanto, melhora o uso em piores condições, tornando no geral uma opção muito mais escalável.

2. **Variedade de estrutura e de front-end**
   
   O cenário com muita variabilidade de estrutura e plataformas de front-end que executam aplicativos client dificultam a criação e manutenção de uma API que precise atender aos requisitos de todos. Com GraphQL, cada client pode acessar exatamente os dados que ele precisa. 

3. **Desenvolvimento rápido**
   
   Implementação contínua tornou-se um padrão para diversas empresas, e atualizações frequentes de produtos se tornaram algo importante. Com APIs REST, a maneira como os dados são expostos pelo servidor geralmente precisa ser modificada para atender aos requisitos de mudança de design no lado do client. Isso dificulta práticas de desenvolvimento rápido.

## Referências:
- [Instroduction to GrapQL](https://www.howtographql.com/basics/0-introduction/)