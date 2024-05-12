<script lang="ts" setup>
const { $router } = useNuxtApp();

const getTitle = () => {
    const toRoute = $router.currentRoute.value;
    return `${toRoute.meta.name} • Logefrei`;
};

useHead({
    title: getTitle
});
</script>

<template>
    <NuxtLoadingIndicator
        color="rgb(var(--color-primary-500))"
        :height="2"
        :throttle="0"
        :duration="2500"
    />

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <USlideovers />
</template>
