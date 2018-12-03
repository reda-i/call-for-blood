FROM node:10

ENV NODE_ENV production
ENV PORT 3200

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3200

CMD ["npm", "start"]