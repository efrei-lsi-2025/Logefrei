<script lang="ts" setup>
onMounted(() => {
    const router = useRouter();
    if (router.currentRoute.value.path === '/bookings') {
        router.push('/bookings/my');
    }
});
</script>

<template>
    <NuxtPage />
</template>
