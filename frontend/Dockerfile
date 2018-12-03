FROM node:10

ENV NODE_ENV production
ENV PORT 3100

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --unsafe-perm

COPY . .

EXPOSE 3100 3200 3400

CMD ["npm", "start"]