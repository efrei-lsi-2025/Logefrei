import Elysia, { t } from 'elysia';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { HousingsService } from './service';

export const InternalHousingsController = new Elysia()
    .use(injectStorePlugin)

    .group('/housings', (group) =>
        group
            .patch(
                '/autoSetAvailable',
                async () =>
                    await HousingsService.autoSetAvailableHousings(),
                {
                    params: t.Object({ housingId: t.String() }),
                    detail: {
                        tags: ['Internal'],
                        summary: 'Set all published and not booked housings to available status'
                    }
                }
            )
            .patch(
                '/autoSetOccupied',
                async () =>
                    await HousingsService.autoSetOccupiedHousings(),
                {
                    params: t.Object({ housingId: t.String() }),
                    detail: {
                        tags: ['Internal'],
                        summary: 'Set all published and booked housings to occupied status'
                    }
                }
            )
    );
