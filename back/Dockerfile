ARG NODE_IMAGE=oven/bun

FROM $NODE_IMAGE AS base
WORKDIR /home/bun/app

FROM base AS install

RUN mkdir -p /temp
COPY package.json bun.lockb /temp/
COPY prisma/schema.prisma prisma/schema.prisma
RUN cd /temp && bun install --frozen-lockfile --production && bunx prisma generate

FROM base AS release

COPY --chown=bun:bun --from=install /temp/node_modules node_modules
COPY --chown=bun:bun . .

USER bun
ENV HOST=0.0.0.0
ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT [ "bun", "run", "start:prod" ]