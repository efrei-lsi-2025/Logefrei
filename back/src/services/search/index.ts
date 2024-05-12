import Elysia, { t } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { SearchService } from './service';
import { BookingHousingLookupDTO, SearchModels } from './models';
import { HousingModels, ManyHousings } from '../housings/models';
import { UserModels } from '../users/models';
import { BookingModels } from '../bookings/models';
import { injectModelsPlugin } from '../../middlewares/inject-models';

export const SearchController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)
    .use(injectModelsPlugin)

    .group('/housings', (group) =>
        group.get(
            '/date',
            async ({ query: { startDate, endDate } }) =>
                await SearchService.getAvailableHousingsBetweenDates(startDate, endDate),
            {
                query: 'BookingHousingLookupDTO',
                response: {
                    200: 'ManyHousings'
                },
                detail: {
                    tags: ['Search'],
                    summary: 'Get all housings'
                }
            }
        )
    );
