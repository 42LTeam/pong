FROM node:18-alpine

WORKDIR /usr/src/app

COPY --chown=node:node ./front/package*.json ./

RUN npm ci

COPY --chown=node:node ./front .

EXPOSE 5173

