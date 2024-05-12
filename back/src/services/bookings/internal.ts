import Elysia, { t } from 'elysia';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { BookingsService } from './service';

export const InternalBookingsController = new Elysia()
    .use(injectStorePlugin)

    .group('/housings', (group) =>
        group.group('/:housingId', (group) =>
            group.patch(
                '/cancelAllFutureBookings',
                async ({ params: { housingId } }) =>
                    await BookingsService.cancelFutureBookings(housingId),
                {
                    params: t.Object({ housingId: t.String() }),
                    detail: {
                        tags: ['Internal'],
                        summary: 'Cancel all future bookings for a housing'
                    }
                }
            )
        )
    );
