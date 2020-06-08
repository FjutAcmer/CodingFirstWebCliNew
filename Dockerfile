FROM nginx
LABEL user="axiangcoding"
COPY dist/spa/ /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
