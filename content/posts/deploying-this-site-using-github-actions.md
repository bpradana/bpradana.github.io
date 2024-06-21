+++
title = "Deploying this site using GitHub Actions"
description = "(not) A guide to deploying a Hugo site using GitHub Actions"
date = 2024-06-21T17:50:45+07:00
tldr = "Don't follow this guide, it's a mess."
draft = false
tags = ['DevOps']
+++

## Why?
I was bored at work and I thought, **"Hey, why not automate the deployment of this site using GitHub Actions? But I don't want the easy way, I want to do it the hard way."**. I like torturing myself, so I did it the hard way. And now I'm writing about it.

Before we start, let me tell you that **this is not a guide. This is a mess.** I'm just documenting what I did so that I can look back and laugh at myself. If you're looking for a guide, you're in the wrong place. But if you're looking for a mess, you're in the right place.

## Prerequisites
You need to have a Hugo site. If you don't have one, go build one. It's easy. You also need to have a GitHub account. If you don't have one, go create one. It's free. You also need to have a domain. If you don't have one, go buy one. It's cheap. Lastly, you need to have a VPS. If you don't have one, go rent one. It's only $5 a month. There's no excuse.

## Prepare for the Mess
### Creating Hugo Site
I'm not going to explain how to create a Hugo site in detail. There are plenty of guides out there. Just follow one of them. Or don't. It's up to you.
Basically, you need to install Hugo by running `brew install hugo`, create a new site by running `hugo new site my-site`, and you're good to go.

### Setting Up GitHub Repository
Do I really need to explain this? Just create a new repository on GitHub and push your Hugo site to it. It's easy. If you don't know how to do it, you shouldn't be reading this.

### Buy a Domain
I'm using Hostinger. Why Hostinger? I don't know, don't ask me. Just go buy a domain.

### Connecting to CloudFlare
To be honest I forgot how to do this step. Just google how to setup CloudFlare tunnel.

### Setting Up VPS
I'm using a VPS from Biznet Gio. It's only $5 a month. I'm using Debian 11. You can use whatever you want.

Make sure you have Docker installed. This [page](https://docs.docker.com/compose/install/linux/#install-using-the-repository) has a good guide on how to install Docker.

Don't forget to put your SSH public key in `~/.ssh/authorized_keys` so that the GitHub Actions can SSH into your VPS.

And lastly go to your CloudFlare Zero Trust Dashboard, go to `Networks` -> `Tunnels` -> `Create a tunnel` and follow the instructions.
After that go to `Public Hostname` tab and select `Add a public hostname`. I'm using `blog.bpradana.xyz` as the hostname, and in the service section you have to select `HTTPS` as the type and `localhost:80` as the URL (I'm using port 80 but you can change it)

### Setting Up GitHub Actions
This is where the fun begins. I created a new workflow file in `.github/workflows/vps.yml` with the following content:
```yaml
name: Deploy

on:
  push:
    branches:
      - master
      - main

jobs:
  build-upload:
    runs-on: ubuntu-latest
    name: Build and upload Docker image

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: .
          file: ./Dockerfile
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ secrets.REGISTRY_HOST }}/${{ secrets.USERNAME }}/site:latest

  deploy:
    runs-on: ubuntu-latest
    name: Deploy to VPS
    needs: build-upload

    steps:
      - name: deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull ${{ secrets.REGISTRY_HOST }}/${{ secrets.USERNAME }}/site:latest
            docker stop site || true
            docker rm site || true
            docker run -d --name site -p 80:80 ${{ secrets.REGISTRY_HOST }}/${{ secrets.USERNAME }}/site:latest
```
Let me explain what this mess does:
1. It builds a Docker image and pushes it to a Docker registry. It checks out the repository, sets up Docker Buildx, builds the Docker image, and pushes it to the Docker registry.
2. It deploys the Docker image to the VPS. It pulls the Docker image, stops the existing container, removes the existing container, and runs a new container.

### Setting Up Secrets
You need to set up some secrets in your GitHub repository. Go to `Settings` -> `Secrets` -> `New repository secret` and add the following secrets:
- `REGISTRY_HOST`: The hostname of your Docker registry.
- `USERNAME`: Your Docker registry username.
- `HOST`: The hostname of your VPS.
- `USER`: The username of your VPS.
- `SSH_PRIVATE_KEY`: The private key of your VPS.

## Conclusion
That's it. You now have a mess. Congratulations! If you followed this mess, you're a brave soul. If you didn't, you're a smart person. Either way, I hope you enjoyed this mess. I know I did. Now go automate something else. Have fun!
