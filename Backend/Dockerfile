FROM node:20-alpine

# Create app directory

WORKDIR /app

# Install app dependencies

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
# Bundle app source

COPY . .

RUN yarn prisma generate

EXPOSE 4000

CMD [ "yarn", "start:prod" ]


