---
title: Thinking about functions
pubDate: 2023-10-10
tags:
  - math
---

## What is a function?
A function is a relation between a set of allowed inputs and outputs. The function itself defines this relationship.

Suppose an input set contains `1, 2, 3, 4`, and an output set contains `A, B`.

<img src="/thinking-about-functions/relation-ship.png" width="400px" />

We have a clear relationship between `1, 2` to `A`, and `3, 4` to `B`. The relation is defined by:

<img src="/thinking-about-functions/function-body.png" />

We say that a function is ***pure*** when:
- Deterministic: it always returns the same output given the same input.
- Scope: do not have side effects.

Remember that input and output are sets, so returning the same output here means returning the same set, not the same value. For this reason, it's safe to say that the function of our example is pure because, given any number bigger than 3, it will always return `B` (true, in this case).

## Lambda calculus (λ-calculus)
Lambda calculus is proposed to formalize the process of computing something. In this way, we can determine which problems, or classes of problems, can be solved.

Lambda has a structure of terms that we can separate into three parts:
- Variable
- Abstraction (or Function)
- Expression (or Application)

_Variables_ are the simplest term and can be represented by a single letter, like `x`, `y', `z`, etc.

_Abstraction_, like λx.t. `x` is the variable, and `t` is the function's body. The body can be any term, including another abstraction.

_Expression_, like 't s` is applying the function `t` to the argument(input) `s`: `t(s)`.

<img src="/thinking-about-functions/lambda.png" width="400px"/>

## β-reduction (beta-reduction)
To understand beta-reduction, you can think about what you did when solving some math problem, such as f(x) = 2x + 1, and you need to find the value of f(3). You replace the `x` with `3` and have the result. You are applying the function to the argument.

In this process, you substitute the variable `x` for all instances of `3` in the function's body. It is what beta-reduction does.

λx.t s -> t[x := s]

Where `t[x := s]` means that we replace all instances of `x` with `s` in `t`. And we can do it for any term, including another abstraction. For example:

(λx.x)(λy.y) -> (λy.y)[x := (λy.y)] -> λy.y

Let's take a look at another example from Haskell Programming from First Principles:

(λx.x)(λy.y)z

We can rewrite it as:
((λx.x)(λy.y))z -> [x := (λy.y)] -> (λy.y)z -> [y := z] -> z