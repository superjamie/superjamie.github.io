---
title: December 2022 Links
---

## Slynyrd Pixelblog - 41 - Isometric Pixel art (2022)

* <https://www.slynyrd.com/blog/2022/11/28/pixelblog-41-isometric-pixel-art>

This whole blog looks great. Earlier posts have studies on NES Metroid and Castlevania!

## The Untold Unix Story by DJ Ware (2022)

* <https://www.youtube.com/watch?v=2oU6zEZafnQ>

I love Unix history. This whole channel seems generally Linux-interesting. Lions' book is around in many forms:

* <https://en.wikipedia.org/wiki/A_Commentary_on_the_UNIX_Operating_System>
* <https://archive.org/details/CommentarySixthEditionUNIX/6thEdLions/>
* <https://warsus.github.io/lions-/>
* <http://www.lemis.com/grog/Documentation/Lions/>

## hxtools

* <https://inai.de/projects/hxtools/>

A collection of random tools and scripts I came across in `apt`. Kind of like [moreutils](https://joeyh.name/code/moreutils/).

## ydiff

* <https://github.com/ymattw/ydiff>

Coloured diff output with side-by-side linked pagers, looks good.

## Keep cursor line vertically centered in vim

* <https://stackoverflow.com/questions/64280931/keep-cursor-line-vertically-centered-in-vim>

Saw a tip to try this, achieved with `set scrolloff=999`

## gitignore binary files that have no extension

* <https://stackoverflow.com/questions/5711120/gitignore-binary-files-that-have-no-extension>
* <https://stackoverflow.com/questions/19023550/how-do-i-add-files-without-dots-in-them-all-extension-less-files-to-the-gitign>

This is my default gitignore now.

## Optimizing web servers for high throughput and low latency (2017)

* <https://dropbox.tech/infrastructure/optimizing-web-servers-for-high-throughput-and-low-latency>

Great overview of this with lots of good links to follow.

## How I Slack (2022)

* <https://randsinrepose.com/archives/how-i-slack-2022/>

We're moving to Slack at work, this will be useful.

## C23 implications for C libraries (2022)

* <https://gustedt.wordpress.com/2022/12/06/c23-implications-for-c-libraries/>

Jens has finished the earlier version of the draft. Hurry up GCC.

## "Uptime of 15,364 days - The Computers of Voyager" hy Aaron Cummings (2019)

* <https://youtu.be/H62hZJVqs2o>

Another great Strange Loop conferencw talk. This guy doesn't even work for NASA or JPL, he's just a fan. That's awesome!

## sds - Simple Dynamic Strings (2014-present)

* <https://github.com/antirez/sds>

A C string library written by the same author as [Redis](https://en.wikipedia.org/wiki/Redis).

Interesting as it allocates the length of the string *before* the pointer which is returned, so the string functions know the length, but you can also pass an sds string to any of the regular string I/O functions.

Most string libraries include this in the returned pointer, like `struct mystring { size_t len; char *str; );`

## One Thing Well

* <https://onethingwell.org/>

A list of programs which follow the [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of doing one thing and doing it well.

This page is a 300+ page Tumblr blog, which is a bit of a read. At least it has tags.

## NormConf (2022)

* <https://www.youtube.com/@normconf>

I'm not entirely sure what "NormCore" is, but this online-only set of talks about "boring mid-level Data Science" happened. Ones I enjoyed:

* [Don't Do Invisible Work - Chris Albon](https://www.youtube.com/watch?v=HiF83i1OLOM) - I've kept an "activity log" for a while now, it's good
* [How to name files - Jennifer Bryan](https://www.youtube.com/watch?v=ES1LTlnpLMk) - I do something similar to this but it's good to have it formalised

## Don't Call Yourself A Programmer, And Other Career Advice (2011)

* <https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/>

tl;dr - Communicate well, when talking about job worth (eg: hiring) describe your achievements by the value they added, not the tech stack.

