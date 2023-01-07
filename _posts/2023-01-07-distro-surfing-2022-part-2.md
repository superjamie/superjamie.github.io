---
title: Distro Surfing 2022 Part 2
---

After [my last post](2022-12-24-distro-surfing-2022.md) about trying out various Linux distros, [my friend Christian said](https://chaos.social/@globalc/109567190594790615) he was using [Sway](https://swaywm.org/) which is the Wayland version of [i3](https://i3wm.org/). It's been a while since I used i3 so I wanted to give it a try again and went hunting for a LiveCD of it.

I ended up finding several more spins of desktop environments, so gave them a go:

## Sway

* Sway 1.7 on Ubuntu Sway 22.10

Pretty nice. I use a set of keybindings similar to i3 already, so this wasn't a huge gap for me. The built-in help popup showed me how to drive it and some experimentation got me comfortable. It was a little difficult to set the bar to the bottom of the screen but I figured it out. I had some weird font scaling issues with `foot` terminal unless I set `dpi-aware=no`. Some minor polish issues like no graphical NetworkManager installed by default, but that's more the distro than the DE. This confirms my thought that I'd probably be very comfortable using i3 now, though I imagine it would take some learning and config time to get it perfect, which MATE and Cinnamon do almost by default. Good desktop that makes me want to explore it more.

**Rating: 4/5**

## Unity

* Unity 7.6 in Ubuntu Unity 22.04

Another Mac copy but they actually get the top bar right, with File/Edit/etc controls up there. The rest of the desktop didn't thrill me, I didn't like the launcher or "lens" concept. It hijacks too many keyboard shortcuts that I want to use. Lots of animation and blue and eye candy cruft. I'd be unhappy using this, just as I would be with Gnome.

**Rating: 0/5**

## Deepin

* Deepin 5.10? on Ubuntu DDE 22.04

Interesting looking desktop with lots of big buttons and transparency. Is this made for beginners? Seems to be based on KDE. The only reason I know this is because the very first thing I tried (switching to dark mode) resulted in a constant flood of "KWin Exited Unexpectedly" messages and made the system completely unusable and I had to force power off. Trying again gave me many things which just didn't work, keyboard shortcuts which can't be changed, window transparent corners which don't work properly so the window has a square shadow in the corner. Evidently needs a lot more work.

**Rating: 0/5**

## Kylin

* UKUI 3.1 on Ubuntu Kylin 22.04

Chinese desktop environment, even defaults to Chinese language by default. Wikipedia says this started out as a MATE fork, but has lost a lot of the customisation and options that MATE has. What's left is a strange desktop with few configuration options that reminds me more of using Windows XP or 7 than Linux. Seems to use applications from different graphical toolkits (GTK, Qt, etc) to get whatever job done that it needs. The English translation is not the best, and even with English selected, some text is not translated. I wouldn't use it.

**Rating: 0/5**

## Bonus: Android

I don't really expect to use Android as a desktop, but I was interested to see how these ran as a way to play mobile games on the computer. I tried:

* [Bliss](https://blissos.org/) v11.13 (Nov 2020)

This didn't go so well, it seems sometimes laptop touchpad clicks registered and sometimes they didn't. It couldn't decide what it wanted to use for a Home app, and I got a lot of force closes. Playing Monument Valley was very laggy and registered some clicks half a minute after making them. I think this was Android 8 or 9.

* [PrimeOS](https://www.primeos.in/) 2.13 (July 2022)

This worked a lot better! Games played smoothly, even 3D games like Riptide GP Renegade. It even comes with a keymapper to help play games, though it seems to be full of ads. I could also install all the usual things like Firefox and Termux so was quite at home. This is based on Android 11. It even has what it calls a "bridge" which allows execution of Arm games on x86 somehow. If I want to try Android games on the computer I'll give this a go again.

