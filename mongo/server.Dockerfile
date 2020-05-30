FROM node:14-alpine

## Dockerfile for development
# Dump init to redirecting signals
# this copies only package.json to avoid re-building of node_modules when changing the code
# npm install as pre-start hook to be able to install new dependencies with just a restart

# RUN   apk update \
#   &&   apk add ca-certificates wget \
#   &&   update-ca-certificates

# RUN apk add --no-cache --virtual .gyp \
#             python \
#             make \
#             g++

# RUN apk add curl git

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64
RUN chmod +x /usr/local/bin/dumb-init

ENV HOME=/usr/src
WORKDIR $HOME/app

COPY package.json .
COPY package-lock.json .

RUN npm install

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["sh", "-c", "npm install && exec npm run start-dev"]