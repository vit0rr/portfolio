---
title: Desenvolvimento full stack Solana com React, Anchor, Rust, e Phantom
date: '11-18-2021'
tags: ['javascript', 'code', 'learn','full stack', 'solana', 'react', 'anchor', 'rust', 'phantom']
draft: false
summary: Guia completo com desenvolvimento full stack, minha introdução com crypto e web3.
---

### Solana e Phantom
Solana é uma blockchain de escala web, suporta smart contracts e criação de apps decentralizados. Enquanto isso, Phantom é uma carteira digital, ele auxilia nas transações da Solana.

Também é útil a informação de que você não precisa de conhecimentos prévios muito avançados para desenvolver com Solana. De forma geral as coisas são bem documentadas e provavelmente não terá problemas grandes com esse tutorial. Para mim, foi a porta de entrada e os desafios não foram impossíveis, aprendi e interagi bastante, então vale bastante a pena.

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

Para buildar, rode:

```shell
anchor init mysolanaapp --javascript

cd mysolanaapp
```

**app** - pasta do frontend
**programs** - onde roda o código Rust para o Solana
**test** - onde roda o test do javascript
**migrations** - Script de deploy

Anchor usa e permite a gente escrever, um [eDSL](https://en.wikipedia.org/wiki/Domain-specific_language#:~:text=embedded%20domain%2Dspecific%20language%20(eDSL,methods%2C%20macros%20etc.).) que abstrai muitas formas mais complexas de tarefas low level que normalmente precisa ser feito se você estiver usando Solana e Rust.

```rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mysolanaapp {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```

A única coisa que ocorre nesse programa, foi a definição da função `initialize`, e quando chamada ela apenas sai do programa como Sucesso. Não há manipulação de dados.

Para compilar o programa, rode:
```shell
anchor build
```

quando o build tiver completo, vai ter gerado uma pasta chamada `target`.
Tambem podemos ver nosso teste do frontend em tests/mysolanaapp.js, e ele deve ser assim:

```javascript
const anchor = require('@project-serum/anchor');

describe('mysolanaapp', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.Mysolanaapp;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});

```

Para rodar Solana usando Anchor, precisa de duas coisas:

1. Provider - é uma abstração de uma conexão à rede Solana, normalmente uma [Connection](https://solana-labs.github.io/solana-web3.js/classes/Connection.html), Wallet e [preflight commitment](https://solana-labs.github.io/solana-web3.js/modules.html#Commitment)

No nosso programa, ele vai rodar e criar Provider baseado ambiente `anchor.Provider.env()`, mas no client precisa você mesmo contruir o Provider usando a Solana wallet

2. program - é uma abstração que comina o Provider, idl e o programID, e nos permite chamar métodos RPC no programa.

Quando tivermos essas duas coisas, podemos chamar funções no nosso programa. Exemplo: no nosso programa, temos um `initialize`, podemos invocar diretamente a função da seguinte forma:
```javascript
const tx = await program.rpc.functionName();
```

Agora para testar, rode:
```shell
anchor test
```

### Construindo o Hello World

Vamos fazer um CRUD.
O programa permitirá criar um contador que aumenta cada vez que o chamamos de um client.

abra `programs/mysolanaapp/src/lib.rs` e atualize tudo para o seguinte código:

```rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod mysolanaapp {
    use super::*;

    pub fn create(ctx: Context<Create>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;
        Ok(())
    }
}

// Transaction instructions
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

// Transaction instructions
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// An account that goes inside a transaction instruction
#[account]
pub struct BaseAccount {
    pub count: u64,
}
```

Agora, rode:
```shell
anchor build
```

Agora, vamos para o teste do contador. Cole o código no js de teste

```javascript
const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("mysolanaapp", () => {
  /* create and set a Provider */
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp;
  it("Creates a counter)", async () => {
    /* Call the create function via RPC */
    const baseAccount = anchor.web3.Keypair.generate();
    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    /* Fetch the account and check the value of count */
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 0: ', account.count.toString())
    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;

  });

  it("Increments the counter", async () => {
    const baseAccount = _baseAccount;

    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 1: ', account.count.toString())
    assert.ok(account.count.toString() == 1);
  });
});
```

Agora, precisamos do address para continuar. Para isso, rode o seguinte comando:
```shell
solana address -k target/deploy/mysolanaapp-keypair.json
```

O `output` disso, cole em:
```rust
// mysolanaapp/src/lib.rs

declare_id!("program-id")
```

E em Anchor.toml, no diretório raiz:
```rust
[programs.localnet]
mysolanaapp = "your-program-id"
```

Agora, rode:
```shell
anchor test
```

Agora, tenha certeza que `solana-test-validator` esteja rodando e rode:
```shell
anchor deploy
```

Nessa parte, se tudo certo ok. No meu caso, tive um erro mas a solução é simples. Ele não conseguia recuperar o program-id automaticamente, então eu tive que especificar isso durante o `anchor deploy`.

Como eu não sabia disso antes, eu rodei o deploy todo via solana, usando [esse](https://docs.solana.com/cli/deploy-a-program) tutorial. Recomendo que faça o mesmo para entender o motivo das coisas, o funcionamento dos diretórios etc. Caso faça isso, te adianto que o arquivo com .so está em `target` e `deploy`. 

Após ter rodado o `solana program deploy target/deploy/mysolanaapp.so`, peguei o output e rodei como `anchor deploy --program-name <address>` e deu certo. O output foi o seguinte:
```shell
Deploying workspace: http://localhost:8899
Upgrade authority: /home/vitor/.config/solana/id.json
Deploy success
```

### Building React App

...