import Elysia, { t } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { BookingsService } from './service';
import { BookingModels } from './models';

export const BookingsController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)

    .model({ ...BookingModels })

    .post(
        '/',
        async ({ body, user: { id: userId } }) => await BookingsService.createBooking(body, userId),
        {
            body: 'BookingCreationDTO',
            response: {
                200: 'Booking'
            },
            detail: {
                tags: ['Bookings'],
                summary: 'Create a booking'
            }
        }
    )

    .group('/housings', (group) =>
        group
            .group('/:housingId', (group) =>
                group.get(
                    '/',
                    async ({ params: { housingId } }) =>
                        await BookingsService.getBookingsForHousing(housingId),
                    {
                        params: t.Object({ housingId: t.String() }),
                        response: {
                            200: 'ManyBookings'
                        },
                        detail: {
                            tags: ['Bookings'],
                            summary: 'Get bookings for a housing'
                        }
                    }
                )
            )
            .group('/users', (group) =>
                group.get(
                    '/',
                    async ({ user: { id: userId } }) =>
                        await BookingsService.getBookingsForUserHousings(userId),
                    {
                        response: {
                            200: 'ManyBookings'
                        },
                        detail: {
                            tags: ['Bookings'],
                            summary: 'Get bookings for a users housings'
                        }
                    }
                )
            )
    )

    .group('/users', (group) =>
        group
            .get(
                '/',
                async ({ user: { id: userId } }) =>
                    await BookingsService.getBookingsForUser(userId),
                {
                    response: {
                        200: 'ManyBookings'
                    },
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Get all bookings of the current user'
                    }
                }
            )
            .get(
                '/:userId',
                async ({ params: { userId } }) => await BookingsService.getBookingsForUser(userId),
                {
                    params: t.Object({ userId: t.String() }),
                    response: {
                        200: 'ManyBookings'
                    },
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Get bookings for a user'
                    }
                }
            )
    )

    .group('/:bookingId', (group) =>
        group
            .derive(
                async ({ params: { bookingId } }) => ({ booking: await BookingsService.getBooking(bookingId) }),
            )
            .get(
                '/',
                ({ booking }) => booking,
                {
                    params: t.Object({ bookingId: t.String() }),
                    response: {
                        200: 'Booking'
                    },
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Get a booking by id'
                    }
                }
            )
            .put(
                '/cancel',
                async ({ booking }) =>
                    await BookingsService.cancelBooking(booking),
                {
                    beforeHandle: ({ booking, user }) => BookingsService.checkCanCancel(booking, user),
                    params: t.Object({ bookingId: t.String() }),
                    response: {
                        200: 'Booking'
                    },
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Cancel a booking'
                    }
                }
            )
            .put(
                '/accept',
                async ({ booking }) =>
                    await BookingsService.acceptBooking(booking),
                {
                    beforeHandle: ({ booking, user }) => BookingsService.checkCanAccept(booking, user),
                    params: t.Object({ bookingId: t.String() }),
                    response: {
                        200: 'Booking'
                    },
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Accept a booking'
                    }
                }
            )
            .put(
                '/reject',
                async ({ booking }) =>
                    await BookingsService.rejectBooking(booking),
                {
                    beforeHandle: ({ booking, user }) => BookingsService.checkCanReject(booking, user),
                    params: t.Object({ bookingId: t.String() }),
                    response: {
                        200: 'Booking'
                    },
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Reject a booking'
                    }
                }
            )
    );
