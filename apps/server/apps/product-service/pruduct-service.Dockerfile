
FROM node:18.19.0 as Developpment

WORKDIR /apps/product-service

COPY package*.json ./
RUN pnpm install

COPY . .

RUN pnpm run dev 