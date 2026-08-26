---
title: 'Declaratively rendering components: HTML vs JS functions'
date: 2024-02-01
tags: tech
---

I’m a big fan of the idea of [declarative programming](https://en.wikipedia.org/wiki/Declarative_programming). Examples are HTML and functional programming.

But which of the following two approaches is more declarative when you’re rendering a bunch of components on your server, and your server happens to be running JavaScript?

1. Relying primarily on HTML, or
2. relying primarily on JavaScript functions.

Consider the syntax of declaring a component: an [Astro component](https://docs.astro.build/en/basics/astro-components/) is primarily an HTML snippet:

```astro
---
const { title } = Astro.props;
---
<details>
  <summary>{title}</summary>
  <slot />
</details>
```

Whereas a [React/Solid/JSX component](https://www.solidjs.com/tutorial/introduction_components) is a JavaScript function:

```jsx
export const Popover = (props) =>
  <details>
    <summary>{props.title}</summary>
    {props.children}
  </details>
```

Notice how child elements are passed to the component: in Astro you have to use a slot, similar to [HTML’s slot element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), somehow mimicking how a poly-fill for native web functionality would work. But we’re running on a server here and rendering HTML to a string that will be sent over the network. There is no DOM, and Web Components will never be implemented in Node/Deno/whatever. In React/Solid, child elements are simply passed as `props.children` – just like any other component prop.

I’m sympathetic to Astro’s argument of starting out with the least powerful tool in the toolkit, which is HTML, and later you might add some frontmatter containing JavaScript. It’s nice that non-developers can contribute and only need to write HTML.

But even in Astro, you won’t get very far without having to learn some JavaScript. Just passing some props to a component requires you to do that already (for the line `const { title } = Astro.props`). In templating languages like handlebars, partials all live in a global namespace, whereas in Astro you need to use JavaScript import statements to be able to include your component in another page. It feels like Astro components live in this weird middle-ground: they try to be usable without JavaScript knowledge, but fail to be so for the most basic cases.

In both Astro templates and JSX, we’re using a template system that’s embedded in its host language; meaning you can use arbitrary JavaScript syntax within the template, like `.map` and `condition ? exp1 : exp2` instead of `{{for}}` and `{{if condition}} exp1 {{else}} exp2 {{end}}`.

Considering that, the answer may very well be be that leaning on JavaScript as much as possible (i.e. approach 2), requiring the developer to learn fewer different concepts, is the better approach. After all, functions are just such great [abstractions](/blog/2021/09/11/composable-abstractions.html), when used well. Meaning the React/Solid folks got it right. An argument I tried to make over [on the Astro discussion board](https://github.com/withastro/roadmap/discussions/716).

Wanting to explore this thought here a bit more, I pushed some code to GitHub: [mastro – a *m*inimal, no-dependencies take on an experimental *Astro*-like web framework](https://github.com/mb21/mastro/).
