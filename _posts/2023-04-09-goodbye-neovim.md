---
title: Goodbye, Neovim
---

I've been using Neovim for a while now and it's been fun. I didn't see any real killer feature for it, but I wrote previously about [other reasons to switch to Neovim](other-reasons-to-switch-to-neovim).

However, I kept all my config in Vimscript and didn't migrate to Lua for a couple of reasons.

First, I need to use Vim on systems where Neovim isn't easily available, and I didn't feel like manually updating the AppImage.

Second, I was being careful in case something made Neovim unviable for me.

That day has come with [Neovim's removal of the cscope feature](https://github.com/neovim/neovim/pull/20545) in Neovim 0.9.

LSP is great for small codebases where you can easily do a build or generate the compilation database, however it's not very enjoyable for large codebases like [the Linux kernel](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/) or maybe one of the modern BSDs, where a build to generate `compile_commands.json` is a large undertaking, and especially if you switch around different historical revisions of the codebase a lot, which is my exact usecase.

For that sort of code browsing, it's much better to use [GNU Global](https://www.gnu.org/software/global/) tags and the [gtags-cscope.vim](https://cvs.savannah.gnu.org/viewvc/*checkout*/global/global/gtags-cscope.vim) plugin.

Nothing else in Neovim really made a huge difference to me. The `vim-gtk3` Ubuntu/Debian package supports `set clipboard=unnamedplus` for yank persistence, and supports `:terminal` buffers too.

Maybe I can finally pull my finger out and get the `t_SI`/`t_SR`/`t_EI` escape sequences working under tmux so Vim has the nice `guicursor` too.

Anyway, goodbye Neovim, it was fun while it lasted.
