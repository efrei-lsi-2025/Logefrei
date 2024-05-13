import Elysia, { Static, t } from 'elysia';
import { ParametrizedRef } from '../../utils/typebox';

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
