---
title:  What business is Haskell a good fit for?
date:   2020-06-01
tags:   tech
---

###  De-risking software projects

From [On Marketing Haskell](https://www.stephendiehl.com/posts/marketing.html):

> It’s true that if you’re managing a software project the choice of tools does matter, but this choice pales in comparison to the following simpler ways to mitigate risk:
>
> 1. Offset the risk using as many legal and insurance instruments possible.
> 2. Having a highly liquid talent pool.
> 3. Factoring software failures into the expectations and economics of projects.
> 4. Ability to restart the project with different assumptions and team if it all goes awry.

This makes sense, within the constraints of most business environments.

But maybe it’s just a question of having the right environment to build software [properly](/blog/2014/04/28/Good-Design.html)? Is there a right business model to do so?

Most software projects still have a high risk of failure, even if you de-risk the technical implementation part significantly, say, by having a proficient team, that’s known to work well together, using a proper programming language and tech stack.

The remaining risk is usually dominated by working with wrong requirements. The problem to be solved might not be well-understood by either the customer or the engineers. Or maybe either the customer or the engineers understand, but fail to communicate to the other party. Or in the process of working on it, the problem is being better understood by one party, but this understanding doesn’t translate to the other, so requirements are not adjusted, etc. This problem might be exacerbated by contracting software development out.[^1]

For startups, risk is obviously usually dominated by non-tech issues (product-market-fit, timing, etc). But it is a business model where I see having the ability to quickly refactor and change the software as having a potentially huge upside. Correctness is even less important in startups though (I mean, Facebook was written in PHP).

### Marketing Haskell to devs

[My responses on Twitter](https://twitter.com/mb2100/status/1267124635516182529) to “On Marketing Haskell”:

> Very insightful, thx! Spot on about marketing to software managers and higher ups. But isn’t choice of programming language more often delegated down, say to team lead? There the only point in your list remaining is hiring/onboarding..? That’s where I see Simple Haskell shine.
>
> Your point is basically: to higher ups, the programming language doesn’t matter. Which is true and (as you say) under-appreciated by us programmers. But that doesn’t answer the question why some languages end up having critical mass in industry while others don’t. Sure, marketing – but marketing to developers.
>
> Similarly, node.js’s marketing was async+v8=speed, and devs love to think they’re writing high-speed/performance code. Why node succeeded, was of course for an entirely different reason: ubiquitous frontend devs entered the backend and a shared ecosystem was created around that.
>
> Thus not actually an entirely different reason. The marketing (to devs), enabled an influx of talent to create a decent ecosystem (even if most of the npm packages are crap, there is one okayish one for every use-case).
>
> I would also agree that Haskell’s greatest strength is correctness. Unfortunately, few devs find that an appealing argument. It implies that they’re not writing correct software in whatever language they’re currently using.
>
> How would I rephrase “correctness” to market Haskell to other devs? Don’t know, something like “enables you to build unbreakable systems”? 🤷🏾‍♂️😁
>
> Or maybe just “enables you to refactor quickly and fearlessly”. That emphasizes the improvements in development speed and ability to adjust to changing requirements that a strong type-system enables. That’s what industry is interested in, not “correctness”.

### If Haskell is so great...

The blog post [If Haskell is so great, why hasn't it taken over the world?](https://pchiusano.github.io/2017-01-20/why-not-haskell.html), starts with a great description why Haskell is so great, which I would paraphrase as:

1. Programming is all about managing [**complexity**](http://curtclifton.net/papers/MoseleyMarks06a.pdf). Without good tools to manage it, the complexity of programs becomes mentally intractable for our limited brains and we lose control and understanding of our programs (imagine writing a big software system entirely in assembly language). The only way for the complexity not to swallow us, is to break down the program into composable and reusable units; therefore **functions**.
2. Composability is limited by side effects (like manipulating shared mutable state: each variable multiplies the [number of states the program can be in](https://twitter.com/paniczgodek/status/1269363651057799173)); therefore [**pure functions**](https://en.wikipedia.org/wiki/Pure_function).
3. Composability enables big programs. But without the help of a compiler, it becomes difficult for humans to track things (e.g. you change the code in one place, but forget to in another place), therefore [**strong, static types**](https://i.stack.imgur.com/9DkWM.png).

### ...why hasn't it taken over the world?

Then the post makes a good observation:

>  Haskell is not that much better than, say, Java, for many of the software systems people write today.

For those “business applications”, the advantages of Haskell are outweighed by the huge disadvantage of not having a big developer pool readily available for growing a team and quickly filling in replacements.

Also, what dominates the code of those apps is simply transforming data from one representation to another: i.e. I/O across system-, team- and/or human/machine-boundaries and interfaces.[^2] But when all you need to do is read in some JSON, change one field, and spit it out again, Haskell doesn’t help you much. Its strengths only come into play once you’ve parsed the data into your [ADT](https://en.wikipedia.org/wiki/Algebraic_data_type). And figuring out what the right ADT is, boils down to defining the [semantics of the data, which is harder to agree on the more people you are](/blog/2014/10/05/In-Search-of-Truth-for-Knowledge-based-Systems.html). And that's where we’re sort of back to the point about requirements – if you've gotten all the involved people to use a shared vocabulary and langauge, and agree on the requirements, you've already solved the hardest problem in most business applications.[^3]

### Chickens and eggs

To summarize: sure, better marketing to developers would help. And initiatives like [Simple Haskell](https://www.simplehaskell.org/), as well as more batteries-included libraries with more beginner-friendly docs and examples would help. And Rust seems to have made inroads using those strategies, with the help of being backed by a big, credible, player: Mozilla.

But while we’re stuck in the chicken-and-egg situation of not enough devs using Haskell, and Haskell not being a good choice in industry because of not enough devs for hire – the question remains: what business model and problem is Haskell already now a good fit for?

Or phrased differently: is there a way of working, where all other risks are reduced enough, so that the de-risking of the project by using a robust language actually removes a significant fraction of the total risk?[^4]

If I had a good answer to this question, that might enable me to start a business using Haskell. What complicates matter further is that I’d also like my work to be meaningful (which for me precludes most of fintech), and not to be in vain (which is always a high risk with startups). Similarly, running a tech consultancy and doing a project, then “handing it over”, is often half-way to having it terminated already. So far, only small to medium enterprises with low turnover of programmers seem to be a good fit.

P.S. In his talk [How to market Haskell to a mainstream programmer](https://www.youtube.com/watch?v=fNpsgTIpODA), Gabriel Gonzalez makes also a convincing argument that to break the chicken-and-egg problem, key is breaking into one or two verticals or niche segments first.


---

[^1]: But do you need to be a [tech company](https://stratechery.com/2019/what-is-a-tech-company/)? Not necessarily. But if you’re doing software as a project (as opposed to a product), you’re doomed – and sometimes, the continued investment in software isn’t worth it, if you’re not creating an ecosystem or will benefit from zero marginal costs.

[^2]: That’s why I think it’s amazing that something like [Airtable](https://airtable.com) hasn’t “taken over the world” for CRUD GUIs yet. But [Notion](https://www.notion.so/) and [Coda](https://coda.io/) seem to prove this niche is at least expanding.

[^3]: That's my intuition for why Unison won't work.

[^4]: This question can also be asked not only about “using a robust language”, but about “using robust/proper engineering principles” in general. That’s a question that’s been bothering me personally for quite some time, as I tend to become quite dissatisfied when I’m forced to program in the mud.

