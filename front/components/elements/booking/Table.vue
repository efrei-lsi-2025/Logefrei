<script setup lang="ts">
import { format } from 'date-fns';

const { $client } = useNuxtApp();

const props = defineProps<{
    data: Awaited<ReturnType<(typeof $client)['bookings']['users']['index']['get']>>['data'];
    pending: boolean;
}>();

const { data, pending } = toRefs(props);

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

const computedData = computed(() => data.value ?? []);
</script>

<template>
    <UTable :columns :rows="computedData" :loading="pending">
        <template #housing-data="{ row }">
            <NuxtLink :to="`/housings/${row.housing.id}`">{{ row.housing.address }}</NuxtLink>
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
