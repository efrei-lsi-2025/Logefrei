<script setup lang="ts">
const props = defineProps<{
    type: 'House' | 'Apartment';
    showText?: boolean;
}>();

const type = toRef(props, 'type');

const icon = computed(() => {
    switch (type.value) {
        case 'House':
            return 'i-heroicons-home';
        case 'Apartment':
            return 'i-heroicons-building-office-2';
    }
});

const text = computed(() => {
    switch (type.value) {
        case 'House':
            return 'Maison';
        case 'Apartment':
            return 'Appartement';
    }
});
</script>

<template>
    <div class="">
        <UIcon :name="icon" />
        <span v-if="showText" class="ml-2 align-top">{{ text }}</span>
    </div>
</template>
