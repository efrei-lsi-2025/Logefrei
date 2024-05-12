<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
    get() {
        return colorMode.value === 'dark';
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    }
});
</script>

<template>
    <div class="flex w-full justify-center">
        <div class="flex items-center mr-3">
            <NuxtLink to="/">
                <img
                    :src="isDark ? '/static/img/mini-blanc.png' : '/static/img/mini-bleu.png'"
                    alt="Logo Efrei"
                    class="w-8 ml-1 mr-1"
                />
            </NuxtLink>
        </div>

        <PartialsMenu />

        <div class="flex items-center space-x-2 gap-4">
            <UButton
                :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                color="gray"
                variant="ghost"
                aria-label="Theme"
                @click="isDark = !isDark"
            />
            <UsersButton />
        </div>
    </div>
</template>
