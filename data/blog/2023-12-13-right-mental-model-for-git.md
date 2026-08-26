---
title: The right mental model for Git
date: 2023-12-13
tags: tech
---

This post was prompted by [Julia Evans](https://jvns.ca) ruminations on Mastodon while she was working on a tutorial zine about the version control system [Git](https://git-scm.com). In particular, I posted a rough version of this post in [this thread](https://hachyderm.io/@mb21/111569162158572506) but wanted to flesh it out here.

While (almost) everyone agrees that the user-experience of Git's command-line interface is terrible (there are a lot of confusing names to memorize, and any one command does a lot of different things), people disagree on whether the underlying concepts of Git are intuitive or not. I happen to be one of those people that are perfectly happy thinking of a Git repository as a DAG ([Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)) of commits.

While I'm not claiming this is 100% right, the following mental model of Git has served me very well:

- A **commit** is identified by a [hash](https://www.codecademy.com/resources/blog/what-is-hashing/) (e.g. `84ecff443c07dd3c7e8a3b6cee5a0fd51dc7f891`), which is computed from:
   1. a [diff](https://en.wikipedia.org/wiki/Diff) of all the changes,
   2. the commit message,
   3. a parent pointer (which is just the parent commit’s hash).

    By following a commit's parent pointers recursively and adding all the diffs from the beginning, a snapshot of your files at any point in the history can be reconstructed. (Implementation-wise these snapshots surely are cached, because otherwise things would be very slow, but that’s best seen as an implementation detail.)

- A **branch** (e.g. `main`) is a named pointer to a commit. The pointer is often automatically moved along (e.g. when adding new commits to a branch).

- A **merge commit** has two parent pointers, which makes them a bit hard to work with.

- There are various git commands that are known under the term **rewriting history** (e.g. `git rebase`, `--amend`, etc). However, these commands don't modify a commit (which is impossible, since that would change its hash). These commands actually create new commits from old ones, and then point the branch to the last new commit.

    The old commits are usually orphaned by that operation – meaning they’re not reachable by following the parent pointers of any branch. But you can still find orphaned commits via `git reflog` – until they’re garbage collected.

    Rewriting history and then pushing the change to a remote branch (e.g. on GitHub) requires a force-push. You should only do that if you know what you’re doing, and should never do that if others already have started work based on that branch, as that would leave their local branch in an incompatible state with the remote branch (their parent pointers would point to commits that no longer exist).

- A **remote** (e.g `origin`) is a shortname for a url (e.g `https://github.com/my-user/my-repo`), with the url locating a remote repository (often on GitHub). `git fetch` downloads commits from that url into a local branch (e.g. `origin/main`), which can then be merged into a normal local branch (e.g. `main`). `git pull` does `git fetch` followed by `git merge`.

The bad news is that there are more Git concepts than just these (such as ssh keys, tags, stashing, merge strategies, etc). But keeping this mental model in mind should keep you mostly sane.

While I had the (mis-)fortune to just bite the bullet and learn git on the commandline, I've heard good things of [GitUp](https://gitup.co) (if you're a mac user) and [Magit](https://magit.vc) (if you're an emacs user). Finally, if you just want something simple and stupid, [GitHub Desktop](https://desktop.github.com) works fairly well (you might want to start with [this 20min video](https://www.youtube.com/watch?v=8Dd7KRpKeaE)).
