---
layout: post
title: "Use for the Pi"
date: "2015-09-11"
description: "One possible use for the Raspberry Pi"
tags: [raspberry pi, music, mopidy, mopify, ncmpcpp]
image:
  feature: raspberrypi/rasp.jpg
  credit: wikipedia
  creditlink: https://www.wikiwand.com/simple/Raspberry_Pi
---

A few days ago, I described my [Trek through Raspberry Pi and Wifi configs (including APs)](/dev-blog/{% post_url 2015-09-07-_raspwifi %}). Today, I want to talk about a possible use for such a setup.

At first I wanted to use it to compile my apps, and serve them. Note, I'm using [WebPack](https://webpack.github.io/) to compile my app, with a lot of plugins on the way. I thought my Pi would be strong enough to do that, even at a slower pace, but after 10 minutes of waiting for webpack to boot, I gave up. Ironically, as per [Murphy's laws](http://murphyslaws.net/), as soon as I disconnected the Pi from a power source I saw that it finally made the initial compile. It wouldn't have been efficient anyway.

#### My second idea then was to make it a remote [Spotify](http://spotify.com) client. I didn't want much from it: just a command line interface so I could pick / skip a song, volume control was optional.

---

## TL;DR:

The simple CLI I had in mind isn't working right now. I ended up using [MPD](http://www.musicpd.org/) (more exactly: [Mopidy](https://www.mopidy.com/)) with both a CLI client and a Web client, either of them work fine.

Full process supplied below:

## Despotify

The first thing I found that would match my criteria was [Despotify](http://despotify.sourceforge.net/). It's supposed to be a simple CLI version of Spotify that would work with Spotify premium accounts. Turns out, it's not working that well.

First off, I used [this guide](http://mitchfournier.com/2013/03/26/install-command-line-spotify-on-a-headless-raspberry-pi/) to set things up (and I do recommend following up if you intend to try it out yourself), but ended up changing a few things.

For instance, at **Part One** - *Step 2* that command no longer works. Here's how to fix it:

{% highlight sh %}
# From
$ svn co https://despotify.svn.sourceforge.net/svnroot/despotify despotify
# change it to
$ svn checkout svn://svn.code.sf.net/p/despotify/code/ despotify-code
{% endhighlight %}

and the cloning will work. Secondly, the build-script needed a change for my setup (might not apply to all). To use my fix, edit `Makefile` and edit line `9` like so:

{% highlight make %}

# From
8:  CFLAGS = -Wall -Wextra -ggdb -std=gnu99
9:  LDFLAGS = -lz -lvorbisfile

# To
8:  CFLAGS = -Wall -Wextra -ggdb -std=gnu99
9:  LDFLAGS = -lz -lvorbisfile -lpthread


{% endhighlight %}

and that will get rid of the installation problems you might have later on. This has, however made my installation not work at all. The simple util will crash on any attempt, and the GUI (-ish) one will not even make a single search. Perhaps I did something wrong (like *lpthread* being crucial and me being an idiot for not making sure it exists and just ignoring it).

## Enter Mopidy

Mopidy is a nice wrapper over MPD, which (as linked above) is a media server of sorts. Mopidy will allow you to stream Spotify from a local server. I followed their [installation](https://docs.mopidy.com/en/latest/installation/) and [configuration](https://docs.mopidy.com/en/latest/config/) guides, especially those with regards to [the raspberry pi](https://docs.mopidy.com/en/latest/config/). Something that was not very clear from the instructions is that you actually need to install the **Spotify Extension** and a UI / client for it to work properly. I used the extension, **Mopify** web client and **ncmpcpp** as a gui client. Both kind of work the same, but different at the same time. Mopify *can access the Songs library*, and generally works better, while ncmpcpp works without http and *can only access playlists*. Both, however, work just fine with *next/previous/play/pause*. Here are the steps to get these started:

{% highlight sh %}
# As far as apt-get is concerned, we can install the spotify extension and ncmpcpp
$ sudo apt-get install mopidy-spotify ncmpcpp

# For the rest, we'll need PIP
$ wget https://bootstrap.pypa.io/get-pip.py
$ sudo pythin get-pip.py

# And now to install mopify
$ sudo pip install Mopidy-Mopify
{% endhighlight %}

From here, just some configuration is needed. Here is mine, for comparison:

`~/.conf/mopidy/mopidy.conf`


{% highlight registry %}
[mpd]
hostname = ::

[http]
hostname = ::

[mopify]
enabled = true
debug = true

[spotify]
enabled = true
username = <username>
password = <password>

[audio]
output = alsasink
{% endhighlight %}

At this point, I could access the web client (**mopify**) by going to:

`http://<Pi's address>:6800/`

and use the GUI there, or ssh into the Pi and use **ncmpcpp**:

{% highlight sh %}
# SSH into it
$ ssh pi@thepiip

# Use ncmpcpp
$ ncmpcpp

{% endhighlight %}

It is a very slow process especially if you have a large library like mine. More often than not it's a long wait until a song starts, but the streaming is good, and the quality is at least decent. Hope this helps someone.


## Until next time, 'ave a good one!
