---
title: Composable Abstractions in Practice
date: 2021-09-11
tags: tech
---

This is the final part of a four-part series:

- [Part 1: What is functional programming?](/blog/2021/01/23/functional-programming.html)
- [Part 2: Pure functional programming and shared mutable state](/blog/2021/01/23/pure-functional-programming-and-shared-mutable-state.html)
- [Part 3: Pure functional programming in JavaScript](/blog/2021/01/23/pure-functional-programming-in-javascript.html)
- Part 4: Composable abstractions in practice

---

All programming can be seen as coming up with [abstractions](https://medium.com/javascript-scene/abstraction-composition-cb2849d5bdd6) and using them to build even higher abstractions.

This pyramid of abstractions can be seen on the system level (hardware > operating system > application), but also in the evolution of programming languages themselves. I've picked four representative languages, each one at a higher level of abstraction than the previous one:

- x86 assembly: consistent interface to different CPUs with different microarchitectures
- C: eliminating manual register management and introducing loops in favour of jump/goto
- Java: garbage collector instead of manual memory management and eliminating goto completely
- Haskell: immutable data structures instead of stateful memory and map/recursion instead of loops

Functional programming offers the insight that simple functions are great abstractions.


## What is abstraction

The process of abstraction is removing things (e.g. concrete implementations), so only the essential idea remains (exposed). The result of this process is also called an abstraction.

A good abstraction hides complexity behind a simple interface.

Sure, at some point every programming abstraction breaks down and the underlying implementation's characteristics [leak through](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/). But if it's a good abstraction for what you're trying to do, this happens relatively rarely. And while it doesn't, the programmer's mind only must keep the simple interface in his or her head – e.g. when calling a pure function, you usually only need to care about its interface, not its implementation.

If done right, the underlying abstractions don't (need to) change as often, so they can be carefully built and tested once. Higher-level code, which implements more specific things (e.g. business requirements), can then be easily changed more frequently.


## Good abstractions compose well

Programming consists of decomposing your problem recursively into smaller and smaller sub-problems. As your experience as a programmer (or your projects's scope) grows, you'll see similar solutions pop up again and again to only slightly different problems. You can then tease out what these solutions have in common, extract that, and hide it behind a more general abstarction. By giving the abstraction a name, it can be reused again and again.

It’s true that the more general an abstraction is, the more widely it can be reused. But the most general abstraction is no good if it isn't simple to use for a specific use-case. (It's easy to create a very general function by just having it take lots of arguments, but that's hardly hiding complexity behind a simple interface.) If a function hides a lot of complexity behind a simple interface, it does it’s job – even if it’s only used in one other place in the codebase. Yet too often, programmers try to come up with abstractions that are too general, and end up with something that’s not composable and not simple to use.

Good abstractions compose well – like Lego bricks. Or like adding two integers alwyas yields an integer again (unlike pesky division).

In order to facilitate building your solution up from sub-solutions, good abstractions expose consistent and composable interfaces – meaning that the abstractions that live at the same level in your sytem, should be easily composable to build the next higher level. Think of how neatly Lego bricks always fit together to build bigger structures. The crazy thing in programming is that you can build shipping containers using Legos – and then you can continue to do the same thing at the next level and stack whole shipping containers to build a house.


## Functional thinking in practice

As explained very well in [Eric Normand’s Grokking Simplicity](https://www.manning.com/books/grokking-simplicity), functional programmers divide all code in:

  1. data
  2. calculations (pure functions)
  3. actions (impure functions)

Data can be composed very easily (e.g. numbers can be added, strings and arrays can be concatenated, and maps can be merged). Pure functions are harder to compose than simple data, but not as hard as impure functions. Impure functions are more general than pure functions, but because you always have to worry about side-effects and order of execution, they are less composable.

That’s why functional programmers prefer data over pure functions, and they prefer pure functions over impure functions.


## Composable abstractions in practice

If I had to come up with a list of the most important abstractions that functional programmers use in practice, it would be this list of simple yet extremely powerful abstractions:

- Data is modelled with [algebraic data types](https://funprogramming.substack.com/p/algebraic-data-types) (Ideally, the programming language supports pattern matching on those data types, meaning that the code branches (think `if/else` or `switch`) depending on the shape of the data that’s matched on.)
- Calculations are modelled using pure functions and actions are modelled using impure functions. If the behaviour of a function needs to be more configurable, often the best way to do so is to have it take another function as an argument. It’s then a [higher-order function](https://eloquentjavascript.net/05_higher_order.html). (For this to work, functions need to be first-class citizens in your programming language.)
- A programming language’s syntax is an abstraction over assembly. Unfortunately, a lot of current programming languages have both expressions _and_ statements. While expressions can be endlessly nested, combined and composed to form bigger expressions, statements can only be combined sequentially using the semicolon. That’s why functional programmers favour expressions over statements.
- Generics are used to make both data (`Array<T>`) and functions  (`identity: (a: T) => T`) polymorphic, providing an easy way to generalize a given abstraction if it works the same for different types anyway.
- Mathematical algebraic structures are a powerful way of thinking about, and generalizing over, a diverse set of structures we encounter routinely in programming. One of the most ubiquitous ones are [monoids](https://marmelab.com/blog/2018/04/18/functional-programming-2-monoid.html).
