---
title:  Pure functional programming and shared mutable state
date:   2021-01-23
tags:   tech
---

This is the second part of a four-part series:

- [Part 1: What is functional programming?](/blog/2021/01/23/functional-programming.html)
- Part 2: Pure functional programming and shared mutable state
- [Part 3: Pure functional programming in JavaScript](/blog/2021/01/23/pure-functional-programming-in-javascript.html)
- [Part 4: Composable abstractions in practice](/blog/2021/09/11/composable-abstractions.html)

---

In the previous post, I talked about four key concepts of functional programming.
Pure (or purely) functional programming adds a fifth one:

5. Use pure functions wherever possible. And where interaction with shared mutable state is necessary, make it explicit.

(In fact, in a purely functional programming language, there are only pure functions.)

A **pure function** has both of the following properties:

1. Its return value is the same for the same arguments\
   (no reading of shared mutable state)
2. Its evaluation has no side effects\
   (no writing to shared mutable state)

Thus a pure function behaves like a mathematical function. This means you can replace the function call with its result without changing the behaviour of your program (this property is called [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency)).

A function has a **side effect** if it modifies some state outside its local environment – i.e. calling the function has an observable effect (to the caller) besides returning a value.

**Shared mutable state** is a bit of a mouthful, so let’s break it down:

- _state_ is some data that is persisted over time. (A stateful system remembers previous events or user interactions.)
- state is _mutable_ if it can be modified.
- state is _shared_ if multiple parties can access it concurrently. (e.g. multiple programs accessing the same file, or multiple parts of a program accessing the same memory location)

It should be clear now that the notions of “pure/impure functions”, “side effects” and “shared mutable state” are three aspects of the same concept.


### The root of all evil

Shared mutable state is believed by many to be the “root of all evil”, or at least the cause of most of the accidental complexity in our code. And “Complexity is *the* root cause of the vast majority of problems with software today.” (from [Out of the Tar Pit](http://curtclifton.net/papers/MoseleyMarks06a.pdf))

Shared mutable state makes code unpredictable, hard to reason about and hard to test. It’s bad for the same reason global variables are bad. Data should be kept as local as possible and side effects should be avoided.

Finally, if you add [concurrency](https://en.wikipedia.org/wiki/Concurrent_computing) to a program making use of shared mutable state, you easily get [race conditions](https://en.wikipedia.org/wiki/Race_condition).


### Two kinds of shared mutable state

Shared mutable state can be divided into two categories, depending on where it is persisted:

1. the world outside the program
2. the program’s own memory

Interacting with the outside world is generally called I/O (input/output) and includes writing to (or reading from) a file, a database, a network, etc. Most programmers are on some level aware that these things represent a form of external state (which is obviously shared and mutable), and the danger this entails. (For example cache invalidation is arguably just a special case of mutating shared state.)

Relatively few programmers on the other hand appreciate the danger of different parts of your own program being able to modify the same memory location. Hearing it phrased like this, many will say that in most programming languages at least we don’t have pointers any more, and cannot access arbitrary memory locations by address like you can in C. But having references to shared memory locations (and being able to write to them), is only a slight improvement.

Since any real program eventually needs to interact with the outside world, I/O cannot be avoided completely. But we can try to write as much as possible of our program in pure functions (especially the tricky parts like business logic that need to be tested and reasoned about), and clearly separate those from the parts of the program that does the necessary I/O.

The following mitigation techniques exist to the two problems:

1. code that does any kind of I/O is explicitly marked as such. (Using an IO monad or other effect system. This is somewhat similar to how the `async` keyword works in JavaScript.)

2. concurrent mutation of shared memory is prevented by either:

    1. using immutable data structures
	  2. having mutable data structures that are not shared

    In purely functional programming, immutable data structures are used almost exclusively. The Rust programming language’s “borrow checker” is a notable implementation of option 2.

---

Continue reading [the last part in this blog series](/blog/2021/01/23/pure-functional-programming-in-javascript.html).
