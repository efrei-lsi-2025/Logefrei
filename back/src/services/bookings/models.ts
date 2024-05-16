import { Static, t } from 'elysia';

import { HousingPrismaSelect, HousingSchema } from '../housings/models';
import { ParametrizedRef } from '../../utils/typebox';
import { UserPrismaSelect, UserSchema } from '../users/models';
import { BookingStatus, Prisma } from '@prisma/client';

export const BookingPrismaSelect = {
    id: true,
    housingId: true,
    housing: {
        select: HousingPrismaSelect
    },
    startDate: true,
    endDate: true,
    tenantId: true,
    tenant: {
        select: UserPrismaSelect
    },
    status: true,
    createdAt: true,
    updatedAt: true
} satisfies Prisma.BookingSelect;

export const Booking = t.Object(
    {
        id: t.String(),
        housingId: t.String(),
        housing: ParametrizedRef<HousingSchema>('#/components/schemas/Housing'),
        startDate: t.Date(),
        endDate: t.Date(),
        tenantId: t.String(),
        tenant: ParametrizedRef<UserSchema>('#/components/schemas/User'),
        status: t.Enum(BookingStatus),
        createdAt: t.Date(),
        updatedAt: t.Date()
    },
    {
        $id: '#/components/schemas/Booking'
    }
);

export const ManyBookings = t.Array(
    ParametrizedRef<typeof Booking>('#/components/schemas/Booking'),
    {
        $id: '#/components/schemas/ManyBookings'
    }
);

export const BookingCreationDTO = t.Object({
    housingId: t.String(),
    startDate: t.Date(),
    endDate: t.Date()
});

export type BookingCreationDTO = Static<typeof BookingCreationDTO>;

export const BookingModels = {
    Booking,
    ManyBookings,
    BookingCreationDTO
};
