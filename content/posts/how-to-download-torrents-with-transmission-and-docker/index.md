---
title: How to download torrents with transmission and docker
url: how-to-download-torrents-with-transmission-and-docker
description: A simple guide to setting up Transmission in Docker for torrent downloading
tags:
  - programming
  - linux
  - homelab
date: 2025-01-13
toc: true
---

Since I set up [my new homelab](/my-first-homelab/), I wanted to separate processes that could run independently on another PC. One of those processes is downloading torrents, which previously required my PC to be running and consumed valuable space.

### Requirements

- docker installed

### Installation

Create a file named `docker-compose.yaml` and add the following content:

```yaml
---
services:
  transmission:
    image: lscr.io/linuxserver/transmission:latest
    container_name: transmission
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    volumes:
      - ./config:/config
      - ./downloads:/downloads
      - ./watch:/watch
    ports:
      - 9091:9091
      - 51413:51413
      - 51413:51413/udp
    restart: unless-stopped

```

### Running transmission

While in the folder containing the `docker-compose.yaml` file, start the container. The volumes will be automatically created.

```bash
# let's run it
docker compose up -d transmission
```

Now, simply add torrent files to the `watch` folder, and Transmission will automatically start downloading them.

### Settings

To make changes, such as limiting the download bandwidth, edit the `settings.json` file in the `config` folder:

```json
"speed-limit-down": 100,
"speed-limit-down-enabled": true,
```

### Adding magnet links

To add magnet links, save the magnet link content into a file with a `.magnet` extension.

For example, to save the Arch Linux magnet link as `arch.magnet` and start downloading it:

```bash
echo 'magnet:?xt=urn:btih:6ecfa6e78d4e63f190b9a29874b6853496432891&dn=archlinux-2025.01.01-x86_64.iso' > arch.magnet
```

Place the file in the `watch` folder, and Transmission will handle the rest.

### Web ui

To access the web UI, open `http://localhost:9091` in your browser or use the IP address of your homelab. For example, mine is accessible at `http://192.168.0.152:9091`.

![](/images/blog/20250109193310.jpg)

### Resources

For complete details about installation, setup, and additional features, refer to the official documentation:

https://hub.docker.com/r/linuxserver/transmission
https://docs.linuxserver.io/images/docker-transmission/
