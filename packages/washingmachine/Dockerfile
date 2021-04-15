FROM node:15-alpine as build

WORKDIR /app

ADD . .

RUN npm install && npm run build

FROM node:15-alpine as app

WORKDIR /app

COPY --from=build /app/dist .
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/package*.json .

ENV NODE_ENV=production

# Install dependencies and generate prisma client
RUN npm install
RUN npm run prisma
RUN rm -rf /app/prisma

CMD [ "node", "index.js" ]
