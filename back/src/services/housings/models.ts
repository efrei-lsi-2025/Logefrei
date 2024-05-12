import { t, Elysia, Static } from 'elysia';
import { HousingType, HousingStatus } from '@prisma/client';

const HousingDTO = t.Object({
    id: t.String(),
    type: t.Enum(HousingType),
    rent: t.Number(),
    address: t.String(),
    surface: t.Number(),
    description: t.String(),
    ownerId: t.String(),
    status: t.Enum(HousingStatus),
    createdAt: t.Date(),
    updatedAt: t.Date()
});

const ManyHousingsDTO = t.Array(HousingDTO);

const HousingCreationDTO = t.Object({
    type: t.Enum(HousingType),
    rent: t.Number(),
    address: t.String(),
    surface: t.Number(),
    description: t.String(),
    ownerId: t.String()
});

const HousingUpdateDTO = t.Object({
    rent: t.Optional(t.Number()),
    address: t.Optional(t.String()),
    surface: t.Optional(t.Number()),
    description: t.Optional(t.String()),
    status: t.Optional(t.Enum(HousingStatus))
});

export type HousingCreationDTO = Static<typeof HousingCreationDTO>;

export const HousingModels = new Elysia().model({
    ManyHousingsDTO,
    HousingDTO,
    HousingCreationDTO,
    HousingUpdateDTO
});
