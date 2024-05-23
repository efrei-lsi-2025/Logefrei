import { CronJob } from 'cron';
import { InternalBookingsClient, InternalHousingsClient } from '../../clients/microservices';

const createBackgroundJobs = () => {
    const autoRejectBookingsJob = new CronJob(
        '0 * * * * *',
        async () => { await InternalBookingsClient.bookings.autoReject.patch() },
        null,
        true
    );

    const autoSetAvailableHousingsJob = new CronJob(
        '0 * * * * *',
        async () => { await InternalHousingsClient.housings.autoSetAvailable.patch() },
        null,
        true
    );

    const autoSetOccupiedHousingsJob = new CronJob(
        '0 * * * * *',
        async () => { await InternalHousingsClient.housings.autoSetOccupied.patch() },
        null,
        true
    );
}

createBackgroundJobs();