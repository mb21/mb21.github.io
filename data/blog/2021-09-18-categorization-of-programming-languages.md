---
title: A Categorization of Programming Languages
date: 2021-09-18
tags: tech
---

There are many ways to categorize a given set of things. I find it useful to place today’s major general-purpose programming languages (and then some I added because I find them interesting) in three dimensions:

- x-axis: type system – from weak dynamic typings, progressing to strong dynamic typing (which doesn’t make that much of a difference) on the left, to compile-time checked static typings like C and Java and finally much more expressive static [typings](https://en.wikipedia.org/wiki/Type_system) like [Hindley–Milner type systems](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system) on the right.
- y-axis: degree to which a language is conductive to writing code in a functional style – from not at all (imperative paradigm) at the bottom, to multi-paradigm languages in the middle and finally  [purely functional](https://en.wikipedia.org/wiki/Purely_functional_programming) languages at the top.
- color-code: of all the languages shown, only three have no runtime-overhead due to [garbage collection](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)): C, C++ and Rust. (Swift is using [ARC](https://en.wikipedia.org/wiki/Automatic_Reference_Counting), which is not strictly speaking garbage collection, but still comes with some runtime overhead.) The others either target a common runtime system (JVM, .NET, Erlang runtime), have their language-specific runtime (JavaScript or compile-to-JavaScript, Python, Ruby, PHP), or bundle the runtime with each binary (Go, Haskell).

![](/blog/assets/2021-09-18-categorization-of-programming-languages/categorization-of-programming-languages.svg)

Of course, these are only what I find are the three major technical considerations. When picking a language for a specific project, there are also a lot of soft factors to consider, like community and ecosystem, experience of the team, etc.
