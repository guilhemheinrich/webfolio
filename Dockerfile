# Etape 1: Construire les dépendances et le projet
# Utiliser une image Node.js comme image de base.
FROM node:latest as build-stage

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Installer pnpm globalement
RUN npm install -g pnpm

# Copier les fichiers 'package.json' et 'package-lock.json' (ou 'yarn.lock') à la racine
COPY ./package*.json ./

# Copier le reste des fichiers du monorepo dans le répertoire de travail
COPY . .

# Installer les dépendances à la racine du monorepo
RUN pnpm install

# Construire les bibliothèques et l'application frontale
RUN pnpm run build

# Etape 2: Configurer l'image de production pour servir l'app
# Utiliser une image légère pour le serveur HTTP
FROM nginx:alpine as production-stage

# Copier le build de l'application du stage de build au répertoire de service nginx
COPY --from=build-stage /app/apps/webfolio/dist/spa /usr/share/nginx/html

# Copier la configuration nginx pour supporter le routage SPA
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Lancer Nginx et servir l'application
CMD ["nginx", "-g", "daemon off;"]
