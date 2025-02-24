# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

# Diretório de trabalho para o build
WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários para instalar dependências
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma ./prisma/

# Instalar as dependências do projeto
RUN npm install

# Copiar os arquivos da aplicação
COPY . .

# Compilar a aplicação TypeScript para JavaScript
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:18-alpine

# Diretório de trabalho da aplicação
WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários para rodar em produção
COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma

# Instalar o Prisma CLI
RUN npm install -g prisma

# Definir variável de ambiente para produção
ENV NODE_ENV=production

# Definir caminho do arquivo secreto no Render
ARG SECRET_FILE_PATH="/etc/secrets/.env"
ENV SECRET_FILE_PATH=$SECRET_FILE_PATH

# Carregar as variáveis do Secret File (se existir)
RUN if [ -f "$SECRET_FILE_PATH" ]; then export $(grep -v '^#' $SECRET_FILE_PATH | xargs); fi

# Rodar as migrações do Prisma
RUN prisma generate && prisma migrate deploy

# Expor a porta padrão do NestJS
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

# Comando para iniciar a aplicação
CMD ["sh", "-c", "node dist/main || trap : TERM INT; sleep infinity & wait"]
