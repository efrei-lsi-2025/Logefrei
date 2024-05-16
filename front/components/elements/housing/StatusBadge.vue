<script setup lang="ts">
const { status } = defineProps<{
    status: 'Draft' | 'Available' | 'Occupied';
}>();

const text = computed(() => {
    switch (status) {
        case 'Draft':
            return 'Brouillon';
        case 'Available':
            return 'Disponible';
        case 'Occupied':
            return 'Occupé';
    }
});

const color = computed(() => {
    switch (status) {
        case 'Draft':
            return 'gray';
        case 'Available':
            return 'green';
        case 'Occupied':
            return 'red';
    }
});
</script>

<template>
    <UBadge :color>{{ text }}</UBadge>
</template>
