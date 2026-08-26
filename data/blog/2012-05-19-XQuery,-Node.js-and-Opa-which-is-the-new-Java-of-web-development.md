---
title:  "XQuery, Node.js and Opa – which is the “new Java” of web development?"
date:   2012-05-19
tags: tech
---

I know it’s dangerous to draw conclusions from analogies, but what are we supposed to learn from, if not from the past?

This was before my time, but from what I gather, the programming language and development environment Smalltalk failed because the competitor Java came along which borrowed a few concepts from Smalltak but additionally had…

-   a C-like syntax that was familiar to almost all programmers
-   applets to run the code in the browser,
-   free (initially as in beer) development tools provided by Sun, and
-   is statically typed.

As of today, Java is one of the most widely used programming languages in a variety of domains, taught in schools and universities and known by every respectable software developer. Although Java applets in the browser were since displaced by first Flash and more recently HTML5+JavaScript.

The web as a platform is only gaining in importance and everybody is waiting for the “next big thing”. A language that could be used through all three tiers of web development: database queries, server-side programming, plus client-side programming of the browser. There are a number of contenders, such as [Opa](http://opalang.org/), XQuery (e.g. using [Sausalito](http://www.28msec.com) which uses [Zorba](http://www.zorba-xquery.com/)) and JavaScript (e.g. using [Meteor](http://meteor.com/), [Derby](http://derbyjs.com/) or [SocketStream](http://www.socketstream.org/) which all run on the [Node.js](http://www.nodejs.org) server). But which one, if any of those, will ensue to be the dominant one, the “new Java”?

Since the only language that is supported by all major browsers on all major platforms is JavaScript, we’re pretty much stuck with it on the client side. (I think it’s rather doubtful that Google’s Dart will catch on). So whatever language will win, will necessarily need to compile to JavaScript – or be JavaScript.

So how do they compare through the lens at the analogy with Smalltalk and Java? While XQuery and Opa are statically typed which is an advantage in my opinion, JavaScript scores high in having…

-   a C-like (and by extension Java-like) syntax that is still very familiar to almost all programmers (and those that don’t like that can still use CoffeeScript),
-   native support in the browser,
-   free (as in freedom and as in beer) tools and libraries.

Zorba is also distributed under the permissive Apache license, but it is not even a complete Application Server. Opa is available under the GNU Affero General Public License which [requires](http://news.ycombinator.com/item?id=2925609) any provider making use of it to open source his code as well. On the other hand, Node.js, Meteor, Derby and SocketStream are all available under the permissive MIT license which make them even more free (in the sense that you don’t have to contribute back to the community if you don’t want to).

So if history is any indication, JavaScript might have an edge over the other contenders. What do you think? Which one (or what other language/tool set) will win?

