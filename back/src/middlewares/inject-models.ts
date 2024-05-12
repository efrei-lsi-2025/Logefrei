import Elysia from 'elysia';
import { BookingModels } from '../services/bookings/models';
import { HousingModels } from '../services/housings/models';
import { UserModels } from '../services/users/models';
import { SearchModels } from '../services/search/models';

export const injectModelsPlugin = (app: Elysia) =>
    app.model({
        ...BookingModels,
        ...HousingModels,
        ...UserModels,
        ...SearchModels
    });
