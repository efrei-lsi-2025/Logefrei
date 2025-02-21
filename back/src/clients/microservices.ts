import { treaty } from '@elysiajs/eden';
import { App } from '..';

// TODO: gRPC

export const InternalBookingsClient = treaty<App>(`http://bookings.logefrei:${Bun.env.PORT}`)[
    'internal'
]['bookings'];

export const InternalHousingsClient = treaty<App>(`http://housings.logefrei:${Bun.env.PORT}`)[
    'internal'
]['housings'];
