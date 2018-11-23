FROM node:10

ENV NODE_ENV production
ENV PORT 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]