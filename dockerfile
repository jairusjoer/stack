# https://dockerize.io/guides/docker-nuxtjs-guide
# https://mokkapps.de/blog/dockerizing-a-nuxt-app

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-alpine

# Create destination directory
RUN mkdir nuxt
WORKDIR nuxt

# Update and install dependencies
RUN apk update && apk upgrade
RUN apk add git

# Copy the app, note .dockerignore
COPY . .

RUN npm install
RUN npm run build

CMD [ "node", ".output/server/index.mjs" ]
