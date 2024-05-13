import Elysia from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { injectModelsPlugin } from '../../middlewares/inject-models';
import { UserService } from './service';

export const UsersController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)
    .use(injectModelsPlugin)

    .put(
        '/me',
        ({ user: { id: userId }, body }) => {
            return UserService.updateUser(userId, body);
        },
        {
            body: 'UserUpdateDTO',
            response: 'User',
            detail: {
                tags: ['Users'],
                summary: 'Update current user'
            }
        }
    )

    .get('/me', ({ user }) => user, {
        detail: {
            tags: ['Users'],
            summary: 'Get current user'
        }
    });
