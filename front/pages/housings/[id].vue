<script lang="ts" setup>
definePageMeta({
    name: "Détails de l'hébergement",
    icon: 'i-heroicons-home-modern'
});

const route = useRoute();

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
</script>

<template>
    <PagesTitle />
    <FormsUpdateHousing :id="id" />
</template>
