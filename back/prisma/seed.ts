import { HousingType, Prisma, PrismaClient } from '@prisma/client';
import { fakerFR as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const NUMBER_OF_USERS = 20;
const NUMBER_OF_HOUSINGS = 50;
const NUMBER_OF_BOOKINGS = 100;

const insertUsers = async () => {
    const users = Array.from({ length: NUMBER_OF_USERS }, (_, index): Prisma.UserCreateInput => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            name: faker.person.fullName({ firstName, lastName }),
            address: `${faker.location.streetAddress()} ${faker.location.zipCode()} ${faker.location.city()}`,
            phone: faker.phone.number()
        };
    });

    await prisma.user.createMany({
        data: users
    });

    console.log(`Inserted ${NUMBER_OF_USERS} users`);
};

const insertHousings = async () => {
    const users = await prisma.user.findMany({
        take: NUMBER_OF_USERS
    });

    const housings = Array.from({ length: NUMBER_OF_USERS }, (_, index) => {
        const type = faker.helpers.arrayElement(Object.values(HousingType));

        let rent: number, surface: number;
        switch (type) {
            case HousingType.Apartment:
                rent = faker.number.int({ min: 500, max: 2000 });
                surface = faker.number.int({ min: 30, max: 100 });
                break;
            case HousingType.House:
                rent = faker.number.int({ min: 800, max: 4000 });
                surface = faker.number.int({ min: 50, max: 200 });
                break;
            default:
                rent = faker.number.int({ min: 100, max: 1000 });
                surface = faker.number.int({ min: 20, max: 200 });
                break;
        }

        return {
            ownerId: users[index % NUMBER_OF_USERS].id,
            address: `${faker.location.streetAddress()} ${faker.location.zipCode()} ${faker.location.city()}`,
            description: faker.lorem.sentence(),
            rent,
            surface,
            type
        } satisfies Prisma.HousingCreateManyInput;
    });

    await prisma.housing.createMany({
        data: housings
    });

    console.log(`Inserted ${NUMBER_OF_USERS} housings`);
};

const insertBookings = async () => {
    const users = await prisma.user.findMany({
        take: NUMBER_OF_USERS
    });

    const housings = await prisma.housing.findMany({
        take: NUMBER_OF_HOUSINGS
    });

    const bookings = Array.from({ length: NUMBER_OF_BOOKINGS }, () => {
        const user = faker.helpers.arrayElement(users);
        const housing = faker.helpers.arrayElement(housings);
        const startDate = faker.date.recent();
        const endDate = faker.date.between({
            from: startDate,
            to: new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 30)
        });

        return {
            tenantId: user.id,
            housingId: housing.id,
            startDate,
            endDate,
            status: 'Accepted'
        } satisfies Prisma.BookingCreateManyInput;
    });

    await prisma.booking.createMany({
        data: bookings
    });

    console.log(`Inserted ${NUMBER_OF_BOOKINGS} bookings`);
};

try {
    await insertUsers();
    await insertHousings();
    await insertBookings();
} catch (error) {
    console.error(error);
}
