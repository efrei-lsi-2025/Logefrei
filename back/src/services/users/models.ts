import Elysia, { t } from 'elysia';

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

const ManyUsers = t.Array(t.Ref('#/components/schemas/User'));

export const UserModels = {
    ManyUsers,
    User
};
