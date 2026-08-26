---
title: On Change and Craft in Software Design
date: 2025-04-13
tags: tech design
---

Software seems to be that mathematical thing that can be perfected and finished. But somehow this never works in practice. Why not?

We software developers keep struggling with that question. A lot of us instinctively want to write “beautiful” code and craft the “perfect” solution. Out in the real world, engineers may struggle with printers that jam, robot wheels that slip, machinery that gets worn down by use, or by harsh weather. Physical materials rot and decay, even when they’re just sitting there doing nothing – chemistry and time doing their thing. But in the virtual world, us software developers should be spared from these earthly troubles, right?

To a certain extent, yes. Software in the abstract sense really does not change. It’s just information after all – like text or mathematic formula. Pythagoras’ theorem is still the same after two millennia after all. (Yes, the hardware carrying the bits and bytes may wane. But through the miracle of digital technology and error correcting codes, we can copy those bytes over to the next generation of carriers without any loss of information.)

## Software does not exist in isolation

But here’s the mistake I see a lot of us software developers make. We forget that no piece of software exists in isolation. While the software itself may be preserved unchanged, the world it’s interacting with _does_ change.

Unless your software is a [pure function](/blog/2021/01/23/pure-functional-programming-and-shared-mutable-state.html), it is doing IO, system calls, network calls, etc. If you want to run your program a decade later, the underlying OS still needs to behave the same, and any networked computers your program relies on need to still be there.

And even if the technical environment remains compatible: your users change as well! An MS-DOS program might still be runnable in a VM, but users won’t like the UI anymore, especially on their smartphone.

## Evolving tech ecosystems

Different tech ecosystems have different rates of change. Microsoft is famous for their backwards-compatibility, going even so far as to [emulate old bugs](https://learn.microsoft.com/en-us/previous-versions/technet-magazine/ff625273(v=msdn.10)) in subsequent versions of Windows, so that old programs that relied on the previous behaviour would not break. Apple, in contrast, removes older APIs more aggressively, infuriating developers that need to change their apps if they want them to continue to run on the newest version of macOS or iOS, which is what most users will be running.

Changes on one level of the tech stack sometimes enable more frequent changes on the levels above. Back when software was printed on physical media like CDs, major versions of OSes with new features were released once every couple of years. Today, Apple may still announce the new features at its yearly WWDC conference, but they’re actually rolled out in point updates over the course of the whole year. And for websites like Facebook or Google, it’s not uncommon for new versions to be deployed multiple times each day.

Yet on the web, unless you were using Flash, your website from a decade ago still renders the same in modern browsers. However, “frontend” web developers have created an [update-treadmill](https://news.ycombinator.com/item?id=43422162) of their own: often relying on a baroque number of third-party dependencies, and building on top of frameworks that keep changing under their feet. While adopting newer and better technologies may make sense, the drive to work with the newest hip web framework often seems to be more similar to a fashion trend, or due to fear of being “left behind” in the job market (either as an employer or employee).

When choosing the tech ecosystem on which you build your application, one crucial factor is its rate of change, and whether you like the direction of that change. Do you prefer a stable platform that doesn’t require you to invest a lot of time to keep up with it, or do you believe valuable new functionality continues to be added to the platform, and that you have the capacity to make use of that? Are the users I want to reach on the platform or moving away from it? Will there be developers familiar with the platform available for hire, and will they have the other skills I require?

## Change is uncomfortable

Make no mistake, change is uncomfortable. All else being equal, we humans prefer to stick what we know over taking a risk and investing time and energy in learning something new. Granted, us techies are generally more interested in new technologies. But it is a testament to how much beneficial technological progress we’ve been going through as a society, that so many of us are so often willing to take a bet on the next thing, assuming that it will bring us as much benefit as past innovations have done.

## Innovation waves

New technologies are [adopted in waves](https://reactionwheel.net/2024/10/the-illusion-of-acceleration.html). If a new technology has a higher perceived advantage relative to its alternatives, it will be adopted more quickly. When a technology is new, it still changes quickly, as learnings come in and low-hanging fruits are picked. Later on, as the technology has matured and also more people and businesses rely on it, breaking changes become more expensive, and big improvements harder to achieve. The technology becomes entrenched. The cycle repeats and the next wave builds up when a new technology comes along that seems so much better, that it manages to overcome the [ecosystem advantages](https://newsletter.squishy.computer/p/dont-fork-the-ecosystem) of the existing technology.

## Instigating change

As application developers, we are on the receiving end of change when it comes to the tech platform we build on. However, when it comes to the business we are building our product for, often we are the instigators of change. We want our customers to adopt our product, or the new version of our product. Suddenly, it’s us that need to walk the tight-rope between innovation and familiarity. It’s us that need to shepherd the ecosystem slowly forward, because “Being Too Early is The Same As Being Wrong”. And the path of innovation is always through the [adjacent possible](https://newsletter.squishy.computer/p/evolution-adjacent-possible): each intermediate step needs to be advantageous, otherwise it’s not adopted.

## Worthwhile change

You may long to build a product that lasts. This is easier in an established domain, since the broad strokes are clear and you can obsess over the details – you know the terrain that you want to find the maximum spot on. But if the domain is still moving and changing quickly, when you don’t know whether you hit a local maximum, because you don’t know the whole terrain yet, then you need to iterate on imperfect artifacts that evolve in symbiosis with the involved people and processes, so that the whole terrain can be discovered.

In that case, even if your technology or product was used only for a small time and was quickly obsoleted by the next wave – it was still a necessary step. Even though your particular piece was superseded, your lasting contribution was to move the field forward as a whole.

One example is in the field of aircraft design: the development of the Zero fighter, as portrayed in Miyazaki’s film _The Wind Rises_, where its creator says he did “the best he could with the time that was given to him”.

## On craft and deliberate design

But just because a product’s shelf-live may be limited, that does not mean it shouldn’t be designed properly, and crafted deliberately and with care. It seems to me, that’s a largely orthogonal quality.

It’s true that some companies or teams move fast and carelessly (Facebook comes to mind). And established big corporations are famous for moving slow and carelessly: often they look at software development as a [commodity to be de-risked](/blog/2020/06/01/what-business-is-haskell-a-a-good-fit-for), with managers not caring about the quality, as long as the widget is on schedule.

On the other hand, companies like Apple or Nintendo demonstrate that even big companies can have a culture that deeply cares about design. In an established domain like laptops, Apple is iterating slow yet deliberately: the [newest MacBook](https://arstechnica.com/apple/2025/03/apple-m4-macbook-air-review-i-have-no-notes/) looks the same like the ones that have come before it, but each iteration is slightly tweaked with updated hardware.

Finally, when entering a new domain, iterating quickly, the temptation may be strongest to cut corners. But you can still be deliberate in your design process, and decide carefully which corners to cut – which features you need now, and which can wait for a later iteration. That’s the definition of a minimum viable product, after all. The original iPhone may be one of the best known examples. When it launched, [reviewers complained](https://arstechnica.com/gadgets/2007/07/iphone-review/) about the basic camera and an Email client that missed enterprise features. It was also later revealed that on the first version, all programs were running in `sudo` mode with elevated privileges – clearly a bad practice, but something Apple decided was okay to fix in a later software update, in order to focus on the features that made the iPhone unique, and get it out of the door in consumer’s hands now.

|                                    | carelessly | deliberately
|------------------------------------|------------|-------------
| **moving fast, iterating quickly** | Facebook | iPhone at launch
| **iterating slow in a mature domain** | most big corporations | MacBook nowadays
