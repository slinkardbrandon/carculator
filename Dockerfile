FROM node:10-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

RUN rm -rf src

RUN find . -path ./node_modules -prune -o -type f
RUN npm prune --production

FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf