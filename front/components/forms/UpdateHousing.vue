<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { id: housingId } = defineProps<{
    id: string;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const { $client, $event, $listen } = useNuxtApp();
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const { data, pending, refresh } = useAsyncData(async () => {
    const { data } = await $client.housings({ housingId }).index.get();
    state.rent = data?.rent;
    state.surface = data?.surface;
    state.address = data?.address;
    state.description = data?.description;
    return data;
});

const canUpdate = computed(
    () => userStore.user?.id === data.value?.ownerId && data.value?.status !== 'Withdrawn'
);

// TODO : Gérer les états possibles
const changeStatusList = computed(() => {
    if (
        !canUpdate.value ||
        data.value === null ||
        data.value.status === 'Withdrawn' ||
        data.value.availabilityStatus === 'Occupied'
    ) {
        return [];
    }

    return [
        [
            {
                label: 'Brouillon',
                value: 'Draft',
                disabled: data.value?.status === 'Draft',
                click: () => onChangeStatus('Draft')
            },
            {
                label: 'Publié',
                value: 'Published',
                disabled: data.value?.status === 'Published',
                click: () => onChangeStatus('Published')
            },
            {
                label: 'Archivé',
                value: 'Withdrawn',
                click: () => onChangeStatus('Withdrawn')
            }
        ]
    ];
});

const requiredError = { required_error: 'Champ requis' };

const schema = z.object({
    rent: z.number(requiredError).positive('Le loyer doit être un nombre positif.'),
    surface: z.number(requiredError).positive('La surface doit être un nombre positif.'),
    address: z.string(requiredError),
    description: z.string(requiredError)
});

type Form = z.infer<typeof schema>;
const form = ref();

const state: Partial<Form> = reactive({
    rent: data.value?.rent ?? undefined,
    surface: data.value?.surface ?? undefined,
    address: data.value?.address ?? undefined,
    description: data.value?.description ?? undefined
});

const onSubmit = async ({ data: formData }: FormSubmitEvent<Form>) => {
    if (!canUpdate.value) {
        toast.add({
            title: 'Action non autorisée',
            description: "Vous n'êtes pas autorisé à modifier cet hébergement.",
            icon: 'i-heroicons-exclamation',
            color: 'red'
        });
        return;
    }

    await $client.housings({ housingId }).index.put(state);

    toast.add({
        title: 'Hébergement mis à jour',
        description: "L'hébergement a bien été mis à jour.",
        icon: 'i-heroicons-check-circle',
        color: 'green'
    });

    $event('data:refresh:housings');
    router.go(-1);
};

const onChangeStatus = async (value: 'Draft' | 'Published' | 'Withdrawn') => {
    await $client.housings({ housingId }).index.put({ status: value });
    $event('data:refresh:housings');
};

$listen('data:refresh:housings', () => refresh());
</script>

<template>
    <div v-if="!pending && data !== null">
        <div class="flex flex-row justify-between items-center">
            <ElementsHousingTypeIcon :type="data.type" :showText="true" />
            <div>
                <ElementsHousingStatusBadge
                    :status="data.status"
                    :availability="data.availabilityStatus"
                    class="text-base"
                />
                <UDropdown
                    v-if="canUpdate"
                    :popper="{ placement: 'bottom-start' }"
                    :items="changeStatusList"
                    :disabled="changeStatusList.length === 0"
                >
                    <UButton
                        color="gray"
                        label="Changer le statut"
                        trailing-icon="i-heroicons-chevron-down-20-solid"
                        class="ml-4"
                /></UDropdown>
            </div>
            <!-- Add change status dropdown  -->
        </div>

        <UForm :schema="schema" :state="data" class="space-y-4 my-8" @submit="onSubmit" ref="form">
            <UFormGroup
                label="Adresse complète"
                name="address"
                required
                description="Saisissez l'adresse complète du bien"
            >
                <UTextarea v-model="state.address" :rows="5" :disabled="!canUpdate" />
            </UFormGroup>

            <UFormGroup
                label="Description"
                name="description"
                required
                description="Saisissez une description du bien"
            >
                <UTextarea v-model="state.description" :rows="10" :disabled="!canUpdate" />
            </UFormGroup>

            <div class="flex flex-row">
                <UFormGroup
                    label="Surface"
                    name="surface"
                    required
                    description="Saisissez la surface du bien en m²"
                    class="w-1/2 mr-4"
                >
                    <template #description> En m² </template>
                    <UInput v-model="state.surface" type="number" :disabled="!canUpdate" />
                </UFormGroup>

                <UFormGroup
                    label="Loyer"
                    name="rent"
                    required
                    description="Saisissez le loyer du bien par nuit"
                    class="w-1/2"
                >
                    <template #description> En € par nuit </template>
                    <UInput v-model="state.rent" type="number" :disabled="!canUpdate" />
                </UFormGroup>
            </div>
        </UForm>

        <!-- Add user card -->

        <div class="flex flex-row justify-end space-x-4">
            <UButton @click="() => router.go(-1)" color="gray">Annuler</UButton>
            <UButton
                v-if="canUpdate"
                type="submit"
                form="form"
                color="primary"
                @click="() => form.submit()"
                >Enregistrer</UButton
            >
        </div>
    </div>
</template>
