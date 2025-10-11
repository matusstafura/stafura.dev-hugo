---
title: How to Schedule Automatic Startup on iMac
url: how-to-schedule-automatic-startup-on-imac
description: "Instructions to set up automatic startup for your iMac using pmset."
tags: 
    - productivity
    - macos
categories: []
date: 2025-10-11T09:56:32+02:00
---

## Why?

I have an old iMac that takes ages to start up and load all the apps I need and one cannot change the old hard drive easily to an SSD (boooh Apple). 

So if I want to start working at 6am, I need my iMac to launch at 5:45am.

To achieve that you can use the `pmset` command in the terminal. 

## Here’s how to do it:

Open the Terminal app on your iMac and run the following command:

```bash
# to set a schedule to start up every day at 5:45am
sudo pmset repeat wakeorpoweron MTWRFSU 05:45:00

# if you want to set it for specific days, e.g., Monday, Wednesday, Friday at 8:30am
sudo pmset repeat wakeorpoweron MWF 08:30:00

# to check the schedule
pmset -g sched

# to cancel the schedule
sudo pmset repeat cancel
```

### Legend

- `M`: Monday
- `T`: Tuesday
- `W`: Wednesday
- `R`: Thursday
- `F`: Friday
- `S`: Saturday
- `U`: Sunday

- `wakeorpoweron`: works even if the iMac is completely shut down

That's it! Your iMac should now start up automatically at the specified time.

Just make sure that your iMac is plugged in. 😅
