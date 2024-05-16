<script lang="ts" setup>
const router = useRouter();

onMounted(() => {
    if (router.currentRoute.value.path === '/bookings') {
        router.push('/bookings/my');
    }
});
</script>

<template>
    <NuxtPage />
</template>
