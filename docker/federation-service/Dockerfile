FROM node:13.3-alpine

RUN mkdir /log
RUN chmod 777 /log

VOLUME [ "/log" ]

WORKDIR /app

EXPOSE 9000

CMD [ "npm" "run" "serve" ]
