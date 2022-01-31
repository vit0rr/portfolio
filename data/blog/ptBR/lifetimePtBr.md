---
title: Lifetime de Rust
date: '12-07-2021'
tags: ['code', 'learn', 'rust', 'compiler']
draft: true
summary: O que é e como funciona lifetime em Rust?
images: https://i.imgur.com/MuQSmKC.png
---

<h2>pt-br | [en](/blog/en/lifetime)</h2>

### Introdução

Rust não tem um Garbage Colector (GC), e você precisa limpar a memória de alguma forma, mas como sem Garbage Colector (GC)? A resposta é lifetime.

Vamos começar com um simples exemplo:

```rust

struct Config {
    ...
}

struct App {
    config: &Config
}

```

Se rodar esse código, ele retorna o seguinte erro:

```bash
error[E0106]: missing lifetime specifier
 --> src/lib.rs:6:13
  |
6 |     config: &Config
  |             ^ expected named lifetime parameter
  |
help: consider introducing a named lifetime parameter
  |
5 ~ struct App<'a> {
6 ~     config: &'a Config
  |
```

O compilador reclama de um lifetime, e que ele precisa ser nomeado, e também nos diz exatamente como deve ficar o código para solucionar o problema.

O exemplo que ele da, é o seguinte:

```rust
struct App<'a> {
    config: &'a Config
}
```

E dessa forma, o código será compilado sem problemas.
De forma direta, nesse código, estamos dizendo que `config`, que é do tipo `&Config` tem o mesmo tempo de vida que `App`. Isso é declarado em `<'a>`. `<>` é onde foi declarado o lifetime. E esse 'a' poderia ser qualquer outro nome.

### Segurança de referência

Exemplo:

```rust
fn greeting() {
    let s = "Tenha um bom dia".to_string();
    println!("{}", s); // `s` is dropped here
}
```

Aqui, a variável `s` é definida dentro da função `greeting()` e assim que a função encerrar, `s` terá cumprido seu dígno trabalho e morrerá. Dessa forma, Rust vai limpar a memória. Logo, `s` so vive enquanto a função é executada.

Vamos para outro exemplo:

```rust
fn main() {
    let r;
    {
        let x = 1;
        r = &x;
    }
    println!("{}", r)
}
```

Nesse código, existe uma varíavel `r`, que recebe uma referência `x` no bloco seguinte. Depois disso, imprimimos o valor `r`.

E vemos o seguinte erro:

```shell
error[E0597]: `x` does not live long enough
 --> src/main.rs:5:13
  |
5 |         r = &x;
  |             ^^ borrowed value does not live long enough
6 |     }
  |     - `x` dropped here while still borrowed
7 |     println!("{}", r)
  |                    - borrow later used here
```

E ok, estamos imprimindo um valor `r` do qual contém referência a `x`, mas `x` não existe mais na memória nesse ponto do programa.

Para fazer o código rodar, temos que mover `x` de forma que seu tempo de vida inclua o `r`.

```rust
fn main() {
  let x = 1;
  {
      let r = &x;
      println!("{}", r)
  }
}
```

#### Referências

- [Lifetime syntax](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

- [Lifetime](https://doc.rust-lang.org/rust-by-example/scope/lifetime.html)

- [Understanding lifetimes in rust](https://blog.logrocket.com/understanding-lifetimes-in-rust/)
