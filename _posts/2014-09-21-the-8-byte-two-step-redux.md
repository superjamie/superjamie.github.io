---
title: The 8-Byte Two-Step Redux
---

Over [on Hacker News](https://news.ycombinator.com/item?id=8345410), Z posted a fantastic article called [The 8-Byte Two-Step](http://zinascii.com/2014/the-8-byte-two-step.html) where the concept of aligning to byte boundaries was explored.

I thought this was a fantastic post, it goes right down to binary and logical operators then back up again.

After understanding the alignment, Z then writes three other ways of doing the same thing, disassembles them and benchmarks them.

Discussing this on HN, I said:

> I have banned myself from using printfs to figure out things like this. Instead I would use a debugger and breakpoints to view the live variables in their different data formats.
> 
> In GDB, that's p/t for binary and p/d for decimal.

To which Z replied:

> I would like to try the method you describe... I'll be curious to use your method and see how it compares.

So I figured I'd show how. Knowledge of the original post [The 8-Byte Two-Step](http://zinascii.com/2014/the-8-byte-two-step.html) is required before progressing further.

I had to include `<stdint.h`> for the `uint_64t`, and I removed the `printf()`s. This is the code I am using:

```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <stdint.h>

#define MQ_ALIGNSIZE 8

char *as_binary(uint32_t n) {
  int bit_i = 31;
  char *bits;
  uint64_t on_bit;

  bits = malloc(sizeof(char) * 33);

  for (int i = 0; i < 32; i++, bit_i--) {
    on_bit = 1u << bit_i;
    bits[i] = (on_bit & n) ? '1' : '0';
  }
  bits[32] = '\0';

  return bits;
}

int main(int argc, char **argv) {
  uint32_t size = 0;
  uint32_t temp, a, b;
  size = atoi(argv[1]);

  a = (size + MQ_ALIGNSIZE - 1);
  b = ~(MQ_ALIGNSIZE - 1);
  temp = a & b;

  return 0;
}
```

Compile with debugging symbols (add `-g`) so we can use a debugger:

```sh
$ cc -g -std=c99 aligner.c -o aligner
```

Start the debugger with the program loaded:

```sh
$ gdb ./aligner
```

Add a commandline parameter to the program:

```sh
(gdb) set args 1023
```

Set a breakpoint at line 32 (just before the return):

```sh
(gdb) b aligner.c:32
```

Run and let GDB pause at the breakpoint. Here's it's about to run the return but has stopped before doing so. Now the application is frozen at this point in time:

```sh
(gdb) r
Starting program: /home/superjamie/code/8-byte-two-step/aligner 1023

Breakpoint 1, main (argc=2, argv=0x7fffffffdf08) at aligner.c:33
33        return 0;
```

Looking at the `size` variable:

```sh
(gdb) p/t size
$1 = 1111111111
(gdb) p/d size
$2 = 1023
```

And the rest of the variables:

```sh
(gdb) p/t a
$3 = 10000000110
(gdb) p/d a
$4 = 1030

(gdb) p/t b
$5 = 11111111111111111111111111111000
(gdb) p/d b
$6 = 4294967288

(gdb) p/t temp
$7 = 10000000000
(gdb) p/d temp
$8 = 1024
```

One obvious advantage of the `printf()` method is that it looks a lot nicer, remember Z's output:

```sh
$ ./align_debug 1023
size: 00000000000000000000001111111111 (1023)
   a: 00000000000000000000010000000110 (1030)
   b: 11111111111111111111111111111000 (4294967288)
temp: 00000000000000000000010000000000 (1024)
```

I find GDB to also be a fantastic disassembler and lets you see the contents of registers as you run a program.

Try the following:

```sh
$ gdb ./aligner
(gdb) layout asm
(gdb) layout regs
```

This turns on GDB's disassembly layout and register monitor. You'll see the entire binary disassembled and the contents of the registers above. They'll be blank because we're not running anything yet.

Add our argument as before, and set a breakpoint:

```sh
(gdb) set args 1023
(gdb) b main
```

This sets a breakpoint as we enter `main()`. Assembly wise, we'll have just setup `main()`'s stack frame (`push %rbp` and `mov %rsp,%rbp`) be ready to start executing.

We can type `stepi` to proceed to the next assembly instruction, then press the **Enter** key to repeat that `stepi` command.

The disassembler will step down as we execute, and the register monitor will highlight registers which change value.

