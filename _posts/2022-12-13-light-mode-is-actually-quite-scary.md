---
title: Light mode is actually quite scary
---

The dark-mode vs light-mode discussion [popped up on Hacker News again](https://news.ycombinator.com/item?id=33947820) so I wanted to summarise all I cound find about it.

In chronological order:

* [An overview of standards and guidelines for visual display terminals](https://www.sciencedirect.com/science/article/abs/pii/0003687084900607) (Sept 1984)

Suggests that contrast ratio over 20:1 is associated with user eye fatigute, and dark-mode displays are associated with "higher comfort" and "higher user acceptance". Also discusses many other points like green-screen vs orange-screen, keyboard height, etc.

* [Smaller pupil size and better proofreading performance with positive than with negative polarity displays](https://doi.org/10.1080/00140139.2014.948496) (Sept 2013)

"Positive polarity" (light mode) results in better proofreading performance.

* [Digital eye strain: prevalence, measurement and amelioration](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6020759/) (April 2018)

Digital eye strain (DES) is most likely associated with not blinking for long periods, too-small fonts, or undiagnosed eye defects (astigmatism). Blue light might be a factor.

* [Reading and Myopia: Contrast Polarity Matters](https://www.nature.com/articles/s41598-018-28904-x) (July 2018)

**Prolonged exposure to black-on-white (light mode) thins the choroid which is associated with myopia, while white-on-black (dark mode) thickens the choroid which inhibits myopia.**

* [Blue light may not be as disruptive to our sleep patterns as originally thought](https://www.sciencedaily.com/releases/2019/12/191216173654.htm)

Blue light might not be so bad, bright yellow light produced poor sleep patterns `#inmice`. Suggests dim cool colours in evening, bright warm colours in the day.

* [Dark Mode vs. Light Mode: Which Is Better? - NN Group](https://www.nngroup.com/articles/dark-mode/) (Feb 2020)

Light mode is better for small cognitive tasks, but the effect decreases with age. People with cloudy vision defects might perform better with light mode. Cites the "Reading and Myopia" paper above.

* [Which colour scheme is better? - Brent from Stitcher](https://stitcher.io/blog/why-light-themes-are-better-according-to-science) (Sept 2020)

Coding with a dark theme adds measurable milliseconds of cognitive delay. Etienne Grandjean's "Ergonomic Aspects of Visual Display Terminals" (1980) [[1](https://www.semanticscholar.org/paper/Ergonomic-aspects-of-visual-display-terminals-Grandjean-Vigliani/fdfb8d1c430a7bb75c19f29b1dcf1da8add15746), [2](https://www.semanticscholar.org/paper/Ergonomic-Aspects-of-Visual-Display-Terminals%3A-of-Grandjean-Vigliani/568f00581cd402d7821bc3b9773af7e72891a5a7), [3](https://www.amazon.com.au/Ergonomic-Aspects-Visual-Display-Terminals/dp/0850662117), [4](https://dl.acm.org/doi/book/10.5555/578434)] determined that it's easier to proofread dark text on light background (light mode). I wish there was a copy of this paper online.

* <https://kevquirk.com/is-dark-mode-such-a-good-idea/> (2020)

Cites the NN Group page about light mode performance increase. Cites a [2019 Vice article](https://www.vice.com/en/article/ywyqxw/apple-dark-mode-eye-strain-battery-life) which cites the "Digital eye strain" study. Dark mode doesn't save battery unless it's true `#000` black on OLED screen. Users should be given flexibility to choose. Somehow comes to the conclusion that dark mode damages eyes?

* <https://medium.com/codesphere-cloud/should-you-really-be-coding-in-dark-mode-1c34c7cf5f99> (June 2021)

Cites the "Smaller pupil size" paper. Cites the "Blue light" study and says that screen use altogether before bed isn't great. True-black-on-OLED power usage again. Users should be given flexibility to choose.

----

I actually started this post intending to write about accepting Brent from Stitcher's challenge and try light mode for a week with the following:

* Terminal: <https://github.com/solarized/xresources/blob/master/Xresources.light>
* Vim: <https://github.com/altercation/vim-colors-solarized> with `background=light`
* Firefox: <https://addons.mozilla.org/en-US/firefox/addon/zen-fox/>
* GTK: <https://github.com/Ferdi265/numix-solarized-gtk-theme>

However, having sorted through the above, two major points stand out to me:

### Risk of myopia increases with light mode

**Light mode increases risk of myopia.**

This is the most important to me.

My eyesight is fairly perfect and I'd like to keep it that way.

### Cognitive advantage of light mode is unsure

Whilst there is a repeatable cognitive advantage of light mode:

* It decreases with age after 20s.

I'm older than that now, so any cognitive advantage seems irrelevant to me.

* All research seems to be on instantaneous "glancing" cognition, like reading a sign, or proofreading of small passages.

I don't see research specifically to exposure for 8+ hours a day and to the cognition of knowledge work like programming and problem-solving.

Even if it makes me work a little slower, saving my eyes is more important so that I can continue to be productive into the future.

## Summary

With that, I'm switching back to dark mode.

