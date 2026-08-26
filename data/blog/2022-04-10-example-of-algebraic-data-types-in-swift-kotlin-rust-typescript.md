---
title: An example of Algebraic Data Types in Swift, Kotlin, Rust and TypeScript
date: 2022-04-10
tags: tech
---

This post contains a simple example of using algebraic data types in Swift, Kotlin, Rust and TypeScript. The example is the following:

1. Define a product type `User`.
2. Define a sum type `State`.
3. Implement a pure function `render` that pattern-matches on the sum type.
4. Call `render` with a state containing a user and print the resulting string.


## Swift

See also the nice blog post [Algebraic Data Types in Swift](https://medium.com/nerd-for-tech/algebraic-data-types-in-swift-2a777b24253d).


```swift
struct User {
    let email: String
    let name: String
}

enum State {
    case loading
    case loggedOut
    case loaded(User)
}

func render(state: State) -> String {
    switch state {
    case .loading: return "..."
    case .loggedOut: return "Please log in..."
    case .loaded(let user): return "Logged in as \(user.name)"
    }
}

let user = User(email: "me@gmail.com", name: "me")
let state = State.loaded(user)
print(render(state: state))
```


## Kotlin

```kotlin
data class User (
    var email: String,
    var name: String
)

// by sealing the class, the compiler will know all subclasses
// and can thus warn us about non-exhaustive pattern matches
sealed class State {
    object Loading: State()
    object LoggedOut: State()
    data class Loaded(
        val user: User
    ): State()
}

fun render(state: State): String {
    // still, exhaustiveness checking only works if the
    // `when` is used as an expression, like here
    return when (state) {
        is State.Loading -> "..."
        is State.LoggedOut -> "Please log in..."
        is State.Loaded -> "Logged in as ${state.user.name}"
    }
}

fun main() {
    var user = User("me@gmail.com", "me")
    var state = State.Loaded(user)
    println(render(state))
}
```


## Rust

```rust
#[allow(dead_code)]
struct User {
    email: String,
    name: String
}

#[allow(dead_code)]
enum State {
    Loading,
    LoggedOut,
    Loaded(User)
}

fn render(state: State) -> String {
  match state {
      State::Loading => "...".to_string(),
      State::LoggedOut => "Please log in...".to_string(),
      State::Loaded(user) => format!("Logged in as {}", user.name)
  }
}

fn main() {
    let email = "me@gmail.com".to_string();
    let name = "me".to_string();

    let user = User { email, name };
    let state = State::Loaded(user);

    println!("{}", render(state));
}
```


## TypeScript

```ts
type User = {
  email: string;
  name: string;
}

type State = 'loading' | 'loggedOut' | User

// it's important to put a return type here,
// otherwise exhaustiveness checking will not work
const render = (state: State): string => {
  switch (state) {
    // js switch can only match on primitive types like strings
    // in this example, we can abuse default case to reach the User object
    case 'loading': return '...'
    case 'loggedOut': return 'Please log in...'
    default: return `Logged in as ${state.name}`
  }
}

const state = { email: 'me@gmail.com', name: 'me' }
console.log(render(state))
```

Or more explicitly (but slightly more verbose):

```ts
type User = {
  email: string;
  name: string;
}

type State =
  { type: 'loading' } |
  { type: 'loggedOut' } |
  { type: 'user'; user: User }

const render = (state: State): string => {
  switch (state.type) {
    case 'loading': return '...'
    case 'loggedOut': return 'Please log in...'
    case 'user': return `Logged in as ${state.user.name}`
  }
}

const user = { email: 'me@gmail.com', name: 'me' }
const state: State = { type: 'user', user }
console.log(render(state))
```
