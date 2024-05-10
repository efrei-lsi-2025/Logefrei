FROM ubuntu:22.04 AS base

RUN apt-get update && apt-get install -y curl gnupg zip unzip

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

ENV BUN_INSTALL=$HOME/bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH=$PATH:$HOME/bun/bin

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
EXPOSE 3000

ENTRYPOINT [ "bun", "run", "start:prod" ]