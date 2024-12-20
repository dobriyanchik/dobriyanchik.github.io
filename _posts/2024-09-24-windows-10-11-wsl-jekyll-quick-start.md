---
layout: post
title:  "Windows 10/11 (WSL) jekyll quick start"
date:   2024-09-24 13:10:00
tags:   jekyll wsl
---

* content
{:toc}

WSL makes Jekyll setup procedure more easy

* * *


# Install/setup WSL

Install WSL if not installed

```bash
wsl --install
```

When WSL is installed need to install linux distributive (Debian for example)

```bash
wsl --install -d Debian
```

After setup is complete a promt to create new user appears

# Setup Jekyll

Setup ruby & jekyll

```bash
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install ruby-full

sudo gem update --system # in some cases not needed

sudo apt-get install build-essential --no-install-recommends
sudo gem install jekyll bundler
```

# Create and run new website with Jekyll

Use directory on local machine could be used. For example:
> **Root directory:** D:/website  
> **Site directory:** mynewblog

Bash commands will be next:

```bash
# Notice: /mnt/d/ maps to local D:\ drive.
# From there, you have access to all files.
cd /mnt/d/website
jekyll new mynewblog && cd mynewblog

# install missing gems
sudo bundle install

#Run website  
bundle exec jekyll serve
```