# Use uma imagem oficial do Node.js como base
FROM node:20-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de manifesto do pacote e instale as dependências
COPY package*.json ./

RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]