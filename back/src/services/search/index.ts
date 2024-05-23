import Elysia, { t } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { SearchService } from './service';
import { SearchModels } from './models';
import { HousingModels } from '../housings/models';

export const SearchController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)

    .model({ ...SearchModels, ...HousingModels })

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
            .get(
                'search',
                async ({ query: { text, startDate, endDate, type, minRent, maxRent, minSurf, maxSurf } }) =>
                    await SearchService.searchHousings(text, startDate, endDate, type, minRent, maxRent, minSurf, maxSurf),
                {
                    query: 'SearchHousingLookupDTO',
                    response: {
                        200: 'ManyHousings'
                    },
                    detail: {
                        tags: ['Search'],
                        summary: 'Search housings according to the given parameters'
                    }
                }
            )
    );
