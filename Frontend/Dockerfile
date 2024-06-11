ARG NODEJS=node:20-alpine

FROM ${NODEJS} as build

WORKDIR /app

COPY package*.json ./

RUN npm install typescript vite@4.1.0 -g

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM ${NODEJS}

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

CMD ["serve", "-s", "dist", "-l", "80"]