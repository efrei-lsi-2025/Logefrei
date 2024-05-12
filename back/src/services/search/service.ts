import { Housing } from '@prisma/client';
import prisma from '../../clients/prisma';

export abstract class SearchService {
    static async getAvailableHousingsBetweenDates(
        startDate: Date,
        endDate: Date
    ): Promise<Housing[]> {
        return prisma.housing.findMany({
            where: {
                NOT: {
                    bookings: {
                        some: {
                            OR: [
                                {
                                    startDate: { gte: startDate },
                                    endDate: { lte: endDate }
                                },
                                {
                                    startDate: { lte: startDate },
                                    endDate: { gte: endDate }
                                }
                            ],
                            status: 'Accepted'
                        }
                    }
                }
            }
        });
    }
}
