<script setup lang="ts">
const props = defineProps<{
    status: 'Draft' | 'Published' | 'Withdrawn';
    availability: 'Available' | 'Occupied' | null;
}>();

const { status, availability } = toRefs(props);

const text = computed(() => {
    switch (status.value) {
        case 'Draft':
            return 'Brouillon';
        case 'Published':
            return availability.value === 'Available' ? 'Disponible' : 'Occupé';
        case 'Withdrawn':
            return 'Archivé';
    }
});

const color = computed(() => {
    switch (status.value) {
        case 'Draft':
            return 'gray';
        case 'Published':
            return availability.value === 'Available' ? 'green' : 'orange';
        case 'Withdrawn':
            return 'red';
    }
});
</script>

<template>
    <UBadge :color>{{ text }}</UBadge>
</template>
