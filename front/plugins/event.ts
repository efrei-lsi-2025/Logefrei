import mitt from 'mitt';

type Events = {
    'data:refresh:bookings': void;
    'data:refresh:housings': void;
};

export default defineNuxtPlugin(() => {
    const emitter = mitt<Events>();

    return {
        provide: {
            event: emitter.emit,
            listen: emitter.on
        }
    };
});
