<script setup lang="ts">
const links = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/'
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
    },
    {
        label: 'Recherche',
        icon: 'i-heroicons-magnifying-glass',
        to: '/search'
    },
    {
        label: 'Utilisateurs',
        icon: 'i-heroicons-user',
        to: '/users'
    }
];
</script>

<template>
    <UHorizontalNavigation class="flex-grow" :links="links" />
</template>
