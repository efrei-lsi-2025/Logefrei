<script setup lang="ts">
import { useMiscStore } from "~/stores/misc";

const miscStore = useMiscStore();

const currentRoute = useRoute();

const icon = currentRoute.meta.icon as Ref<string>;

const menuShown = computed(() => {
  return !(miscStore.userMenuShown || !miscStore.menuCollapsed);
});
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900">
    <UContainer class="flex flex-col space-y-3 min-h-screen sm:px-24">
      <PartialsHeader class="mt-6 mb-3" />
      <div class="flex-1">
        <div class="flex flex-col lg:flex-row gap-5">
          <div
            :class="`${menuShown ? 'lg:w-10' : 'lg:w-64 sm:w-full'} ${
              miscStore.userMenuShown ? 'hidden sm:block' : ''
            }`"
            class="transition-all duration-300 ease-in-out overflow-hidden"
            @mouseover="miscStore.showMenu"
            @mouseleave="miscStore.hideMenu"
          >
            <PartialsMenu />
          </div>
          <div class="w-full">
            <NuxtPage />
          </div>
        </div>
      </div>
      <PartialsFooter class="mb-6" />
    </UContainer>
  </div>
</template>
