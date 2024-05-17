import prisma from '../../clients/prisma';
import { HousingCreationDTO, HousingUpdateDTO, HousingPrismaSelect, Housing } from './models';
import { RecordNotFoundError, InvalidOperationError } from '../../utils/errors';
import { InternalBookingsClient } from '../../clients/microservices';

type User = Housing['owner'];

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

    static async updateHousing(oldHousing: Housing, newHousing: HousingUpdateDTO) {
        if (newHousing.status === 'Draft' && oldHousing.availabilityStatus === 'Occupied')
            throw new InvalidOperationError('Cannot update an occupied housing to draft');

        if (newHousing.status === 'Withdrawn')
            await this.cancelFutureBookings(oldHousing.id);

        return prisma.housing.update({
            where: { id: oldHousing.id },
            data: newHousing,
            select: HousingPrismaSelect
        });
    }

    static async withdrawHousing(housing: Housing) {
        if (housing.status === 'Published' && housing.availabilityStatus === 'Occupied')
            throw new InvalidOperationError('Cannot delete an occupied housing');

        await this.cancelFutureBookings(housing.id);

        return prisma.housing.delete({ where: { id: housing.id } });
    }

    static async cancelFutureBookings(housingId: string) {
        return InternalBookingsClient.housings({
            housingId
        }).cancelAllFutureBookings.patch();
    }

    static checkIsOwner(housing: Housing, user: User) {
        if (housing.ownerId !== user.id)
            throw new InvalidOperationError('You cannot update or delete a housing you do not own');
    }
}
