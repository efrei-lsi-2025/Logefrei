import { t, Elysia, NotFoundError } from 'elysia';
import { userRegisterPlugin } from '../../middlewares/user-register';
import { injectStorePlugin } from '../../middlewares/inject-store';
import { HousingsService } from './service';
import { HousingModels } from './models';
import { RecordNotFoundError, InvalidOperationError } from '../../utils/errors';

export const HousingsController = new Elysia()
    .use(injectStorePlugin)
    .use(userRegisterPlugin)
    .use(HousingModels)

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
        detail: {
            tags: ['Housings'],
            summary: 'Get all housings'
        }
    })

    .get(
        '/:id',
        async ({ params }) => await HousingsService.getHousing(params.id),
        {
            params: t.Object({ id: t.String() }),
            response: 'HousingDTO',
            detail: {
                tags: ['Housings'],
                summary: 'Get a housing by id'
            }
        }
    )

    .post('/', async ({ body }) => await HousingsService.createHousing(body), {
        body: 'HousingCreationDTO',
        response: 'HousingDTO',
        detail: {
            tags: ['Housings'],
            summary: 'Create a housing'
        }
    })

    .put(
        '/:id',
        async ({ params, body }) =>
            await HousingsService.updateHousing(params.id, body),
        {
            params: t.Object({ id: t.String() }),
            body: 'HousingUpdateDTO',
            response: 'HousingDTO',
            detail: {
                tags: ['Housings'],
                summary: 'Update a housing'
            }
        }
    )

    .delete(
        '/:id',
        async ({ params }) => await HousingsService.deleteHousing(params.id),
        {
            params: t.Object({ id: t.String() }),
            response: 'HousingDTO',
            detail: {
                tags: ['Housings'],
                summary: 'Delete a housing'
            }
        }
    );
