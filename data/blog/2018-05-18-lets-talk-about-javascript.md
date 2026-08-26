---
title:  Let’s talk about JavaScript
date:   2018-05-18
tags:   tech design
---

Reading and loyally following _A List Apart_ over the years, I feel we need to talk about the elephant in the room: JavaScript.

You may relish the simplicity of [pure HTML](http://motherfuckingwebsite.com/) or [pure HTML with a few lines of CSS](http://bettermotherfuckingwebsite.com/) (as I do), but for better or worse, there is arguably no single other technology that has had a greater impact on the Web ecosystem in the last decade than JavaScript. Whether you like it or not, that’s where currently most of the innovation and experimentation in front-end development techniques is happening.

This has sometimes led to pushback from practitioners of established front-end web design techniques (“Whatever happened to progressive enhancement?”). And as JavaScript encroached on the server and onto mobile apps, pushback came equally from traditional software engineers (“JavaScript is just a terrible programming language, why would anyone use it if they don’t have to?”).

So what’s the deal with JavaScript? Is it breaking the web, or are we witnessing the beginning of a brave new era? I’m not claiming to have all the answers, but let me offer my perspective, as one of those people that have one foot each in web design and software engineering.


## What is the nature of the web?

The [Dao of Web Design](https://alistapart.com/article/dao) warns the web developer from wanting to take control over the user and their browser:

> If you use style sheets properly, to suggest the appearance of a page, not to control the appearance of a page, and you don’t rely on your style sheet to convey information, then your pages will “work” fine in any browser, past or future.

This, to me, is still the core of what it means to play to the strengths of HTML and CSS and which is what makes the medium _web_ work so well for so many different users on so many different devices. But the genius of the web was, and still is, (at least) two-fold.

In addition to HTML, the web also consists of URLs and HTTP. The way these technologies are used to design the interaction between the client and the server, is what Roy Fielding termed [REST](http://mb21.github.io/api-explorer/a-web-based-tool-to-semi-automatically-import-data-from-generic-rest-apis.html#rest). Even if the _ideal website_ in the minds of front-end developers may seem to be a bunch of HTML and CSS files, the reality has always been much more complex. A website is an interface through which a client interacts with a (potentially very complex) remote service – think of what happens in Google’s data centers when you hit that search button, or when you ask a travel-search engine for the currently cheapest flight.
URLs (as globally unique identifiers for resources), HTTP (with its verbs `GET`, `POST`, `PUT`, `DELETE`, etc.), and hyperlinks (for discoverability of related resources), provide a vocabulary for a relatively simple, sufficiently general, and decentrally scalable global communications infrastructure.

They made the web such a great abstraction for accessing all sorts of content and interactions: from computer-to-computer APIs, to the distribution of text (HTML), documents to be printed (PDF), documents with responsive layouts (HTML/CSS), images, videos, interactive forms, all the way to the distribution of interactive applications and even games.

With all the railing against single-page applications, who are we, the “traditional” web designers, to claim a monopoly on the use of the web infrastructure for the delivery of “good old” HTML and CSS documents? Who are we to say, that the web may not also be used for the delivery of richer, more interactive, client-side applications? (After all, if you would have asked print designers two decades ago for their preferred format for the web, they would probably have said “PDF”.)

Now, don’t get me wrong. I _do_ think it is important to pick the right tool for the right job. As such, if you need to deliver information in the form of text and images to users on interactive, electronic devices (all the way from computers and phones to text-to-speech-centered devices for the blind or Siri and Alexa), then I still think progressively enhanced HTML and CSS is _the_ way to go. But if you’re developing a video game or a collaborative productivity application (think Google Docs), who are we to tell you that you should do that using native code and stay away from _our_ web technologies?

So yes, I believe the distinction between website and webapp _is_ meaningful. But it is also a continuum. A page of a cinema that lists this week’s movies is a website, right? But what if you add an interactive map for directions? What if you can filter the movies by category, by screening date and time, make reservations and rate and discuss the movies you’ve seen? Is it a webapp now? And if so, at what point exactly did it become a webapp? There is no clear answer. Yet, it is still valuable to be conscious of the continuum between the two extremes, and the trade-offs involved when choosing the right technologies. (The concept of a [Progressive Web App](http://alistapart.com/article/yes-that-web-project-should-be-a-pwa) makes it even possible for a website to be a simple website for some devices, while at the same time being a webapp for others.)

Using a bloated JavaScript framework to render a simple blog post, that doesn’t load the body text without JavaScript, is clearly a very bad idea. I’m as wary of the [security](https://arstechnica.com/information-technology/2017/10/a-surge-of-sites-and-apps-are-exhausting-your-cpu-to-mine-cryptocurrency/), [privacy](https://arstechnica.com/tech-policy/2017/11/an-alarming-number-of-sites-employ-privacy-invading-session-replay-scripts/) and [performance](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e) implications of running untrusted and unvetted Turing-complete code on my device as the next guy. I am actually defaulting to disabled JavaScript in my browser, and use a plugin to enable it on select sites. But an outright dismissal of all things JavaScript falls too short as well.

For example, in the days before we had advanced CSS like Flexbox and Grid, JavaScript was used to prototype and test new layout approaches. Once we figured out what works and is desirable, it could be standardized as declarative CSS. Or while we wait for older browsers to be phased-out, we can deploy polyfills. As Fielding [recognized](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm):

> REST allows client [i.e. browser] functionality to be extended by downloading and executing code in the form of applets or scripts. This simplifies clients by reducing the number of features required to be pre-implemented. Allowing features to be downloaded after deployment [of clients] improves system extensibility.


## Where did JavaScript come from?

Today’s JavaScript didn’t come out of nowhere – it developed through several stages, always evolving in answer to a genuine need at the time. To appreciate where we are today, we have to understand JavaScript’s history.

Famously put together by Brendan Eich within 10 days, JavaScript was first introduced in Netscape Navigator in 1995 to make the web a more dynamic place and as a point of differentiation to Internet Explorer. The scripting language was long used for little more than making menus hoverable. In 2004, Gmail (and a year later Google Maps) made quite a splash with the first wide deployment of a set of web development techniques that would soon become known as AJAX: using JavaScript to download new content from the server to the browser in the background, without interrupting the user with a full page reload. For the first time, an App-like experience in a browser was achieved using only native web technologies (no Java applets, Flash or ActiveX). As this approach was adopted by the broader web development community, jQuery emerged as the dominant JavaScript library to abstract over differing browser implementations and provide access to the [DOM] using CSS-like selectors (what is standardized today as [`document.querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)).

As people started building ever more complex applications, it became apparent that attaching event handlers to [DOM] elements, and [imperatively](https://en.wikipedia.org/wiki/Imperative_programming) rewriting that HTML, quickly leads to [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code). Thus, along came JavaScript frameworks (like AngularJS introduced in 2010, or React), where the developer writes mostly declarative templates. The framework then takes care of rendering the templates to HTML, attaching event handlers and rerendering when necessary. This approach resembles more closely how desktop GUI applications already had been developed. However, it would mean that if there was an error in the JavaScript execution, or if a browser had no JavaScript support (such as a search engine), the user would get to see little more than a blank page.

Google released the Chrome browser in 2008, which included V8, a  heavily performance-optimized JavaScript engine. This was a response to the increasing amount of JavaScript on many web pages, that slowed down the user experience. JavaScript code not only needs to be downloaded, but also executed by the browser.

Only one year later, something curious happened. Up to that point, JavaScript had been used almost exclusively to run client-side, i.e. in the browser. But in 2009, a server-side run-time environment called Node.js was put together by Ryan Dahl, and it had Google’s V8 JavaScript engine at its core. At the time, there was a lot of talk about asynchronous IO and the number of open connections a web server could handle. (_Web-scale_, anyone?) But I believe, the real reason for Node.js’s meteoric rise in popularity, was the low barrier to entry. The hurdle for front-end developers to make the jump to the back-end was suddenly dramatically lower, since they could use the programming language they were already familiar with. Node.js’s package manager `npm` made it very easy to build on the JavaScript modules created by others, and in turn to publish your own modules, creating an exponentially growing ecosystem. (Even if many of those packages are of dubious quality.) Finally, the promise of continuing performance improvements coming from Google, and the potential for code-reuse between client and server certainly didn’t harm either.

What can we learn from all this?

1. The evolution of the web has almost always been driven by increasing needs. Things that were pioneered by proprietary or native technologies, were later done with web technologies and standardized. First there was Flash, Quicktime videos and iTunes. Now there is JavaScript, HTML5 video and streaming. So while the web often was not first, its superior delivery mechanism and cross-platform compatibility often won out over the incumbent technologies.
2. History is littered with coincidences. The success of JavaScript is largely based on the success of the web. Had Brendan Eich come up with a different language back in 1995, we would probably have to struggle with that one today. As such, I’m glad that JavaScript also has good parts like [first-class functions](https://en.wikipedia.org/wiki/First-class_function), in addition to its [many](http://bonsaiden.github.io/JavaScript-Garden/) [deficiencies](https://www.codeproject.com/Articles/182416/A-Collection-of-JavaScript-Gotchas).

[DOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model


## Components

Designing the right abstractions and interfaces, for example by dividing your code into components of the right size, is one of the central pillars of software engineering. As your application  grows, the right abstractions are the only thing that enable you to keep the rising complexity at bay – and thereby to keep your sanity.

Once your first website grew beyond one or two HTML files, pretty much the first thing you would do is move some components, like the page header and footers, out to separate files. The next step is realizing that you have multiple pages (e.g. blog posts), that all share the same layout, so you create a template and put in placeholders where the title will go, and where the body text will go. We have been dividing our HTML into sub-components for a very long time – regardless of whether you are generating HTML on the fly on the server (using PHP, Ruby, or another programming language), or using a static site generator like Jekyll.

The same happened a bit later for CSS. As the number of lines of CSS increased, we had to come up with a way to make sure one CSS-selector that we had written long ago for one HTML element, wouldn’t inadvertently match some other element, and mess up our layout without us even noticing. Probably the most well-known such naming convention is [BEM](http://getbem.com). Unfortunately, its just that: a convention, that we have to force ourselves to follow and that no compiler or tool helps us to enforce. (Classes are essentially the analog of global variables – which every programmer know are _bad_.) Also, our BEM components would rarely match up one-to-one with our HTML components mentioned above.

The last of the trifecta to grow in number of lines of code was, of course, JavaScript. Early libraries and Node.js’s `npm` package manager came up first with a way to package JavaScript code into neat tiny modules, and now we finally have [native JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), which behave more or less like modules in most programming languages.

However, what’s arguably more interesting than native JavaScript modules, is the kind of components that JavaScript frameworks and libraries have come up with to build GUIs. In [React](https://reactjs.org), for example, a component is simply a JavaScript function that takes some properties and returns an element. React elements are usually written in an HTML-like syntax called [JSX](https://reactjs.org/docs/introducing-jsx.html), but they are actually JavaScript objects that later will be rendered and inserted into the DOM. For example:

```jsx
const helloComponent = function(name){
  return <h1>Hello, {name}</h1>;
}

ReactDOM.render(
  helloComponent('Josh'),
  document.getElementById('root')
);
```

The input properties of components don’t need to be strings either, they can be arbitrary JavaScript objects, functions or React elements (leading to higher-order components – components that take other components as inputs – essentially [higher-order functions](https://eloquentjavascript.net/05_higher_order.html)).

With all our HTML now being contained in JavaScript modules, where does that leave CSS? Wouldn’t it be natural to merge our BEM-components in there as well? That’s exactly the idea of [CSSinJS](http://cssinjs.org): we can write JavaScript that then gets converted to CSS. For example:

```jsx
import React from 'react'
import injectSheet from 'react-jss'
import base from 'my-project-base-css'

const styles = {
  title: {
    fontSize: base.fontSize * 2,
    '&:hover': {
      background: color('blue').darken(0.3).hex()
    }
  },
  '@media (min-width: 1024px)': {
    title: {
      width: 200
    }
  }
}

const HelloComponent = ({classes, name}) => (
  <h1 className={classes.title}>
    Hello, {name}
  </h1>
)

export default injectSheet(styles)(HelloComponent)
```

Which will render to something like:

```html
<style>
.title-123456 {
  font-size: 24px;
}
.title-123456:hover {
  background: #000080;
}
@media (min-width: 1024px) {
  .title-123456 {
    width: 200px;
  }
}
</style>
<h1 class="title-123456">
  Hello, Josh
</h1>
```

Where you previously would have used BEM rules to prevent class name clashes, the library now generates unique class names for you. Instead of Sass mixins, you can now use the full power of normal JavaScript functions to generate things. Since your build tools now know which CSS is used where, this opens up the possibility for automatic optimizations, like only loading critical CSS on first page load, or generating the optimal set of atomic classes needed (so you actually end up with less CSS sent to the client than if you had written it by hand). Read Mark Dalgleish’s excellent article [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660), if you need more convincing.

Traditionally, the part of the code concerned with rendering views was often organized by file type: you had one folder with all the HTML templates, one folder with all the CSS, one with all the JavaScript, and yet another with all the images. In a component-based architecture, that’s not the case anymore: every component has its own folder containing all its assets. And yet, since a component is simply a JavaScript module exporting a function, its interface to the outside world is very simple.

Components give us two things that are indispensable for creating a large, yet maintainable, codebase:

1. scoping (of class names, variable names and application state) – whatever happens inside a component stays inside the component and doesn’t break other parts of your project.
2. composition (of sub-components into bigger components)

And components do this by bundling the HTML, CSS and JavaScript together that belongs together.


## What about progressive enhancement?

“But”, I hear you asking: “what about progressive enhancement?”

It is important to note, that although the advances in component-based architectures for the web were motivated in the rising complexity of client-side JavaScript in webapps, there is nothing stopping you from applying the same approaches on the server-side as well.

In fact, it is highly recommended, to set up your site for server-side rendering: executing the JavaScript using Node.js and sending the rendered HTML to the browser. This helps support clients without JavaScript, and also ensures a fast initial page load. (When the JavaScript is pulled in after the initial page load, ideally it can take over the existing DOM without rerendering, a technique called _hydrating_.)

You might say, it’s very rare to still have browsers access your website that don’t support JavaScript. With the proliferation of smartphones, modern browsers are quite prevalent even in developing countries. And a progressive web app (making use of [service workers and caching](https://alistapart.com/article/going-offline)) probably helps those users with a shaky internet connection [much more](https://nolanlawson.com/2016/10/13/progressive-enhancement-isnt-dead-but-it-smells-funny/) than a traditional website, which cannot do anything without a page load from the server.

However, let’s think about future browsers as well. I sometimes picture this JavaScript-less-client as the [Internet Archive](http://archive.org/web/) (or a similar service). Imagine someone finds a scraped copy of your website in, say, a hundred years. I’m very confident that they will be able to open the HTML file in a plain text editor and immediately read the text. (I can open any `.txt` file today, and ASCII was invented in 1963 – more than half a century ago!) Probably, they’ll even have some sort of browser that can render the HTML and CSS into something quite closely resembling what you’re seeing today. It’s all declarative, so even if the computing infrastructure of that time will be very different, they might have simply re-implemented the spec again and again – just like the source code of the rendering engines of today’s browsers looks very different from the source of Mosaic.

However, JavaScript will probably be different. It’s a Turing-complete language that is much more closely coupled to current hardware. If execution fails at one point, it usually cannot be recovered from. Just think of all the websites that were built specifically for Internet Explorer 6 – can you still make them work today? [MDN has a growing list](https://developer.mozilla.org/bm/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features) of the parts of JavaScript that are deprecated or even obsolete – i.e. actually no longer work in today’s browsers. By its very nature, JavaScript execution is just a lot more fragile than the interpretation of a declarative, domain-specific language like HTML or CSS. If you’re building an app, that’s unfortunately kind of to be expected. (Can you still run your Windows 95 or Mac OS 9 apps?) But if you’re publishing public documents, that’s not acceptable. Again, it’s all about picking the right tools for the right job and knowing the trade-offs.


## What now?

I’m not saying you should throw out your battle-tested web stack right now and replace it with the newest hip JavaScript framework, that few of your developers have experience with, and that will break your code on an update every few months, because its still under early development and regularly introducing breaking changes. But there _are_ interesting things being prototyped, built and tested in the JavaScript ecosystem. And the component-based architecture described above is, at least to me, currently one of the most exciting ones.

As learnings are made and things settle down, components might be standardized, so they can be used across frameworks and other tooling. (A first, probably in retrospect failed, start at standardization was made with [Web Components](https://dmitriid.com/blog/2017/03/the-broken-promise-of-web-components/).)

You might not even have to write JavaScript, but could use another programming language – be it [TypeScript](https://www.typescriptlang.org), [PureScript](http://www.purescript.org) or [Rust](https://www.rust-lang.org) – and compile to JavaScript or [WebAssembly](https://hacks.mozilla.org/2018/04/hello-wasm-pack/). Or wait for other front-end build tools to adopt a component-based architecture.

Again, it’s all about choosing the right tool for the right job. Especially if you are building a simple site with a small number of widgets and lines of code, there is relatively little to be gained by the abstraction of components. The additional tooling will only increase the complexity of the project.

Even if it may have been an accident of history, JavaScript is a part of the web now, and here to stay. It’s important to understand its strengths and weaknesses and make choices accordingly. Let’s learn from the successes and failures being made in the JavaScript community, and keep building a better web, together.
