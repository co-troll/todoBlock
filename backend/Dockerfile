FROM node:20.17

WORKDIR /back

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]