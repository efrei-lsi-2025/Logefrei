<script setup lang="ts">
import { FormsCreateNewHousing } from '#components';

definePageMeta({
    name: 'Mes hébergements',
    icon: 'i-heroicons-home-modern'
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

    <ElementsHousingTable :data :pending />
</template>
