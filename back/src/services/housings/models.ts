import { t, Static } from 'elysia';
import { HousingType, HousingStatus, Prisma, HousingAvailabilityStatus } from '@prisma/client';
import { Nullable, ParametrizedRef } from '../../utils/typebox';
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
    availabilityStatus: true,
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
        availabilityStatus: Nullable(t.Enum(HousingAvailabilityStatus)),
        createdAt: t.Date(),
        updatedAt: t.Date()
    },
    {
        $id: '#/components/schemas/Housing'
    }
);

export type HousingSchema = typeof Housing;
export type Housing = Static<typeof Housing>;

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
export type HousingUpdateDTO = Static<typeof HousingUpdateDTO>;

export const HousingModels = {
    Housing,
    ManyHousings,

    HousingCreationDTO,
    HousingUpdateDTO
};
