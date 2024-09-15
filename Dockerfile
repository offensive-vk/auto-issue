FROM ubuntu:24.04

SHELL ["/bin/bash"]

RUN apt-get update && apt-get install -y nodejs

COPY . .

RUN npm i && npm run build

LABEL \
    "name"="Auto Issue Action" \
    "homepage"="https://github.com/marketplace/actions/auto-issue" \
    "repository"="https://github.com/offensive-vk/auto-issue" \
    "maintainer"="TheHamsterBot <TheHamsterBot@users.noreply.github.com>"
