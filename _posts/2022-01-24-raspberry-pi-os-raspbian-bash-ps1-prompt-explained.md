---
title: Raspberry Pi OS (Raspbian) Bash PS1 Prompt Explained
---

The bash shell has variable `PS1` which controls how the prompt is displayed.

You can find many examples of how to customise the prompt: <https://duckduckgo.com/?q=Bash+PS1>

For a long time I have kept this `PS1` around from Raspbian, but today I wondered what everything actually did:

```sh
PS1="\[\033]0;\u@\h: \w\007\]\[\e[1;32m\]\h\[\e[1;32m\]:\[\e[1;34m\]\w \[\e[0m\]\\$ "
```

You can just paste this into bash to see what it looks like. It will show something like this, with your computer's name as
`hostname` and your cursor blinking at `_`:

```sh
hostname:~ $ _
```

If you change to a directory, then that directory name is added to the prompt, eg:

```sh
hostname:~ $ cd Downloads
hostname:~/Downloads $ _
```

I started looking into this, and the first part of it baffled me:

```sh
PS1="\[\033]0;\u@\h: \w\007\]
```

So I skipped that for now and focused on the rest, I already knew what these did:

```sh
\[\e[1;32m\]\h\[\e[1;32m\]:\[\e[1;34m\]\w \[\e[0m\]\\$ 
```

The bash colours are explained better by others (with actual colour) at pages such as:

* <https://www.shellhacks.com/bash-colors/>
* <https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html>
* or just search around for "bash colors" or "ansi colors"

They are explained as:

```
\[  start non-printing characters
  \e[1;32m  bold green
          \]  end non-printing characters
            \h  hostname
              \[  start non-printing characters
                \e[1;32m  set text color to bold/bright green
                        \]  end non-printing characters
                          :  literal colon character ":"
                           \[  start non-printing characters
                             \e[1;34m  set text color to bold/bright blue
                                     \]  end non-printing characters
                                       \w  current working directory, with home abbreviated as ~
                                         _  a literal space character " "
                                          \[  start non-printing characters
                                            \e[0m  reset text to no color
                                                 \]  end non-printing characters
                                                   \\$
```

And the last line creates the prompt. If effective UID is 0 (eg: you've done `sudo -s` to open a root shell) then it becomes
`#`, otherwise if you're a non-root user then it is `$`.

Now, back to the first part:

```sh
PS1="\[\033]0;\u@\h: \w\007\]
```

We can already spot some of these, such as `\]` and `\]` to delimit non-printing characters, `\w` for the current working
directory with `~` for home, and I happen to know `\u@\h` shows `username@hostname`. But what are the rest?

The answer is hidden [over here on the Ask Ubuntu StackExchange site](https://askubuntu.com/a/832382/704762).

The `\033]` is an Octal character named `ESC`, and the `]` after it means an "Operating System Command" or OSC.

We can see in the
[xterm Control Sequence manual](https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Operating-System-Commands) that
`0;` means "Set Text Parameters" and "Change Icon Name and Window Title". The `username@hostname: cwd` now makes sense,
that's the graphical terminal window's title text!

The `\007` is an ASCII BEL character, which is used to end the OSC.

So looking at it again:

```sh
PS1="\[\033]0;\u@\h: \w\007\]
```

We can explain this as:

```
     \[  begin a sequence of non-printing characters
       \033 octal 033 "Esc"
           ]  OSC
            0;  change icon and window name to:
              \u@\h  username@hostname
                   :  a literal colon and space ": "
                     \w  working directory, with home abbreviated as ~
                       \007  octal 007 terminal bell, end the OSC
                           \]  end non-printing characters
```

The answer I linked on Ask Ubuntu isn't the most upvoted answer, but it is the correct answer.

Looking at the author of the answer, it shouldn't come as a surprise that it's the correct answer.

It's written by [Thomas Dickey](https://invisible-island.net/), a long-time open source software developer, and maintainer of
many low-level pieces of software such as `ncurses` and `xterm` itself!

