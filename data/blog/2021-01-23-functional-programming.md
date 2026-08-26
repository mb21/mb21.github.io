---
title:  What is functional programming?
date:   2021-01-23
tags:   tech
---

This is the first part of a four-part series:

- Part 1: What is functional programming?
- [Part 2: Pure functional programming and shared mutable state](/blog/2021/01/23/pure-functional-programming-and-shared-mutable-state.html)
- [Part 3: Pure functional programming in JavaScript](/blog/2021/01/23/pure-functional-programming-in-javascript.html)
- [Part 4: Composable abstractions in practice](/blog/2021/09/11/composable-abstractions.html)

---

Broadly speaking, one can contrast two different programming paradigms:

1. Imperative programming: tell the computer exactly what to do (instruction followed by instruction)
2. Declarative programming: tell the computer on an abstract/high level what to do. Includes:
    - CSS: browser’s layout engine figures out how to draw it, given the constraints specified by the programmer
    - SQL: query planner/optimizer of DB figures out the details
    - Functional programming (using reusable and composable functions and expressions results in less code, and at a higher level of abstraction. The compiler usually also does more work for the programmer.)

Functional programming is a sub-paradigm of declarative programming for general purpose (i.e. Turing-complete) programming.

There’s a continuum between imperative and functional programming, and in many languages, the programmer can choose which style to use (even if the syntax or standard library sometimes makes one style or the other easier or harder to apply). In this post I’ll use JavaScript, as such a multi-paradigm language, to give examples.

An example of imperative style:

```js
let array = [1, 2, 3];
for (i=0; i<array.length; i++) {
  array[i] = 2 * array[i];
}
let sum = 0;
for (i=0; i<array.length; i++) {
  sum = array[i] + sum;
}
```

And the same in a more functional style:

```js
const array = [1, 2, 3]
const newArray = array.map(n => 2*n)
const sum = newArray.reduce((acc, n) => acc + n, 0)
```


The next four sections paraphrase the post [Four Key Concepts](https://fsharpforfunandprofit.com/posts/key-concepts/) of functional programming and gives examples in JavaScript or TypeScript.

### 1. Functions over objects

Different object-oriented programming languages have different notions of objects, but most bundle data (fields) and functions (methods) together. Functional programming is about cleanly separating the two. Then, functions can be applied to the data, and several small functions can be composed to build larger functions.

To do functional programming, your language at least need to have functions as first-class citizens: i.e. functions can be assigned to variables[^1] and passed to other functions like any other value.

A function that takes another function as an argument is called a _higher order function_. [Chapter 5 of Eloquent JavaScript](https://eloquentjavascript.net/05_higher_order.html) gives some great examples.

[^1]: or bound to identifiers

### 2. Expressions over statements

The if statement is an example that has an analogue expression in JavaScript, the ternary operator:

```js
const abs = (x) => {
  if (x >= 0) {
    return x
  } else {
    return -x
  }
}

const abs = x =>
  x >= 0
    ? x
    : -x
```

Expressions are much more composable than statements, since they can be arbitrarily nested. Composability is a key concept in functional programming.

In the above example, using the `if` statement forces us to use a `return` statement, which in turn forces us to add braces around the function body.

### 3. Algebraic data types

That’s a fancy word for a simple but powerful concept.

An algebraic data type is defined by composing existing types in one of two ways. The resulting type is either:

1. a product type (something like a tuple)
2. a sum type (a.k.a. _tagged union_, or for simple cases an enum)

An example in TypeScript:

```ts
type Color = 'red' | 'blue' | 'green'
type DarkColor = 'darkred' | 'darkblue'

type Widget = { color: Color; hidden: boolean; }
// The type boolean can represent 2 different values (true and false).
// Widget is a product type (the product of the types Color and boolean).
// It can represent 3 * 2 = 6 different values.

type MyColor = Color | DarkColor
// MyColor is a sum type.
// It can represent 3 + 2 = 5 different values

type WidgetOrUndefined = Widget | undefined
// can represent 6 + 1 = 7 different values
```


### 4. Pattern matching

Algebraic data types really shine when your language supports pattern matching.

In TypeScript, pattern matching can be simulated with the `switch` statement:

```ts
type Square = {
  kind: "square";
  size: number;
}
type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
}
type Circle = {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

const area = (s: Shape): number => {
  switch (s.kind) {
    case "square":    return s.size * s.size
    case "rectangle": return s.height * s.width
    case "circle":    return Math.PI * s.radius**2
  }
}
```

[Playground of above code](https://www.typescriptlang.org/play?#code/C4TwDgpgBAygjgVwIYCdoF4oG8BQUoDWAlgHYAmAXFAEQDOiqE1A3HlLUQF4RUkIC2AIwgpWAXxyhIUAEoQAxsCQkA5gBsM2NsXJVqaRcvVNW+AO5EywABa8Bw0W2sQiK68DtCR4yeGgBhIhR5DShMXHwdShp5IJCTNhQkMiIEWk8HH19pGGskaUx4ZDQoAB9ZBSVVUPLA4I1WHHkAexJaYChGJDCoAAp02DzIAEoMkTCAPi18IgAzPtoAOiiw9ExqWPqmYen8KBa25o1FtWaVfsWklLThtgl8WgtgeWsF5dIyHYi9+SRaaDoDDQ1CoezQwAQKBI7EWHG4UAAVDC4RA2Phfv8aAYqsYQVBwZDoUtnK53IiYRYrNY0fs-gDNvE8WCIBCoVAALJIGyLAAKAElyUsrqlaAiEQAmO44CRAA)

There is a [proposal for pattern matching syntax in JavaScript](https://github.com/tc39/proposal-pattern-matching). ([Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) isn’t pattern matching, since it doesn’t affect the control flow of the program.)

---

Continue reading [the next part in this blog series](/blog/2021/01/23/pure-functional-programming-and-shared-mutable-state.html).

---
