---
layout: post
title: JS Memoization - functional or otherwise
---

Today i want to talk more along the lines of functional vs oop in JavaScript, with memorization as a case study. The point is that some of the recent frameworks and updated to the language are moving from the functional nature of JavaScript to the more oop like ES6/7. I don't have anything against it, even more, i approve the change. Sometimes, oop will save your ass. My fear is that the oop features will become mainstream and the beauty and utility of the functional base of the language will be forgotten, and most JS code will look like bad Java code.

The problem in case is this: Memoization. Memoization is, for those that do not know, basically caching the result of a function based on the arguments it was run with.

An example where this would be immeasurably useful is, well, any recursive function. An even better example would be a double recursive function like the classical `fib`.

{% highlight js %}

function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }

{% endhighlight %}

If you try to find `fib(25)` you have a decent chance of finding the answer in a short time, without blocking the OS or filling up the heap with pointless recursion levels. Try `fib(200)` and i guarantee that won't work. If you memoize the function, let's call it `mfib`, then even `mfib(500)` would be snappy. Let's take a look at a conventional way to do this (Note: Addi Osmani had a very good comparison with jsperf for these.)
t
