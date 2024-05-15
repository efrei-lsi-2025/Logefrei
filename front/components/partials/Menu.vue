<script setup lang="ts">
const links = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/'
    },
    {
        label: 'Recherche',
        icon: 'i-heroicons-magnifying-glass',
        to: '/search'
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
