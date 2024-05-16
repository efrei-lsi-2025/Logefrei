<script lang="ts" setup>
definePageMeta({
    name: 'Mes réservations'
});

const { $client, $listen } = useNuxtApp();

const { data, refresh, pending } = useAsyncData(async () => {
    const { data } = await $client.bookings.users.index.get();
    return data;
});

$listen('data:refresh:bookings', () => {
    refresh();
});
</script>

<template>
    <ElementsBookingTable :data :pending />
</template>
