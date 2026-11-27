import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { BorrowStatus } from '@prisma/client'
import { calculateFine } from './fine-calculator.js'
import { UpdateBorrowRequestDto } from './dto/update-borrow-request.dto.js'

const FINE_RATE_PER_DAY = 5

@Injectable()
export class BorrowRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, bookIds: number[]) {
    const books = await this.prisma.book.findMany({
      where: { id: { in: bookIds } },
    })

    if (books.length !== new Set(bookIds).size) {
      throw new NotFoundException(
        'One or more books could not be found.',
      )
    }

    return this.prisma.$transaction(
      bookIds.map((bookId) =>
        this.prisma.borrowRequest.create({
          data: {
            userId,
            bookId,
            status: BorrowStatus.REQUESTED,
          },
          include: { book: true },
        }),
      ),
    )
  }

  async findAll() {
    return this.prisma.borrowRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        book: true,
      },
      orderBy: { requestedAt: 'desc' },
    })
  }

  async updateStatus(
    id: number,
    dto: UpdateBorrowRequestDto,
  ) {
    const request = await this.prisma.borrowRequest.findUnique({
      where: { id },
    })

    if (!request) {
      throw new NotFoundException('Borrow request not found.')
    }

    const returnDate =
      dto.status === BorrowStatus.RETURNED
        ? new Date()
        : undefined

    const dueDate = dto.dueDate
      ? new Date(dto.dueDate)
      : request.dueDate

    const fineAmount =
      returnDate && dueDate
        ? calculateFine(
            dueDate,
            returnDate,
            FINE_RATE_PER_DAY,
          )
        : request.fineAmount

    return this.prisma.borrowRequest.update({
      where: { id },
      data: {
        status: dto.status,
        ...(dto.dueDate ? { dueDate } : {}),
        ...(returnDate ? { returnDate, fineAmount } : {}),
      },
      include: {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
  book: true,
},
    })
  }
}