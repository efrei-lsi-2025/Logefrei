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
    <div class="flex items-center flex-row space-x-2 pb-5 gap-5 pt-5">
        <img
            :src="isDark ? '/static/img/logo-efrei-blanc.png' : '/static/img/logo-efrei-bleu.png'"
            alt="Logo Efrei Paris"
            class="w-32 hidden lg:block"
        />
        <div class="text-sm opacity-50">
            Module Architecture des Systèmes d'Information<br />
            Système de réservation d'hébergements - Antoine BANHA, Thibaut COLNOT, Jean-Louis CHEN
        </div>
        <div class="flex-grow"></div>
        <div class="font-semibold text-primary-500">Logefrei</div>
    </div>
</template>
