import { IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusList } from './enum/order.enum.js';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatusList, {
    message: `valid status are ${OrderStatusList.join(', ')}`,
  })
  status!: OrderStatus;
}
