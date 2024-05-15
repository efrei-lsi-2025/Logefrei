<script setup lang="ts">
import { ElementsFormSlideOver, FormsCreateNewHousing } from '#components';

definePageMeta({
    name: 'Mes hébergements'
});

const { $client, $listen } = useNuxtApp();

const columns = [
    {
        key: 'address',
        label: 'Adresse'
    },
    {
        key: 'type',
        label: 'Type'
    },
    {
        key: 'surface',
        label: 'Surface (m²)'
    },
    {
        key: 'rent',
        label: 'Loyer (€ / nuit)'
    },
    {
        key: 'status',
        label: 'Statut'
    }
];

const { data, refresh, pending } = useAsyncData(async () => {
    const { data } = await $client.housings.users.index.get();
    return data;
});

$listen('data:refresh:housings', () => {
    refresh();
});

const slideover = useSlideover();

const openCreateNewHousingSlideOver = () => {
    slideover.open(FormsCreateNewHousing, {
        onClose: slideover.close
    });
};
</script>

<template>
    <div>
        <PagesTitle icon="i-heroicons-home-modern" name="Mes hébergements">
            <template #actions>
                <UButton
                    color="primary"
                    icon="i-heroicons-plus"
                    @click="openCreateNewHousingSlideOver"
                    >Créer un hébergement</UButton
                >
            </template>
        </PagesTitle>

        <UTable v-if="data" :columns :rows="data" :loading="pending">
            <template #address-data="{ row }">
                <NuxtLink :to="`/housing/${row.id}`">{{ row.address }}</NuxtLink>
            </template>

            <template #type-data="{ row }">
                <ElementsBookingTypeIcon :type="row.type" />
            </template>

            <template #surface-data="{ row }"> {{ row.surface }} m² </template>

            <template #rent-data="{ row }"> {{ row.rent }} € </template>

            <template #status-data="{ row }">
                <ElementsHousingStatusBadge :status="row.status" />
            </template>
        </UTable>
    </div>
</template>
