FROM ubuntu:24.04

RUN apt-get update && apt-get install -y git node 

COPY . .

RUN npm i; npm run build

LABEL \
    "name"="Auto Issue Action" \
    "homepage"="https://github.com/marketplace/actions/auto-issue" \
    "repository"="https://github.com/offensive-vk/auto-issue" \
    "maintainer"="TheHamsterBot <TheHamsterBot@users.noreply.github.com>"
