import { t, Elysia } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { HousingsService } from './service';
import { Housing, HousingCreationDTO, HousingUpdateDTO, ManyHousings } from './models';
import { RecordNotFoundError, InvalidOperationError } from '../../utils/errors';
import { injectModelsPlugin } from '../../middlewares/inject-models';

export const HousingsController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)
    .use(injectModelsPlugin)

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

    .get('/', async () => await HousingsService.getHousings(), {
        response: {
            200: ManyHousings
        },
        detail: {
            tags: ['Housings'],
            summary: 'Get all housings'
        }
    })

    .post('/', async ({ body }) => await HousingsService.createHousing(body), {
        body: 'HousingCreationDTO',
        response: {
            200: 'Housing'
        },
        detail: {
            tags: ['Housings'],
            summary: 'Create a housing'
        }
    })

    .group('/:housingId', (group) =>
        group

            .get(
                '/',
                async ({ params: { housingId } }) => await HousingsService.getHousing(housingId),
                {
                    params: t.Object({ housingId: t.String() }),
                    response: {
                        200: 'Housing'
                    },
                    detail: {
                        tags: ['Housings'],
                        summary: 'Get a housing by id'
                    }
                }
            )

            .put(
                '/',
                async ({ params: { housingId }, body }) =>
                    await HousingsService.updateHousing(housingId, body),
                {
                    params: t.Object({ housingId: t.String() }),
                    body: 'HousingUpdateDTO',
                    response: {
                        200: 'Housing'
                    },
                    detail: {
                        tags: ['Housings'],
                        summary: 'Update a housing'
                    }
                }
            )

            .delete(
                '/',
                async ({ params: { housingId } }) => await HousingsService.deleteHousing(housingId),
                {
                    params: t.Object({ housingId: t.String() }),
                    response: {
                        200: 'Housing'
                    },
                    detail: {
                        tags: ['Housings'],
                        summary: 'Delete a housing'
                    }
                }
            )
    );
