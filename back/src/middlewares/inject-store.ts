import Elysia from 'elysia';

export const injectStorePlugin = (app: Elysia) =>
    app.state({ service: Bun.env.SERVICE });
