import { Booking, Prisma } from '@prisma/client';
import prisma from '../../clients/prisma';
import { BookingCreationDTO } from './models';
import { InvalidOperationError, RecordNotFoundError, UnauthorizedError } from '../../utils/errors';

export abstract class BookingsService {
    static async getBooking(id: string) {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                housing: true,
                tenant: true
            }
        });
        if (booking === null) throw new RecordNotFoundError(`Booking with id ${id} not found`);
        return booking;
    }

    static async getBookingsForHousing(housingId: string) {
        return prisma.booking.findMany({
            where: { housingId },
            include: {
                housing: true,
                tenant: true
            }
        });
    }

    static async getBookingsForUser(userId: string) {
        return prisma.booking.findMany({
            where: { tenantId: userId },
            include: {
                housing: true,
                tenant: true
            }
        });
    }

    static async createBooking(booking: BookingCreationDTO, tenantId: string) {
        return prisma.booking.create({
            data: { ...booking, tenantId },
            include: {
                housing: true,
                tenant: true
            }
        });
    }

    static async cancelBooking(id: string, userId: string) {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                housing: true
            }
        });

        if (booking === null) throw new RecordNotFoundError(`Booking with id ${id} not found`);

        if (booking.tenantId !== userId && booking.housing.ownerId !== userId)
            throw new UnauthorizedError(`You are not authorized to cancel this booking`);

        if (booking.status === 'Cancelled' || booking.status === 'Rejected')
            throw new InvalidOperationError(`Booking is already cancelled or rejected`);

        if (booking.status !== 'Pending' && booking.tenantId === userId)
            throw new InvalidOperationError(
                `You cannot cancel a booking that is not pending as a tenant`
            );

        if (
            booking.status === 'Accepted' &&
            booking.housing.ownerId === userId &&
            booking.startDate > new Date()
        )
            throw new InvalidOperationError(`You cannot cancel a booking that has started`);

        return prisma.booking.update({
            where: { id },
            data: { status: 'Cancelled' },
            include: {
                housing: true,
                tenant: true
            }
        });
    }

    static async acceptBooking(id: string, userId: string) {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                housing: true
            }
        });

        if (booking === null) throw new RecordNotFoundError(`Booking with id ${id} not found`);

        if (booking.housing.ownerId !== userId)
            throw new UnauthorizedError(`You are not authorized to accept this booking`);

        if (booking.status === 'Cancelled' || booking.status === 'Rejected')
            throw new InvalidOperationError(`Booking is already cancelled or rejected`);

        if (booking.status !== 'Pending') throw new InvalidOperationError(`Booking is not pending`);

        if (booking.startDate < new Date())
            throw new InvalidOperationError(
                `You cannot accept a booking that was supposed to start in the past`
            );

        return prisma.booking.update({
            where: { id },
            data: { status: 'Accepted' },
            include: {
                housing: true,
                tenant: true
            }
        });
    }

    static async rejectBooking(id: string, userId: string) {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                housing: true
            }
        });

        if (booking === null) throw new RecordNotFoundError(`Booking with id ${id} not found`);

        if (booking.housing.ownerId !== userId)
            throw new UnauthorizedError(`You are not authorized to reject this booking`);

        if (booking.status === 'Cancelled' || booking.status === 'Rejected')
            throw new InvalidOperationError(`Booking is already cancelled or rejected`);

        if (booking.status !== 'Pending') throw new InvalidOperationError(`Booking is not pending`);

        if (booking.startDate < new Date())
            throw new InvalidOperationError(
                `You cannot reject a booking that was supposed to start in the past`
            );

        return prisma.booking.update({
            where: { id },
            data: { status: 'Rejected' },
            include: {
                housing: true,
                tenant: true
            }
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
}