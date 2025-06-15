# acme-shop
Full stack application to sell products online for ACME startup.

## 🛠️ Database Setup

### 1. Run Migrations

Before running the application, ensure your database schema is up to date by running:

```bash
npm run migration:run
```

This will apply all pending TypeORM migrations to your database.

Migrations are located in src/database/migrations. They define the structure of the database including tables such as User, Product, Order, and OrderDetail.

## 2. Seed Initial Data

After running migrations, you can populate the database with initial data (users, products, and test orders) by executing:

```bash
npm run seed
```
This will:

- Create an admin user:

  - Email: admin@acme.com

  - Password: adminpass

- Create a regular user:

  - Email: user@acme.com

  - Password: userpass

- Insert 3 sample products.

- Create one order for the admin and one for the regular user, each containing 2 products.

Passwords are securely hashed using **bcrypt** before being stored in the database.


## 3. Notes on Monetary Values
The `price` and `cost` fields are stored in **cents as integers** (e.g., `$25.99` is stored as `2599`).
This approach avoids precision issues common with floating-point numbers and is widely used in production systems (e.g., **Stripe, Shopify, Amazon, PayPal, MercadoLibre**).

Utility functions such as `toCents()` and `fromCents()` are available in `src/utils/money.ts` to convert between money amounts and cents.

### Example

```ts
// Instead of
price: 19.99  // ❌ prone to floating-point issues

// Use
priceCents: 1999  // ✅ precise, safe, consistent
```



