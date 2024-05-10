<script setup lang="ts">
const { $client } = useNuxtApp();

const { data } = useAsyncData(async () => {
  const { data } = await $client.api.users.index.get();
  return data;
});
</script>

<template>Coucou lol :) {{ data }}</template>
