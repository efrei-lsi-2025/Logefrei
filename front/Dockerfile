ARG NODE_IMAGE=oven/bun

FROM $NODE_IMAGE AS base
WORKDIR /home/bun/app

FROM base AS install

RUN mkdir -p /temp
COPY package.json bun.lockb /temp/
RUN cd /temp && bun install --frozen-lockfile

FROM install AS build

COPY --from=install /temp/node_modules /home/bun/app/node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM base AS release

COPY --chown=bun:bun --from=install /temp/node_modules /home/bun/app/node_modules
COPY --chown=bun:bun --from=build /home/bun/app/.output .

USER bun
ENV HOST=0.0.0.0
ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT [ "bun", "run", "server/index.mjs" ]