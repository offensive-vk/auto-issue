FROM node:20-slim

SHELL ["/bin/bash", "-c"]

RUN npm i -g pnpm@9.0.0

WORKDIR /app

COPY package*.json ./

RUN pnpm i

COPY src/ ./src/

RUN pnpm run build && ls -al ./dist

ENTRYPOINT ["node", "./dist/index.js"]

LABEL \
    "name"="Auto Issue Action" \
    "homepage"="https://github.com/marketplace/actions/auto-issue" \
    "repository"="https://github.com/offensive-vk/auto-issue" \
    "maintainer"="TheHamsterBot <TheHamsterBot@users.noreply.github.com>"
