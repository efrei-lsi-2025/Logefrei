<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({
    name: 'Nouvelle réservation'
});

const { $client } = useNuxtApp();
const toast = useToast();

const schema = z.object({
    housingId: z.string(),
    startDate: z.date(),
    endDate: z.date()
});

type Form = z.infer<typeof schema>;

const state = reactive({
    housingId: null,
    startDate: new Date(),
    endDate: new Date()
});

const {
    data: housings,
    pending: pendingHousings,
    refresh: refreshHousings
} = useAsyncData(async () => {
    const { data } = await $client.search.housings.date.get({
        query: {
            startDate: state.startDate,
            endDate: state.endDate
        }
    });
    state.housingId = null;
    return data;
});

const submitting = ref(false);

const onSubmit = async ({ data }: FormSubmitEvent<Form>) => {
    submitting.value = true;
    await $client.bookings.index.post(data);

    toast.add({
        title: 'Réservation créée',
        description: 'La réservation a bien été créée.',
        icon: 'i-heroicons-check-circle',
        color: 'green'
    });

    navigateTo('/bookings/my');
    submitting.value = false;
};
</script>

<template>
    <PagesTitle icon="i-heroicons-calendar" name="Nouvelle réservation" />

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Dates">
            <ElementsDateRangePicker
                v-model:start="state.startDate"
                v-model:end="state.endDate"
                @change="refreshHousings"
            />
        </UFormGroup>

        <UFormGroup label="Hébergement" name="housingId">
            <USelectMenu
                v-model="state.housingId"
                :options="housings"
                :loading="pendingHousings"
                searchable
                searchable-placeholder="Rechercher un hébergement"
                class="w-full"
                placeholder="Choisir un hébergement"
                by="id"
                option-attribute="address"
                value-attribute="id"
            />
        </UFormGroup>

        <UButton color="primary" type="submit">Créer la réservation</UButton>
    </UForm>
</template>
