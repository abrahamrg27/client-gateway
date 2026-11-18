import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module.js';
import { ProductsModule } from './products/products.module.js';
import { CategoryModule } from './category/category.module.js';

@Module({
  imports: [ProductsModule, OrdersModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}