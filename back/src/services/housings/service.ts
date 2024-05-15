import { Housing } from '@prisma/client';
import prisma from '../../clients/prisma';
import { HousingCreationDTO } from './models';
import { RecordNotFoundError, InvalidOperationError } from '../../utils/errors';
import { InternalBookingsClient } from '../../clients/microservices';

export abstract class HousingsService {
    static async getHousing(id: string): Promise<Housing> {
        const housing = await prisma.housing.findUnique({
            where: { id }
        });
        if (housing === null)
            throw new RecordNotFoundError(`Housing with id ${id} not found`);
        return housing;
    }

    static async getHousings(): Promise<Housing[]> {
        return prisma.housing.findMany();
    }

    static async getHousingsForUser(userId: string): Promise<Housing[]> {
        return prisma.housing.findMany({
            where: { ownerId: userId }
        });
    }

    static async createHousing(housing: HousingCreationDTO, ownerId: string): Promise<Housing> {
        return prisma.housing.create({ data: { ...housing, ownerId } });
    }

    static async updateHousing(id: string, newHousing: Partial<Housing>): Promise<Housing> {
        const housing = await this.getHousing(id);

        if (newHousing.status === 'Draft' && housing.status === 'Occupied')
            throw new InvalidOperationError('Cannot update an occupied housing to draft');

        else if (newHousing.status === 'Occupied' && housing.status === 'Draft')
            throw new InvalidOperationError('Cannot update a draft housing to occupied');

        if (newHousing.status === 'Occupied')
            await this.cancelFutureBookings(id);

        return prisma.housing.update({ where: { id }, data: newHousing });
    }

    static async deleteHousing(id: string): Promise<Housing> {
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
