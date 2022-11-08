---
title: Running a Python script only if it's not already running
---

I have a simple Linux graphical desktop environment, using the Openbox window manager and tint2 panel. I use [gsimplecal](https://github.com/dmedvinsky/gsimplecal) to display a small GTK Calendar widget when I click the panel clock. When I click the clock again, the calendar disappears.

gsimplecal is written in C++ but I thought it might be fun to rewrite it in Python.

The hardest part was detecting the running process, so a script would find another instance of itself then kill that instance and exit, but run if there was no existing instance. I came up with this fairly universal solution:

```python
#!/usr/bin/python

from os import getpid
from sys import argv, exit
import psutil  ## pip install psutil

myname = argv[0]
mypid = getpid()
for process in psutil.process_iter():
if process.pid != mypid:
    for path in process.cmdline():
    if myname in path:
        print "process found"
        process.terminate()
        exit()

## your program here...
```

