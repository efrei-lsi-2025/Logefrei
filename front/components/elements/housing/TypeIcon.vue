<script setup lang="ts">
const props = defineProps<{
    type: 'House' | 'Apartment' | null;
    showText?: boolean;
}>();

const type = toRef(props, 'type');

const icon = computed(() => {
    switch (type.value) {
        case 'House':
            return 'i-heroicons-home';
        case 'Apartment':
            return 'i-heroicons-building-office-2';
        default:
            return null;
    }
});

const text = computed(() => {
    switch (type.value) {
        case 'House':
            return 'Maison';
        case 'Apartment':
            return 'Appartement';
        default:
            return 'Tous';
    }
});
</script>

<template>
    <div class="">
        <UIcon :name="icon" />
        <span v-if="showText" class="ml-2 align-top">{{ text }}</span>
    </div>
</template>
