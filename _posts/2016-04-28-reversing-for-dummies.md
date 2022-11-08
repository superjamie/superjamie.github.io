---
title: Reversing for Dummies
---

Notes for a talk given at [Brisbane SecTalks](https://www.meetup.com/SecTalks-Brisbane/).

----

Jamie Bainbridge - <http://jbainbri.github.io/>

## Why?

To understand how a program works.

* Break copy protection
* Commercial/military espionage
* Security analysis
* Understand a segfault/panic/bug and fix/patch it
* Add features
* Re-implementation in another language or create a clone

## What?

* OS-specific instructions to link and execute a program
* Several binary **formats**
    * MS-DOS: `COM` and `MZ`
    * Win16: `NE`
    * Win32/Win64: `PE`
    * System V ABI: `ELF` - we'll be talking about this one
* ELF binaries are made up of **sections** (each section links to one or more **segments**)
* Common section headers:
    * `.text` for executable code
    * `.data` for initialized data
    * `.rodata` for read-only initialized data
    * `.bss` for uninitialized data, will be blank
    * `.plt` for the linker to link in library functions
* Within a code section we'll usually have **symbol names**

## How?

#### Non-assembly Tools

* `strings` finds ASCII text within the file
* `file` gives a basic fie type and some info
* `readelf` and `nm` to read more stuff

#### Decompilers  

These disassemble a binary then try to make source code back out of it. Original variable names are not preserved, nor are inlined functions, modern optimising compilers might make this a very confusing mess. May work ok for very simple programs, probably impractical with anything serious.

#### Disassemblers  

`objdump`, `dasm2.pl`, `ndisasm`, radare2, IDA Pro, Hopper. These present binary in assembly code, sometimes with niceties like showing offsets and strings. radare has a scriptable API, IDA has a GUI!

#### Debuggers  

`gdb`, WinDbg, OllyDbg, IDEs like Visual Studio or Eclipse. Allow you to load an executable, watch/step live execution, stop execution with **breakpoints**, view/edit registers, stack frames, other memory contents.

### Assembly

A processor understands **machine language** or **machine code**, these are binary instructions which are loaded into the CPU and executed each clock cycle.

A **compiler** takes source code, **assembles** it into machine language object files, and a **linker** creates a binary out of your various assembled files and the libraries you used.

Assembly language is a human-readable representation of binary machine code instructions, assembly translates directly into machine code.

A CPU is made up of **registers** which can store a word-width of data (8-bit, 16-bit, 32-bit, 64-bit, etc), and has some way to access system memory.

The actual instructions are concerned with:
* `MOV` - moving data around registers
* `SUB`, `ADD` - doing mathematical operations on register contents
* `CMP` - comparing values
* `JMP`, `CALL` - moving to other parts of the program
* or doing so conditionally:
    * `JE` - **j**ump if the last comparison was **e**qual
    * `JNE` - **j**ump if the last comparison was **n**ot **e**qual)
* `NOP` - doing nothing

Each instruction mnemonic translates directly into hex.

* Reference for x86 assembly instructions: <http://ref.x86asm.net/>
* This is a 32-bit binary so we'll want: <http://ref.x86asm.net/coder32.html>

#### Syntax

There are two common syntaxes for asm, **AT&T** syntax and **Intel** syntax.

AT&T syntax places the destination last:

~~~
MOV  $50, A    ; move hex 50 into register A
~~~

Intel syntax places the destination first:

~~~
MOV  A, $50    ; move hex 50 into register A
~~~

### Tools

* `file`

Uses "magic" to classify a file. Magic is just a list of known signatures, like how a PNG image always starts with `89 50 4e 47` (` PNG`).

~~~sh
$ file ./reverseme1 
./reverseme1: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV),
dynamically linked (uses shared libs), for GNU/Linux 2.6.32, BuildID
[sha1]=8835077d876c5544ac9766af68c2e98d3c137917, not stripped
~~~

* `strings`

Looks for ASCII strings 4 or more characters long. Helps to remove the non-printable characters from a binary.

~~~sh
$ strings ./reverseme1 | grep flag
False_flag{RobotBully}!
DEBUG off. No flag for yews!
~~~

* Just run it

~~~sh
$ chmod +x ./reverseme1 
$ ./reverseme1
DEBUG off. No flag for yews!
~~~

* `dasm2.pl`

A perl script reverser. The author claims this is only useful if your system doesn't have `objdump` but it finds strings from `.data` sections and resolves jumps to symbol names, which not many others do!

~~~sh
$ dasm2.pl -p -output=dasm.txt ./reverseme1
$ less dasm.txt
~~~

* `objdump`

