import { Housing } from "@prisma/client";
import prisma from "../../clients/prisma";
import { HousingCreationDTO } from "./models";

export abstract class HousingsService {

    static async getHousings(): Promise<Housing[]> {
        return prisma.housing.findMany();
    }

    static async createHousing(housing: HousingCreationDTO): Promise<Housing> {
        return prisma.housing.create({ data: housing });
    }
}