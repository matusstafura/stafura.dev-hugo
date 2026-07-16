---
title: "Automatically Restart MariaDB on Crash in Ubuntu with systemd"
url: "auto-restart-mariadb-ubuntu-systemd"
description: "Learn how to auto-restart MariaDB after a crash in Ubuntu using a systemd override."
tags: 
    - linux
    - ubuntu
    - database
categories: []
toc: true
date: 2026-07-16T07:59:24+02:00
---

## Why do you need to autorestart DB?

Database can crash from any problems like when the system runs out of memory, full disk and so on. And the website will be down until you notice it and restart the database manually.

The bare minimum you can do is to set it to restart automatically in Linux with systemd. 

> Note that this will not start DB when it is manually stopped.

Here's an example how to do it for MariaDB in Ubuntu:

## 1. Add a restart policy

Let's not use the vendor file directly, because it can be overwritten by updates.

We use an override:

```bash
sudo systemctl edit mariadb
```

And paste the content and save:

```ini
[Service]
Restart=on-failure
RestartSec=5
ExecStopPost=/usr/local/bin/log-mariadb-crash.sh

[Unit]
StartLimitIntervalSec=600
StartLimitBurst=5
```

- `Restart=on-failure` — restart on crash/non-zero exit.
- `RestartSec=5` — wait 5s before retrying.
- `StartLimitBurst=5` within `StartLimitIntervalSec=600` — if it crashes 5 times in 10 minutes, systemd gives up and marks it `failed` instead of looping forever. This prevents crash-loop(when DB is corrupted it will not retry endlessly).

## 2. Create the logging script

It is helpful to know what happened - every skilled dev does the logging.

Let's create the file:
```bash
sudo vi /usr/local/bin/log-mariadb-crash.sh
```

Paste the content and save:

```bash
#!/bin/bash
if [ "$SERVICE_RESULT" != "success" ]; then
  LOGFILE=/var/log/mariadb-crash.log
  {
    echo "=== MariaDB stopped abnormally at $(date) ==="
    echo "Result: $SERVICE_RESULT  ExitCode: $EXIT_CODE  ExitStatus: $EXIT_STATUS"
    echo "--- last 50 journal lines ---"
    journalctl -u mariadb -n 50 --no-pager
    echo "--- last 50 lines of mysql error log ---"
    tail -n 50 /var/log/mysql/error.log
    echo "--- OOM killer check ---"
    dmesg -T 2>/dev/null | grep -i "killed process" | tail -5
    echo ""
  } >> "$LOGFILE"
fi
```

We need the file to be executable:

```bash
sudo chmod +x /usr/local/bin/log-mariadb-crash.sh
```

## 3. Reload and apply

```bash
sudo systemctl daemon-reload
sudo systemctl restart mariadb
```

## 4. Test it

```bash
sudo kill -9 $(pidof mariadbd)
sleep 6
systemctl status mariadb          # should show "active (running)" again
cat /var/log/mariadb-crash.log    # should have a new entry
```

This 5 minute setup helps to sleep better. Now you know how to do it with DB, what else can you do? Redis, Varnish, ...?

