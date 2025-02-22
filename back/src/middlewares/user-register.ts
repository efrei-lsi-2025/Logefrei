import Elysia from 'elysia';
import prisma from '../clients/prisma';

const createOrGetUser = async (name: string, email: string) => {
    console.log('Creating or getting user', name, email);

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (user) {
        return user;
    }

    console.log('Creating user', name, email);

    return prisma.user.create({
        data: {
            name,
            email
        }
    });
};

export const userRegisterPlugin = (app: Elysia) =>
    app.derive(async ({ headers }) => {
        if (!headers['x-authentik-name'] || !headers['x-authentik-email']) {
            return Promise.reject('User not authenticated');
        }
        const user = await createOrGetUser(
            headers['x-authentik-name'],
            headers['x-authentik-email']
        );

        console.log('User registered', user);

        return {
            user
        };
    });
