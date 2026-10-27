FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY profile.png /usr/share/nginx/html/profile.png
COPY BricolageGrotesque.woff2 /usr/share/nginx/html/BricolageGrotesque.woff2
