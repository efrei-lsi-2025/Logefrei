<script setup lang="ts">
import { FormsCreateNewHousing } from '#components';

definePageMeta({
    name: 'Mes hébergements',
    icon: 'i-heroicons-home-modern',
    showInMenu: true,
    order: 4
});

const { $client, $listen } = useNuxtApp();

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
    <PagesTitle>
        <template #actions>
            <UButton color="primary" icon="i-heroicons-plus" @click="openCreateNewHousingSlideOver"
                >Créer un hébergement</UButton
            >
        </template>
    </PagesTitle>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ElementsHousingCard
            v-for="housing in data"
            :key="housing.id"
            :housing="housing"
            :hideOwner="true"
        />
    </div>
</template>
