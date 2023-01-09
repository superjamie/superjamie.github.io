---
title: Other reasons to switch to Neovim
---

[Neovim](https://neovim.io/) has become very popular as a replacement for plain [Vim](https://www.vim.org/). Most advice about moving to Neovim is centred around the LSP and Lua features, but I don't care about those. This post explores a few other reasons you might want to switch to Neovim.

## Better Cursor

In Vim, regardless of what mode or context you're in, the cursor is always the same. Usually the terminal's default block cursor.

In Neovim, the cursor changes to a vertical bar in Insert mode, and changes to an underbar when you're in a character context like `r`eplace.

This seems a very minor difference, but it made a big difference to me, notably helping determine where text would be inserted when I entered `i`nsert or `a`ppend.

While you can apply a similar thing with plain Vim using ANSI escapes, I couldn't get those working in tmux, despite many cryptic settings copy-pasted from StackOverflow.

I didn't realise how much I loved this feature until I had it. Now I'd be very unwilling to give it up.

(according to [codekoalas](https://codekoalas.com/blog/why-you-should-still-use-neovim) this is actually the `guicursor` feature of GVim)

## Yank Persistence

For those who use Vim in tmux, it's always been a pest to have one Vim instance open and wish to yank/paste across to another Vim instance in another pane/window/session.

This "just works" in Neovim.

As an added bonus, you can even `y`ank something, `q`uit the editor altogether, open a new editor, and `p`aste - and that works too!

While it's possible to work around this with the system clipboard in Vim, Neovim's native persistence does this better.

## Built-in Terminal

In Neovim you can run `:terminal` and a buffer is opened with a terminal emulator. You can even open a command directly in a split like `:vsplit term://top`:

You can enter `i`nsert or `a`ppend mode to run commands, then when you have output ready you can `Ctrl+\ Ctrl+n` to return to Normal mode.

If that's too much to remember, the help suggests a more normal binding:

```
if has('nvim')
    tnoremap <Esc> <C-\><C-n>
endif
```

Now the terminal buffer is treated like any other text buffer in Normal mode.

I regularly switch between editor and terminal in my work, copy and pasting between the two, but I'd really rather use Vim full-time. I'm looking forward to using this more.

## Proper VSCode integration

I like to dabble in Visual Studio Code, though it usually ends up annoying me. Anyway.

It has a [Vim emulation plugin](https://github.com/VSCodeVim/Vim) which is *sort of* like Vim but not quite, and you can't use actual Vim plugins in it.

However, the [neovim plugin](https://github.com/vscode-neovim/vscode-neovim) isn't an emulation, it's actual real Neovim.

This means all your plugins and config work just like a real editor.

This is possible because Neovim completely decouples the frontend and backend of the editor, so the editor can be embedded anywhere.

## You don't have to switch entirely

There's a lot of info out there about rewriting your config in Neovim's native Lua, but I still have to SSH into systems where Neovim isn't available and I can't (or can't be bothered) getting the latest Neovim working.

But that's fine.

Front-and-center on the documentation page is [`:help nvim-from-vim`](https://neovim.io/doc/user/nvim.html#nvim-from-vim) which guides you through using your existing `~/.vimrc` and everything else right in Neovim.

So I can keep the same VimScript config for places where I don't have Neovim, and I can use all the above handy features in places where I do have Neovim.

Best of both worlds.

Which I guess is what this post is all about - using Vim but getting something even better. That's what Neovim is all about!

