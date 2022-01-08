---
title: Building the escrow program - entrypoint.rs, programs e accounts
date: '12-08-2021'
tags: ['code', 'learn', 'solana', 'blockchain', 'escrow', 'entrypoint', 'programs', 'accounts']
draft: true
summary: How to build an escrow program with Solana
images: https://i.imgur.com/uIgXIh9.png
---

<h2>[pt-br](/blog/building-an-escrow-program-entrypoint-programs-accountsPtBr) | en</h2>

> I'm writing the tutorial in separate blog posts, and when I write the continuation of this one, I'll link to it at the end of the article.

### Setting up the project

Go to the [template repo](https://github.com/mvines/solana-bpf-program-template) and click in `use this template`. And you too need some dependencies like [Rust](https://www.rust-lang.org/tools/install) and [Solana](https://docs.solana.com/cli/install-solana-cli-tools)

Now remove the test code from the template as this is a matter that must be dealt with separately.

Go to `lib.rs`, remove:

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

Also, remove a `test` of noodles. Also remove dev's `Cargo.toml` dependencies. And it should look like this:

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

Go to the file `lib.rs` and see [`crates`](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html) required, which are presented with `use`. After that, we use the [macro](https://doc.rust-lang.org/stable/book/ch19-06-macros.html) `entrypoint!`
to declare the function `process_instruction` of [`entrypoint`](https://docs.solana.com/developing/on-chain-programs/developing-rust#program-entrypoint) for the program. Entrypoints is the only way to call a program.

When called, a program is passed to your [BPF Loader](https://docs.solana.com/developing/on-chain-programs/overview#loaders) which processes the call. Different BPF Loaders may require different entry points.

There are several BPF Loaders as it is a program. If updates are made to the program, a new version of the program must be implemented.

Our BPF loader requires the entrypoint function to take 3 arguments. `program_id` which is the id of the currently running program. `instruction_data` is data passed to the program by the caller, it can be anything. `accounts` is something deeper,
would have to see [solana programming model](https://docs.solana.com/developing/programming-model/overview). The reason we need an account is because **Solana programs are stateless.**

If you want to store the state, use [accounts](https://docs.solana.com/developing/programming-model/accounts). Everything is accounted for in Solana. Each account can contain data and [SOL](https://docs.solana.com/terminology#sol). Each account also has an owner and only the owner can delete the account and adjust the data. example of a [account](https://explorer.solana.com/address/6TkKqq15wXjqEjNg9zqTKADwuVATR9dW3rkNnsYme1ea).

That is, **accounts can only belong to programs**.

Programs have full autonomy over the accounts they have. It is up to the creator of such a program to limit this autonomy, and to the users of the program to verify whether the creator really did it.

All accounts to be read or written must be passed to the input function.

Now, create an `entrypoint.rs` next to `lib.rs` and move the code `lib.rs` there. And then register the entrypoint module inside `lib.rs`. You will have to do this for every file we create.
