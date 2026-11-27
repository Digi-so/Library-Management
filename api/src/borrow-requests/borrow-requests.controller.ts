import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js'
import { RolesGuard } from '../auth/roles.guard.js'
import { Roles } from '../auth/roles.decorator.js'
import { BorrowRequestsService } from './borrow-requests.service.js'
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto.js'
import { UpdateBorrowRequestDto } from './dto/update-borrow-request.dto.js'

type AuthenticatedRequest = {
  user: {
    userId: number
  }
}

@Controller('borrow-requests')
export class BorrowRequestsController {
  constructor(
    private readonly borrowRequestsService: BorrowRequestsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateBorrowRequestDto,
  ) {
    return this.borrowRequestsService.create(
      request.user.userId,
      dto.bookIds,
    )
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LIBRARIAN)
  @Get()
  findAll() {
    return this.borrowRequestsService.findAll()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LIBRARIAN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBorrowRequestDto,
  ) {
    return this.borrowRequestsService.updateStatus(id, dto)
  }
}