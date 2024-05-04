# FROM node:18.14.2 as build
# WORKDIR /app
# COPY . .
# RUN npm i
# RUN npm run build

# NGINX configuration
FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
COPY ./build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]