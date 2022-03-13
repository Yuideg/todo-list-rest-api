FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add --update --no-cache postgresql-client jpeg-dev
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev
RUN apk del .tmp-build-deps
RUN npm install
RUN npm install nodemon --save
RUN npm install casbin --save
RUN npm install jsonwebtoken
RUN npm install dotenv
RUN npm install body-parser
RUN npm i bcrypt
RUN docker system prune
RUN npm install casbin@3 casbin-express-authz@2 --save
COPY . .
EXPOSE 9090
CMD ["node", "server.js"]