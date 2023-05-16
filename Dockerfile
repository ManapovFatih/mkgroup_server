FROM node:18-alpine
WORKDIR /usr/src/app
COPY prisma ./prisma/
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5000
CMD [ "node", "dist/main.js" ]