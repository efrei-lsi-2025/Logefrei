<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const items = computed(() => [
  [
    {
      label: userStore.user?.name ?? "Inconnu",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Se déconnecter",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        window.location.href = "/outpost.goauthentik.io/sign_out";
      },
    },
  ],
]);
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
    class="ml-3"
  >
    <UAvatar :alt="userStore.user?.name" size="sm" />

    <template #account="{ item }">
      <div class="text-left">
        <p>Connecté en tant que</p>
        <p class="truncate font-semibold text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>