~~~sh
$ objdump -d -j .text --file-offsets --prefix-addresses --show-raw-insn ./reverseme1  | awk '/<main/' > objd.txt
$ less objd.txt
~~~

* GDB

This debugger has a disassembler too:

~~~
disassemble /r
~~~

## CTF Reverse Me 1

Look for where the "DEBUG off" string is printed, understand why.

The debug message is printed after a jump:

* dasm2

~~~
  08048551  sub     $c,%esp                         ;  referenced from jump(s) at 080484df; 

  08048554  push    $8048618                        ;  reference to data : "DEBUG off. No flag for yews!"

  08048559  call    08048310                        ;  (this is a call to puts, to print the above string)
~~~

* objdump

~~~
08048551 <main+0xf6> (File Offset: 0x551) 83 ec 0c             	sub    $0xc,%esp
08048554 <main+0xf9> (File Offset: 0x554) 68 18 86 04 08       	push   $0x8048618
08048559 <main+0xfe> (File Offset: 0x559) e8 b2 fd ff ff       	call   08048310 <puts@plt> (File Offset: 0x310)
~~~

The jump relies on a condition:

* dasm2

~~~
  080484d4  movl    $0,-14(%ebp)                    ;  reference to data : "putchar"

  080484db  cmpl    $0,-14(%ebp)                    ;  reference to data : "putchar"

  080484df  je      08048551                        ;  
  080484e1  movl    $0,-c(%ebp)                     ;  reference to data : "putchar"

  080484e8  jmp     0804852c                        ;  
~~~

* objdump

~~~
080484d4 <main+0x79> (File Offset: 0x4d4) c7 45 ec 00 00 00 00 	movl   $0x0,-0x14(%ebp)
080484db <main+0x80> (File Offset: 0x4db) 83 7d ec 00          	cmpl   $0x0,-0x14(%ebp)
080484df <main+0x84> (File Offset: 0x4df) 74 70                	je     08048551 <main+0xf6> (File Offset: 0x551)
                      ^^^^^^^^^^^^^^^^^^
080484e1 <main+0x86> (File Offset: 0x4e1) c7 45 f4 00 00 00 00 	movl   $0x0,-0xc(%ebp)
080484e8 <main+0x8d> (File Offset: 0x4e8) eb 42                	jmp    0804852c <main+0xd1> (File Offset: 0x52c)
~~~

Let's just turn off that jump:

~~~
$ hexdump -C ./reverseme1 | egrep -A1 "0*04d. "
000004d0  00 86 04 08 c7 45 ec 00  00 00 00 83 7d ec 00 74  |.....E......}..t|
000004e0  70 c7 45 f4 00 00 00 00  eb 42 8d 55 d4 8b 45 f4  |p.E......B.U..E.|
~~~

~~~
$ hexdump -C ./reverseme1done | egrep -A1 "0*04d. "
000004d0  00 86 04 08 c7 45 ec 00  00 00 00 83 7d ec 00 90  |.....E......}...|
000004e0  90 c7 45 f4 00 00 00 00  eb 42 8d 55 d4 8b 45 f4  |..E......B.U..E.|
~~~

And run again:

~~~sh
$ ./reverseme1done
flag{}
~~~

## References

`dasm2.pl`

* <https://www.lxtreme.nl/source/dasm2/>

ELF binaries

* <http://wiki.osdev.org/ELF>
* <https://lwn.net/Articles/531148/>
* <http://jvns.ca/blog/2014/09/06/how-to-read-an-executable/>

x86 Assembly and Disassembly

* <https://idea.popcount.org/2013-07-16-baby-steps-in-x86-assembly/>
* <https://en.wikipedia.org/wiki/X86_assembly_language>
* <https://en.wikibooks.org/wiki/X86_Assembly>
* <https://en.wikibooks.org/wiki/X86_Disassembly>
* <https://en.wikipedia.org/wiki/X86_calling_conventions>

## Resources

* <http://microcorruption.com/> - Web-based reversing CTF with great debugger and fictional corporate espionage story, uses the actual [Texas Instruments MSP430](https://en.wikipedia.org/wiki/TI_MSP430) assembly language.
* <http://www.crackmes.de/> - The reversers' playground. A community of people who post and solve each others' binaries for fun. Ranges from very easy to insanely difficult.
* <http://tcrf.net/> - People who reverse old video games to understand the file formats, look for unpublished content, create editing tools, etc
* <http://www.romhacking.net/> - Index of video game hacks to change graphics, gameplay, translate, etc
* <https://github.com/djyt/cannonball> - This guy spent 4 years reversing the Outrun arcade ROM, re-implementing it in C++ and SDL, then started extending it with widescreen, 60fps, track editors, etc.

