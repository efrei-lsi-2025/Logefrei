<script setup lang="ts">
const { type } = defineProps<{
    type: 'House' | 'Appartment';
}>();

const name = computed(() => {
    switch (type) {
        case 'House':
            return 'i-heroicons-home';
        case 'Appartment':
            return 'i-heroicons-building-office-2';
    }
});
</script>

<template>
    <UIcon :name />
</template>
