import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@ObjectType()
@Entity()
export class OrderDetail {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  price: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  cost: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderDetails, { onDelete: 'CASCADE' })
  order: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.orderDetails)
  product: Product;
}
