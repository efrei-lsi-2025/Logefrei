import { t, Static } from 'elysia';
import { HousingType, HousingStatus, Prisma } from '@prisma/client';
import { ParametrizedRef } from '../../utils/typebox';
import { type UserSchema, UserPrismaSelect } from '../users/models';

export const HousingPrismaSelect = {
    id: true,
    type: true,
    rent: true,
    address: true,
    surface: true,
    description: true,
    owner: {
        select: UserPrismaSelect
    },
    ownerId: true,
    status: true,
    createdAt: true,
    updatedAt: true
} satisfies Prisma.HousingSelect;

export const Housing = t.Object(
    {
        id: t.String(),
        type: t.Enum(HousingType),
        rent: t.Number(),
        address: t.String(),
        surface: t.Number(),
        description: t.String(),
        owner: ParametrizedRef<UserSchema>('#/components/schemas/User'),
        ownerId: t.String(),
        status: t.Enum(HousingStatus),
        createdAt: t.Date(),
        updatedAt: t.Date()
    },
    {
        $id: '#/components/schemas/Housing'
    }
);

export type HousingSchema = typeof Housing;

export const ManyHousings = t.Array(
    ParametrizedRef<typeof Housing>('#/components/schemas/Housing')
);

export const HousingCreationDTO = t.Object({
    type: t.Enum(HousingType),
    rent: t.Number(),
    address: t.String(),
    surface: t.Number(),
    description: t.String()
});

export const HousingUpdateDTO = t.Object({
    rent: t.Optional(t.Number()),
    address: t.Optional(t.String()),
    surface: t.Optional(t.Number()),
    description: t.Optional(t.String()),
    status: t.Optional(t.Enum(HousingStatus))
});

export type HousingCreationDTO = Static<typeof HousingCreationDTO>;

export const HousingModels = {
    Housing,
    ManyHousings,

    HousingCreationDTO,
    HousingUpdateDTO
};
