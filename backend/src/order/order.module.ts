import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from '../entities/order-detail.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderDetail])],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
