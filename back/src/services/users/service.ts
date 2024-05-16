import prisma from '../../clients/prisma';
import { UserPrismaSelect, UserUpdateDTO } from './models';

export abstract class UserService {
    static async updateUser(id: string, data: UserUpdateDTO) {
        return prisma.user.update({
            where: {
                id
            },
            data,
            select: UserPrismaSelect
        });
    }
}
