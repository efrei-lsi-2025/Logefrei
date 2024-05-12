import Elysia, { t } from 'elysia';
import prisma from '../clients/prisma';

const createOrGetUser = async (name: string, email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (user) {
        return user;
    }

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
        return {
            user
        };
    });
