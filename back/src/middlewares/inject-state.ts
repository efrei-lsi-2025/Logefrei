import Elysia from "elysia";

export const injectStatePlugin = (app: Elysia) =>
  app.state({ service: Bun.env.SERVICE });
