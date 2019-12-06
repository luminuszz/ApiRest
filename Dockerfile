FROM node:alpine
COPY package*.json  ./
FROM mongo
FROM redis:alpine

WORKDIR /the/workdir/path


RUN chmod 777 /usr/local/bin/docker-entrypoint.sh \
    && ln -s /usr/local/bin/docker-entrypoint.sh /


COPY  . .

EXPOSE 3000

CMD ["npm", "dev"]
