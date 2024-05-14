<script lang="ts" setup>
import { format } from 'date-fns';

definePageMeta({
    name: 'Mes réservations'
});

const { $client, $listen } = useNuxtApp();

const columns = [
    {
        key: 'housing',
        label: 'Hébergement'
    },
    {
        key: 'startDate',
        label: 'Date de début'
    },
    {
        key: 'endDate',
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

const { data, refresh, pending } = useAsyncData(async () => {
    const { data } = await $client.bookings.users.index.get();
    return data;
});

$listen('data:refresh', () => {
    refresh();
});
</script>

<template>
    <UTable v-if="data" :columns :rows="data" :loading="pending">
        <template #housing-data="{ row }">
            <NuxtLink :to="`/housing/${row.housing.id}`">{{ row.housing.address }}</NuxtLink>
        </template>

        <template #startDate-data="{ row }">
            {{ format(row.startDate, 'dd/MM/yyy HH:mm') }}
        </template>

        <template #endDate-data="{ row }">
            {{ format(row.endDate, 'dd/MM/yyy HH:mm') }}
        </template>

        <template #status-data="{ row }">
            <ElementsBookingStatusBadge :status="row.status" />
        </template>

        <template #actions-data="{ row }">
            <UButton color="primary" variant="outline" @click="navigateTo(`/bookings/${row.id}`)"
                >Voir</UButton
            >
        </template>
    </UTable>
</template>
