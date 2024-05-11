<script setup lang="ts">
import { useMiscStore } from "~/stores/misc";

const miscStore = useMiscStore();
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="flex items-center space-x-2 gap-4">
      <NuxtLink to="/">
        <img
          :src="
            isDark ? '/static/img/mini-blanc.png' : '/static/img/mini-bleu.png'
          "
          alt="Logo Efrei"
          class="w-8 ml-1 mr-1"
        />
      </NuxtLink>

      <ClientOnly>
        <UButton
          :icon="
            miscStore.userMenuShown
              ? 'i-heroicons-arrow-left-on-rectangle'
              : 'i-heroicons-bars-3'
          "
          size="sm"
          color="gray"
          variant="ghost"
          @click="miscStore.toggleUserMenu"
        />
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          color="gray"
          variant="ghost"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
    </div>
    <div class="flex-grow"></div>
    <UsersButton />
  </div>
</template>
