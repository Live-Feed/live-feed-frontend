# NGINX configuration
FROM nginx:alpine
COPY ./build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]