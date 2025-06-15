import { AppDataSource } from '../../data-source';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { UserRole } from '../../enums/user-role.enum';
import { Order } from '../../entities/order.entity';
import { OrderDetail } from '../../entities/order-detail.entity';
import { OrderStatus } from '../../enums/order-status.enum';
import { toCents } from '../../utils/money';
import { hashPassword } from '../../utils/auth';

async function seed() {
  await AppDataSource.initialize();

  const productRepo = AppDataSource.getRepository(Product);
  const userRepo = AppDataSource.getRepository(User);
  const orderRepo = AppDataSource.getRepository(Order);
  const orderDetailRepo = AppDataSource.getRepository(OrderDetail);

  // Hash passwords
  const adminPassword = await hashPassword('adminpass', 10);
  const userPassword = await hashPassword('userpass', 10);

  // Create users
  const admin = userRepo.create({
    email: 'admin@acme.com',
    password: adminPassword,
    name: 'Admin',
    role: UserRole.ADMIN,
  });
  const user = userRepo.create({
    email: 'user@acme.com',
    password: userPassword,
    name: 'User',
    role: UserRole.USER,
  });
  await userRepo.save([admin, user]);

  // Create products
  const products = productRepo.create([
    {
      name: 'Camisa',
      sku: 'C001',
      image:
        'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: toCents(25.99),
      cost: toCents(9.9),
      stock: 100,
    },
    {
      name: 'Pantalon',
      sku: 'P001',
      price: toCents(39.5),
      cost: toCents(15.0),
      stock: 50,
    },
    {
      name: 'Sombrero',
      sku: 'S001',
      image:
        'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: toCents(55.5),
      cost: toCents(25.0),
      stock: 50,
    },
  ]);

  await productRepo.save(products);

  async function createOrderForUser(
    user: User,
    products: Product[],
    quantities: number[],
    orderStatus: OrderStatus
  ) {
    const order = orderRepo.create({
      user: user,
      status: orderStatus,
      totalPrice: 0,
      totalCost: 0,
    });
    await orderRepo.save(order);

    const details: OrderDetail[] = [];

    for (let i = 0; i < quantities.length; i++) {
      const quantity = quantities[i];
      const price = products[i].price;
      const cost = products[i].cost;

      details.push(
        orderDetailRepo.create({
          order: order,
          product: products[i],
          quantity,
          price,
          cost,
        })
      );

      order.totalQuantity += quantity;
      order.totalPrice += quantity * price;
      order.totalCost += quantity * cost;
    }

    await orderDetailRepo.save(details);
    await orderRepo.save(order);
    console.log(`Order created for ${user.name}`);
  }

  // Create orders
  await createOrderForUser(admin, [products[0], products[1]], [2, 1], OrderStatus.PAID);

  await createOrderForUser(user, [products[0], products[2]], [1, 1], OrderStatus.PENDING);

  console.log('Seeding completed');
  await AppDataSource.destroy();
}

seed().catch(console.error);
