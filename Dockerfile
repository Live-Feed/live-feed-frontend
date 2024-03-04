FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# NGINX configuration
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]