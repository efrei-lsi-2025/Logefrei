<script lang="ts" setup>
const { $client } = useNuxtApp();

const props = defineProps<{
    housing: NonNullable<
        Awaited<ReturnType<(typeof $client)['housings']['index']['get']>>['data']
    >[number];
    hideOwner?: boolean;
    hideStatus?: boolean;
}>();

const { housing, hideOwner } = toRefs(props);
</script>

<template>
    <UCard
        v-if="housing"
        class="flex-1 cursor-pointer"
        @click="navigateTo(`/housings/${housing.id}`)"
    >
        <template #header>
            <div class="flex flex-row">
                <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex-1">
                    <ElementsHousingStatusBadge
                        v-if="!hideStatus"
                        :status="housing.status"
                        :availability="housing.availabilityStatus"
                    />
                    <span v-else>Hébergement</span>
                </p>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <ElementsHousingTypeIcon :type="housing.type" :showText="true" />
                </p>
            </div>
        </template>

        <div class="flex flex-col">
            <p>{{ housing.address }}</p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ housing.surface }} m² • {{ housing.rent }} € par nuit
            </p>
        </div>

        <div class="flex flex-col mt-4">
            <blockquote>{{ housing.description }}</blockquote>
        </div>

        <template #footer v-if="!hideOwner">
            <ElementsUsersInfo :user="housing.owner" />
        </template>
    </UCard>
</template>
