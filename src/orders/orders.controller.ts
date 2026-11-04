import {
  Controller,
  Body,
  Get,
  Patch,
  Post,
  Param,
  Inject,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto.js';
import { ORDERS_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto.js';
import { StatusDto } from './dto/status.dto.js';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: OrderPaginationDto,
  ) {
    return this.ordersClient
      .send('findAllOrders', { ...paginationDto, status: statusDto.status })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id/id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    return this.ordersClient
      .send('changeOrderStatus', { id, ...changeOrderStatusDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
