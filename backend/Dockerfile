FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# The backend listens on PORT, which should be provided via environment variable
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"]
