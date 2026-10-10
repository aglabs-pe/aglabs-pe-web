FROM node:20-alpine AS builder

WORKDIR /build
COPY package*.json ./
RUN npm ci  # Install ALL dependencies (including dev)

COPY . .
RUN npm run build


FROM nginx:alpine
COPY --from=builder /build/www /usr/share/nginx/html
# COPY src/m-star /usr/share/nginx/html/mstar

# COPY --from=builder ./src/m-star /usr/share/nginx/html/mstar

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 7099

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
