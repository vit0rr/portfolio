---
title: Proving natural numbers are infinity in Coq
pubDate: 2023-08-13
tags:
  - code
  - math
---

## Introduction

A interesting fact about math, is that you can demonstrate things. It I mean that you can prove that something is true. And sadly, at school, some interesting concepts are not demonstrated, and you have to believe that they are true. And today I will demonstrate that the set of natural numbers is infinite with Coq.

## What is Coq?

Coq is a software that allows you to write proofs. it is a proof assistant, based on the calculus of inductive constructions. It is a functional programming language, and it is based on the lambda calculus. I don't will talk about the lambda calculus and the calculus of inductive constructions, but you can find more information about them on the wikipedia.

## The proof

A simple way to prove that natural numbers are infinite, is defining that given a natural number (`n: nat`), `n + 1` will return a natural numbers greater than `n`.

So, lets to define our theorem in Coq:

```coq
Theorem plus_1_natural : forall n : nat, 1 + n = S n /\ S n > n.
```

The `forall` keyword means that the theorem is valid for all natural numbers. The `/\` means that the theorem is a conjunction, and the `S` is the successor function. So, the theorem says that given a natural number `n`, `1 + n` is equal to `S n` and `S n` is greater than `n`.

Lets to prove the theorem:

```rust
Proof.
  intros n.
  split.
  - reflexivity.
  - apply le_n_S. apply le_n.
Qed.
```

`intros n` introduces the universal quantifier `forall` and the arbitrary natural number `n` as a variable. The `split.` splits the objective in two subgoals. One for each conjunct `/\`. The hyphen is just to refer to the subgoal. The `reflexivity.` proves that `1 + n = S n`. 

The `apply le_n_S.` means `le_n_S : forall n m : nat, n <= m -> S n <= S m`, and `le_n` that `le_n : forall n : nat, n <= n`. So, to read the `apply le_n_S. apply le_n.` is: "Given a natural number `n`, if `n <= n`, then `S n <= S n`". And this is true, because `n <= n` is true, and `S n <= S n` is true too. So, the theorem is proved. `Qed.` means that the proof is finished. 


## Conclusion

You can also show the output of the proof and run the proof. So, lets do it.

You can use `Print` to show the definition of some theorem, and `Eval compute in` to run the proof. In the end, our proof will be:

```rust
Theorem plus_1_natural : forall n : nat, 1 + n = S n /\ S n > n.
Proof.
  intros n.
  split.
  - reflexivity.
  - apply le_n_S. apply le_n.
Qed.
Print plus_1_natural.
Eval compute in (plus_1_natural 1).
```

And the output will be:

```rust
plus_1_natural = fun n : nat => conj eq_refl (le_n_S n n (le_n n))
: forall n : nat, 1 + n = S n /\ S n > n
```

```rust
= plus_1_natural 1
: 1 + 1 = 2 /\ 2 > 1
```

