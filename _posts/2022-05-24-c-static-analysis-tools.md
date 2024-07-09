---
title: C Static Analysis Tools
---

[Static analysis](https://en.wikipedia.org/wiki/Static_program_analysis) of computer programs can be simply defined as automated inspection of the source code to find programming errors. These might be very obvious errors that human code inspection or software testing would probably have caught, but also less visible coding errors which are hard for humans to find and might even compile and run okay.

For example, this code has an obvious array out-of-bound error. This array has three members starting at zero, so we cannot access member three or four or five:

```c
int main(void)
{
	int my_array[3] = { 0 };

	for(int i = 0; i < 6; i++)
		my_array[i] = i;

	return 0;
}
```

It will even compile without complaint:

```sh
$ gcc array-out-of-bounds.c -o array-out-of-bounds
$ echo $?
0
```

Though running it (correctly) produces an abort:

```sh
$ ./array-out-of-bounds 
*** stack smashing detected ***: terminated
Aborted (core dumped)
```

The [top Stack Overflow answer](https://stackoverflow.com/questions/1145191/static-code-analyzers-for-c) about static analysis tools lists PC-Lint and [Splint](https://splint.org/) as the top answers.

PC-Lint is proprietary and expensive (~US$400 per license, over a decade ago) so inaccessible to me.

Splint is open source, but development seems inactive with the last commit over 3 years ago and I couldn't get it running anyway.

What other options do we have?

## GCC Compiler Warnings

One way we could have detected this was better GCC warnings, which performs a sort of static analysis:

```sh
$ gcc -Wall array-out-of-bounds.c -o array-out-of-bounds
array-out-of-bounds.c: In function ‘main’:
array-out-of-bounds.c:3:13: warning: variable ‘my_array’ set but not used [-Wunused-but-set-variable]
    3 |         int my_array[3] = { 0 };
      |             ^~~~~~~~
```

However, that's just telling me I haven't used the variable I defined, not about the actual programming error.

My preference for GCC compiler flags is:

~~~
-std=c99 -Wall -Werror -Wpedantic
~~~

(considering [the Linux Kernel has updated to C11](https://www.phoronix.com/scan.php?page=news_item&px=Linux-Kernel-C89-To-C11), maybe I should too!)

You can also add `-Werror` if you wish any warnings to be considered as errors and stop compilation.

## cppcheck

<http://cppcheck.net/>

cppcheck is a static analysis tool for both C and C++ which is actively developed and has packages and plugins for many environments.

On Ubuntu, install with  `sudo apt install cppcheck`

Using it is very easy, just run it with your source file as an argument:

```sh
$ cppcheck array-out-of-bounds.c
Checking array-out-of-bounds.c ...
array-out-of-bounds.c:6:11: error: Array 'my_array[3]' accessed at index 5, which is out of bounds. [arrayIndexOutOfBounds]
  my_array[i] = i;
          ^
array-out-of-bounds.c:5:19: note: Assuming that condition 'i<6' is not redundant
 for(int i = 0; i < 6; i++)
                  ^
array-out-of-bounds.c:6:11: note: Array index out of bounds
  my_array[i] = i;
          ^
```

That's found our problem and explained it nicely.

There are other arguments, I like to enable all checks, but suppress `missingIncludeSystem` so that it doesn't check system library includes.

I add this to my `Makefile` template like so:

```
.PHONY: check

check: $(SRCS)
	cppcheck --enable=all --std=c99 --suppress=missingIncludeSystem $^
```

Now I can run `make check` and get this output.

## Clang Static Analysis

<https://clang-analyzer.llvm.org/>

The Clang compiler frontend also has a static analysis tool.

On Ubuntu, install with  `sudo apt install clang-tools`

This works by running `scan-build` in front of your usual compilation command.

We can run it like:

```
$ scan-build gcc array-out-of-bounds.c -o array-out-of-bounds
scan-build: Using '/usr/lib/llvm-14/bin/clang' for static analysis
scan-build: Analysis run complete.
scan-build: Removing directory '/tmp/scan-build-2022-05-24-103834-26933-1' because it contains no reports.
scan-build: No bugs found.
```

Oh dear, no bugs found. That's unfortunate. I logged [an Issue](https://github.com/llvm/llvm-project/issues/55668) with the LLVM project.

This has found other errors for me in the past on larger projects, so don't take this as any suggestion that the Clang Analyzer sucks or doesn't work. As the webpage says, it's still a work in progress.

One particularly nice feature is how `scan-build` works. It uses the shell environment variables `CC` and `CXX` to override the compiler with its own tool. This supports `gcc`, `g++`, and even `make`.

So an existing project with a `Makefile` has nothing to do to add Clang static analysis, simply run the usual command:

```sh
$ scan-build make
```

## Summary

Static analysis tools are another tool in the toolbox that developers should use to ensure their code is free of errors.

As we have found, not every tool is perfect and some things will pick up warnings or errors that others don't.

So it's a good idea to add as many checks to your code as you reasonably can, both compiler warnings and static analyzers.

## Part 2

* [C Static Analysis Tools - Part 2]({% post_url 2022-11-04-c-static-analysis-tools-part-2 %})

