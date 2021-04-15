FROM node:15-alpine as build

# Used by CRA
ARG REACT_APP_API_URL

WORKDIR /app

ADD . .

# Automatically does production build
RUN npm install && npm run build

FROM nginx:1.19-alpine

ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
