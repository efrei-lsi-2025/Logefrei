import prisma from '../../clients/prisma';
import { HousingPrismaSelect } from '../housings/models';

export abstract class SearchService {
    static async getAvailableHousingsBetweenDates(
        startDate: Date,
        endDate: Date
    ) {
        return prisma.housing.findMany({
            where: {
                bookings: {
                    none: {
                        OR: [
                            {
                                startDate: {
                                    lte: startDate
                                },
                                endDate: {
                                    gte: startDate
                                }
                            },
                            {
                                startDate: {
                                    lte: endDate
                                },
                                endDate: {
                                    gte: endDate
                                }
                            },
                            {
                                startDate: {
                                    gte: startDate
                                },
                                endDate: {
                                    lte: endDate
                                }
                            }
                        ],
                        status: 'Accepted'
                    }
                }
            },
            select: HousingPrismaSelect
        });
    }
}
