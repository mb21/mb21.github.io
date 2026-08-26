---
title:  Is software complexity growing over our heads?
date:   2017-11-11
tags:   tech
---

I just went through [this post of Bret Victor](http://worrydream.com/why-2017-05-08/). Couldn't get myself to agree with the linked essay [The resource leak bug of our civilization](http://countercomplex.blogspot.com/2014/08/the-resource-leak-bug-of-our.html). While I agree that our civilization's resource usage cannot continue like this on earth, I'm less sure whether that is still applicable in space.

Applying the same reasoning to software engineering seems even less valid – abstractions _are_ useful, even if I love simplicity as much as the next guy.

(I've certainly set up my computer to be as simple and lean as possible while still reaping the benefits of modern computing: in daily usage is only macOS, Chrome with JavaScript disabled for most domains, iA Writer for writing prose, MacVim for writing code, Terminal, Apple Mail, iMessage and Apple Calendar.)

However, I found the following two quotes very valuable.

> Costanza asked Sussman why MIT had switched away from Scheme for their introductory programming course, 6.001. This was a gem. He said that the reason that happened was because engineering in 1980 was not what it was in the mid-90s or in 2000. In 1980, good programmers spent a lot of time thinking, and then produced spare code that they thought should work. Code ran close to the metal, even Scheme — it was understandable all the way down. Like a resistor, where you could read the bands and know the power rating and the tolerance and the resistance and V=IR and that’s all there was to know. 6.001 had been conceived to teach engineers how to take small parts that they understood entirely and use simple techniques to compose them into larger things that do what you want.
>
> But programming now isn’t so much like that, said Sussman. Nowadays you muck around with incomprehensible or nonexistent man pages for software you don’t know who wrote. You have to do basic science on your libraries to see how they work, trying out different inputs and seeing how the code reacts. This is a fundamentally different job, and it needed a different course.
>
> So the good thing about the new 6.001 was that it was robot-centered — you had to program a little robot to move around. And robots are not like resistors, behaving according to ideal functions. Wheels slip, the environment changes, etc — you have to build in robustness to the system, in a different way than the one SICP discusses.
>
> And why Python, then? Well, said Sussman, it probably just had a library already implemented for the robotics interface, that was all.

There’s a [video of the above](https://vimeo.com/151465912#t=3577).

Also this excerpt from [Leslie Lamport: The Future of Computing: Logic or Biology (2003)](http://lamport.azurewebsites.net/pubs/future-of-computing.pdf):


> The fundamental problem with approaching computer systems as biological systems is that it means giving up on the idea of actually understanding the systems we build. We can’t make our software dependable if we don’t understand it. And as our society becomes ever more dependent on computer software, that software must be dependable. ...
>
> When people who can’t think logically design large systems, those systems become incomprehensible. And we start thinking of them as biological systems. Since biological systems are too complex to understand, it seems perfectly natural that computer programs should be too complex to understand.
>
> We should not accept this... If we don’t, then the future of computing will belong to biology, not logic. We will continue having to use computer programs that we don’t understand, and trying to coax them to do what we want. Instead of a sensible world of computing, we will live in a world of homeopathy and faith healing.

As AI and technologies like deep learning continue to yield better results, they are leaving us understanding them less and less. I wonder whether this is not unavoidable when we’re devising algorithms that deal with a lot of the complexities of the real world (e.g. self-driving cars etc).

However, there will always be problems that can (and should) be abstracted from real-world complexities. And those problems should indeed be solved using approaches that are more formal than current mainstream programming. See e.g. [The Coming Software Apocalypse article](https://www.theatlantic.com/technology/archive/2017/09/saving-the-world-from-code/540393/) or Haskell.
