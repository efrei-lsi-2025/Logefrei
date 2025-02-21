FROM --platform=${BUILDPLATFORM} oven/bun:1 AS base

WORKDIR /home/bun/app

FROM base AS install

RUN mkdir -p /temp
COPY package.json bun.lockb /temp/
COPY prisma/schema.prisma /temp/prisma/schema.prisma
RUN cd /temp && bun install --frozen-lockfile --production && bunx prisma generate

FROM base AS release

COPY --chown=bun:bun --from=install /temp/node_modules node_modules
COPY --chown=bun:bun . .

USER bun

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV PATH=$PATH:/home/bun/bin:/home/bun/app/node_modules/.bin

EXPOSE 3000

ENTRYPOINT [ "bun", "run", "start:prod" ]