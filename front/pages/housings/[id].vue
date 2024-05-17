<script lang="ts" setup>
definePageMeta({
    name: "Détails de l'hébergement"
});

const route = useRoute();
const id = route.params.id;
</script>

<template>
    <PagesTitle />
</template>
