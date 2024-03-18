FROM node:18 as build-deps

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn run build

CMD ["yarn", "start"]
