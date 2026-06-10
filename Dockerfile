FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY profile.png /usr/share/nginx/html/profile.png
COPY PlayfairDisplay.ttf /usr/share/nginx/html/PlayfairDisplay.ttf
COPY PlayfairDisplay-Italic.ttf /usr/share/nginx/html/PlayfairDisplay-Italic.ttf
