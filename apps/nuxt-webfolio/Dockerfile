# Base image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm && apk add --no-cache tree

# Copier les fichiers package.json, pnpm-lock.yaml et pnpm-workspace.yaml depuis la racine
COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./nx.json ./app/

COPY ./packages/api-service/package.json ./packages/api-service/tsconfig.json ./packages/api-service/tsup.config.ts ./app/packages/api-service/
COPY ./packages/configuration/package.json ./packages/configuration/tsconfig.json ./packages/configuration/tsup.config.ts ./app/packages/configuration/
COPY ./packages/shared-utilities/package.json ./packages/shared-utilities/tsconfig.json ./packages/shared-utilities/tsup.config.ts ./app/packages/shared-utilities/
COPY ./packages/supabase-types/package.json ./packages/supabase-types/tsconfig.json ./packages/supabase-types/tsup.config.ts ./app/packages/supabase-types/
COPY ./packages/typescript-config/package.json ./packages/typescript-config/tsconfig.base.json ./app/packages/typescript-config/

COPY ./apps/nuxt-webfolio/package.json ./apps/nuxt-webfolio/tsconfig.json ./apps/nuxt-webfolio/nuxt.config.ts ./app/apps/nuxt-webfolio/

WORKDIR /app

# COPY ./apps/qanopee-core/ /app/apps/qanopee-core
# COPY ./apps/ /app/apps
# Copier les packages partagés
# Copy package.json and tsconfig.json and tsup.config.ts from packages, keeping the structure
# COPY ./packages/ /app/packages

# Install app dependencies
RUN pnpm install

# Add source files

COPY ./packages/api-service/index.ts ./packages/api-service/
COPY ./packages/api-service/src/ ./packages/api-service/src/

COPY ./packages/configuration/index.ts ./packages/configuration/
COPY ./packages/configuration/src/ ./packages/configuration/src/

COPY ./packages/shared-utilities/index.ts ./packages/shared-utilities/
COPY ./packages/shared-utilities/src/ ./packages/shared-utilities/src/

COPY ./packages/supabase-types/index.ts ./packages/supabase-types/
COPY ./packages/supabase-types/src/ ./packages/supabase-types/src/


COPY ./apps/nuxt-webfolio/components/ ./apps/nuxt-webfolio/components/
COPY ./apps/nuxt-webfolio/pages/ ./apps/nuxt-webfolio/pages/
COPY ./apps/nuxt-webfolio/public/ ./apps/nuxt-webfolio/public/
COPY ./apps/nuxt-webfolio/server/ ./apps/nuxt-webfolio/server/
COPY ./apps/nuxt-webfolio/app.vue ./apps/nuxt-webfolio

# # Creates a "dist" folder with the production build
RUN pnpm --filter nuxt-webfolio run build

EXPOSE 3000
# Start the server using the production build
CMD [ "node", "./apps/nuxt-webfolio/.output/server/index.mjs" ]
