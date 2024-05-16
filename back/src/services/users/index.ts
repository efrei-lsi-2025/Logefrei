import Elysia from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { UserService } from './service';
import { UserModels } from './models';

export const UsersController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)

    .model({ ...UserModels })

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
