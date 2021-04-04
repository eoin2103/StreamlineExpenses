FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3000 

RUN chmod +x /app/node_modules/.bin/nodemon

CMD ["npm", "start"]