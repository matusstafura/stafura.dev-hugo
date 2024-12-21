---
title: How to install man pages on an ubuntu docker image
url: how-to-install-man-pages-on-an-ubuntu-docker-image
description: A quick guide to restoring man pages in a minimal Ubuntu Docker image using the unminimize command
tags:
  - ubuntu
  - linux
  - programming
date: 2024-12-19
publishDate: 2024-12-19
---
As I am preparing for a Linux exam, I need to practice various commands on a separate Docker image and refer to manuals while using it.

By default, Docker images are minimal, and the Ubuntu image does not include `man` pages.

For instance, when you try to access a manual page, you encounter the following message:

```bash
root@54354b49f7a9:/# man man
This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, including manpages, you can run the 'unminimize'
command. You will still need to ensure the 'man-db' package is installed.
```

To address this, you can use the `unminimize` command in the Dockerfile to restore the missing components. Here's how:

```Dockerfile
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt install man -y
RUN yes | /usr/local/sbin/unminimize

CMD ["bash"]
```

After creating this Dockerfile, build and run the image with the following commands:

```bash
docker build . -f Dockerfile -t ubuntu
docker run --rm -it ubuntu bash
```

And it works! Now you can access `man` pages within the Docker container.

```bash
root@dd8f78de34d0:/# man sed
SED(1)                 User Commands                           SED(1)

NAME
       sed - stream editor for filtering and transforming text

```
