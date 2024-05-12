import Elysia from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';

export const SearchController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)
    .get(
        '/',
        ({ user: { name }, store: { service } }) =>
            `Hello from ${service} service ${name} ! `,
        {
            detail: {
                tags: ['Search'],
                summary: 'Search service'
            }
        }
    );
