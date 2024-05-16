import { Housing } from '@prisma/client';
import prisma from '../../clients/prisma';

export abstract class SearchService {
    static async getAvailableHousingsBetweenDates(
        startDate: Date,
        endDate: Date
    ): Promise<Housing[]> {
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
            }
        });
    }
}
