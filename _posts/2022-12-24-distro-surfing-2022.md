---
title: Distro Surfing 2022
---

*Update: I also have a [Part 2](2023-01-07-distro-surfing-2022-part-2.md)*

I have a preferred desktop setup with [MATE](https://mate-desktop.org/), but I like to go distro surfing every so often to look at what other desktop environments have to offer, know what's out there, and maybe get some new ideas.

Here's what I looked at recently, in no particular order:

## Cinnamon

* Cinnamon 5.6.5 in Linux Mint 21.1

Really good! I could configure everything I wanted. All the keyboard shortcuts I'm used to (except Super+Space). Could turn off lots of animations and thumbnails and desktop and other cruft. This is honestly probably a better desktop environment than MATE, even if it does use [a little bit more RAM](https://itvision.altervista.org/linux-desktop-environments-system-usage.html). I'd happily use Mint and Cinnamon right now. I would need to figure out how to write a [one pixel window border](https://github.com/superjamie/onepx).

**Rating: 5 stars!**

## XFCE

* XFCE v4.16 in Linux Mint 21.1

Unusable. Inconsistent theming with dark settings, some windows appear with dark borders, some appear with light borders. Strange to have two places to configure keyboard shortcuts (Keyboard settings, Window Manager settings). Some key presses and mouse clicks visually register but don't actually do anything. Trying again works. Most importantly, after removing some default shortcut, the panel took over Super and broke my whole workflow. A broken disappointment.

**Rating: 0 stars**

## GNOME

* GNOME 42.2 in Ubuntu 22.04
* GNOME 42.5 in Pop OS 22.04

I dislike the mouse-dependent "activities" flyover paradigm this is going for, it's like it's trying to copy the Mac desktop without actually understanding the ideas behind the environment. No way to disable desktop icons. No way to center windows. Keyboard settings are very tedious, requiring an extra click to set *every* setting. Some button text overrides its borders. Big ugly top window borders that waste so much space. Side dock taking up unnecessary space, though it can be covered by windows. Top panel taking up more space for minimal functionality, and I dislike top panels as they're an ergonomic anti-pattern. The irony of having "privacy" options which default to the bad settings. I'd be very unhappy if I had to use this.

**Rating: 0 stars**

## Pantheon

* elementary 6.1

Does the whole "activities" thing like Mac too. Copies Mac in some unintuitive ways (eg: similarly useless top bar like GNOME) but doesn't box you into its own ideas so much. Not a fan of the default terminal, which has transparency and no way to change the colour theme. "Code" editor has Vim emulation but no way to tell what mode you're in. "Web" browser based on Epiphany is limited but supports Firefox Sync. Overall not my preference, would take a lot of configuration and extra apps, still probably stuck with big top window borders and top panel. Better than GNOME and maybe the path of least resistance to get Mac users onto Linux.

**Rating: 2 stars**

## LXQt

* LXQt 0.17.0 in Lubuntu 22.04

Like going back in time 15 years. Janky unmatched theming, basic inferior apps, Openbox window manager. Needs dark widget theme, better text editor, better terminal. If I used this I'd be configuring Openbox manually with the text file like I did in 2009 and be using apps from other DEs. At least it is minimal and gets out of the way. Viable with a lot of effort but not optimal.

**Rating: 1 star**

## Budgie

* Ubuntu Budgie 22.10

I had read this was a whole new DE, but it's obviously just GNOME with very minor changes. No thanks.

**Rating: 0 stars**

## KDE

* KDE Plasma 5.20 in Kubuntu 22.04

Very surprising! I'd always heard how this was a very polished and modern environment, but it actually felt very "old Linux" with lots of settings everywhere. So many settings that it's a little overwhelming at times. There are some animations and other heavy cruft which appear to be all configurable. Kate editor looks intersting, many options including Vim mode, Git, and even LSP support! Quite powerful how you can configure toolbars for each application. Nice to see all the apps don't start with K anymore like they used to in KDE3.

I can see why people love KDE, they've invested a lot of time learning it (so feel that same self-taught pride like driving a car) and setting it up just how they want. The developers obviously respect the users and try to make it all things to all people, and they appear to have largely succeeded. Not my primary choice but I think I could grow to enjoy it.

I like the idea of binding `Win+.` to an emoji/unicode selector, I will steal that.

**Rating: 3 stars**

## Bonus: Ventoy

* <https://www.ventoy.net/>

Not a desktop environment, but a shoutout to this great USB drive booloader. It lets you copy ISOs to a USB drive and boot from them with a menu. Much easier than `dd`'ing every image individually.

