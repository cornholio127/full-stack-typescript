FROM node:12.16.1-alpine

RUN apk update && apk upgrade && apk add build-base gcc autoconf automake zlib-dev libpng-dev nasm bash

RUN mkdir /app
RUN mkdir /app/api
RUN mkdir /app/build
RUN mkdir /app/components
RUN mkdir /app/config
RUN mkdir /app/exports
RUN mkdir /app/extensions
RUN mkdir /app/public
RUN mkdir /app/public/uploads

COPY build/package.json /app
COPY build/package-lock.json /app
COPY build/api /app/api
COPY build/build /app/build
COPY build/components /app/components
COPY build/config /app/config
COPY build/exports /app/exports
COPY build/extensions /app/extensions
COPY build/public /app/public

WORKDIR /app

RUN npm install --production

RUN chmod 777 /app/public/uploads

VOLUME [ "/app/public/uploads" ]

EXPOSE 1337

CMD [ "npm", "run", "start" ]
