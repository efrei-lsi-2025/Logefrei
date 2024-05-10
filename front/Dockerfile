FROM node:18-alpine3.17 as front-builder

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM node:18-alpine3.17 as front-runner

WORKDIR /app

COPY --from=front-builder /app/.output ./
EXPOSE 8080

ENV HOST=0.0.0.0 PORT=8080 NODE_ENV=production

ENTRYPOINT ["node", "/app/server/index.mjs"]