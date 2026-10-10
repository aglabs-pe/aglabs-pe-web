FROM node:20-alpine AS builder

WORKDIR /build
COPY package*.json ./
RUN npm ci  # Install ALL dependencies (including dev)

COPY . .
RUN npm run build


FROM nginx:alpine
# RUN addgroup -S appgroup \
#   && adduser -S appuser -G appgroup \
RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp \
             /var/run \
             /var/log/nginx \
             /usr/share/nginx/html \
  ; chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /build/www /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 7099
CMD ["nginx", "-g", "daemon off;"]
# Final stage
# FROM node:20-alpine

# WORKDIR /app

# # Create non-root user
# # RUN addgroup -g 1000 appuser && adduser -D -u 1000 -G appuser appuser
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# # Copy node_modules and built files from builder
# COPY --from=builder --chown=appuser:appuser /build/node_modules ./node_modules
# COPY --from=builder --chown=appuser:appuser /build/www ./www

# USER appuser

# EXPOSE 80

# # Serve from www directory on port 80
# CMD ["npx", "serve", "-l", "80", "-s", "www"]
