# Étape 1 : Build l'app Next.js
FROM node:18 AS build
WORKDIR /app

# Copier fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Build de l'app Next.js
RUN npm run build

# Étape 2 : Exécuter l'app
FROM node:18-alpine
WORKDIR /app

# Copier uniquement ce qui est nécessaire
COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "start"]
