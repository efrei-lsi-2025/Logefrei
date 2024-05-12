import { Housing } from "@prisma/client";
import prisma from "../../clients/prisma";
import { HousingCreationDTO } from "./models";

export abstract class HousingsService {

    static async getHousing(id: string): Promise<Housing | null> {
        return prisma.housing.findUnique({ where: { id } });
    }

    static async getHousings(): Promise<Housing[]> {
        return prisma.housing.findMany();
    }

    static async createHousing(housing: HousingCreationDTO): Promise<Housing> {
        return prisma.housing.create({ data: housing });
    }

    static async updateHousing(id: string, housing: Partial<Housing>): Promise<Housing> {
        return prisma.housing.update({ where: { id }, data: housing });
    }
}