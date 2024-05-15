<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { add } from 'date-fns';

const { $client, $event } = useNuxtApp();
const toast = useToast();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const typeOptions = [
    { value: 'House', label: 'Maison' },
    { value: 'Apartment', label: 'Appartement' }
];

const schema = z.object({
    address: z.string(),
    type: z.enum(['House', 'Apartment']),
    description: z.string(),
    surface: z.number().positive('La surface doit être un nombre positif.'),
    rent: z.number().positive('Le loyer doit être un nombre positif.')
});

type Form = z.infer<typeof schema>;
const form = ref();

const state = reactive({
    address: null as string | null,
    type: 'House' as 'House' | 'Apartment',
    description: null as string | null,
    surface: null as number | null,
    rent: null as number | null
});

const submitting = ref(false);

const onSubmit = async ({ data }: FormSubmitEvent<Form>) => {
    submitting.value = true;

    await $client.housings.index.post(data);

    toast.add({
        title: 'Hébergement créé',
        description: "L'hébergement a bien été créé.",
        icon: 'i-heroicons-check-circle',
        color: 'green'
    });

    $event('data:refresh:housings');
    emit('close');
    submitting.value = false;
};
</script>

<template>
    <ElementsFormSlideOver title="Créer une réservation" @close="emit('close')">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" ref="form">
            <UFormGroup label="Type" required description="Sélectionnez le type de bien">
                <USelectMenu
                    v-model="state.type"
                    :options="typeOptions"
                    :option-attribute="'label'"
                    :value-attribute="'value'"
                >
                    <template #leading>
                        <ElementsBookingTypeIcon :type="state.type" />
                    </template>
                </USelectMenu>
            </UFormGroup>

            <UFormGroup
                label="Adresse complète"
                required
                description="Saisissez l'adresse complète du bien"
            >
                <UTextarea v-model="state.address" :rows="5" />
            </UFormGroup>

            <UFormGroup
                label="Description"
                required
                description="Saisissez une description du bien"
            >
                <UTextarea v-model="state.description" :rows="10" />
            </UFormGroup>

            <UFormGroup label="Surface" required description="Saisissez la surface du bien en m²">
                <template #description> En m² </template>
                <UInput v-model="state.surface" type="number" />
            </UFormGroup>

            <UFormGroup label="Loyer" required description="Saisissez le loyer du bien par nuit">
                <template #description> En € par nuit </template>
                <UInput v-model="state.rent" type="number" />
            </UFormGroup>
        </UForm>

        <template #submit>
            <UButton color="primary" :loading="submitting" @click="() => form.submit()">
                Créer l'hébergement
            </UButton>
        </template>
    </ElementsFormSlideOver>
</template>
