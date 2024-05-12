import { treaty } from '@elysiajs/eden';
import type { App } from '../../back/src';

export default defineNuxtPlugin(() => {
    // @ts-ignore
    const client = treaty<App>(window.location.origin)['api'];

    return {
        provide: {
            client
        }
    };
});
