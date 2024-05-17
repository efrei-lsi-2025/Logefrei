<script setup lang="ts">
const router = useRouter();

const linksComputed = computed(() => {
    return router
        .getRoutes()
        .filter((route) => route.meta.showInMenu)
        .sort((a, b) => a.meta.order - b.meta.order)
        .map((route) => ({
            label: route.meta.name,
            icon: route.meta.icon,
            to: route.path
        }));
});
</script>

<template>
    <UHorizontalNavigation class="flex-grow" :links="linksComputed" />
</template>
