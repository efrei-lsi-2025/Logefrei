import Elysia from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';

export const UsersController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)

    .get(
        '/',
        ({ user: { name }, store: { service } }) =>
            `Hello from ${service} service ${name} ! `,
        {
            detail: {
                tags: ['Users'],
                summary: 'Users service'
            }
        }
    )

    .get('/me', ({ user }) => user, {
        detail: {
            tags: ['Users'],
            summary: 'Get current user'
        }
    });
