import { t, Elysia } from "elysia";
import { HousingType, Housing, HousingStatus } from "@prisma/client";

export type HousingCreationDTO = {
    type: HousingType;
    rent: number;
    address: string;
    surface: number;
    description: string;
    ownerId: string;
};

export const HousingModels = new Elysia()
    .model({
        HousingDTO: t.Object({
            id: t.String(),
            type: t.Enum(HousingType),
            rent: t.Number(),
            address: t.String(),
            surface: t.Number(),
            description: t.String(),
            ownerId: t.String(),
            status: t.Enum(HousingStatus),
            createdAt: t.Date(),
            updatedAt: t.Date(),
        }),
        HousingCreationDTO: t.Object({
            type: t.Enum(HousingType),
            rent: t.Number(),
            address: t.String(),
            surface: t.Number(),
            description: t.String(),
            ownerId: t.String(),
        }),
    });
