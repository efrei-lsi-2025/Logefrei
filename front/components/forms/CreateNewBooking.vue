<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { $client, $event } = useNuxtApp();
const toast = useToast();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const schema = z.object({
    housingId: z.string(),
    startDate: z.date(),
    endDate: z.date()
});

type Form = z.infer<typeof schema>;
const form = ref();

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
    const { data } = await $client.search.housings.get({
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

    $event('data:refresh:bookings');
    emit('close');
    submitting.value = false;
};
</script>

<template>
    <ElementsFormSlideOver title="Créer une réservation" @close="emit('close')">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" ref="form">
            <UFormGroup
                label="Dates"
                required
                description="Sélectionnez les dates de début et de fin de la réservation"
            >
                <ElementsDateRangePicker
                    v-model:start="state.startDate"
                    v-model:end="state.endDate"
                    @change="() => refreshHousings()"
                />
            </UFormGroup>

            <UFormGroup
                label="Hébergement"
                name="housingId"
                required
                help="Seuls les hébergements disponibles aux dates données sont affichés"
                :error="!state.housingId ? 'Veuillez choisir un hébergement' : ''"
            >
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
        </UForm>

        <template #submit>
            <UButton color="primary" :loading="submitting" @click="() => form.submit()">
                Créer la réservation
            </UButton>
        </template>
    </ElementsFormSlideOver>
</template>
