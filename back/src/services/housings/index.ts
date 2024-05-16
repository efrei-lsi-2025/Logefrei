import { t, Elysia } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { HousingsService } from './service';
import { HousingModels } from './models';

export const HousingsController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)
    .model({ ...HousingModels })

    .get('/', async () => await HousingsService.getHousings(), {
        response: {
            200: 'ManyHousings'
        },
        detail: {
            tags: ['Housings'],
            summary: 'Get all housings'
        }
    })

    .post('/', async ({ body, user: { id: userId } }) => await HousingsService.createHousing(body, userId), {
        body: 'HousingCreationDTO',
        response: {
            200: 'Housing'
        },
        detail: {
            tags: ['Housings'],
            summary: 'Create a housing'
        }
    })

    .group('/users', (group) =>
        group.get(
            '/',
            async ({ user: { id: userId } }) =>
                await HousingsService.getHousingsForUser(userId),
            {
                response: {
                    200: 'ManyHousings'
                },
                detail: {
                    tags: ['Housings'],
                    summary: 'Get housings owned by the current user'
                }
            }
        )
    )

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
