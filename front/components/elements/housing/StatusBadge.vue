<script setup lang="ts">
const { status, availability } = defineProps<{
    status: 'Draft' | 'Published' | 'Withdrawn';
    availability: 'Available' | 'Occupied' | null;
}>();

const text = computed(() => {
    switch (status) {
        case 'Draft':
            return 'Brouillon';
        case 'Published':
            return availability === 'Available' ? 'Disponible' : 'Retiré';
        case 'Withdrawn':
            return 'Occupé';
    }
});

const color = computed(() => {
    switch (status) {
        case 'Draft':
            return 'gray';
        case 'Published':
            return availability === 'Available' ? 'green' : 'orange';
        case 'Withdrawn':
            return 'red';
    }
});
</script>

<template>
    <UBadge :color>{{ text }}</UBadge>
</template>
