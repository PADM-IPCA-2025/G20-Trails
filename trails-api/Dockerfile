# Fase 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Fase 2: Execução
FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários para produção
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --only=production

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3002

EXPOSE 3002

CMD ["node", "dist/src/main.js"]