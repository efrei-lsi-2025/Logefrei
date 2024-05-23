<script setup lang="ts">
const props = defineProps<{
    status: 'Accepted' | 'Pending' | 'Rejected' | 'Cancelled';
}>();

const status = toRef(props, 'status');

const text = computed(() => {
    switch (status.value) {
        case 'Accepted':
            return 'Accepté';
        case 'Pending':
            return 'En attente';
        case 'Rejected':
            return 'Rejeté';
        case 'Cancelled':
            return 'Annulé';
    }
});

const color = computed(() => {
    switch (status.value) {
        case 'Accepted':
            return 'green';
        case 'Pending':
            return 'yellow';
        case 'Rejected':
            return 'red';
        case 'Cancelled':
            return 'red';
    }
});
</script>

<template>
    <UBadge :color>{{ text }}</UBadge>
</template>
