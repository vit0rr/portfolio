---
title: How works JSON.parse()
date: '09-13-2021'
tags: ['javascript', 'code']
draft: false
summary: Understanding JSON.parse() and why JSON.parse("false") is false and Boolean("false") is true
---

<h2>[pt-br](/blog/jsonParsePtBr) | en</h2>

### JSON

JSON is defined recursively (recursive function calls itself until it finds something that stops). All `Boolean`, `String`, `Number`, `Array` (with valid JSONs), objects whose keys are strings and whose values ​​are valid JSONs and `Null` are valid JSONs.

### .parse()

Initially, it is important to understand what the parse of the function would be. In JavaScript, it interprets a `String`, causing its contents to be read correctly by the computer.
For this reason, the syntax for transforming the String `"2"` into Number, is `parseInt()`.

### O que é JSON.parse()

The `JSON.parse()` method is used when you want to parse a JSON String, and interpret it as a value/object in JavaScript. This implies a doubt about the functioning of other functions in JavaScript, such as `Boolean()`. `JSON.parse()` gets the string representation of a valid JSON.

Example:

```javascript
console.log(typeof JSON.parse('true')) // boolean
console.log(typeof JSON.parse('false')) // boolean
console.log(typeof JSON.parse('20')) // number

console.log(Boolean('false')) // true
```

As said, `JSON.parse()` can transform the `String` JSON into a value/object in JavaScript, which is completely different from conversions like `Boolean()`.

### If JSON.parse("false") is false, why Boolean("false") is true?

Exactly because `Boolean()` is not treating a JSON String for value/object in JavaScript, but validating between `false` or `true` JavaScript conditions. This means that for something to be `false`, it needs to be: `0`, `-0`, `false`, `NaN`, `undefined` or `null`, everything else like values, objects, array empty and a non-empty `String` is `true`, regardless of what content is in it.

Understanding these concepts helps in the use of JavaScript, with a better understanding of how the language works, consequently making you a better programmer, avoiding unnecessary discussions on social networks.

##### Thanks:

- [coproduto](https://twitter.com/coproduto)
