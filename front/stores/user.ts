import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        const { $client } = useNuxtApp();
        const user = $client.users.me.get();

        return {
            user: null
        } as {
            user: Awaited<typeof user>['data'];
        };
    },
    persist: true,
    actions: {
        async fetchCurrentUser() {
            const { $client } = useNuxtApp();
            const { data } = await $client.users.me.get();

            this.user = data;
        }
    }
});
