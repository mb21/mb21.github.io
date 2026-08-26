---
title:  Pure functional programming in JavaScript
date:   2021-01-23
tags:   tech
---

This is the third part of a four-part series:

- [Part 1: What is functional programming?](/blog/2021/01/23/functional-programming.html)
- [Part 2: Pure functional programming and shared mutable state](/blog/2021/01/23/pure-functional-programming-and-shared-mutable-state.html)
- Part 3: Pure functional programming in JavaScript
- [Part 4: Composable abstractions in practice](/blog/2021/09/11/composable-abstractions.html)

---

In the first part of this blog series, we looked at the functional programmimg style with some examples given in JavaScript. In the second part, we looked at pure functional programming and why shared mutable state is the root of all evil. In this third part we look at what pure functional programming can mean in JavaScript.


### React.js

By using React.js’s state handling functionality (`useState`, `useReducer`), you also mostly avoid shared mutable state. Every mutation of state is only applied on the next re-render, so for the duration of the current rendering cycle, there is no mutation of shared state. If you need side effects (to modify state outside React), you use `useEffect`.


### Do pure functions exist in JavaScript?

[Arguably](https://hackernoon.com/do-pure-functions-exist-in-javascript-b128ed5f0ed2), in JavaScript there are no pure functions, since basic building blocks of the language can be tampered with between function calls. For example the `Array.map` prototype can be polluted, making any function that uses `.map` return something else than it did before the tampering.

But as long as you have an agreement among all programmers working on the code to not do such crazy things, the notion of a pure function is still useful in JavaScript.

### Mutable reference arguments

Previously, we said that “a pure function’s return value is the same for the same arguments”. But we didn’t specify a definition of “same”.

Object reference equality seems a bad definition (since e.g. `[] === []` is `false`), but using something like [lodash’s `_.isEqual`](https://lodash.com/docs/4.17.15#isEqual) seems to be useful in practice (even if [not perfect](https://stackoverflow.com/questions/65872468/is-this-javascript-function-taking-a-mutable-reference-argument-a-pure-functio)). Now, in most programming languages it makes perfect sense that if a function takes a mutable references as an argument, it cannot be pure, since another thread might modify the data structure while our function is running. In JavaScript’s single-threaded environment however, as long as your function doesn’t use any asynchronous code, this actually cannot happen.


### Immutability in practice

JavaScript doesn’t ship with immutable data structures, but you might think of:

- libraries like Immutable.js that [used to](https://github.com/immutable-js/immutable-js/issues/1689) enjoy some popularity, but it's not the same thing as having support built right into the language, since it adds some overhead (both syntactical and in terms of dependencies).
- you can use [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze), but you have to remember to write that everywhere you create a new object and it’s shallow (the freeze doesn’t affect nested objects).

However, you can write pure functions relatively easily by using the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to create a shallow copy of an object or array, instead of modifying the argument your function received. Modifying a deeply nested object may still be tempting, but would of course make your function impure.


### Performance

Because making lots of new objects can be expensive in JavaScript, in rare cases, you may also want to forgo purity simply due to performance reasons. (But beware of premature optimization!)

These functions still don't do any I/O and they don't access non-local variables. But they may modify the objects given to them as arguments. It is then the caller's responsibility to take those modifications into account, or to not use the references to those objects anymore – which in the absence of Rust’s borrow checker, is of course a lot easier said than done and can be the cause of bugs.
