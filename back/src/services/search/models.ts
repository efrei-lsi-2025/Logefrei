import { t } from 'elysia';
import { HousingType } from '@prisma/client';

export const SearchHousingLookupDTO = t.Object({
    text: t.Optional(t.String()),
    startDate: t.Date(),
    endDate: t.Date(),
    type: t.Optional(t.Enum(HousingType)),
    minRent: t.Optional(t.String()),
    maxRent: t.Optional(t.String()),
    minSurf: t.Optional(t.String()),
    maxSurf: t.Optional(t.String())
});

export const SearchModels = {
    SearchHousingLookupDTO
};
