FROM node:12.16.1-alpine

RUN mkdir /log
RUN chmod 777 /log

RUN mkdir /app
COPY build/package.json /app
COPY build/package-lock.json /app
RUN mkdir /app/dist
COPY build/dist /app/dist

VOLUME [ "/log" ]

WORKDIR /app

RUN npm install --production

EXPOSE 9000

CMD [ "npm", "run", "serve" ]
