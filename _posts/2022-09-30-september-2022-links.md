---
title: September 2022 Links
---

## Some ways to get better at debugging

* <https://jvns.ca/blog/2022/08/30/a-way-to-categorize-debugging-skills/>

Always-nice Julia post, links to troubleshooting papers:

* [Towards a Framework for Teaching Debugging, Jan 2019](https://doi.org/10.1145/3286960.3286970) (paywalled)
* [Learning to Troubleshoot: A New Theory-Based Design Architecture, June 2006](http://dx.doi.org/10.1007/s10648-006-9001-8) (free)

Reminded me of my favourite troubleshooting paper:

* [Diagnostic Quality Problem Solving: A Conceptual Framework and Six Strategies, Q4 2013](https://doi.org/10.1080/10686967.2013.11918362) (paywalled)

To get access to paywalled papers, try [Unpaywall]() browser extension, [Sci-Hub](https://sci-hub.41610.org/) website. You can also see if your local government library offers memberships, call a librarian to check, they love talking about papers :) Failing that, many universities offer cheap paid library access to non-students.

## The x86-64 processor (aka amd64, x64): Whirlwind tour

* <https://devblogs.microsoft.com/oldnewthing/20220831-00/?p=107077>

After a [massive series on aarch64](https://devblogs.microsoft.com/oldnewthing/20220726-00/?p=106898), based Raymond starts on amd64.

## Doom 32X Resurrection - Engine optimizations, part 1

* <https://github.com/viciious/d32xr/wiki/Engine-optimizations,-part-1>

There's a [ROM Hack for Doom 32X](https://www.romhacking.net/hacks/6269/) which improves it a lot. This walks through how.

## Integers in C

* <https://www.acepace.net/2020-09-20-integer_quiz/>

A fun quiz on signed/unsigned behaviour, and a set of supporting blog posts:

* <https://www.acepace.net/integerQuiz/>
* [A Guide to Undefined Behavior in C and C++, Part 1](https://blog.regehr.org/archives/213)
* [A Guide to Undefined Behavior in C and C++, Part 2](https://blog.regehr.org/archives/226)
* [A Guide to Undefined Behavior in C and C++, Part 3](https://blog.regehr.org/archives/232)

## Ask HN: What's the best source code you've read?

* <https://news.ycombinator.com/item?id=32793534>

The top comments here turned into an impromptu reunion of the Turbo C runtime authors, which is totally awesome.

I always love reading [musl libc](https://musl.libc.org/) which is simultaneiously very readable and very efficient. I think it takes real talent to write code like this.

John Regehr agrees in his [blog post about Teaching C](https://blog.regehr.org/archives/1393):

> Musl, in particular, is a good match for teaching since it contains lots of [cute little functions](https://git.musl-libc.org/cgit/musl/tree/src/string/memchr.c) that can be understood in isolation. From any such function we can launch a discussion about tradeoffs between portability, efficiency, maintainability, testability, etc. If Rich Felker (the Musl author) did something a certain way, there’s probably a good reason for it and we should be able to puzzle it out.

In [the HN thread about *that* post](https://news.ycombinator.com/item?id=32798826), we find some nice C safety rules:

* [The Power of 10: Rules for Developing Safety-Critical Code](https://en.wikipedia.org/wiki/The_Power_of_10:_Rules_for_Developing_Safety-Critical_Code)
* [The Ultimate Question of Programming, Refactoring, and Everything](https://pvs-studio.com/en/blog/posts/cpp/0391/)
* [Computer Systems: A Programmer's Perspective, 3/E (CS:APP3e)](https://csapp.cs.cmu.edu/)
* [the original HN thread about Teaching C](https://news.ycombinator.com/item?id=18334476)
* and the classes which arose from it (some exam questions available):
    * <https://www.cl.cam.ac.uk/teaching/1617/CandC++/>
    * <https://www.cl.cam.ac.uk/teaching/1819/ProgC/>

Back to the original post, apparently [redis](https://redis.io/) is quite good too. I'm vaguely aware that's some sort of caching thing. The website has a section "Use cases" which is very nice of them.

## Castlevania: SotN World Record Explained

* <https://youtu.be/FizsfBxc7ik>

The 16:26 speedrun explained. It's always great to see these. The amount of precision required to pull these movements off.

## glibc Fortification Levels

A set of posts which describe the glibc `_FORTIFY_SOURCE` macro.

* Mar 2014 - [Enhance application security with `FORTIFY_SOURCE`](https://www.redhat.com/en/blog/enhance-application-security-fortifysource)
* Apr 2021 - [Broadening compiler checks for buffer overflows in `_FORTIFY_SOURCE`](https://developers.redhat.com/blog/2021/04/16/broadening-compiler-checks-for-buffer-overflows-in-_fortify_source)
* Sep 2022 - [GCC's new fortification level: The gains and costs](https://developers.redhat.com/articles/2022/09/17/gccs-new-fortification-level)

## How To Write Unmaintainable Code

* <https://cs.fit.edu/~kgallagher/Schtick/How%20To%20Write%20Unmaintainable%20Code.html>

Proably very old, but I hadn't laughed this much in ages

## Effects of Grill Patterns on Fan Performance/Noise

* <https://www.pugetsystems.com/labs/articles/Effects-of-Grill-Patterns-on-Fan-Performance-Noise-107/>

Cool tests showing those wire fan grills are probably the best.

## Architecture of Consoles

"A practical analysis by Rodrigo Copetti". In-depth look at consoles from NES to Wii.

* <https://classic.copetti.org/writings/consoles/>

## Banned functions in git

* <https://github.com/git/git/blob/master/banned.h>

strcpy, strcat, strncpy, strncat, sprintf, vsprintf, gmtime, localtime, ctime, ctime_r, asctime, asctime_r

The commit log for this was a good read, and introduced me to their `strbuf` API:

* <https://schacon.github.io/git/technical/api-strbuf.html>

and their wrappers for some replacement functions:

* <https://github.com/git/git/blob/master/wrapper.c>

## A history of ARM, part 1

* <https://arstechnica.com/gadgets/2022/09/a-history-of-arm-part-1-building-the-first-chip/>

## programmer-calculator

* <https://github.com/alt-romes/programmer-calculator>

Found while browsing the `ncurses` tag on GitHub.

Allows bitwise operations and displays multiple number formats. Nice.

