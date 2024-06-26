+++
title = "Zero Downtime Deployment on a Blog That No One Reads"
description = "A guide to implementing Blue-Green Deployment using GitHub Actions"
date = 2024-06-24T23:52:50+07:00
tldr = "Don't implement Blue-Green Deployment on a blog that no one reads."
draft = true
tags = ['DevOps']
+++

## Why?
The same reason why I automated the deployment of this site using GitHub Actions: I was bored. I know, I know, I should find a hobby. But hey, at least I'm learning something new.

## What is Blue-Green Deployment?
Blue-Green Deployment is a deployment strategy that reduces downtime by running two identical production environments. One environment (let's call it Blue) is live and serving traffic, while the other environment (let's call it Green) is idle. When you want to deploy a new version of your application, you deploy it to the Green environment. Once the deployment is successful, you switch the traffic from the Blue environment to the Green environment. This way, you can deploy new versions of your application without any downtime.

## How to Implement Blue-Green Deployment?
There are many ways to implement Blue-Green Deployment, but I'm going to show you how to do it using GitHub Actions. Here's a high-level overview of the steps:
1. Build the new version of your application
2. Deploy the new version to the Green environment
3. Run some tests to make sure the deployment is successful (optional)
4. Switch the traffic from the Blue environment to the Green environment
5. Clean up the Blue environment
6. Drink some beer (mandatory)

## Prerequisites
Just like the [previous post](/posts/deploying-this-site-using-github-actions/), you need to have a Hugo site (or any other site, really), a GitHub account, a domain, and a VPS. You also need to have a CloudFlare account.

## Into the Rabbit Hole
### Setting Up Scripts
First, we need to set up some scripts to automate the Blue-Green Deployment process.
```bash
#!/bin/bash

echo "checking the running environment"
if grep -q 'proxy_pass http://site-green;' ~/services/gateway/conf.d/default.conf; then
  CURRENT_ENV="green"
  NEW_ENV="blue"
else
  CURRENT_ENV="blue"
  NEW_ENV="green"
fi
echo "current environment: $CURRENT_ENV"

echo "pulling the latest image"
REGISTRY_URL=$1
USERNAME=$2
TAG=$3
docker pull $REGISTRY_URL/$USERNAME/site:$TAG

echo "stopping the $NEW_ENV container"
docker stop site-$NEW_ENV || echo "container not running"
docker rm site-$NEW_ENV || echo "container not found"

echo "starting the $NEW_ENV container"
docker run -d --name site-$NEW_ENV --network=gateway_network $REGISTRY_URL/$USERNAME/site:$TAG
error_code=$?
if [ $error_code -ne 0 ]; then
  echo "container $NEW_ENV failed to start"
  exit 1
fi
sleep 5

echo "checking the $NEW_ENV container"
docker exec site-$NEW_ENV curl -i localhost:80 | grep "200 OK"
error_code=$?
if [ $error_code -ne 0 ]; then
  echo "sanity check container $NEW_ENV failed"
  exit 1
fi

echo "updating the nginx configuration"
cp ~/services/gateway/conf.d/default.conf ~/services/gateway/conf.d/default.conf.bak
sed -i "s/proxy_pass http:\/\/site-$CURRENT_ENV;/proxy_pass http:\/\/site-$NEW_ENV;/" ~/services/gateway/conf.d/default.conf

echo "checking the nginx configuration"
docker exec -d gateway nginx -g 'daemon off; master_process on;' -t
error_code=$?
if [ $error_code -ne 0 ]; then
  echo "nginx configuration not valid, rolling back"
  cp ~/services/gateway/conf.d/default.conf.bak ~/services/gateway/conf.d/default.conf
  exit 1
fi

echo "reload nginx"
docker exec -d gateway nginx -g 'daemon off; master_process on;' -s reload
error_code=$?
if [ $error_code -ne 0 ]; then
  echo "nginx failed to reload, rolling back"
  cp ~/services/gateway/conf.d/default.conf.bak ~/services/gateway/conf.d/default.conf && docker exec -d gateway nginx -g 'daemon off; master_process on;' -s reload
  exit 1
fi
sleep 2

echo "checking the $NEW_ENV container through gateway"
docker exec gateway curl -i site-$NEW_ENV:80 | grep "200 OK"
error_code=$?
if [ $error_code -ne 0 ]; then
  echo "sanity check container $NEW_ENV through gateway failed, rolling back"
  cp ~/services/gateway/conf.d/default.conf.bak ~/services/gateway/conf.d/default.conf && docker exec -d gateway nginx -g 'daemon off; master_process on;' -s reload
  exit 1
fi

echo "checking the $NEW_ENV container through host"
curl -i localhost:80 | grep "200 OK"
if [ $error_code -ne 0 ]; then
  echo "sanity check container $NEW_ENV through host failed, rolling back"
  cp ~/services/gateway/conf.d/default.conf.bak ~/services/gateway/conf.d/default.conf && docker exec -d gateway nginx -g 'daemon off; master_process on;' -s reload
  exit 1
fi

echo "cleaning up"
docker rmi $(docker images -f "dangling=true" -q) || echo "no dangling images"

echo "deployed!"
```
