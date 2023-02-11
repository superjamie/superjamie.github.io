---
title: HP t530 Thin Client with Linux
---

I love collecting gadgets. I recently noticed you can get these thin clients pretty cheap off eBay. These were going for AU$60 (US$40) so I picked one up.

The full specifications are [on HP's website](https://support.hp.com/us-en/document/c05696381) but in summary:

* CPU: AMD GX-215JJ System-on-Chip (`x86_64`), dual-core 1.5 GHz (boost to 2.0 GHz)
* RAM: DDR4 1866 SODIMM, one slot up to 16G
* GPU: Radeon R2E, roughly equal to HD4550 or GeForce 9400GT
* Display ports: 2x DisplayPort, can do dual 4K
* Video decode: x264 and x265 in hardware at 1080p
* WiFi: Intel 3168NGW (802.11ac), `iwlwifi` driver, PCI ID `8086:24fb`
* LAN: RealTek Gigabit, `r8169` driver, PCI ID `10ec:8168`
* Storage: M.2 SATA 6.0 Gbps, 2280/2260/2242 up to 512G
* USB: 2.0 and 3.0, 1x USB-A and USB-C on front, several on rear

It's also fanless so is completely silent.

That's really good for the sort of things I like to play with.

Mine came with some modern Windows and Secure Boot enabled, but that was easy to disable in the BIOS.

Booting Ubuntu 22.04 (kernel v5.15) worked without a problem. It found all the hardware, including the internal speaker, sound output via video, Ethernet, and WiFi. Using Linux on

Plugging into a TV with HDMI worked fine with a DisplayPort-to-HDMI cable off eBay. Mine also includes the optional VGA out connector.

I had a spare SSD lying around, and bought 16G RAM off eBay (ironically, for more than the cost of the entire thin client).

Performance in emulators is good enough for me:

* PSX (DuckStation) - 100% speed at 1x scaling, struggled with any more. Tested with Outrun 2006 Coast 2 Coast.
* PSP (PPSSPP) - 100% speed at 3x scaling (720p), struggled with 5x (1080p). Tested with Wipeout 3 (US).

Sadly PS2 (PCSX2) isn't an option. Gran Turismo 3 ran at ~40% speed even with graphics settings turned down.

This is a better option than a Raspberry Pi 4 if you're looking for a movie/TV box for Kodi, or something to run emulators on like RetroArch or Lakka or the PC install of RetroPie, or just use with a wireless keyboard and mouse from the couch. It's also still cheaper than even a 5th Gen Celeron Intel NUC goes for these days.

It also supports virtualization CPU extensions, so there's no reason you couldn't run VMs or even a small fleet of container hosts on it, maybe useful for Kubernetes or OpenShift learning.

Overall, I'm very happy with this.

Here's a YouTube video showing the unit and the easy access to the internal components:

{% include youtube.html id="d4vHfr-Pvjg" %}

