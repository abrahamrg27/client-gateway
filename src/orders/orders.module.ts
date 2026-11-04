import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceHost,
          port: envs.ordersMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
