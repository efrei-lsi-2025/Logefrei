import { CronJob } from 'cron';
import { InternalBookingsClient, InternalHousingsClient } from '../../clients/microservices';

const createBackgroundJobs = () => {
    const autoRejectBookingsJob = new CronJob(
        '0 * * * * *',
        async () => {
            console.log('Executing autoRejectBookingsJob');
            await InternalBookingsClient.bookings.autoReject.patch();
        },
        null,
        true
    );

    const autoSetAvailableHousingsJob = new CronJob(
        '0 * * * * *',
        async () => {
            console.log('Executing autoSetAvailableHousingsJob');
            await InternalHousingsClient.housings.autoSetAvailable.patch();
        },
        null,
        true
    );

    const autoSetOccupiedHousingsJob = new CronJob(
        '0 * * * * *',
        async () => {
            console.log('Executing autoSetOccupiedHousingsJob');
            await InternalHousingsClient.housings.autoSetOccupied.patch();
        },
        null,
        true
    );

    console.log(`🚀 Started background crons`);
};

createBackgroundJobs();
