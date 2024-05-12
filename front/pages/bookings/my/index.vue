<script lang="ts" setup>
definePageMeta({
    name: 'Mes réservations'
});

const { $client } = useNuxtApp();

const columns = [
    {
        key: 'housing_id',
        label: 'Hébergement'
    },
    {
        key: 'start_date',
        label: 'Date de début'
    },
    {
        key: 'end_date',
        label: 'Date de fin'
    },
    {
        key: 'status',
        label: 'Statut'
    },
    {
        key: 'actions'
    }
];

const { data } = useAsyncData(async () => {
    const { data } = await $client.bookings.users.index.get();
    return data;
});
</script>

<template>
    <UTable v-if="data" :columns :rows="data" />
</template>
