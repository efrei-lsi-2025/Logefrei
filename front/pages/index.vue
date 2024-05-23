<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { $client } = useNuxtApp();

definePageMeta({
    name: 'Recherche',
    icon: 'i-heroicons-magnifying-glass',
    showInMenu: true,
    order: 1
});

const requiredError = { required_error: 'Champ requis' };
const positiveError = 'Ce nombre doit être positif';

const schema = z.object({
    search: z.optional(z.string()),
    startDate: z.date(requiredError),
    endDate: z.date(requiredError),
    minRent: z.optional(z.number().positive(positiveError)),
    maxRent: z.optional(z.number().positive(positiveError)),
    type: z.enum(['House', 'Apartment', null]),
    minSurface: z.optional(z.number().positive(positiveError)),
    maxSurface: z.optional(z.number().positive(positiveError))
});

type Form = z.infer<typeof schema>;
const form = ref();

const state: Partial<Form> = reactive({
    search: '',
    startDate: new Date(),
    endDate: new Date(),
    minRent: undefined,
    maxRent: undefined,
    type: undefined,
    minSurface: undefined,
    maxSurface: undefined
});

const { data, refresh, pending } = useAsyncData(async () => {
    const { data } = await $client.search.housings.get({
        query: {
            // Ignore empty values
            ...(state.search && { text: state.search }),
            ...(state.startDate && { startDate: state.startDate }),
            ...(state.endDate && { endDate: state.endDate }),
            ...(state.minRent && { minRent: state.minRent }),
            ...(state.maxRent && { maxRent: state.maxRent }),
            ...(state.type && { type: state.type }),
            ...(state.minSurface && { minSurf: state.minSurface }),
            ...(state.maxSurface && { maxSurf: state.maxSurface })
        }
    });
    return data;
});

const typeOptions = [
    { value: null, label: 'Tous' },
    { value: 'House', label: 'Maison' },
    { value: 'Apartment', label: 'Appartement' }
];
</script>

<template>
    <div>
        <PagesTitle icon="i-heroicons-magnifying-glass" name="Recherche" />

        <div class="space-y-4">
            <div class="flex flex-row gap-4 justify-between">
                <UInput
                    class="flex-auto"
                    v-model="state.search"
                    placeholder="Rechercher"
                    @keydown.enter="refresh"
                />
                <ElementsDateRangePicker
                    v-model:start="state.startDate"
                    v-model:end="state.endDate"
                />

                <UButton @click="refresh" color="primary">Rechercher</UButton>
            </div>
            <div class="flex flex-row gap-4 justify-between">
                <USelectMenu
                    v-model="state.type"
                    :options="typeOptions"
                    :option-attribute="'label'"
                    :value-attribute="'value'"
                    class="flex-1"
                    placeholder="Type d'hébergement"
                >
                    <template #leading>
                        <ElementsHousingTypeIcon v-if="state.type" :type="state.type" />
                    </template>
                </USelectMenu>
                <UInput v-model="state.minRent" type="number" placeholder="Loyer minimum (€/nuit)">
                    <template #trailing>€</template>
                </UInput>
                <UInput v-model="state.maxRent" type="number" placeholder="Loyer maximum (€/nuit)">
                    <template #trailing>€</template>
                </UInput>

                <UInput v-model="state.minSurface" type="number" placeholder="Surface minimum (m²)">
                    <template #trailing>m²</template>
                </UInput>
                <UInput v-model="state.maxSurface" type="number" placeholder="Surface maximum (m²)">
                    <template #trailing>m²</template>
                </UInput>
            </div>
        </div>
        <ElementsHousingTable :data :pending />
    </div>
</template>
