<script setup lang="ts">
const { $client } = useNuxtApp();

const props = defineProps<{
    data: Awaited<ReturnType<(typeof $client)['housings']['users']['index']['get']>>['data'];
    pending: boolean;
}>();

const { data, pending } = toRefs(props);

const columns = [
    {
        key: 'address',
        label: 'Adresse',
        sortable: true
    },
    {
        key: 'type',
        label: 'Type',
        sortable: true
    },
    {
        key: 'surface',
        label: 'Surface (m²)',
        sortable: true
    },
    {
        key: 'rent',
        label: 'Loyer (€ / nuit)',
        sortable: true
    },
    {
        key: 'status',
        label: 'Statut',
        sortable: true
    }
];

const computedData = computed(() => data.value ?? []);
</script>

<template>
    <UTable :columns :rows="computedData" :loading="pending">
        <template #address-data="{ row }">
            <NuxtLink :to="`/housings/${row.id}`">{{ row.address }}</NuxtLink>
        </template>

        <template #type-data="{ row }">
            <ElementsHousingTypeIcon :type="row.type" />
        </template>

        <template #surface-data="{ row }"> {{ row.surface }} m² </template>

        <template #rent-data="{ row }"> {{ row.rent }} € </template>

        <template #status-data="{ row }">
            <ElementsHousingStatusBadge
                :status="row.status"
                :availability="row.availabilityStatus"
            />
        </template>
    </UTable>
</template>
