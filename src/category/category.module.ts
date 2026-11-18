import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryController } from './category.controller.js';
import { CATEGORY_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORY_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.categoryMicroserviceHost,
          port: envs.categoryMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
