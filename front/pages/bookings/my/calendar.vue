<script lang="ts" setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import type { CalendarOptions } from '@fullcalendar/core/index.js';

definePageMeta({
    name: 'Calendrier'
});

const { $client, $listen } = useNuxtApp();

const {
    data: myBookings,
    refresh,
    pending
} = useAsyncData(async () => {
    const { data } = await $client.bookings.users.index.get();
    console.log(data);
    return data;
});

$listen('data:refresh:bookings', () => {
    refresh();
});

const calendarOptions: ComputedRef<CalendarOptions> = computed(() => ({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    firstDay: 1,
    nowIndicator: true,
    locales: [frLocale],
    locale: 'fr',
    events: [
        ...(myBookings.value?.map((booking) => ({
            title: `(Moi) ${booking.housing.address}`,
            start: booking.startDate,
            end: booking.endDate,
            classNames: [`booking-status-${booking.status.toLowerCase()}`, 'booking-slot']
        })) ?? [])
    ],
    eventClick: function (info: any) {
        info.jsEvent.preventDefault(); // don't let the browser navigate
        console.log(info.event);
    }
}));
</script>

<template>
    <div class="pt-3">
        <FullCalendar :options="calendarOptions" />
    </div>
</template>

<style>
.fc-toolbar-title {
    @apply text-gray-700 text-xl font-semibold dark:text-gray-200 !important;
}

.fc-button {
    @apply focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 inline-flex items-center border-none !important;
}

.fc-prev-button {
    @apply mr-3 !important;
}

.fc-scrollgrid {
    @apply rounded-lg overflow-hidden !important;
}

.fc-col-header-cell-cushion,
.fc-daygrid-day-number {
    @apply text-gray-700 dark:text-gray-200 !important;
}

.fc-col-header-cell-cushion {
    @apply font-semibold !important;
}

.fc-daygrid-day,
.fc-theme-standard td,
.fc-theme-standard th,
.fc-theme-standard .fc-scrollgrid {
    @apply border-gray-300 dark:border-gray-700 !important;
}

.booking-slot {
    @apply rounded-lg shadow-sm border-none mb-1 p-1 !important;

    .fc-event-main-frame {
        @apply dark:text-gray-900 !important;
    }
}

.booking-status-accepted {
    @apply bg-green-500 dark:text-gray-900 !important;
}

.booking-status-pending {
    @apply bg-yellow-500 !important;
}

.booking-status-rejected {
    @apply bg-red-500 !important;
}

.booking-status-canceled {
    @apply bg-red-500 !important;
}
</style>
