FROM node:14.15.0-alpine3.10 as BUILDER

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD .browserslistrc .prettierrc .eslintrc.js babel.config.js vue.config.js ./

ADD src ./src
ADD public ./public

ENV VUE_APP_API_ENDPOINT=https://demo-api.radiel.site

RUN npm run build

FROM node:14.15.0-alpine3.10

WORKDIR /app

RUN npm install -g serve

COPY --from=BUILDER /app/dist ./

CMD serve -s -l $PORT