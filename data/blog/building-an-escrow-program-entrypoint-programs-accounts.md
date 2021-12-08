---
title: Building the escrow program - entrypoint.rs, programs e accounts
date: '12-08-2021'
tags: ['code', 'learn', 'solana', 'blockchain', 'escrow', 'entrypoint', 'programs', 'accounts']
draft: false
summary: How to build an escrow program with Solana
images: https://i.imgur.com/uIgXIh9.png
---

> Estou escrevendo o tutorial em blog posts separados, e quando eu escrever a contiuação desse, irei linkar no final do artigo

### Setting up the project

Vá até o [template repo](https://github.com/mvines/solana-bpf-program-template) e clique em `use this template`. E você também vai precisar de algumas dependências como [Rust](https://www.rust-lang.org/tools/install) e [Solana](https://docs.solana.com/cli/install-solana-cli-tools), mas se você já seguiu o tutorial [Full stack com Solana](https://vitorsalmeida.com/blog/fullstack-development-solana) que escrevi você já tem tudo que é necessário.

Agora, remova o código de teste do template pois isso é um assunto que deve ser tratado separadamente.

Vá até `lib.rs`, remova:

```rust

#[cfg(test)]
mod test {
    use {
        super::*,
        assert_matches::*,
        solana_program::instruction::{AccountMeta, Instruction},
        solana_program_test::*,
        solana_sdk::{signature::Signer, transaction::Transaction},
    };

    #[tokio::test]
    async fn test_transaction() {
        let program_id = Pubkey::new_unique();

        let (mut banks_client, payer, recent_blockhash) = ProgramTest::new(
            "bpf_program_template",
            program_id,
            processor!(process_instruction),
        )
        .start()
        .await;

        let mut transaction = Transaction::new_with_payer(
            &[Instruction {
                program_id,
                accounts: vec![AccountMeta::new(payer.pubkey(), false)],
                data: vec![1, 2, 3],
            }],
            Some(&payer.pubkey()),
        );
        transaction.sign(&[&payer], recent_blockhash);

        assert_matches!(banks_client.process_transaction(transaction).await, Ok(()));
    }
}
```

Também remova a pasta `test`. Remova também as dependências do `Cargo.toml` de dev. E ele deve ficar dessa forma:

```json
[package]
name = "bpf-program-template"
version = "0.1.0"
edition = "2018"
license = "WTFPL"
publish = false

[dependencies]
solana-program = "=1.8.1"

[features]
test-bpf = []

[lib]
crate-type = ["cdylib", "lib"]
```

### entrypoint.rs, programs e accounts

Vá até o arquivo `lib.rs` e olhe as [`crates`](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html) necessárias, que são apresentadas com `use`. Depois disso, usamos o [macro](https://doc.rust-lang.org/stable/book/ch19-06-macros.html) `entrypoint!` para declarar a função `process_instruction` do [`entrypoint`](https://docs.solana.com/developing/on-chain-programs/developing-rust#program-entrypoint) para o programa. Entrypoints é a única forma de chamar um program.

Quando chamado, um programa é passado para o seu [BPF Loader](https://docs.solana.com/developing/on-chain-programs/overview#loaders) que processa a chamada. BPF Loaders diferentes podem exigir pontos de entrada diferentes.

Existem vários BPF Loaders pois ele mesmo é um programa. Se forem feitas atualizações no programa, uma nova versão do programa deve ser implementada.

O nosso carregador BPF requer a função entrypoint para receber 3 argumentos. `program_id` que é o id do programa em execução no momento. `instruction_data` são dados passados para o programa pelo caller, podem ser qualquer coisa. `accounts` é algo mais deep, teria que ver [solana programming model](https://docs.solana.com/developing/programming-model/overview). A razão que precisamos de conta é por que **Solana programs são stateless.**

Se você quer armazenar o estado, use [contas](https://docs.solana.com/developing/programming-model/accounts). Tudo é conta em Solana. Cada conta pode conter dados e [SOL](https://docs.solana.com/terminology#sol). Cada conta ambém possui um owner e somente o dono pode devitar a conta e ajustar os dados. Exemplo de uma [conta](https://explorer.solana.com/address/6TkKqq15wXjqEjNg9zqTKADwuVATR9dW3rkNnsYme1ea).

Ou seja, **as contas só podem pertercer a programs**.

Programas tem total autonomia sobre as contas que pussuem. Cabe ao criador de tal programa limitar essa autonomia, e aos usuários do programa verificar se o criador realmene o fez.

Todas as contas a serem lidas ou gravads devem ser passadas para a função de entrada.

Agora, crie um `entrypoint.rs` ao lado de `lib.rs` e mova o código `lib.rs` para lá. E então, registre o módulo entrypoint dentro de `lib.rs`. Você terá que fazer isso para todos os arquivos que criarmos.
