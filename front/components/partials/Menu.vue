<script setup lang="ts">
const links = [
    {
        label: 'Recherche',
        icon: 'i-heroicons-magnifying-glass',
        to: '/'
    },
    {
        label: 'Calendrier',
        icon: 'i-heroicons-calendar-days',
        to: '/calendar'
    },
    {
        label: 'Réservations',
        icon: 'i-heroicons-calendar',
        to: '/bookings'
    },
    {
        label: 'Hébergements',
        icon: 'i-heroicons-home-modern',
        to: '/housings'
    }
];
</script>

<template>
    <UHorizontalNavigation class="flex-grow" :links="links" />
</template>
