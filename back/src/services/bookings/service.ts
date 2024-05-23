import prisma from '../../clients/prisma';
import { BookingCreationDTO, BookingPrismaSelect, Booking } from './models';
import { InvalidOperationError, RecordNotFoundError, UnauthorizedError } from '../../utils/errors';
import { User } from '../users/models';

export abstract class BookingsService {
    static async getBooking(id: string) {
        const booking = await prisma.booking.findUnique({
            where: { id },
            select: BookingPrismaSelect
        });
        if (booking === null) throw new RecordNotFoundError(`Booking with id ${id} not found`);
        return booking;
    }

    static async getBookingsForHousing(housingId: string) {
        return prisma.booking.findMany({
            where: { housingId },
            select: BookingPrismaSelect
        });
    }

    static async getBookingsForUser(userId: string) {
        return prisma.booking.findMany({
            where: { tenantId: userId },
            select: BookingPrismaSelect
        });
    }

    static async getBookingsForUserHousings(userId: string) {
        return prisma.booking.findMany({
            where: { housing: { ownerId: userId } },
            select: BookingPrismaSelect
        });
    }

    static async createBooking(booking: BookingCreationDTO, tenantId: string) {
        return prisma.booking.create({
            data: { ...booking, tenantId },
            select: BookingPrismaSelect
        });
    }

    static async cancelBooking(booking: Booking) {
        if (booking.status === 'Cancelled' || booking.status === 'Rejected')
            throw new InvalidOperationError(`Booking is already cancelled or rejected`);

        if (
            booking.status === 'Accepted' &&
            booking.startDate > new Date()
        )
            throw new InvalidOperationError(`You cannot cancel a booking that has started`);

        return prisma.booking.update({
            where: { id: booking.id },
            data: { status: 'Cancelled' },
            select: BookingPrismaSelect
        });
    }

    static async acceptBooking(booking: Booking) {
        if (booking.status !== 'Pending') throw new InvalidOperationError(`You can only accept pending bookings`);

        if (booking.startDate < new Date())
            throw new InvalidOperationError(
                `You cannot accept a booking that was supposed to start in the past`
            );

        return prisma.booking.update({
            where: { id: booking.id },
            data: { status: 'Accepted' },
            select: BookingPrismaSelect
        });
    }

    static async rejectBooking(booking: Booking) {
        if (booking.status !== 'Pending') throw new InvalidOperationError(`You can only reject pending bookings`);

        if (booking.startDate < new Date())
            throw new InvalidOperationError(
                `You cannot reject a booking that was supposed to start in the past`
            );

        return prisma.booking.update({
            where: { id: booking.id },
            data: { status: 'Rejected' },
            select: BookingPrismaSelect
        });
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
                status: 'Cancelled'
            }
        });
    }

    static checkCanReject(booking: Booking, user: User) {
        if (!this.isHost(booking, user))
            throw new UnauthorizedError(`You are not authorized to reject this booking`);
    }

    static checkCanAccept(booking: Booking, user: User) {
        if (!this.isHost(booking, user))
            throw new UnauthorizedError(`You are not authorized to accept this booking`);
    }

    static checkCanCancel(booking: Booking, user: User) {
        if (!this.isTenant(booking, user) && !this.isHost(booking, user))
            throw new UnauthorizedError(`You are not authorized to cancel this booking`);
    }

    static isTenant(booking: Booking, user: User) {
        return booking.tenantId === user.id;
    }

    static isHost(booking: Booking, user: User) {
        return booking.housing.ownerId === user.id;
    }

    static autoRejectBookings() {
        return prisma.booking.updateMany({
            where: {
                status: 'Pending',
                startDate: {
                    lt: new Date()
                }
            },
            data: {
                status: 'Rejected'
            }
        });
    }
}
