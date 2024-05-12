import Elysia, { Static, t } from 'elysia';

const BookingDTO = t.Object({
    id: t.String(),
    housingId: t.String(),
    startDate: t.Date(),
    endDate: t.Date(),
    tenantId: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date()
});

const ManyBookingsDTO = t.Array(BookingDTO);

const BookingCreationDTO = t.Object({
    housingId: t.String(),
    startDate: t.Date(),
    endDate: t.Date()
});

export type BookingCreationDTO = Static<typeof BookingCreationDTO>;

export const BookingModels = new Elysia().model({
    ManyBookingsDTO,
    BookingCreationDTO,
    BookingDTO
});
