FROM --platform linux/amd64 node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

ARG PORT=3001
ARG DATABASE_USER
ARG DATABASE_URL
ARG DATABASE_NAME
ARG DATABASE_PASS

ENV PORT=$PORT
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_URL=$DATABASE_URL
ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_PASS=$DATABASE_PASS

EXPOSE $PORT

CMD ["npm", "start"]