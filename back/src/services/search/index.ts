import Elysia, { t } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { SearchService } from './service';
import { SearchModels } from './models';
import { HousingModels } from '../housings/models';
import { InvalidOperationError } from '../../utils/errors';

export const SearchController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)

    .model({ ...SearchModels, ...HousingModels })

    .get(
        'housings',
        async ({ query: { text, startDate, endDate, type, minRent, maxRent, minSurf, maxSurf } }) => {

            let minRentNumber: number | undefined;
            let maxRentNumber: number | undefined;
            let minSurfNumber: number | undefined;
            let maxSurfNumber: number | undefined;

            try {
                minRentNumber = minRent ? parseFloat(minRent) : undefined;
                maxRentNumber = maxRent ? parseFloat(maxRent) : undefined;
                minSurfNumber = minSurf ? parseFloat(minSurf) : undefined;
                maxSurfNumber = maxSurf ? parseFloat(maxSurf) : undefined;
            } catch (error) {
                throw new InvalidOperationError('minRent, maxRent, minSurf and maxSurf must be numbers');
            }

            return await SearchService.searchHousings(startDate, endDate, text, type, minRentNumber, maxRentNumber, minSurfNumber, maxSurfNumber);
        },
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
    );
