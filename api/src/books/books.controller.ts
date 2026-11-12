import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.LIBRARIAN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create({
      title: createBookDto.title,
      author: createBookDto.author,
      isbn: createBookDto.isbn,
      totalCopies: createBookDto.totalCopies,
      genre: {
        connect: { id: createBookDto.genreId },
      },
    });
  }

  @Get()
  findAll(
    @Query('genreId') genreId?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.booksService.findAll(
      genreId ? Number(genreId) : undefined,
      search,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const { genreId, ...bookData } = updateBookDto;

    return this.booksService.update(id, {
      ...bookData,
      ...(genreId !== undefined
        ? { genre: { connect: { id: genreId } } }
        : {}),
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}