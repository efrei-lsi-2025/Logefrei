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

    .get('/', async () => await HousingsService.getHousings(),
        {
            response: {
                200: 'ManyHousings'
            },
            detail: {
                tags: ['Housings'],
                summary: 'Get all housings'
            }
        }
    )

    .post('/',
        async ({ body, user: { id: userId } }) =>
            await HousingsService.createHousing(body, userId),
        {
            body: 'HousingCreationDTO',
            response: {
                200: 'Housing'
            },
            detail: {
                tags: ['Housings'],
                summary: 'Create a housing'
            }
        }
    )

    .group('/users', (group) =>
        group.get(
            '/',
            async ({ user: { id: userId } }) => await HousingsService.getHousingsForUser(userId),
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

            .derive(async ({ params: { housingId } }) => ({ housing: await HousingsService.getHousing(housingId) }))

            .get(
                '/',
                ({ housing }) => housing,
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

            .onBeforeHandle(({ housing, user }) => HousingsService.checkIsOwner(housing, user))

            .put(
                '/',
                async ({ housing, body }) =>
                    await HousingsService.updateHousing(housing, body),
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

            .put(
                '/',
                async ({ housing }) => await HousingsService.withdrawHousing(housing),
                {
                    params: t.Object({ housingId: t.String() }),
                    detail: {
                        tags: ['Housings'],
                        summary: 'Delete a housing'
                    }
                }
            )
    );
