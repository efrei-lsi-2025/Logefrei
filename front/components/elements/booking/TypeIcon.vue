<script setup lang="ts">
const props = defineProps<{
    type: 'House' | 'Apartment';
}>();

const type = toRef(props, 'type');

const name = computed(() => {
    switch (type.value) {
        case 'House':
            return 'i-heroicons-home';
        case 'Apartment':
            return 'i-heroicons-building-office-2';
    }
});
</script>

<template>
    <UIcon :name />
</template>
