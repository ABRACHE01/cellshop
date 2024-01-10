
FROM node:18.19.0 as Developpment

WORKDIR /apps/product-service

COPY package*.json ./
RUN pnpm install

COPY . .

RUN pnpm run build


FROM node:18.19.0 as Production

WORKDIR /apps/product-service

COPY package*.json ./

RUN pnpm install --only=production

COPY --from=Developpment /apps/product-service/dist ./dist

CMD ["node", "dist/main"]