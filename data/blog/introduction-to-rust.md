---
title: Introduction to Rust
date: '01-08-2022'
tags: ['rust', 'learn', 'code']
draft: true
summary: Introduction to Rust with basic concepts
images: https://i.imgur.com/Qpzr40o.png
---

### Basic Data types in Rust

We have four types in Rust.

- integers
- floating-point
- numbers
- booleans
- characters

Integers can be unsigned(`usize`) or signed(`isize`).

`Usigned` -> is for values that can't be negative. Ensure positive values OR if you don't need negative integers. Like memory address

`Signed` -> is for values that can be negative. Like offsets to addresses.
Examples of integers:

8-bit -> i8 -> u8\
16-bit -> i16 -> u16\
32-bit -> i32 -> u32\
64-bit -> i64 -> u64\
128-bit -> i128 -> i128

We too have `f32` and `f64` for floating-poing numbers. `bool` for booleans, `char` for characters and we have two types for strings: `str` and `String`.

### What's the diference beetwen `String` and `str`

`str` is static strings. You cannot change. Exemple:

```rust
let hello = "Hello, world"
// Is the same than:
let hello: &'static str = "Hello, world"
```

`String` is a vector. With vector you can change and not static

```rust
pub struct String {
    vec: Vec<u8>
}
```

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); // error!

    println!("the first word is: {}", word);
}
```

#### References:

- [Primitive Type str](https://doc.rust-lang.org/std/primitive.str.html)
- [Struct Vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
- [Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html)
- [Offset](<https://en.wikipedia.org/wiki/Offset_(computer_science)>)
