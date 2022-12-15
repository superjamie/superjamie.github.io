---
title: A small story about premature optimisation
---

There's that saying in software "Premature optimisation is the root of all evil", popularised by [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth) and which some say can be attributed to [Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare). The full quote from Knuth's paper [Structured Programming with go to Statements](https://dl.acm.org/doi/10.1145/356635.356640) reads:

> There is no doubt that the grail of efficiency leads to abuse. Programmers waste enormous amounts of time thinking about, or worrying about, the speed of noncritical parts of their programs, and these attempts at efficiency actually have a strong negative impact when debugging and maintenance are considered. We *should* forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil.

For a little roguelike tile engine I'm writing, I wanted to do a character lookup from Unicode to [Codepage 437](https://en.wikipedia.org/wiki/Code_page_437). The canonical reference is seen in [cp437.h](https://github.com/Journeyman-dev/cp437.h/blob/main/include/cp437.h) and the same lookup table is [in libtcod](https://github.com/libtcod/libtcod/blob/main/src/libtcod/tileset.h) too.

Going the other way is easy, from Codepage 437 to Unicode, simply use the character code to look up the array.

For example, the second character is the smiley face, so we pick `TABLE[1]` and get `0x263A` which sure enough is Unicode &#x263A;. What a nice O(1) algorithm.

But what if we want to do the reverse lookup?

The most naive way is just scan the table from start to end, but that becomes an O(n) algorithm, and especially bad if I'm looking up the later characters like line drawing or the second-to-last "black square" &#x25A0;.

A co-worker and I did some bike-shedding about this and thought of several ways to improve it, but when I went to implement it I just did the dumb worst algorithm to get it done.

I measured the performance of drawing random Codepage 437 characters to the screen and got about 315 frames per second.

I then performed the same test drawing a random unicode character and causing the lookup to happen for every character and got... about 315 frames per second.

So, at least for now, this part of my program is not the bottleneck and doesn't need further optimisation.

<small>(the utility of measuring frames per second in a turn-based game engine is an exercise left to the reader)</small>

