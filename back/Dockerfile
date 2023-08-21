# ---- Base Node ----
FROM node:18-alpine AS base
WORKDIR /usr/src/app
# Install dumb-init for better signal handling
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init
# Set ownership of our app directory
RUN chown -R node:node /usr/src/app
# Set user to node for security
USER node

# ---- Development ----
FROM base AS development
COPY --chown=node:node ./back/package.json ./
COPY --chown=node:node ./back/package-lock.json ./
RUN npm ci
COPY --chown=node:node ./back/ .
EXPOSE 3000
CMD ["sh", "-c", "npx prisma generate && npx tsc && (date | npm run migrate) && npm run start:migrate:prod"]
