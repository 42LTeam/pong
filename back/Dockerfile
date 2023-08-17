###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Install dumb-init to run as PID 1
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node ./back/package*.json ./


# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci; npm i -g @nestjs/cli
#npm ci:This command is similar to npm install, except it's meant to be used in automated environments such as test
#platforms, continuous integration, and deployment -- or any situation where you want to make sure you're 
#doing a clean install of your dependencies.
# Bundle app source
COPY --chown=node:node ./back . 

# Use the node user from the image (instead of the root user)
USER node
EXPOSE 3000

# Handle Every Signal Correctly by Dumb Init to PID 1
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

# Install dumb-init to run as PID 1
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI.
# The Nest CLI is a dev dependency,
# In the previous development stage we ran `npm ci` which installed all dependencies.
# So we can copy over the node_modules directory from the development image into this build image.
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN npm ci --only=production && npm cache clean --force

USER node

# Handle Every Signal Correctly by Dumb Init to PID 1
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Install dumb-init to run as PID 1
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Handle Every Signal Correctly by Dumb Init to PID 1
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
