---
title: A MPA, no-bundler JavaScript meta-framework separating client- and server-code
date: 2024-04-13
tags: tech
---

Modern JavaScript meta-frameworks like Next.js, Nuxt, Astro, SolidStart, SvelteKit and Qwik all use a bundler/transpiler (like Vite or Webpack), and with the exception of Astro and Qwik, all of them are SPAs.

I would love to have a modern JS meta-framework that does away with these two conventions, but instead chooses to optimize for simplicity and leveraging browser-built-ins over client-side JavaScript:

1. MPA over SPA. See the [_Single-Page App (SPA) vs. Multi-Page App (MPA)_ section of my previous blog post](https://mb21.github.io/blog/2023/09/18/building-a-modern-website-ssg-vs-ssr-spa-vs-mpa-svelte-vs-solid.html#single-page-app-spa-vs-multi-page-app-mpa), but the gist is that for most use-cases, modern browsers can do client-side routing better than JS. This would also allow a simpler solution to what the Solid folks call the [double data problem](https://dev.to/this-is-learning/why-efficient-hydration-in-javascript-frameworks-is-so-challenging-1ca3): that the complete template and associated data often ends up being sent to the client twice, as initial HTML and as JavaScript (because you may need it in JavaScript format for hydration or on client-side page navigation).

2. No bundler. Instead using browser-native [Import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) and [modulepreload links](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload) (i.e. the same approach that [importmap-rails](https://github.com/rails/importmap-rails) took). A very simple asset pipeline would still do two things: add a hash to the filename to enable long caching in a CDN, and converting TypeScript and JSX to plain JavaScript (TS and JSX now being so engrained in the ecosystem that it’s built into both Deno and Bun).

Why? I think that for most use-cases (i.e. if you’re not building the next Figma or Google Docs), this will provide both superiour UX and superior developer-experience.

A bundler (and related tooling) is just such a massive addition in complexity that the developer needs to understand in order to debug certain issues. It seems to be a historical accident (because bundlers have their roots in tooling for client-side-only SPAs) that lots of functionality is implemented in bundlers instead of in plain JavaScript functions, which you would call either during static site generation or during server-side rendering: like how `import.meta.env` is replaced in the build step and not accessing the env variable when you run the server, or how CSS or SVG files are included into a component. This makes it unnecessarily difficult to call the vite-based code, that you wrote to render some HTML on your webiste, [in a script](https://stackoverflow.com/questions/77523087/how-to-run-a-command-line-typescript-file-in-the-vite-js-environment) (e.g. in a cron job to send an email). Also, the newcomers to modern JS-tooling that Astro targets routinely struggle with what exactly the behaviour of `<script>` and [`<script is:inline>`](https://docs.astro.build/en/guides/client-side-scripts/#opting-out-of-processing) is (in addition to forgetting to add [`client:load` to hydrate islands](https://docs.astro.build/en/concepts/islands/#creating-an-island)).

Finally, with the exception of Astro, all the modern meta-frameworks ship with some kind of [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call) functionality that doesn’t make the network request explicit, and without forcing the developer to handle network errors: `use server` in [React/Next.js](https://react.dev/reference/react/use-server) and [SolidStart](https://start.solidjs.com/api/server), as well as `server$` [in Qwik](https://qwik.dev/docs/server$/).

And even in Astro, it’s very easy to accidentally bundle some big npm package, that you meant to use only on the server, into the client-side bundle. For example, this can happen if you just import a self-contained pure helper function into the client, and that function happens to be in the [same file that imports some server code](https://github.com/withastro/astro/issues/9902). That’s why I’ve started even in Astro projects, to name my files `*.client.ts` and `*.server.ts`. I’d like the framework to enforce such a rule:

3. Strict separation of client-side and server-side code. To make sure that server-code never accidentally ends up on the client.

The reverse, client-code running on the server, is sometimes needed (to server-side-render components), and is less problematic, since you will immediately notice if you try to access `window` on the server, because it will just crash.

With these three constraints set, I’m not sure what the best architecture would look like.[^1]

Do you know of any such framework and/or would be willing to collaborate on creating one? Feel free to open a [_mastro_ issue](https://github.com/mb21/mastro/issues).

[^1]: Explicit [islands](https://www.patterns.dev/vanilla/islands-architecture/)? But then you’re still sending the whole code of client-side components to the browser. We could do even better by just sending the interactive parts.
