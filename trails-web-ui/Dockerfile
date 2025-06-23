# Fase 1: Build da aplicação React
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Fase 2: Servir a aplicação com um servidor Node.js simples (http-server)
FROM node:18-alpine

WORKDIR /app

# Instala um servidor estático leve
RUN npm install -g serve

# Copia apenas a build final da app React
COPY --from=builder /app/build ./build

# Porta usada pela app
EXPOSE 3000

# Comando para servir o conteúdo da pasta build
CMD ["serve", "-s", "build", "-l", "3000"]