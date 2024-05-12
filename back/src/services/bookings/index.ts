import Elysia, { t } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { BookingsService } from './service';
import { BookingModels } from './models';
import { InvalidOperationError, RecordNotFoundError } from '../../utils/errors';

export const BookingsController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)

    .use(BookingModels)

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
        async ({ body, user: { id: userId } }) =>
            await BookingsService.createBooking(body, userId),
        {
            body: 'BookingCreationDTO',
            response: 'BookingDTO',
            detail: {
                tags: ['Bookings'],
                summary: 'Create a booking'
            }
        }
    )

    .group('/by-housing', (group) =>
        group.group('/:housingId', (group) =>
            group.get(
                '/',
                async ({ params: { housingId } }) =>
                    await BookingsService.getBookingsForHousing(housingId),
                {
                    params: t.Object({ housingId: t.String() }),
                    response: 'ManyBookingsDTO',
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Get bookings for a housing'
                    }
                }
            )
        )
    )

    .group('/by-user', (group) =>
        group.group('/:userId', (group) =>
            group.get(
                '/',
                async ({ params: { userId } }) =>
                    await BookingsService.getBookingsForUser(userId),
                {
                    params: t.Object({ userId: t.String() }),
                    response: 'ManyBookingsDTO',
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Get bookings for a user'
                    }
                }
            )
        )
    )

    .group('/:bookingId', (group) =>
        group
            .get(
                '/',
                async ({ params: { bookingId } }) =>
                    await BookingsService.getBooking(bookingId),
                {
                    params: t.Object({ bookingId: t.String() }),
                    response: 'BookingDTO',
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
                    detail: {
                        tags: ['Bookings'],
                        summary: 'Reject a booking'
                    }
                }
            )
    );
