map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen       80;
    listen       443 default_server ssl;
    server_name  www.techstacks.io;

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location = /prerender {
        return 302 /prerender/;
    }

    location /prerender/ {
        proxy_pass http://localhost:7000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_ignore_client_abort off;
        proxy_intercept_errors on;
    }

    location / {
        proxy_pass http://localhost:16325/;
        proxy_http_version 1.1;

        proxy_redirect off;
        proxy_read_timeout 1m;
        proxy_connect_timeout 1m;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_ignore_client_abort off;
        proxy_intercept_errors on;

        client_max_body_size 500m;
    }

    # Turn on OCSP stapling as recommended at
    # https://community.letsencrypt.org/t/integration-guide/13123
    # requires nginx version >= 1.3.7
    ssl_stapling on;
    ssl_stapling_verify on;

    ssl_certificate /etc/letsencrypt/live/www.techstacks.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/www.techstacks.io/privkey.pem; # managed by Certbot
}
server {
    if ($host = www.techstacks.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen       80;
    server_name techstacks.io www.techstacks.io;
    return 404; # managed by Certbot


}
