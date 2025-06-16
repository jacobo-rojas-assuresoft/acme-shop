import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Order status (pending, paid, shipped, delivered, or cancelled).',
});
