---
layout: post
title: "Github Issuess and Jekyll"
date: "2015-09-14"
image:
    feature: headers/issuesblog.png
tags: [dev, blog, github, github issues, rant, updates]
excerpt_separator: <!--more-->
---

I've recently made a small update to my blog, and I'd like to share the how, the why and the what. I'm also going to take the time and ask you to provide me some feedback on my posts from now on, since this small update enhances just that.

<!--more-->

## What

First things first, what is it?

#### Well, see the little bar on the bottom that follows your scrolling?

Have you hovered around it yet? It's simply a shorthand for creating a new [GitHub Issue](https://developer.github.com/v3/issues/) on my [repository](https://github.com/sabinmarcu/sabinmarcu.github.io/) ([current issues](https://github.com/sabinmarcu/sabinmarcu.github.io/labels/post)). I'm planning to use Github Issues with some useful labels as a feedback system.

## Why?

Think about it for a second. This blog is hosted on [Github Pages](https://pages.github.com/), with [Jekyll](https://jekyllrb.com/), so a [Github Repository](https://github.com) is the means to do it. Github Repositories have Github Issues enabled. When you make a new commit, you can reference an issue, and the other way around, an issue can reference a commit. It's the perfect integration.

When someone has something they might want to add to improve the post itself, or just leave feedback, they're welcome to do so with issues to ensure that the changes end up in the post.

For everything else there's the comments section.

## How?

That's the easy bit. I just created some labels specifically for posts, and used those. Linking the buttons to Github Issues was done with URLS of the type:

`https://github.com/sabinmarcu/sabinmarcu.github.io/issues/new?title=Issue with "<POST>"&assignee=<ME/USERNAME>&labels[]=<LABEL 1>&labels[]=<LABEL 2>[...]`

This way, the assignee, post title and correct labels are pre-filled and the person just needs to login with his Github account (gets rid of spam, too) and carry on with the body of the issue.

> Hey, I'm a dev. Most of my friends and readers are devs. I expect most people that would use this feature to have Github to begin with.

# That's it for today

Until next time, 'ave a good one!
