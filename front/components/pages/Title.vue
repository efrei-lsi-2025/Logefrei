<template>
    <div class="flex mb-5 gap-2 items-center text-primary-500">
        <UIcon v-if="iconComputed" :name="iconComputed" class="w-8 h-8" />
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {{ nameComputed }}
        </h3>
        <div class="flex-1 flex justify-end gap-2">
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon?: string | undefined;
    name?: string | undefined;
}>();

const { icon, name } = toRefs(props);

const route = useRouter();
const currentRoute = computed(() => route.currentRoute.value);

const nameComputed = computed(() => {
    return name.value ?? currentRoute.value.name;
});

const iconComputed = computed(() => {
    return icon.value ?? currentRoute.value.meta.icon;
});
</script>
