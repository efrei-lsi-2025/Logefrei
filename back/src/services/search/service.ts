import { HousingType } from '@prisma/client';
import prisma from '../../clients/prisma';
import { InvalidOperationError } from '../../utils/errors';
import { HousingPrismaSelect } from '../housings/models';

export abstract class SearchService {

    static async searchHousings(
        startDate: Date,
        endDate: Date,
        text?: string,
        type?: HousingType,
        minRent?: number,
        maxRent?: number,
        minSurf?: number,
        maxSurf?: number
    ) {
        if (minRent && maxRent && minRent > maxRent) {
            throw new InvalidOperationError('minRent must be less than or equal to maxRent');
        }
        if (minSurf && maxSurf && minSurf > maxSurf) {
            throw new InvalidOperationError('minSurf must be less than or equal to maxSurf');
        }

        return prisma.housing.findMany({
            where: {
                AND: [
                    { status: 'Published' },
                    {
                        OR: [
                            {
                                address: {
                                    search: text,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                description: {
                                    search: text,
                                    mode: 'insensitive'
                                }
                            }
                        ]
                    },
                    {
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
                    type ? { type } : {},
                    minRent ? {
                        rent: {
                            gte: minRent
                        }
                    } : {},
                    maxRent ? {
                        rent: {
                            lte: maxRent
                        }
                    } : {},
                    minSurf ? {
                        surface: {
                            gte: minSurf
                        }
                    } : {},
                    maxSurf ? {
                        surface: {
                            lte: maxSurf
                        }
                    } : {}
                ]
            },
            select: HousingPrismaSelect
        });
    }
}

