<script lang="ts" setup>
import { format } from 'date-fns';

definePageMeta({
    name: 'Information sur la réservation',
    icon: 'i-heroicons-calendar'
});

const { $client } = useNuxtApp();
const userStore = useUserStore();
const route = useRoute();
const toast = useToast();

const bookingId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const { data, refresh, pending } = useAsyncData(async () => {
    const { data } = await $client.bookings({ bookingId }).index.get();
    return data;
});

const acceptBooking = async () => {
    await $client.bookings({ bookingId }).accept.put();
    await refresh();

    toast.add({
        title: 'Réservation acceptée',
        description: 'La réservation a bien été acceptée.',
        icon: 'i-heroicons-check-circle',
        color: 'green'
    });
};

const rejectBooking = async () => {
    await $client.bookings({ bookingId }).reject.put();
    await refresh();

    toast.add({
        title: 'Réservation refusée',
        description: 'La réservation a bien été refusée.',
        icon: 'i-heroicons-x-circle',
        color: 'red'
    });
};

const cancelBooking = async () => {
    await $client.bookings({ bookingId }).cancel.put();
    await refresh();

    toast.add({
        title: 'Réservation annulée',
        description: 'La réservation a bien été annulée.',
        icon: 'i-heroicons-x-circle',
        color: 'primary'
    });
};

const isHousingOwner = computed(() => data.value?.housing?.ownerId === userStore.user?.id);
const isBookingOwner = computed(() => data.value?.tenantId === userStore.user?.id);

const canUpdate = computed(
    () =>
        (data.value?.status === 'Pending' || data.value?.status === 'Accepted') &&
        new Date(data.value?.startDate) > new Date() &&
        (isHousingOwner.value || isBookingOwner.value)
);
</script>

<template>
    <div class="w-full h-40 rounded-md overflow-hidden mb-5 shadow-md z-index-map">
        <LMap ref="map" :zoom="6" :center="[47.21322, -1.559482]">
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                layer-type="base"
                name="OpenStreetMap"
            />
        </LMap>
    </div>

    <PagesTitle>
        <template #actions>
            <UButton
                v-if="canUpdate && isHousingOwner"
                color="green"
                label="Accepter la réservation"
                @click="acceptBooking"
            />

            <UButton
                v-if="canUpdate && isHousingOwner"
                color="red"
                label="Refuser la réservation"
                @click="rejectBooking"
            />

            <UButton
                v-if="canUpdate && isBookingOwner"
                color="primary"
                label="Annuler la réservation"
                @click="cancelBooking"
            />
        </template>
    </PagesTitle>

    <template v-if="data">
        <div class="flex flex-col gap-3">
            <div class="flex flex-row gap-3">
                <ElementsHousingCard
                    v-if="data.housing.owner"
                    :housing="data.housing"
                    class="flex-1"
                    :hideStatus="true"
                />
                <UCard v-if="data.tenant" class="flex-1">
                    <template #header>
                        <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Locataire
                        </p>
                    </template>
                    <ElementsUsersInfo :user="data.tenant" />
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-3">
                        {{ data.tenant.address }}
                    </p>
                </UCard>
            </div>

            <UCard>
                <template #header>
                    <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Informations sur la réservation
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Créée le {{ format(data.createdAt, 'dd/MM/yyy HH:mm') }} • Mise à jour le
                        {{ format(data.updatedAt, 'dd/MM/yyy HH:mm') }}
                    </p>
                </template>
                <div class="flex flex-col">
                    <div class="flex flex-row gap-3 items-center">
                        <div class="flex flex-col pr-4">
                            <p class="text-sm text-gray-500 dark:text-gray-400">Début</p>
                            <p>{{ format(data.startDate, 'dd/MM/yyy HH:mm') }}</p>
                        </div>
                        <div
                            class="flex-1 border-t-2 border-gray-300 dark:border-gray-700 rounded-lg"
                        ></div>
                        <div class="flex flex-col text-right pl-4">
                            <p class="text-sm text-gray-500 dark:text-gray-400">Fin</p>
                            <p>{{ format(data.endDate, 'dd/MM/yyy HH:mm') }}</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Statut</p>
                        <ElementsBookingStatusBadge :status="data.status" />
                    </div>
                </div>
            </UCard>
        </div>
    </template>
</template>

<style>
.z-index-map > div {
    z-index: 0;
}
</style>
