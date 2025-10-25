#BUILDER STAGE

FROM node:22-alpine AS builder

RUN addgroup -g 1001 appgroup
RUN adduser -u 1001 -G appgroup -D appuser

#USER appuser

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i                

COPY . .

# Fix permissions
RUN chown -R appuser:appgroup /app

USER appuser
RUN npm run build

#Production Stage
FROM node:22-alpine AS production

# Add timezone support (optional but useful for cron)
RUN apk add --no-cache tzdata \
  && cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime \
  && echo "Asia/Kolkata" > /etc/timezone
ENV TZ=Asia/Kolkata

USER appuser
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

#kahan per availabe hoga
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

CMD ["node", "dist/index.js"]

