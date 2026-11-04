import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './products.controller.js';
import { PRODUCT_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productMicroserviceHost,
          port: envs.productMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductsModule {}
