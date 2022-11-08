---
title: Delay Loop in 6502 Assembly
---

The Android app [Learn 6502 Assembly](https://play.google.com/store/apps/details?id=com.redlee90.learn6502assembly) provides a reasonably good 6502 CPU emulator and debugger, integrated with an Android text editor and a small game-console-like interface (memory-mapped graphics, d-pad, A and B).

The emulator seems to be the one from [Easy 6502](http://skilldrick.github.io/easy6502/).

It provides several example programs, but at least the "game-like" programs run way too fast to be pratical on my modern phone.

So let's make a delay. We'll do this by counting from 0 to 65535 (a 16-bit variable).

Within the game loop, you can call subroutine `JSR delay`

```asm
delay:
  ; save state. we'll be using the A register, so save it off to RAM
  ; and restore it before leaving. use another address if needed
  STA $40
  ; zero the A register ready for our use
  LDA #$00
  ; store that zero off to RAM too. registers only hold 8-bits so
  ; we'll store the high byte of our number off to RAM
  STA $41  ; high byte
delayloop:
  ADC #01
  ; usually adding 1 into A won't set the Zero bit. when the reigster
  ; overflows and the value of A becomes #$00, the Zero flag will be
  ; set. BNE jumps when the Z bit is not set
  BNE delayloop
  ; so we only land here after we've counted past #$FF
  ; clear carry flag so we don't add it next ADC
  CLC
  INC $41
  ; same strategy is used here, we jump unless the INC overflowed
  ; back to zero
  BNE delayloop
  ; clear carry flag so we don't add it next ADC
  CLC
  ; exit
  ; restore state of the A register
  LDA $40
  RTS
~~~

Or without comments:

~~~
delay:
  STA $40  ; save state
  LDA #$00
  STA $41  ; high byte
delayloop:
  ADC #01
  BNE delayloop
  CLC
  INC $41
  BNE delayloop
  CLC
  ; exit
  LDA $40  ; restore state
  RTS
```

Thanks Revenant for the catch where I missed `CLC`.

