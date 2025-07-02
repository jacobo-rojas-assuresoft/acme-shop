import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItemInput } from './dto/order-item.input';
import { OrderService } from './order.service';

@Resolver(() => Order)
@UseGuards(GqlAuthGuard)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  async placeOrder(
    @CurrentUser() user: User,
    @Args('items', { type: () => [OrderItemInput] }) items: OrderItemInput[]
  ): Promise<Order> {
    return this.orderService.createOrder(user, items);
  }

  @Query(() => [Order])
  async myOrders(@CurrentUser() user: User): Promise<Order[]> {
    return this.orderService.findUserOrders(user.id);
  }

  @Query(() => [Order])
  async orderHistory(): Promise<Order[]> {
    return this.orderService.findAllOrders();
  }

  @Query(() => Order)
  async order(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return await this.orderService.findById(id);
  }

  @Mutation(() => Order)
  async updateOrderStatus(
    @Args('id', { type: () => Number }) id: number,
    @Args('status', { type: () => OrderStatus }) status: OrderStatus
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(id, status);
  }
}
