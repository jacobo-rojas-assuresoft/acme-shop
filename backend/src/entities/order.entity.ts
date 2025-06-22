import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderDetail } from './order-detail.entity';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  totalQuantity: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  totalPrice: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  totalCost: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => [OrderDetail])
  @OneToMany(() => OrderDetail, (detail) => detail.order, { cascade: true })
  orderDetails: OrderDetail[];
}
