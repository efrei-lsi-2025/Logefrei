<script setup lang="ts">
const { $client } = useNuxtApp();

const props = defineProps<{
    user: NonNullable<Awaited<ReturnType<(typeof $client)['users']['me']['get']>>['data']>;
}>();

const { user } = toRefs(props);
</script>

<template>
    <div class="flex items-center space-x-2 gap-2">
        <UAvatar :alt="user.name" size="sm" />
        <div class="flex flex-col">
            <p>{{ user.name }}</p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ user.email }} • {{ user.phone }}
            </p>
        </div>
    </div>
</template>
