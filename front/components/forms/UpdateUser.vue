<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { $client, $event } = useNuxtApp();
const toast = useToast();

const userStore = useUserStore();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const schema = z.object({
    phone: z.string(),
    address: z.string()
});

type Form = z.infer<typeof schema>;
const form = ref();

const state = reactive({
    phone: userStore.user?.phone ?? '',
    address: userStore.user?.address ?? ''
});

const submitting = ref(false);

const onSubmit = async ({ data }: FormSubmitEvent<Form>) => {
    submitting.value = true;
    await $client.users.me.put(data);

    toast.add({
        title: 'Profil mis à jour',
        description: 'Votre profil a bien été mis à jour.',
        icon: 'i-heroicons-check-circle',
        color: 'green'
    });

    userStore.fetchCurrentUser();
    emit('close');
    submitting.value = false;
};
</script>

<template>
    <ElementsFormSlideOver title="Modifier mon profil" @close="emit('close')">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" ref="form">
            <UFormGroup label="Numéro de téléphone">
                <UInput
                    v-model="state.phone"
                    icon="i-heroicons-phone"
                    placeholder="Numéro de téléphone"
                />
            </UFormGroup>

            <UFormGroup label="Adresse" name="address">
                <UInput v-model="state.address" icon="i-heroicons-map-pin" placeholder="Adresse" />
            </UFormGroup>
        </UForm>

        <template #submit>
            <UButton color="primary" :loading="submitting" @click="() => form.submit()"
                >Enregistrer</UButton
            >
        </template>
    </ElementsFormSlideOver>
</template>
