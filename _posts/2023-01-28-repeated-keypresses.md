---
title: Repeated Keypresses - an application usage anti-pattern
---

Repeated keypresses are an application usage anti-pattern. We should try to recognise when we're using repeated keypresses, and replace them with more meaningful alternatlves.

This whole idea comes from disabling your arrow keys in the Vim editor, because repeatedly pressing **Up,Up,Up,Up** is an inefficient way to use the editor. For that particular movement you could have used `4k` to move up three lines.

There are many others places that repeated keypresses can be removed, here are a few ideas.

## Vim

If you get serious about learning Vim, one of the first things you should do is disable the arrow keys to train yourself away from them.

Unfortunately, that often leads to just repeating the same anti-pattern with the `hjkl` movement keys, like pressing `kkkk` to move up 4 lines.

Drew Neil ([Vimcasts](http://vimcasts.org/episodes/archive/) videos, [Practical Vim](https://pragprog.com/titles/dnvim2/practical-vim-second-edition/) book) has a post about this: [Habit breaking, habit making (2013)](http://vimcasts.org/blog/2013/02/habit-breaking-habit-making/) where he introduces the idea of disabling the arrow and `hjkl` keys, and shows the old [vim-hardmode](https://github.com/wikitopian/hardmode) plugin which is deprecated now.

The modern version of hardmode is [vim-hardtime](https://github.com/takac/vim-hardtime). I recommend using this and enabling it by default in your `~/.vimrc`. Here are my settings:

```
let g:hardtime_default_on = 1
let g:hardtime_maxcount = 3
```

This lets me use one of the motion keys up to three times like `jjj` (to address overshoots and nearby quick movements) but no more.

To move around text, you can use the `fF` (forward/backward to character) or `tT` (to character) motions, or the `/?` keys (search forward/backward).

You can combine these with editing commands, for example, given the cursor at `█`:

```
The █quick brown fox jumped over the lazy dog.
```

You could delete to "lazy" with `dtl` (delete, to, "l"). This gives us:

```
The █lazy dog.
```

What about more difficult text with similar characters?

```
She █sells sea shells by the sea shore.
```

This is where [vim-sneak](https://github.com/justinmk/vim-sneak) becomes useful. It uses the same ideas as the `fFtT` mappings, but matches **two** characters.

We could delete up to "shore" with `dzsh;` (delete, zneak, "sh", next match). The "next match" is used because "shells" also starts with "sh". This gives us:

```
She █shore.
```

The `zZ` mappings are used in motions because `sS` is more commonly used by [vim-surround](https://github.com/tpope/vim-surround).

Moving around text normally, you use the `sS` motions.

To just move to "shore" we would have used `ssh;` (sneak to, sh, next match). This gives us:

```
She sells sea shells by the sea █shore.
```

vim-sneak also adds little coloured annotations so you can see all the "next matches" available on the page, and move to them with one letter. See the [vim-sneak](https://github.com/justinmk/vim-sneak) page for an image of those.

To move around lines easier, you could use [vim-numbertoggle](https://github.com/jeffkreeftmeijer/vim-numbertoggle), which sets relative numbers and absolute numbers in a sensible way. Again see the link for a great image.

## Web Browser

We all use web browsers with a lot of tabs these days, you probably find yourself using **Ctrl+PgUp/PgDn** to move through tabs. But that's a repeated keypress. Is there a better way?

If you have 9 or less tabs open, you can move to them with **Alt+number**. For example, moving to the first tab is **Alt+1**, moving to the second tab is **Alt+2** and so on. But we hit a limitation with 9 tabs, because **Alt+8** is the 8th tab, and **Alt+9** is the rightmost tab.

You can cycle through tabs with **Ctrl+Tab** and cycle backwards with **Ctrl+Shift+Tab**, but again this is a repeated keypress.

Firefox (the superior browser) allows tab search in its awesomebar. Hit **Ctrl+l** to focus the address bar and start typing an open tab match. You'll get an option "Switch to Tab", so press down and Enter and you're there!

Firefox also allows you to map **Ctrl+Tab** to "switch to last tab", for easily moving back and forth between two tabs. In Preferences, this is "Ctrl+Tab cycles through tabs in recently used order".

Chrome/Chromium doesn't have this as far as I can see. I don't use the Chromium family of browsers at all, so I don't know of an option there. Maybe there's an extension? Maybe you should use Firefox.

Both browsers support **Ctrl*l** to focus the address bar where you can:

* Search with your default search engine: type a word and press **Enter**
* Go to a .com domain: type the domain like "google" and press **Ctrl+Enter**

Both browsers support searching in the current page with **Ctrl+f**.

Firefox also supports finding clickable text with the **'** (single quote, next to semicolon in US layout) then **Enter** to follow the link. This is great for browsing text-heavy pages like [https://en.wikipedia.org/](Wikipedia). Try it now with **'wiki** in Firefox (the search is not case sensitive).

Generally you should learn your browser keyboard shortcuts:

* [Firefox: Keyboard shortcuts - Perform common Firefox tasks quickly](https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly)
* [Chrome: Chrome keyboard shortcuts](https://support.google.com/chrome/answer/157179)

## Alt+Tab

Here's a spicy one. The pattern of switching through application with repeated **Alt*Tab** is one of the worst desktop usage patterns.

Tiling window managers like [i3](https://i3wm.org/) and [Sway](https://swaywm.org/) try to avoid this by having applications on different workspaces (virtual desktops) which you can switch to with **Win+number**, or by having applications in a split which you switch to with the Vim direction keys **Win+hjkl**. This is pretty good.

The [rofi](https://davatorium.github.io/rofi/) application launcher allows smart matching of commands or applications to launch.

So you can `rofi -show drun` and start typing "fir" then just press Enter to launch Firefox.

i3 and Sway bind `rofi -show drun` to **Win+d** for this purpose.

I propose to change this to `rofi -combi-modi window,drun,run -show combi` which adds a window switcher. You can use `windowcd` to limit it to the current workspace. I bind this to **Win+Space** for my desktop, but you could bind it to **Win+d** if you use i3/Sway, or take the plunge and bind it to **Alt+Tab**.

Now you can hit your key, type the partial name of the window you want, and switch to it with **Enter**. Much quicker and better than cycling through **Alt+Tab** until you get there.

This has the added advantage that if the appication isn't already open, it's launched instead!

## Summary

Find repeated keypresses in your current workflow and eliminate them.

This will give you a more efficient and more intentioned application usage experience.

Get the computer to do what you actually want, instead of doomscrolling through all available options.

What replacements have you found which are useful?

