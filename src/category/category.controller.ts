import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CATEGORY_SERVICE } from '../config/service.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_SERVICE) private readonly categoryClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryClient.send({ cmd: 'create_category' }, dto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() dto: PaginationDto) {
    return this.categoryClient
      .send({ cmd: 'find_all_categories' }, dto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryClient
      .send({ cmd: 'find_one_category' }, { id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryClient
      .send({ cmd: 'update_category' }, { id, ...dto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryClient
      .send({ cmd: 'remove_category' }, { id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
