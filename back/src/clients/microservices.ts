import { treaty } from '@elysiajs/eden';
import { App } from '..';

export const InternalBookingsClient = treaty<App>(
    `http://bookings:${Bun.env.PORT}`
)['internal']['bookings'];
