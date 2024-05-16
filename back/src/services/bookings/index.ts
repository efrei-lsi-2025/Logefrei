import Elysia, { t } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { BookingsService } from './service';
import { InvalidOperationError, RecordNotFoundError } from '../../utils/errors';
import { BookingModels } from './models';

export const BookingsController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)

    .model({ ...BookingModels })

    .error({
        RecordNotFoundError,
        InvalidOperationError
    })
    .onError(({ code, error }) => {
        switch (code) {
            case 'RecordNotFoundError':
                return new Response(error.message, { status: 404 });
            case 'InvalidOperationError':
                return new Response(error.message, { status: 400 });
        }
    })

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
        group.group('/:housingId', (group) =>
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
            .get(
                '/',
                async ({ params: { bookingId } }) => await BookingsService.getBooking(bookingId),
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
                async ({ params: { bookingId }, user: { id: userId } }) =>
                    await BookingsService.cancelBooking(bookingId, userId),
                {
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
                async ({ params: { bookingId }, user: { id: userId } }) =>
                    await BookingsService.acceptBooking(bookingId, userId),
                {
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
                async ({ params: { bookingId }, user: { id: userId } }) =>
                    await BookingsService.rejectBooking(bookingId, userId),
                {
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
