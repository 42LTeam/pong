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

# ---- Build ----
FROM base AS build
COPY --chown=node:node --from=development /usr/src/app/package.json ./
COPY --chown=node:node --from=development /usr/src/app/package-lock.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules/
COPY --chown=node:node --from=development /usr/src/app/ ./
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate && npx tsc && (date | npm run migrate)

# ---- Production ----
FROM base AS production
ENV NODE_ENV=production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
CMD ["sh", "-c", "npm run start:migrate:prod"]
