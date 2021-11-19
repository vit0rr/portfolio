---
title: Desenvolvimento full stack Solana com React, Anchor, Rust, e Phantom
date: '11-18-2021'
tags: ['javascript', 'code', 'learn','full stack', 'solana', 'react', 'anchor', 'rust', 'phantom']
draft: false
summary: Guia completo com desenvolvimento full stack, minha introdução com crypto e web3.
---

### Pré-requisito
1. NodeJS
2. Solana  Tool Suite - você pode seguir a documentação de instalação [aqui](https://docs.solana.com/cli/install-solana-cli-tools)
2. Anchor - o guia de instalação e instruções tem [aqui](https://project-serum.github.io/anchor/getting-started/installation.html)
3. Solana browser wallet - para carteira, vamos usar o [https://phantom.app/](https://phantom.app/)

### Overview
As ferramentas que vamos usar são:
[Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools) - Aqui tem uma polida e boa documentação da CLI para integir com a Solana network

[Anchor Framework](https://project-serum.github.io/anchor/getting-started/introduction.html) - Além de tudo, ele oferece um DSL em Rust para que você não precise saber profundamente da linguagem para iniciar.

[solana/web3.js](https://solana-labs.github.io/solana-web3.js/) - É a versão Solana de web3.js

[ReactJS](https://reactjs.org/) - Client-side framework

Nesse tutorial, estou tomando como base o artigo [The Complete Guide to Full Stack Solana Development with React, Anchor, Rust, and Phantom](https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291). Eu não entendi muito bem algumas coisas, e outras ele deixa em aberto, então vim trazer o conteúdo em pt-br, incluindo também os problemas que tive no processo no qual ele não citou.

O tutorial foca em desenvolver o projeto, testar e a integração do front-end para construir tipos de aplicativos - CRUD.

Também a enviar tokens para as contas de desenvolvimento com o SOlana CLI, implementar tais aplicativos localmente ou rede de teste.

### Introdução

#### Solana CLI