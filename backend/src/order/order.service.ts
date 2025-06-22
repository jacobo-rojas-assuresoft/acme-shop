import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { OrderDetail } from '../entities/order-detail.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { OrderStatus } from '../enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['user', 'orderDetails', 'orderDetails.product'],
    });
  }

  async findById(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['user', 'orderDetails', 'orderDetails.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async createOrder(user: User, items: { productId: number; quantity: number }[]): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = this.orderRepo.create({ user, orderDetails: [] });

      let totalQuantity = 0;
      let totalPrice = 0;
      let totalCost = 0;

      for (const item of items) {
        const product = await queryRunner.manager.findOneBy(Product, { id: item.productId });

        if (!product) {
          throw new NotFoundException(`Invalid product: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new NotFoundException(`Insufficient stock: ${item.productId}`);
        }

        const detail = this.orderDetailRepo.create({
          product,
          quantity: item.quantity,
          price: product.price,
          cost: product.cost,
        });

        product.stock -= item.quantity;
        await queryRunner.manager.save(product);

        totalQuantity += item.quantity;
        totalPrice += product.price * item.quantity;
        totalCost += product.cost * item.quantity;

        order.orderDetails.push(detail);
      }

      order.totalQuantity = totalQuantity;
      order.totalPrice = totalPrice;
      order.totalCost = totalCost;

      const savedOrder = await queryRunner.manager.save(Order, order);

      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.findOne(Order, {
        where: { id, deletedAt: null },
        relations: ['orderDetails', 'orderDetails.product'],
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found.`);
      }

      if (order.status !== OrderStatus.PENDING) {
        throw new BadRequestException('Only pending orders can be deleted.');
      }

      for (const detail of order.orderDetails) {
        const product = detail.product;
        product.stock += detail.quantity;
        await queryRunner.manager.save(product);
      }

      const result = await queryRunner.manager.softDelete(Order, id);
      await queryRunner.commitTransaction();
      return result.affected > 0;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async restore(id: number): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.findOne(Order, {
        where: { id, deletedAt: Not(IsNull()) },
        relations: ['orderDetails', 'orderDetails.product'],
        withDeleted: true,
      });

      if (!order) {
        throw new NotFoundException('Order not found or not deleted');
      }

      if (order.status !== OrderStatus.PENDING) {
        throw new BadRequestException('Only PENDING orders can be restored');
      }

      for (const detail of order.orderDetails) {
        const product = detail.product;
        if (product.stock < detail.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.name} (ID: ${product.id}, SKU: ${product.sku})`
          );
        }
        product.stock -= detail.quantity;
        await queryRunner.manager.save(product);
      }

      const result = await queryRunner.manager.restore(Order, id);

      await queryRunner.commitTransaction();
      return result.affected > 0;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findUserOrders(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { user: { id: userId }, deletedAt: IsNull() },
      relations: ['orderDetails', 'orderDetails.product'],
    });
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['user', 'orderDetails', 'orderDetails.product'],
      order: { createdAt: 'ASC' },
    });
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    order.status = status;
    return this.orderRepo.save(order);
  }
}
