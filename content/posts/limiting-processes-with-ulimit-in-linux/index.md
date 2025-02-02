---
title: Limiting resources with ulimit in Linux
url: title-limiting-resources-with-ulimit-in-linux
description: How to use the ulimit command in Linux to manage system resources
tags:
  - linux
  - docs
date: 2025-02-03
toc: true
---

### What is ulimit

`ulimit` is a builtin shell command that allows us to restrict system resources, for example the number of processes, number of open files, maximum logins.

### Display the limits

The see the current resource limits for the logged-in user, run:

```bash
ulimit -a
```

#### Example Output

```bash
-t: cpu time (seconds)              unlimited
-f: file size (blocks)              unlimited
-d: data seg size (kbytes)          unlimited
-s: stack size (kbytes)             8192
-c: core file size (blocks)         0
-m: resident set size (kbytes)      unlimited
-u: processes                       22678
-n: file descriptors                2048
-l: locked-in-memory size (kbytes)  735404
-v: address space (kbytes)          unlimited
-x: file locks                      unlimited
-i: pending signals                 22678
-q: bytes in POSIX msg queues       819200
-e: max nice                        0
-r: max rt priority                 0
-N 15:                              unlimited
```

### Setting resource limits

If you want to limit the number of processes for a user

```bash
ulimit -u 20000

# lets check the changes
ulimit -u

```

#### Output

```bash
20000
```

### Flags

| **Option** | **Resource Controlled**                                 |
| ---------- | ------------------------------------------------------- |
| `-a`       | Displays all current limits.                            |
| `-f`       | Maximum size of files created by the shell (in blocks). |
| `-u`       | Maximum number of processes a user can create.          |
| `-n`       | Maximum number of open file descriptors.                |
| `-v`       | Maximum virtual memory size (in kilobytes).             |
| `-m`       | Maximum resident memory size (in kilobytes).            |
| `-c`       | Maximum size of core files created (in blocks).         |
| `-s`       | Maximum size of the stack (in kilobytes).               |
| `-l`       | Maximum size of locked memory.                          |

### Save changes to make limits persistent

If you want to permanently save the changes, edit `/etc/security/limits.conf`

You need to add the following:
- `<domain>`: the target user or group(@group for groups)
- `<type>`:
  - soft - within range of hard limits
  - hard - limits set by superuser
  - `-` for both hard and soft
- `<item>`: - what do you want to limit
- `<value>` - the value you want to set

#### Example

To limit the user robert to a maximum of 4 simultaneous logins and restrict the student group to 20 processes:

```bash
sudo vim /etc/security/limits.conf

#<domain>      <type>     <item>         <value>
robert           -        maxlogins       4
@student        hard      nproc           20
```

### Conclusion

The `ulimit` is an essential tool to manage system resources.

Resources:

- [https://ss64.com/bash/ulimit.html](https://ss64.com/bash/ulimit.html)
- `man limits.conf` in Linux
