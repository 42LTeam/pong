# Base Node
FROM node:18-alpine AS base
WORKDIR /usr/src/app
# Install dumb-init for better signal handling
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init
# Set ownership of app directory
RUN chown -R node:node /usr/src/app
# Set user to node for security
USER node

COPY --chown=node:node ./front/package.json ./
COPY --chown=node:node ./front/package-lock.json ./
RUN npm ci
COPY --chown=node:node ./front/ ./

FROM base as development
EXPOSE 5173
# Handle Every Signal Correctly by Dumb Init to PID 1
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["vite", "--host", "--port", "5173"]

FROM base as prod
CMD ["npm", "run", "build"]