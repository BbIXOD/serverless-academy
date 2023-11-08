# syntax=docker/dockerfile:1

FROM node:14

ENV NODE_ENV production

WORKDIR /app

COPY package*.json .
COPY . .

RUN npm install

RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER root

EXPOSE 3000

CMD npm run start