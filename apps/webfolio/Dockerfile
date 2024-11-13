# Base image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm && apk add --no-cache tree

# Copier les fichiers package.json, pnpm-lock.yaml et pnpm-workspace.yaml depuis la racine
COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./nx.json ./app/

# Copier les fichiers de configurations de l'aplication
COPY ./apps/webfolio/package.json ./apps/webfolio/pnpm-lock.yaml ./apps/webfolio/quasar.config.js ./apps/webfolio/tsconfig.json /app/apps/webfolio/

# Copier les fichiers de configurations des packages
# COPY ./packages/webfolio/package.json ./packages/webfolio/pnpm-lock.yaml ./packages/webfolio/quasar.config.js ./packages/webfolio/tsconfig.json /app/packages/webfolio/
COPY ./packages/ /app/packages
# Create app directory

WORKDIR /app

# COPY ./apps/qanopee-core/ /app/apps/qanopee-core
# COPY ./apps/ /app/apps
# Copier les packages partagés
# Copy package.json and tsconfig.json and tsup.config.ts from packages, keeping the structure
# COPY ./packages/ /app/packages

# Install app dependencies
RUN pnpm install

# Add source files
COPY ./apps/webfolio/ /app/apps/webfolio/
# COPY ./apps/webfolio/public/ /app/apps/webfolio/
# COPY ./apps/webfolio/index.html ./apps/webfolio/tsconfig.vue-tsc.json ./apps/webfolio/tailwind.config.ts ./apps/webfolio/postcss.config.cjs ./apps/webfolio/.npmrc /app/apps/webfolio/
# COPY ./apps/webfolio/src-ssr/ /app/apps/webfolio/src-ssr
# COPY ./apps/webfolio/src/ /app/apps/webfolio/src
# COPY ./apps/webfolio/types/ /app/apps/webfolio/types
#* remove .eslintrc to avoid lint problem during production build
RUN find /app -name ".eslintrc.json" -exec rm {} \;

# # Creates a "dist" folder with the production build
# RUN pnpm run build

# Start the server using the production build
CMD [ "node", "dist/apps/qanopee-core/main.js" ]
