---
title: How to do SDL 2D Fullscreen and Scaling
---

While tinkering with roguelike development, I ended up writing my own 2D tile engine in SDL. It takes a [Dwarf Fortress Tileset](https://dwarffortresswiki.org/Tileset_repository) of [Codepage 437](https://en.wikipedia.org/wiki/Code_page_437) symbols, and allows you to create a window on a modern graphical OS which behaves like a DOS text window.

If you've done any roguelike dev before this will sound familiar to you, and you probably know that [ncurses](https://invisible-island.net/ncurses/)/[PDCurses](https://pdcurses.org/) do this in the terminal, and at least one of the better grahical alternatives:

* [libtcod](https://github.com/libtcod/libtcod)
* [BearLibTerminal](http://foo.wyrd.name/en:bearlibterminal)
* [TinyCurses](https://github.com/tommyettinger/TinyCurses)

A DOS-sized window of 80x25 characters with the [EGA 8x14](https://dwarffortresswiki.org/index.php/File:EGA8x14.png) or [VGA 8x16](https://dwarffortresswiki.org/index.php/File:VGA8x16.png) font ends up quite small on a modern high-res screen, so you'll want to scale this up.

Scaling up pixel graphics like this always looks bad at arbitrary scaling sizes, so you'll want to scale by integer factors (eg: 2x or 3x, but not 2.5x or 1.333x).

When you set your SDL window fullscreen with [`SDL_SetWindowFullscreen(SDL_WINDOW_FULLSCREEN_DESKTOP)`](https://wiki.libsdl.org/SDL_SetWindowFullscreen) you'll want to restrict scaling to the largest sensible size for the display, and center the display so it draws in the middle of the screen.

I had done all this manually, multiplying my `SDL_RenderFillRect` by a scaling factor, working out my content size and how large the client window was so I could center the content, etc. I actually hadn't done that last part about maximum scale factor for a fullscreen viewport and wasn't exactly sure of the best way to do it.

Turns out I'd been doing things the hard way. [HexDecimal](https://github.com/HexDecimal) (author of libtcod) recently informed me of two incredibly useful SDL functions:

* [`SDL_RenderSetLogicalSize`](https://wiki.libsdl.org/SDL_RenderSetLogicalSize)
* [`SDL_RenderSetIntegerScale`](https://wiki.libsdl.org/SDL_RenderSetIntegerScale)

Work out your content width/height and provide it to `SDL_RenderSetLogicalSize`, enable integer scaling with `SDL_RenderSetIntegerScale`. Now when you go fullscreen, the content is automatically scaled to the largest possible integer scaling factor for the content/screen, and is automatically centered in the fullscreen viewport.

I also discovered:

* [`SDL_RenderSetScale`](https://wiki.libsdl.org/SDL_RenderSetScale)

When the window is **not** fullscreen, this will do scaling for you, though you still have to work out the correct window size and resize with [`SDL_SetWindowSize`](https://wiki.libsdl.org/SDL_SetWindowSize).

Be sure to disallow `SDL_RenderSetScale` when the window is fullscreen, otherwise SDL gets confused.

This allowed me to rip out several lines of my own code and maths, leverage the library, and end up with a superior result.

Hopefully it helps you too!

Many thanks to HexDecimal and the positive helpful sharing nature of the entire [roguelike development](https://www.reddit.com/r/roguelikedev/) community.

