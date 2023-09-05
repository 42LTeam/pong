# ---- Base Node ----
FROM node:18-alpine AS base
# Set working directory
WORKDIR /usr/src/app
# Install dumb-init for better signal handling
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 && \
    chmod +x /usr/local/bin/dumb-init
# Set ownership of our app directory
RUN chown -R node:node /usr/src/app
# Set user to node for security
USER node

# ---- Development ----
FROM base AS development
# Copy package.json and package-lock.json and install dependencies
COPY --chown=node:node ./back/package*.json ./
RUN npm ci
# Copy application files
COPY --chown=node:node ./back/ .
# Ensure public/uploads directory exists with correct permissions
RUN mkdir -p public/uploads && \
    chown -R node:node public/uploads && \
    chmod -R 755 public/uploads
# Expose port
EXPOSE 3000
# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
# Command to run your application
CMD ["sh", "-c", "npx prisma generate && npx tsc && (date | npm run migrate) && npm run start:migrate:prod"]