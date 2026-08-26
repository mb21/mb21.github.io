---
title: Building a Modern Website? SSG vs. SSR, SPA vs. MPA, Svelte vs. Solid
date: 2023-09-18
tags: tech
---

You wanna build a modern website? Okay. Assuming you have no baggage (like existing know-how with PHP, Ruby on Rails or similar), you most likely go with the one programming language that not only runs on servers, but also in the browser: JavaScript. Or more accurately, assuming you believe in statically-typed languages (discovering bugs already at compile-time, types as documentation, easier refactoring), you go with TypeScript.

(If you won't ever need rich interactivity in the browser, or you're fine with learning two programming languages and stacks, you can of course also choose something else then JavaScript to run on your server, and use a bit of vanilla JavaScript or [HTMX](https://htmx.org/) to add some limited interactivity.)


## Static-Site-Generation (SSG) vs Server-Side-Rendering (SSR)

If you have an ordinary website with less than a couple thousand pages, go with Static-Site-Generation (SSG). It's simple. You don't have to run a server: that means no server to harden against load spikes or attacks, it's basically free, and out-of-date dependencies aren't really a security issue. Put up a repository on GitHub and connect it with [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/). Whenever somebody edits or adds a new page (either by editing a markdown file on GitHub, through [Decap CMS](https://decapcms.org/), or through a headless CMS), a new build is triggered, the whole website is regenerated and its static HTML, CSS (and perhaps JS) files are uploaded to some [CDN](https://developer.mozilla.org/en-US/docs/Glossary/CDN).

**Unless regeneration of the website is taking too long for you, there is rarely a reason to not stick with SSG.** (Except if you have other fancy requirements, like serving different HTML to different users and you cannot just customise that with some JavaScript on the client after page-load.)

If you need your users to submit a form, or you need to add a few other dynamic features, you can always add a "serverless function" (fancy-speak for an AWS Lambda function) or an "edge function" (fancy-speak for a Cloudflare Worker or similar) and usually you'll be fine.

But perhaps you have millions of pages, so the regeneration takes longer than a few minutes. Or perhaps even three minutes is too long for you, since you want to publish breaking news. Or perhaps your many authors update the content so often, or your developers update the code so often, that the couple of minutes of generation time are just too annoying to put up with every time.

Then perhaps, it's time to consider Server-Side-Rendering (SSR). Each page is generated on-demand, only when the user requests it from the server. You can do that with "serverless functions" (although currently AWS Lambdas don't support HTTP streaming), or "edge functions" (although you'll have a long round-trip-time from the edge to the central database – if you have one – so you benefit little from running on the edge close to your users). Or you can go fully old-school and do what everyone did in the PHP and Ruby days: just run a server. Nowadays it's running somewhere in the cloud (on [render.com](https://render.com/), [fly.io](https://fly.io/), or just AWS or Azure) – and you can scale horizontally and add more servers once that's needed – but the principle is fundamentally the same. And it's still a great option.


## Interlude: the pendulum of technology

If you've been around building websites for a couple of decades, you may know that static-site generation is a terribly old hat. In the first days of the web, that was in fact the only way to build a website: you would just upload your static files via FTP to some server. And some folks, that were fed up with having to change the header and footer in _all_ their HTML files whenever it needed updating, they even cobbled together bash scripts to do static-site generation – even though it wasn't known under that name at that time. Of course, once servers gained the ability to run PHP, almost everyone switched to doing that (and thanks to WordPress and its ilk, a lot of websites are still server-side rendered with PHP). Until static generation came back again with static-site generators like [Jekyll](https://jekyllrb.com/), which is still the default for [GitHub Pages](https://pages.github.com/).

And that's the way it is with a lot of technologies: the pendulum swings back and forth between two extremes as time goes by. Some of it is just fashion. Some of it is also driven by technological constraints at that moment. And these things influence each other: the more people think of a certain approach or technology as "hip" or "state of the art", the more resources will go into improving that. Until other people start to think of it as a dead-end and will start working on a different approach, sometimes taking into accounts the lessons from the past, sometimes less so. And thus the pendulum starts to slow and eventually swing back.

Another example is the pendulum swinging between where the majority of the work happens: on the client or on the server. For a time, you had mainframe servers that did the heavy lifting, with thin clients/terminals attached. Then came the personal computer, which shifted work back to the client (the desktop PC). Then came the World Wide Web, and later the cloud, and shifted work back to servers. Meanwhile, with the advent of lots of JavaScript/AJAX in websites and native apps in iPhones, the GUI shifted back to the client for a while, with the server relegated to just providing a JSON API to sync up the data.


## Single-Page App (SPA) vs. Multi-Page App (MPA)

For some time, in the early 2010s, people would go even so far as to not have the server render any HTML, but just serve a blank page with a bunch of JavaScript that would then render the GUI, and even take over the task of page navigation from the browser: the quintessential SPA. By 2020, people realized that serving a blank page gave users a slow initial page load, so the first page was server-side rendered in Next.js and similar frameworks. But on page navigation (when a user clicks a link), the whole code for the next page needed to be downloaded and run in the browser after all.

This is not the case with React-Server-Components (RSC) and Next.js App Router anymore. There, server-components are rendered on the server and then the JSX is serialized and sent over the wire.

**But the definitional feature of a SPA remains: the browser loads only a single page, later page navigations are simulated with JavaScript.** That’s called a client-side router, and it has to reimplement browser features like loading indicators, scroll restoration on back navigation, which adds to the JavaScript bundle size, and never works quite the same. And it definitely doesn't work while the browser has already rendered the initial HTML, but the JavaScript hasn't executed yet.

The idea of a SPA is that you’re trading upfront page load time with a better user experience later on. You don’t need to reinitialize everything after a page navigation. And arguably, SPAs have better page transitions than browsers used to have.

But guess what; browsers have improved since and the [balance has started to shift away from SPAs again](https://nolanlawson.com/2022/05/21/the-balance-has-shifted-away-from-spas/). Modern browsers have no flash of white between pages anymore, they have [back-forward caching](https://web.dev/articles/bfcache) and service workers for offline functionality, etc.

There are still some use-cases that can only be realized in a SPA, like playing audio or video during page navigation, or otherwise keep state in the DOM (like cursor position) that cannot be easily persisted in localStorage. And if you need any of this, because you're building the next Figma, then absolutely, go with a SPA.

But for most cases, I would just do a MPA, profit from the reduction in JavaScript bundle size, let the browser handle what is was built to do: page navigation, scroll restoration, page caching, streaming in HTML – and an HTTP GET that returns HTML is way easier to debug than RSC's stream of JSX. Finally, RSCs are currently only available in Next.js's App Router – which is production-ready in name only as of 2024. Meanwhile, [Astro](https://astro.build/) is a MPA-framework in version 3.0 today, that brings everything you’d expect from a modern framework: components, CSS modules, TypeScript, etc.

(If you don't do a classical SPA, you don't have to build a dedicated REST or GraphQL backend which would need to be secured and maintained – just query the database directly in your server code. Especially when you're still small, and don't have separate backend and frontend teams, this is a huge time-saver.)


## Svelte vs. Solid

At some point, there comes the time for your project to add some client-side interactivity that goes beyond what can be reasoned about in vanilla JavaScript; when you need to maintain some state and keep the GUI synced with it. In Astro, you can place [islands](https://docs.astro.build/en/concepts/islands/) of client-side interactivity in the server-side rendered page. Islands can be implemented in any of the popular client-side GUI frameworks like React, Preact, etc. And obviously only the islands' JavaScript needs to be downloaded to the browser. To [share client-side state between the islands](https://docs.astro.build/en/core-concepts/sharing-state/), you can use a library like Nano Stores or just use Solid signals.

Now you need to choose a GUI framework. Let’s say you bring no baggage, like existing know-how in React (which still has the biggest market-share) or similar. Or you're looking to learn something new. You want it to be fast and small. I would argue then you only have to choose between [Svelte](https://svelte.dev/) and [Solid](https://www.solidjs.com/).

(And perhaps [Qwik](https://qwik.builder.io/), which I haven't evaluated deeply. Definitely cool that they claim to be viable solution for both SPAs and MPAs. But if you've decided to go for an MPA already, then I'd trust Astro Island's explicit separation between client and server code a bit more than Qwik's approach where one developer's mishap might inadvertently pull in lots of code and even secrets into the client-bundle.)

Both Svelte and Solid are truly reactive frameworks (unlike React), meaning when something changes, not the whole component is recomputed, but a dependency-graph is followed, to figure out what exactly needs to be updated.

Solid's syntax is almost the same as React. You're just writing `const [count, setCount] = createSignal()` instead of `const [count, setCount] = useState()` (having separate getter and setters is called Read/Write Segregation and enforces unidirectional flow).

Svelte uses a compiler for reactivity, adding some JavaScript to each component, whereas Solid ships a small runtime and reuses that in each component. Therefore, for small apps Svelte has smaller bundle size but for a bit larger apps, Solid quickly takes the lead.

Svelte uses the bit weird `$` label to mark up reactive regions, which the compiler then transforms, whereas in Solid the reactive system is just a library. It's just JavaScript all the way down – except for JSX, which is the only thing compiled in Solid (although there are a few transformations happening in the JSX that you have to get used to). Solid's approach also means that the reactivity graph is debuggable at runtime.

An area where Svelte shines is great out-of-the-box support for animations, and it can support those better with component lifecycle hooks.

Considering all the above, for most use-cases, I would personally choose Solid.


## Conclusion

So there you have it. Here's my advice: for the most common cases, build a statically-generated Astro MPA with some Solid islands. Feel free to disagree.
