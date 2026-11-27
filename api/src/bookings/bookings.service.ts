import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    spaceId: number,
    startTime: string,
    endTime: string,
  ) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      throw new BadRequestException(
        'End time must be later than start time.',
      );
    }

    const space = await this.prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      throw new NotFoundException('Space not found.');
    }

    const conflictingBooking =
      await this.prisma.booking.findFirst({
        where: {
          spaceId,
          status: { not: BookingStatus.CANCELLED },
          startTime: { lt: end },
          endTime: { gt: start },
        },
      });

    if (conflictingBooking) {
      throw new ConflictException(
        'This space is already booked during that time.',
      );
    }

    return this.prisma.booking.create({
      data: {
        userId,
        spaceId,
        startTime: start,
        endTime: end,
      },
      include: {
        space: true,
      },
    });
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        space: true,
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }
}