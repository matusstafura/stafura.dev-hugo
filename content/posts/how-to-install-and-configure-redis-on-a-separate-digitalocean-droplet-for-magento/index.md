---
title: How to Install and Configure Redis on a Separate DigitalOcean Droplet for Magento
url: how-to-install-and-configure-redis-on-a-separate-digitalocean-droplet-for-magento
description: Step-by-step guide to installing Redis on a separate DigitalOcean droplet for Magento. Learn how to improve performance, secure Redis with private networking, and configure it for seamless integration with your Magento store.
tags:
  - "linux"
  - "ubuntu"
  - "redis"
  - "docs"
  - "magento"
date: 2025-01-23
publishDate: 2025-01-23
---

Install redis on separate droplet to offload Redis from the Magento monolith. 

### Create a Droplet for Redis

Let's create a droplet for Redis in DigitalOcean (DO from now on).

I chose the following minimal parameters (you can scale later):

- **Basic Droplet**
- **Premium AMD**: 1GB RAM, 25GB NVMe SSD, 1000GB transfer.

> IMPORTANT: Make sure the new droplet is within the same VPC and Region as your Magento server.

### Redis installation

Once the droplet is successfully created, SSH into the droplet and install Redis:

```bash
# install Redis and enable it
sudo apt update
sudo apt install redis
sudo systemctl enable redis
sudo systemctl start redis
```

### Networking

We do not need direct public access to Redis. For security, ensure only the Magento server can access Redis by setting up a private connection.

#### Binding to Private IP

Edit `/etc/redis/redis.conf` to bind Redis to the private IP of the server. You can find the private IP in the DigitalOcean dashboard.

![](/images/blog/how-to-install-and-configure-redis-on-a-separate-digitalocean-droplet-for-magento/private-ip.png)

```bash
# bind redis to the private IP
# edit /etc/redis/redis.conf
bind 127.0.0.1 <PRIVATE_IP>

# Example
bind 127.0.0.1 10.10.10.10
```

#### Setup password

In the same file, find and configure the `requirepass` directive to secure Redis with a password:

```bash
# setup password
# edit /etc/redis/redis.conf
requirepass <REDIS_PASSWORD>

# Example
requirepass m4wgCo60YWxMZvn
```

> **Tip:** Generate a secure password using tools like [LastPass Password Generator](https://www.lastpass.com/features/password-generator).

Restart Redis to apply the changes:

```bash
systemctl restart redis
```

#### Create Redis firewall

In the DigitalOcean Networking section, create a new firewall to restrict access. Add a custom rule to allow **port 6379** only for your Magento server’s droplet (source) for both inbound and outbound traffic.

![](/images/blog/how-to-install-and-configure-redis-on-a-separate-digitalocean-droplet-for-magento/ports.png)

#### Testing connection

From the Magento server, test the connection to Redis:

```bash
redis-cli -h <REDIS_PRIVATE_IP> -a <REDIS_PASSWORD> ping
```

If successful, you will see the response `PONG`. This confirms that Redis is correctly set up and accessible.

### Configuring Magento to Use Redis

Edit the `app/etc/env.php` file in your Magento installation to configure it to use Redis on the remote server:

```bash

# edit app/etc/env.php of your magento installation
'cache' => [
    'frontend' => [
        'default' => [
            'backend' => 'Cm_Cache_Backend_Redis',
            'backend_options' => [
                'server' => '<REDIS_PRIVATE_IP>',
                'port' => '6379',
                'persistent' => '',
                'database' => 0,
                'password' => '<REDIS_PASSWORD>',
                'compress_data' => 1
            ]
        ]
    ]
],

```

### Final tests

To ensure everything is working, monitor Redis while browsing your Magento store:

```bash
# Run this command on the Redis server
redis-cli -a <REDIS_PASSWORD> monitor
```

While navigating your Magento store, you should see activity logged in the Redis monitor.

---

By following these steps, you have successfully offloaded Redis from your Magento monolith, improving scalability and performance while maintaining a secure setup.
