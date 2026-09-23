# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY src ./src

# Build with Parcel
RUN npm run build

# Stage 2: Serve
FROM caddy:2.7-alpine

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/www ./www

# Copy Caddyfile for security headers and compression
COPY Caddyfile ./

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/health || exit 1

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 80

CMD ["caddy", "run", "--config", "/app/Caddyfile"]
