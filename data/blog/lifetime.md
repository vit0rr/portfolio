---
title: Lifetime - Rust
date: '12-07-2021'
tags: ['code', 'learn', 'rust', 'compiler']
draft: false
summary: O que é e como funciona lifetime em Rust?
images: https://i.imgur.com/MuQSmKC.png
---

<h2>[pt-br](/blog/lifetimePtBr) | en</h2>

### Introduction

Rust doesn't have a Garbage Collector (GC), and you need to clear the memory somehow, but how about without Garbage Collector (GC)? The answer is lifetime.

Let's start with a simple example:

```rust

struct Config {
    ...
}

struct App {
    config: &Config
}

```

If you run this code, it returns the following error:

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

The compiler complains about a lifetime, and that it needs to be named, and also tells us exactly what the code should look like to solve the problem.

The example he gives is as follows:

```rust
struct App<'a> {
    config: &'a Config
}
```

And that way the code will compile without any problems.
Directly, in this code, we are saying that `config`, which is of type `&Config` has the same lifetime as `App`. This is declared in `<'a>`. `<>` is where lifetime was declared. And that 'a' could be any other name.

### Reference security

Example:

```rust
fn greeting() {
    let s = "Tenha um bom dia".to_string();
    println!("{}", s); // `s` is dropped here
}
```

Here, the variable `s` is defined inside the `greeting()` function and as soon as the function ends, `s` will have done its decent work and will die. That way, Rust will clear the memory. Hence, it only lives while the function is executed.

Let's go to another example:

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

In this code, there is a variable `r`, which receives an `x` reference in the next block. After that, we print the value `r`.

And we see the following error:

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

And ok, we are printing an `r` value which contains reference to `x`, but `x` no longer exists in memory at this point in the program.

To make the code run, we have to move `x` so that its lifetime includes the `r`.

```rust
fn main() {
  let x = 1;
  {
      let r = &x;
      println!("{}", r)
  }
}
```

#### References

- [Lifetime syntax](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)

- [Lifetime](https://doc.rust-lang.org/rust-by-example/scope/lifetime.html)

- [Understanding lifetimes in rust](https://blog.logrocket.com/understanding-lifetimes-in-rust/)
