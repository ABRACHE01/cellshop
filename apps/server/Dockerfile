#  Dockerfile for Node Express Backend

FROM node:20.8.0-alpine

# Working directory be app
WORKDIR /apps/server

# Install Dependencies
COPY package.json .

###  Installing dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy app source code
COPY . .

# Exports
EXPOSE 2020

CMD ["pnpm", "--filter", "server", "run", "dev", "cart-service"]
