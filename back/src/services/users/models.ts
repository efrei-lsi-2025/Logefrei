import { Static, t } from 'elysia';
import { ParametrizedRef } from '../../utils/typebox';
import { Prisma } from '@prisma/client';

export const UserPrismaSelect = {
    id: true,
    email: true,
    name: true,
    phone: true,
    address: true,
    isAdmin: true,
    createdAt: true,
    updatedAt: true
} satisfies Prisma.UserSelect;

export const User = t.Object(
    {
        id: t.String(),
        email: t.String(),
        name: t.String(),
        phone: t.Nullable(t.String()),
        address: t.Nullable(t.String()),
        isAdmin: t.Boolean(),
        createdAt: t.Date(),
        updatedAt: t.Date()
    },
    {
        $id: '#/components/schemas/User'
    }
);

export type UserSchema = typeof User;
export type User = Static<typeof User>;

const ManyUsers = t.Array(ParametrizedRef<typeof User>('#/components/schemas/User'));

export const UserUpdateDTO = t.Object({
    phone: t.Optional(t.String()),
    address: t.Optional(t.String())
});

export type UserUpdateDTO = Static<typeof UserUpdateDTO>;

export const UserModels = {
    ManyUsers,
    UserUpdateDTO,
    User
};
