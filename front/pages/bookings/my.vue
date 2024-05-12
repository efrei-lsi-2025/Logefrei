<script setup lang="ts">
definePageMeta({
    name: 'Réservations'
});

const items = [
    {
        key: 'my-bookings',
        label: 'Mes réservations'
    },
    {
        key: 'my-housings-bookings',
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
        router.push({
            name: items[value].label
        });
    }
});
</script>

<template>
    <div>
        <PagesTitle icon="i-heroicons-calendar" name="Réservations">
            <template #actions>
                <UButton
                    color="primary"
                    icon="i-heroicons-plus"
                    @click="navigateTo('/bookings/new')"
                    >Créer une réservation</UButton
                >
            </template>
        </PagesTitle>

        <UTabs :items="items" class="w-full" v-model="selected" />

        <NuxtPage />
    </div>
</template>
