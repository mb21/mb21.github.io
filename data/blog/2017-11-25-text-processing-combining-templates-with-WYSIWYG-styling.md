---
title:  'Text processing: combining templates with WYSIWYG-styling'
date:   2017-11-25
tags:   tech design
---

I keep chewing on the Atlantic’s article [The Coming Software Apocalypse](https://www.theatlantic.com/technology/archive/2017/09/saving-the-world-from-code/540393/). While I agree with it on the most part, it has that curious passage where the author proclaims WYSIWYG text editors like Word superior, as they provide immediate feedback to the user how the layout on the printed page is going to look like.

Yet it’s well known that Word sucks, and in part that’s because it doesn’t separate writing from layouting. At the same time as writing content, you style individual pieces of text (individual paragraphs, or even individual characters if you want to), which is very cumbersome and error-prone.

There is a much saner way of doing things: you first write the content (in Markdown, HTML or LaTeX), and only in a second step apply the layout (CSS or LaTeX template). That’s also the reason why the team behind [iA Writer went with a monospace font for their editor](https://ia.net/topics/in-search-of-the-perfect-writing-font/):

> In contrast to proportional fonts that communicate “this is almost done” monospace fonts suggest “this text is work in progress.” It is the more honest typographic choice for a text that is not ready to publish. [...]
>
> The typographic rawness of a monospace font tells the writer: “This is not about how it looks, but what it says. Say what you mean and worry about the style later.” Proportional fonts suggest “This is as good as done” and stand in an intimidating contrast to a raw draft.

And for quite some time, I thought this was the end of the discussion. However, the WYSIWYG-editors got one thing right: if and when the time for layouting has come, it is better to get immediate feedback on the design, instead of having to start a batch process which applies the layout and you see the result only after a couple of seconds (or often worse with LaTeX).

So why can’t we have the best of both worlds? Styling by template _and_ immediate feedback when tweaking the style.


|                      | batch processing | immediate feedback |
|:---------------------|:-----------------|:-------------------|
| **style individual pieces of text** | 💩 | Word-like WYSIWYG |
| **style by template**               | CSS, LaTeX   |   🏆    |

That’s how I got back to an old idea of mine: creating a markdown editor, that also has a preview pan in which you can change the CSS styles live with a simple GUI.

Not unlike changing CSS live in a modern browser’s web developer tools. There are some programs that have gone into this direction:

- [Webflow](https://webflow.com/)
- [Macaw](http://macaw.co/) (no longer under development)
- [Subform](https://subformapp.com/)

But they are targeted at web designers and not paired with a text or markdown editor.

I’m considering building this editor on top of GitHub’s Atom editor. Then we would get [collaborative editing](https://blog.atom.io/2017/11/15/code-together-in-real-time-with-teletype-for-atom.html), split screen, Vim-mode and other customizations for free. So I started a proof of concept to make [Atom look more like iA Writer](https://github.com/mb21/atom-markdown-editor-simple-style). But it appears that Atom is not quite ready for that kind of customization (line-height cannot be customized by a package and there are glitches with my CSS if you resize the window).

Coupled with [pandoc](http://pandoc.org/) as the markdown engine, we’d be already quite far. However, the layouting part needs some more thinking. For example: should the preview display complete pages with page breaks etc?

Also, let’s say that to start with, you (as the user) edit the styles of the current document only. You can then later export and import these to use them as a template across documents (or let’s say they are stored in a system-wide template-library). But this means that you can change a global CSS template, but immediately you can only see the layout changes to the current document (and even then, only the part of the document which is in your viewport).

Let’s see… hopefully I manage to work more on this.

**Update:** I created a basic [proof of concept layouting app](https://mb21.github.io/GUI-CSS-Editor).

**Update 2:** These thoughts evolved into [PanWriter](https://panwriter.com/).
