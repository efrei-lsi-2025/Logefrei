<script setup lang="ts">
import { FormsCreateNewBooking } from '#components';

definePageMeta({
    name: 'Réservations',
    icon: 'i-heroicons-calendar-days',
    showInMenu: true,
    order: 3
});

const items = [
    {
        key: 'user-bookings',
        label: 'Mes réservations'
    },
    {
        key: 'housings-bookings',
        label: 'Réservations de mes hébergements'
    }
];

const route = useRoute();
const router = useRouter();

const selected = computed({
    get() {
        const index = items.findIndex((item) => item.label === route.name);

        if (index === -1) {
            router.push({
                name: items[0].label
            });
            return 0;
        }

        return index;
    },
    set(value) {
        console.log(value);
        router.push({
            name: items[value].label
        });
    }
});

const slideover = useSlideover();

const openCreateNewBookingSlideOver = () => {
    slideover.open(FormsCreateNewBooking, {
        onClose: slideover.close
    });
};
</script>

<template>
    <PagesTitle>
        <template #actions>
            <UButton color="primary" icon="i-heroicons-plus" @click="openCreateNewBookingSlideOver"
                >Créer une réservation</UButton
            >
        </template>
    </PagesTitle>

    <UTabs :items="items" class="w-full" v-model="selected" />

    <NuxtPage />
</template>
