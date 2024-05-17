import { Housing } from '@prisma/client';
import prisma from '../../clients/prisma';
import { HousingCreationDTO, HousingPrismaSelect } from './models';
import { RecordNotFoundError, InvalidOperationError } from '../../utils/errors';
import { InternalBookingsClient } from '../../clients/microservices';

export abstract class HousingsService {
    static async getHousing(id: string) {
        const housing = await prisma.housing.findUnique({
            where: { id },
            select: HousingPrismaSelect
        });
        if (housing === null) throw new RecordNotFoundError(`Housing with id ${id} not found`);
        return housing;
    }

    static async getHousings() {
        return prisma.housing.findMany({
            select: HousingPrismaSelect
        });
    }

    static async getHousingsForUser(userId: string) {
        return prisma.housing.findMany({
            where: { ownerId: userId },
            select: HousingPrismaSelect
        });
    }

    static async createHousing(housing: HousingCreationDTO, ownerId: string) {
        return prisma.housing.create({
            data: { ...housing, ownerId },
            select: HousingPrismaSelect
        });
    }

    static async updateHousing(id: string, newHousing: Partial<Housing>) {
        const housing = await this.getHousing(id);

        if (newHousing.status !== 'Published' && housing.status === 'Occupied')
            throw new InvalidOperationError('Cannot update an occupied housing to draft');
        else if (newHousing.status === 'Occupied' && housing.status === 'Draft')
            throw new InvalidOperationError('Cannot update a draft housing to occupied');

        if (newHousing.status === 'Occupied') await this.cancelFutureBookings(id);

        return prisma.housing.update({
            where: { id },
            data: newHousing,
            select: HousingPrismaSelect
        });
    }

    static async deleteHousing(id: string) {
        const housing = await this.getHousing(id);

        if (housing.status === 'Occupied')
            throw new InvalidOperationError('Cannot delete an occupied housing');

        await this.cancelFutureBookings(id);

        return prisma.housing.delete({ where: { id } });
    }

    static async cancelFutureBookings(housingId: string) {
        return InternalBookingsClient.housings({
            housingId
        }).cancelAllFutureBookings.patch();
    }
}
