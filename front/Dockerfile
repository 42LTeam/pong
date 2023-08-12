FROM node:18-alpine

WORKDIR /usr/src/app

# Install dumb-init to run as PID 1
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init

COPY --chown=node:node ./front/package*.json ./

RUN npm ci

COPY --chown=node:node ./front .

EXPOSE 5173

# Handle Every Signal Correctly by Dumb Init to PID 1
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
