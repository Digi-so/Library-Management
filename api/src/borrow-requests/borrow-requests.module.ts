import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module.js'
import { BorrowRequestsController } from './borrow-requests.controller.js'
import { BorrowRequestsService } from './borrow-requests.service.js'

@Module({
  imports: [PrismaModule],
  controllers: [BorrowRequestsController],
  providers: [BorrowRequestsService],
  exports: [BorrowRequestsService],
})
export class BorrowRequestsModule {}