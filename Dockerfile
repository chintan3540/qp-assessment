FROM node:18

WORKDIR /grocery

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]