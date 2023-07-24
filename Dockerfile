FROM node:18-alpine

COPY package.json /app/package.json

WORKDIR /app

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]