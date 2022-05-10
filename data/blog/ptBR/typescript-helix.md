---
title: Tutorial fullstack com NodeJS, TypeScript, Helix, GraphQL e SQLite
date: '05-02-2022'
tags: ['Tutorials']
draft: true
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

### O que vamos fazer?

Construir uma API para um clone do HackerNews. O resumo:

Vamos começar aprendendo o básico de como um servidor GraphQL funciona, simplesmente definindo um [GraphQL schema](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e) para o servidor e escrevendo as funções de resolução correspondentes. No início, esses resolvedores funcionarão apenas com dados armazenados na memória - ou seja, nada de persistir dados além do tempo de execução do servidor.

Depois, vamos adicionar um banco de dados SQLite ao projeto que será acessado usando o [Prisma 3](https://www.prisma.io/)

Depois de conectar o banco de dados, você adicionará recursos mais avançados na API

Como implementar a funcionalidade de registro/login que permite que o usuário se autentique na API. Isso também permitirá que você verifique as permissões de seus usuários para determinadas operações de API.

Em seguida, você permitirá que os consumidores da API restrijam a lista de itens que eles recuperam da API adicioando recursos de filtragem e paginação a ela.

Vamos começar.

### Configuração do projeto

Nessa parte, vamos aprender a criar um projeto NodeJS básico com TypeScript.

Essa etapa é para configuração inicial do NodeJS, configuração básica para projetos TypeScript e como configurar scripts de desenvolvimentro.

Requisitos:

- NodeJS instalado. Recomendo a 16.
- Execute `node -v`, `npm -v`, `npx -v` em seu terminal e verifique se todos esses comandos funciona. Do contrário, instale o que tiver faltando e arrume.

### Criando o projeto Node.js e TypeScript

Em sua pasta do projeto, e caso não tenha uma, crie. Digitamos `npm init -y` no terminal dentro dessa pasta.

Isso vai criar um novo arquivo camado `package.json`. 

Esse novo arquivo, é onde fica a configuração do NodeJS que você esctá criando. Ele lista todas as dependências e outras opções de configuração (como scripts) necessárias para o projeto.

Para adicionar suporte ao TypeScript para seu projeto NodeJS, rode esse comando no diretório do seu projeto:

```shell
npm install --save-dev typescript @types/node ts-node ts-node-dev
```

E depois disso, você já vai conseguir ver modificações que foram feitas no package.json.

O comando acima, fornecerá as seguintes bibliotecas instaladas:
- typescript: é o suporte e o compilador básico da linguagem TypeScript.
- #types/node: é um pacote que contém os tipos básicos de TypeScript para o ambiente NodeJS.
- ts-node e ts-node-dev: bibliotecas que permitem executar arquivos `.ts` diretamente, sem uma etapa de compilação para JavaScript. 

Assim como temos o `package.json`, agora temos que gerar o nosso `tsconfig.json`. Nele fica a configuração do TypeScript e ele existe por projeto. É nesse arquivo que você informa ao compilador TypeScript quais arquivos compilar e como compilar. Para isso, rode:

```shell
npx tsc --init
```

Agora, dentro do `package.json`, adicione na parte de "scripts" o seguinte script:

```json
{
  "name": "hackernews-node-ts",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "ts-node-dev --exit-child src/index.ts",
    "start": "ts-node src/index.ts"
  },
  "devDependencies": {
    "@types/node": "^16.9.2",
    "ts-node": "^10.2.1",
    "ts-node-dev": "^1.1.8",
    "typescript": "^4.4.3"
  }
}
```

Isso vai permitir que você execute os seguintes comandos no diretório do projeto:
- `npm run start` - inicia o servidor
- `npm run dev` - iniciará o servidor e o reiniciará a cada alteração

Agora crie um ponto de entrada raiz para o seu projeto. Crie uma pasta `src` e dentro dela, o arquivo `index.ts`, com o seguinte código:

```javascript
console.log('Hello World!');
```

E para rodar o servidor em watch mode, execute no terminal:
```shell
npm run dev
```

O watch mode, vai executar novamente automaticamente caso detecte uma alteração em algum arquivo. Quando rodar, vai aparecer em seu console:

```shell
Hello World!
```

E boa, agora você tem um ptojeto NodeJS, TypeScript com scripts de desenvolvimento configurados. O próximo passo é configurar um esquema básico do GraphQL e um servidor GraphQL!

### Começando

Vamos aprender como funciona o GraphQL schema

1. Como ele funciona como um contrato de API entre o consumir e o provedor
2. Como você pode usar a biblioteca graphql como um mecanismo básico de execução do GraphQL
3. O que é uma operaçao GraphQÇ e como você pode usá-la

### Introdução ao GraphQL

Se já estiver um pouco familiarizado com o básico do GraphQL, uma visão rápida é:

- O GraphQL schema é onde seus tipos GraphQL são definidos
- Os tipos do GraphQL são conectados uns aos outros usando campos e formam um gráfico
- Os tipos `Query` e `Mutation` são especiais, pois atuam como ponto de entrada para o gráfico
- O GraphQL schema atua como provedor de dados e oferece um conjunto de recursos que o consumir pode usar.
- Para obter dados de um GraphQL schema, você precisa escrever uma operação GraphQL (a query) que seleciona os dados e campos necessários

A gente vai escrever um GraphQL schema simples e o consumirá diretamente, apenas para o processo de aprendizagem.

Mais tarde, vamos susbstituir a execução direta por um servidor GraphQL (baseado no protocolo HTTP) e adicionará ferramentas de desenvolvedor que tornarão super simples a consulta e o acesso

### Criando seu primeiro GraphQL schema

Há muitas maneiras de criar um GraphQL schema. Aqui a gente vai primeiro criar usando a biblioteca `@graphql-tools/schema`.

Comece instalando `graphql` e `@graphql-tools/schema` no seu projeto, com o seguinte comando:

```shell
npm install --save graphql @graphql-tools/schema graphql-import-node
```

O comando acma fornecerá as seguintes bibliotecas instaladas no projeto:
- graphql: é a implementação do mecanismo GraphQL. 
- @graphql-tools/schema é uma biblioteca para criar schemas executáveis do GraphQL.
- graphql-import-node é necessário ára permitir a importação de arquivos .graphql.

Um GraphQL schema pode ser escrito com GraphQL SDL (Schema Definition Language), que é a lingaugem GraphQL para definir sua API/contrato. 

Vamos criar nosso primeiro GraphQL schema muito simples.

Para começar, você precisa de um arquivo SDL definindo nosso contrato.

Crie um `src/schema.graphql` com o seguinte conteúdo:

```js
type Query {
  info: String!
}
```

Agora, você pode criar seu schema executável executável e implementá-lo.

Crie um arquivo novo em `src/schema.ts` com o seguinte código:

```javascript
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.graphql";

const resolvers = {
  Query: {
    info: () => 'Test',
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
```

No snippet de código acima, criou ou usou as seguintes variáveis:

- `typeDefs`: está é a sua definição de GraphQL schema. Criamos um tipo `Query` que expõe um campo chamado `info`, do tipo `String`. Você pode importá-lo diretamente do arquivo `.graphql` graças ao `graphql-import-node`.
- `resolvers`: as funções de resolvers fazem parte do GraphQL schema e são a implementação real do GraphQL schema (o código/lógica)
- `schema`: uma combinação do GraphQL SLD e dos resolvers. A função `makeExecutableSchema` é responsável por colá-los em um schema executável que podemos usar posteriormente.

