### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build  /app/dist/exchange-rate  /usr/share/nginx/html