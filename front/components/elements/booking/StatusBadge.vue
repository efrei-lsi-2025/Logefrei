<script setup lang="ts">
const { status } = defineProps<{
    status: 'Accepted' | 'Pending' | 'Rejected' | 'Canceled';
}>();

const text = computed(() => {
    switch (status) {
        case 'Accepted':
            return 'Accepté';
        case 'Pending':
            return 'En attente';
        case 'Rejected':
            return 'Rejeté';
        case 'Canceled':
            return 'Annulé';
    }
});

const color = computed(() => {
    switch (status) {
        case 'Accepted':
            return 'green';
        case 'Pending':
            return 'yellow';
        case 'Rejected':
            return 'red';
        case 'Canceled':
            return 'red';
    }
});
</script>

<template>
    <UBadge :color>{{ text }}</UBadge>
</template>
