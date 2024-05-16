import { t } from 'elysia';

export const BookingHousingLookupDTO = t.Object({
    startDate: t.Date(),
    endDate: t.Date()
});

export const SearchModels = {
    BookingHousingLookupDTO
};
