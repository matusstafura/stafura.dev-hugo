---
title: How to Automatically Update a Git Repo on Login in Linux
url: how-to-automatically-update-a-git-repo-on-login-in-linux
description: Learn how to use systemd to automatically pull your dotfiles or any Git repository every time you log in to Linux.
tags:
    - linux
    - ubuntu
    - programming
    - github
    - systemd
date: 2025-09-16
publishDate: 2025-09-16
---

## Why would you want to do this?

Yeah, yeah, it happens even to the best of us. 

You start committing changes to your repo, and then you forget to push them. 

Then you go to another machine, and you realize that your repo is outdated.

BRUH!

To prevent this, you can easily set up a systemd user service that runs a script to `git pull` your repo every time you log in.

I am going to illustrate this with my dotfiles repo, but you can use this for any git repo you want to keep updated.

---

## 1. Let's create a script that pulls

I have my DOTFILES in the `~/dotfiles` folder.

What we need to do first is to create an *executable* script that does `git pull`.

Let's create a folder for our scripts if you don't have one already:

```bash
mkdir -p ~/dotfiles/bin
touch ~/dotfiles/bin/dotfiles-update.sh
```

Yes, I like to live dangerously. I put the script to update dotfiles *inside* the dotfiles repo 😊.

Now, edit `~/dotfiles/bin/dotfiles-update.sh` with your favorite text editor and add the following code, then save:

```bash
#!/bin/bash
cd "$HOME/dotfiles" || exit 1
/usr/bin/git pull origin main
```

Let's not forget to make it executable:

```bash
chmod +x ~/dotfiles/bin/dotfiles-update.sh
```

---

## 2. Create a systemd **user service**

First, create the necessary directory and the service file:

```bash
mkdir -p ~/.config/systemd/user
touch ~/.config/systemd/user/dotfiles-update.service
```

Edit `~/.config/systemd/user/dotfiles-update.service` and add the following code:

```ini
[Unit]
Description=Update dotfiles on login

[Service]
Type=oneshot
ExecStart=%h/dotfiles/bin/dotfiles-update.sh

[Install]
WantedBy=default.target
```

- *oneshot* means it runs once and then exits.
- *%h* is a shortcut for your home directory.

---

## 3. Enable the service

Run the daemon-reload command to make systemd aware of the new service, and then enable it:

```bash
systemctl --user daemon-reload
systemctl --user enable dotfiles-update.service
```

Magic!

Now, every time your **user session** starts(when you log in), it will run the script and pull the latest changes.

---

## 4. (Optional) If you prefer to have it check periodically

If you want it to check every hour, add a timer:

Create a file:
```bash
touch ~/.config/systemd/user/dotfiles-update.timer
```

Edit `~/.config/systemd/user/dotfiles-update.timer` and add the following code:
```ini
[Unit]
Description=Periodically update dotfiles

[Timer]
OnBootSec=2m
OnUnitActiveSec=1h

[Install]
WantedBy=timers.target
```

Enable the timer:

```bash
systemctl --user enable --now dotfiles-update.timer
```

---

## Debug

If you want to see the logs when it runs or if it fails, use:

 ```bash
journalctl --user -fu dotfiles-update.service
 ```
To check the status of the service, use:

```bash
systemctl --user status dotfiles-update.service
```

The difference is: journalctl shows the logs of the service, while systemctl status shows the current state (running, failed, etc.).

You can find the codes on my [GitHub Dotfiles](https://github.com/matusstafura/dotfiles).
