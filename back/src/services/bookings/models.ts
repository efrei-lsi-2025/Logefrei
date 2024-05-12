import Elysia, { Static, t } from 'elysia';

export const Booking = t.Object(
    {
        id: t.String(),
        housingId: t.String(),
        housing: t.Ref('#/components/schemas/Housing'),
        startDate: t.Date(),
        endDate: t.Date(),
        tenantId: t.String(),
        tenant: t.Ref('#/components/schemas/User'),
        createdAt: t.Date(),
        updatedAt: t.Date()
    },
    {
        $id: '#/components/schemas/Booking'
    }
);

export const ManyBookings = t.Array(t.Ref('#/components/schemas/Booking'), {
    $id: '#/components/schemas/ManyBookings'
});

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
