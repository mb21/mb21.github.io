---
title:  "Parallel and Concurrent Programming Models"
date:   2012-08-16
tags: tech
---

This is a simple (non-exhaustive) categorization of different approaches for parallel and concurrent programming, inspired by [Parallel and Concurrent Programming in Haskell](http://community.haskell.org/~simonmar/par-tutorial.pdf) (PDF). They state that parallelism and concurrency are two solutions to two different problems (as do [others](http://existentialtype.wordpress.com/2011/03/17/parallelism-is-not-concurrency/)).

-   Parallelism (i.e. *data parallelism*, is deterministic)
    -   static and dynamic [scheduling](http://en.wikipedia.org/wiki/Loop_scheduling)
    -   forking, yielding (directed graph of data flowing: [*dataflow parallelism*](http://en.wikipedia.org/wiki/Dataflow_programming))

-   Concurrency (i.e. threads or *task parallelism*, is nondeterministic thus cannot be expressed in purely functional code)
    -   locking shared resources
    -   blocking/synchronous channels (e.g. [CSP](http://en.wikipedia.org/wiki/Communicating_sequential_processes)) and asynchronous message passing (e.g. Erlang)
    -   cancellation: asynchronous exceptions
    -   software transactional memory ([STM](http://en.wikipedia.org/wiki/Software_transactional_memory)), i.e. group code into atomic blocks

Instead of concurrency, event loops with callbacks (as in Node.js) can be used to solve the problem of multiple external agents interacting with each other.

The paper also notes:

> In the world of concurrency and parallelism, there is good reason to believe that no one size fits all programming model for concurrency and parallelism exists, and so prematurely committing to one particular paradigm is likely to tilt the language towards favouring certain kinds of problem[s].\
>  [...]\
>  We might wonder whether the compiler could automatically parallelise programs for us. After all, it should be easier to do this in a pure functional language where the only dependencies between computations are data dependencies, and those are mostly perspicuous and thus readily analysed. In contrast, when effects are unrestricted, analysis of dependencies tends to be much harder, leading to greater approximation and a large degree of false dependencies. However, even in a language with only data dependencies, automatic parallelisation still suffers from an age-old problem: managing parallel tasks requires some bookkeeping relative to sequential execution and thus has an inherent overhead, so the size of the parallel tasks must be large enough to overcome the overhead. Analysing costs at compile time is hard, so one approach is to use runtime profiling to find tasks that are costly enough and can also be run in parallel, and feed this information back into the compiler. Even this, however, has not been terribly successful in practice [Harris and Singh]. Fully automatic parallelisation is still a pipe dream. However, the parallel programming models provided by Haskell do succeed in eliminating some mundane or error-prone aspects traditionally associated with parallel programming.
