<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns';

const startModel = defineModel('start', {
    default: sub(new Date(), { days: 14 })
});

const endModel = defineModel('end', {
    default: new Date()
});

const emit = defineEmits<{
    (e: 'change', value: { start: Date; end: Date }): void;
}>();

const dateRange = computed({
    get() {
        return { start: startModel.value, end: endModel.value };
    },
    set(value: { start: Date; end: Date }) {
        startModel.value = value.start;
        endModel.value = value.end;
        emit('change', value);
    }
});
</script>

<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid">
            {{ format(startModel, 'dd/MM/yyy HH:mm') }} - {{ format(endModel, 'dd/MM/yyy HH:mm') }}
        </UButton>

        <template #panel="{ close }">
            <ElementsDatePicker v-model="dateRange" />
        </template>
    </UPopover>
</template>
