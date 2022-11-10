---
title: C Static Analysis Tools - Part 2
---

Earlier in the year I wrote about [static analysis tools for C](https://gist.github.com/superjamie/38a021b0c9b2e40b3dfbbc249ea0b76c) and wanted to cover a couple more.

Let's continue with our simple array-out-of-bounds test from the last post:

```c
int main(void)
{
	int my_array[3] = { 0 };

	for(int i = 0; i < 6; i++)
		my_array[i] = i;

	return 0;
}
```

## GCC Static Analysis

Red Hat's David Malcolm has been busy adding a static analyser to GCC with the `-fanalyzer` switch, covered in Red Hat Developer blog posts:

* <https://developers.redhat.com/articles/2022/04/12/state-static-analysis-gcc-12-compiler>
* <https://developers.redhat.com/blog/2021/01/28/static-analysis-updates-in-gcc-11>
* <https://developers.redhat.com/blog/2020/03/26/static-analysis-in-gcc-10>

Unfortunately I couldn't get it to find an error on the above code, neither with GCC-11 in Ubuntu 22.04, nor with Compiler Explorer's current "static analysis" or "trunk" versions of GCC (which appear to be daily builds).

I emailed David and [logged by bug with GCC](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=107566) for this.

Turns out Compiler Explorer's **gcc (static analysis)** branch was almost 3 years out of date, [logged an Issue](https://github.com/compiler-explorer/compiler-explorer/issues/4256) to fix that too.

## PVS-Studio

I came across this commercial static analyzer from a series of blog posts about writing good code:

* [2016 - The Ultimate Question of Programming, Refactoring, and Everything](https://pvs-studio.com/en/blog/posts/cpp/0391/)
* [2011 - How to make fewer errors at the stage of code writing. Part N1](https://pvs-studio.com/en/blog/posts/cpp/a0070/)
* [2011 - How to make fewer errors at the stage of code writing. Part N2](https://pvs-studio.com/en/blog/posts/cpp/a0072/)

Usually commercial products like this are inaccessible to us mere mortals, and I expect a paid license of this runs into at least 4 figures per seat. They [don't even offer single licenses](https://pvs-studio.com/en/order/single-user/), only commercial volume.

However, they provide a [free license](https://pvs-studio.com/en/blog/posts/0614/) to students, open source projects, and even non-commercial personal projects. Very nice!

It's also available via [Compiler Explorer](https://godbolt.org/) as a plugin. In the compiler window just go **Add Tool** and **PVS-Studio**.

This is awesome, and a good way to get your product in front of people who'll later use it in industry, where companies are more willing pay for it.

From the above blog posts you can see that PVS-Studio catches lots of things that other static analyzers don't, and it picks up our incorrect access too:

```
The documentation for all analyzer warnings is available here: https://pvs-studio.com/en/docs/warnings/.

<source>:6:1: warning: V557 Array overrun is possible. The value of 'i' index could reach 5.
```

Not as friendly as `cppcheck` was in the last post, but does the job.

