import { Housing, Prisma } from "@prisma/client";
import prisma from "../../clients/prisma";
import { HousingCreationDTO } from "./models";
import { RecordNotFoundError, InvalidOperationError } from "../../utils/errors";


export abstract class HousingsService {

    static async getHousing(id: string): Promise<Housing> {
        const housing = await prisma.housing.findUnique({ where: { id } });
        if (housing === null) throw new RecordNotFoundError(`Housing with id ${id} not found`);
        return housing;
    }

    static async getHousings(): Promise<Housing[]> {
        return prisma.housing.findMany();
    }

    static async createHousing(housing: HousingCreationDTO): Promise<Housing> {
        return prisma.housing.create({ data: housing });
    }

    static async updateHousing(id: string, newHousing: Partial<Housing>): Promise<Housing> {
        const housing = await this.getHousing(id);

        if (newHousing.status === "Draft") {
            if (housing.status === "Occupied") throw new InvalidOperationError("Cannot update an occupied housing to draft");
            await this.cancelFutureBookings(id);
        } else if (newHousing.status === "Occupied" && housing.status === "Draft") {
            throw new InvalidOperationError("Cannot update a draft housing to occupied");
        }

        return prisma.housing.update({ where: { id }, data: newHousing });
    }

    static async deleteHousing(id: string): Promise<Housing> {
        const housing = await this.getHousing(id);
        if (housing.status === "Occupied") throw new InvalidOperationError("Cannot delete an occupied housing");
        await this.cancelFutureBookings(id);
        return prisma.housing.delete({ where: { id } });
    }

    static async cancelFutureBookings(housingId: string) {
        return await prisma.booking.updateMany({
            where: {
                housingId: housingId,
                startDate: {
                    gte: new Date()
                }
            },
            data: {
                status: "Cancelled"
            }
        });
    }
}