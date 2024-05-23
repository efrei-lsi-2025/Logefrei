import { HousingType } from '@prisma/client';
import prisma from '../../clients/prisma';
import { InvalidOperationError } from '../../utils/errors';
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
                },
                status: 'Published'
            },
            select: HousingPrismaSelect
        });
    }

    static async searchHousings(
        text: string,
        startDate: Date,
        endDate: Date,
        type?: HousingType,
        minRentStr?: string,
        maxRentStr?: string,
        minSurfStr?: string,
        maxSurfStr?: string
    ) {
        let minRent: number | undefined;
        let maxRent: number | undefined;
        let minSurf: number | undefined;
        let maxSurf: number | undefined;

        try {
            minRent = minRentStr ? parseFloat(minRentStr) : undefined;
            maxRent = maxRentStr ? parseFloat(maxRentStr) : undefined;
            minSurf = minSurfStr ? parseFloat(minSurfStr) : undefined;
            maxSurf = maxSurfStr ? parseFloat(maxSurfStr) : undefined;
        } catch (error) {
            throw new InvalidOperationError('minRent, maxRent, minSurf and maxSurf must be numbers');
        }

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
                                    contains: text,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                description: {
                                    contains: text,
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

