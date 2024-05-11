<script setup lang="ts">
import { useUserStore } from "~/stores/user";

definePageMeta({
  name: "Dashboard",
});

const userStore = useUserStore();

onMounted(() => {
  userStore.setCurrentUser();
});
</script>

<template>
  <div>
    <PagesTitle icon="i-heroicons-home" name="Dashboard" />
  </div>
  Salut, comment ça va {{ userStore.user?.name }} ? La forme ? Ca gaze ?
</template>
