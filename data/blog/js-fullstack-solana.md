---
title: Desenvolvimento full stack Solana com React, Anchor, Rust, e Phantom
date: '11-18-2021'
tags: ['javascript', 'code', 'learn','full stack', 'solana', 'react', 'anchor', 'rust', 'phantom']
draft: false
summary: Guia completo com desenvolvimento full stack, minha introdução com crypto e web3.
---

### Overview
As ferramentas que vamos usar são:
[Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools) - Aqui tem uma polida e boa documentação da CLI para integir com a Solana network

[Anchor Framework](https://project-serum.github.io/anchor/getting-started/introduction.html) - Além de tudo, ele oferece um DSL em Rust para que você não precise saber profundamente da linguagem para iniciar.

[solana/web3.js](https://solana-labs.github.io/solana-web3.js/) - É a versão Solana de web3.js

[ReactJS](https://reactjs.org/) - Client-side framework

Nesse tutorial, estou tomando como base o artigo [The Complete Guide to Full Stack Solana Development with React, Anchor, Rust, and Phantom](https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291). Eu não entendi muito bem algumas coisas, e outras ele deixa em aberto, então vim trazer o conteúdo em pt-br, incluindo também os problemas que tive no processo no qual ele não citou.

O tutorial foca em desenvolver o projeto, testar e a integração do front-end para construir tipos de aplicativos - CRUD.

Também a enviar tokens para as contas de desenvolvimento com o SOlana CLI, implementar tais aplicativos localmente ou rede de teste.


### Pré-requisito
1. [NodeJS](https://nodejs.org/en/download/)
2. [Solana  Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools)
2. [Anchor](https://project-serum.github.io/anchor/getting-started/installation.html)
3. Solana browser wallet - para carteira, vamos usar o [https://phantom.app/](https://phantom.app/)


### Introdução

#### Solana CLI

A principal tarefa com Solana CLI é configurar nossa rede, que será entre localhost e testnet. 

Para verificar as configurações da rede atual usa-se:
```bash
solana config get

# output
Config File: /home/vitor/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com 
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /home/vitor/.config/solana/id.json 
Commitment: confirmed 
```
Caso você não tenha o `Keypair Path`, siga [essas](https://docs.solana.com/wallet-guide/paper-wallet#seed-phrase-generation) instruções

Para mudar de rede:
```shell
# config. para localhost
solana config set --url localhost

# config. para devnet
solana config set --url devnet
```

Essa é uma parte importante pois a rede precisa ser a mesma no ambiente de teste e sua carteira. O começo do tutorial será com `localhost`, e depois para `devnet`.

Para ver o endereço da carteira local atual:
```shell
solana address

# output
Error: No default signer found, run "solana-keygen new -o /home/vitor/.config/solana/id.json" to create a new one
```
Nessa etapa, caso seja sua primeira vez rodando o comando, ele vai pedir para você gerar esse arquivo (como eu disse lá em cima). E então copie o comando entre aspas e rode, não copie o meu pois tem usuário diferente. Depois disso, rode novamente o `solana address`

Agora, inicie sua rede local Solanam:
```shell
solana-test-validator
```
Daqui para frente, deixe isso rodando num terminal e faça as outras coisas em outro, ele precisa estar rodando para funcionar a rede.

Para obter todos os detalhes de uma conta:
```shell
solana account <address>
```

Agora vamos dar airdrop em alguns tokens. Para isso, precisamos ter certeza de rede que estamos então configure para `localhost`
```shell
solana config set --url localhost
```

Quando ela tiver rodando, você vai poder rodar airdrops na sua conta. Para isso, em um terminal separado - pois o servidor está rodando no outro - rode esse comando:
```shell
solana airdrop 100
```

E agora você pode checar o saldo da sua carteira com:
```shell
solana balance

# ou

solana balance <address>
```
O resultado final é semelhante a esse:
![balance](https://raw.githubusercontent.com/vit0rr/portfolio/main/data/balance.png)

Com isso, você provavelmente vai ter 100 SOL na carteira. Com isso, podemos começar a desenvolver.

### Começando o desenvolvimento