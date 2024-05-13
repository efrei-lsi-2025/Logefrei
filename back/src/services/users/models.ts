import Elysia, { t } from 'elysia';
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

export const UserModels = {
    ManyUsers,
    User
};
