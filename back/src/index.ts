import Elysia, { t } from 'elysia';
import { BookingsController } from './services/bookings';
import { HousingsController } from './services/housings';
import { SearchController } from './services/search';
import { UsersController } from './services/users';
import swagger from '@elysiajs/swagger';
import { InternalBookingsController } from './services/bookings/internal';

console.log(`🏭 Starting service "${Bun.env.SERVICE}"...`);

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
    .group('/api', (app) =>
        app
            .group('/bookings', (app) => app.use(BookingsController))
            .group('/housings', (app) => app.use(HousingsController))
            .group('/users', (app) => app.use(UsersController))
            .group('/search', (app) => app.use(SearchController))
    )
    .group('/internal', (app) =>
        app.group('/bookings', (app) => app.use(InternalBookingsController))
    )
    .listen(Bun.env.PORT);

export type App = typeof app;
