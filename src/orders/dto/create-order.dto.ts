import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus, OrderStatusList } from './enum/order.enum.js';


export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;
  @IsNumber()
  @IsPositive()
  totalItem: number;

  @IsEnum(OrderStatusList, {
    message: `positive status values ar : ${OrderStatusList.join((', '))}`,
    })
    @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;
}
