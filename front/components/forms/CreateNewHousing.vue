<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { $client, $event } = useNuxtApp();
const toast = useToast();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const typeOptions = [
    { value: 'House', label: 'Maison' },
    { value: 'Apartment', label: 'Appartement' }
];

const requiredError = { required_error: 'Champ requis' };

const schema = z.object({
    address: z.string(requiredError),
    type: z.enum(['House', 'Apartment']),
    description: z.string(requiredError),
    surface: z.number(requiredError).positive('La surface doit être un nombre positif.'),
    rent: z.number(requiredError).positive('Le loyer doit être un nombre positif.')
});

type Form = z.infer<typeof schema>;
const form = ref();

const state: Partial<Form> = reactive({
    address: undefined,
    type: 'House',
    description: undefined,
    surface: undefined,
    rent: undefined
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
    <ElementsFormSlideOver title="Créer un hébergement" @close="emit('close')">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" ref="form">
            <UFormGroup label="Type" required description="Sélectionnez le type de bien">
                <USelectMenu
                    v-model="state.type"
                    :options="typeOptions"
                    :option-attribute="'label'"
                    :value-attribute="'value'"
                >
                    <template #leading>
                        <ElementsBookingTypeIcon v-if="state.type" :type="state.type" />
                    </template>
                </USelectMenu>
            </UFormGroup>

            <UFormGroup
                label="Adresse complète"
                name="address"
                required
                description="Saisissez l'adresse complète du bien"
            >
                <UTextarea v-model="state.address" :rows="5" />
            </UFormGroup>

            <UFormGroup
                label="Description"
                name="description"
                required
                description="Saisissez une description du bien"
            >
                <UTextarea v-model="state.description" :rows="10" />
            </UFormGroup>

            <UFormGroup
                label="Surface"
                name="surface"
                required
                description="Saisissez la surface du bien en m²"
            >
                <template #description> En m² </template>
                <UInput v-model="state.surface" type="number" />
            </UFormGroup>

            <UFormGroup
                label="Loyer"
                name="rent"
                required
                description="Saisissez le loyer du bien par nuit"
            >
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
