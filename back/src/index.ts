import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';
import { BookingsController } from './services/bookings';
import { InternalBookingsController } from './services/bookings/internal';
import { HousingsController } from './services/housings';
import { InternalHousingsController } from './services/housings/internal';
import { SearchController } from './services/search';
import { UsersController } from './services/users';
import { InvalidOperationError, RecordNotFoundError, UnauthorizedError } from './utils/errors';

const app = new Elysia()
    .use(
        swagger({
            provider: 'scalar',
            path: '/docs',
            documentation: {
                info: {
                    title: 'API Logefrei',
                    description: 'API de Logefrei',
                    version: '1.0.0'
                }
            }
        })
    )

    .error({
        RecordNotFoundError,
        InvalidOperationError,
        UnauthorizedError
    })
    .onError(({ code, error }) => {
        console.log('Error:', code, error);
        switch (code) {
            case 'InvalidOperationError':
                return new Response(error.message, { status: 400 });
            case 'UnauthorizedError':
                return new Response(error.message, { status: 401 });
            case 'RecordNotFoundError':
                return new Response(error.message, { status: 404 });
        }
    })

    .onRequest(({ request }) => {
        console.log('Request:', request.method, request.url);
    })

    .get('/health', () => 'OK')

    .group('/api', (app) =>
        app
            .group('/bookings', (app) => app.use(BookingsController))
            .group('/housings', (app) => app.use(HousingsController))
            .group('/users', (app) => app.use(UsersController))
            .group('/search', (app) => app.use(SearchController))
    )
    .group('/internal', (app) =>
        app
            .group('/bookings', (app) => app.use(InternalBookingsController))
            .group('/housings', (app) => app.use(InternalHousingsController))
    )
    .listen(Bun.env.PORT, () => {
        console.log(`🚀 Service "${Bun.env.SERVICE}" started on port ${Bun.env.PORT}`);
    });

console.log(`🚀 Service "${Bun.env.SERVICE}" starting...`);

setInterval(() => {
    console.log('Memory usage:', process.memoryUsage());
    console.log('Uptime:', process.uptime());
}, 1e3);

export type App = typeof app;
