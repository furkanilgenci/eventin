FROM node:14.15.0-alpine3.10

ENV NODE_ENV=production

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install --only=prod

ADD bin ./bin
ADD src ./src

CMD [ "npm", "start" ]
