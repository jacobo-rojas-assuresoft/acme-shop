# acme-shop

Full stack application to sell products online for ACME startup.

---

## Technical Decisions & Justifications

This project was built with a modern full-stack architecture prioritizing **scalability**, **developer experience**, and **production readiness**. Below are the key technologies chosen and the reasons behind them:

---

### Backend: NestJS

NestJS was selected for its opinionated and modular structure, which is ideal for building complex GraphQL APIs.

- Decorator-based syntax (`@Query`, `@Mutation`, `@Resolver`) improves clarity and reduces boilerplate.
- Built-in exception filters allow for elegant GraphQL error handling.
- Powerful Dependency Injection (DI) system simplifies unit testing and service isolation.
- Aligns well with enterprise-grade Node.js development patterns.

---

### Frontend: Next.js

Next.js offers the best balance between flexibility and developer ergonomics, especially for e-commerce and authenticated apps.

- Native support for server-side rendering (SSR) and API routes.
- `getServerSideProps` used for secure, authenticated order retrieval.
- Optimized routing and code-splitting for performance.
- Seamless Vercel integration for CI/CD and preview deployments.

---

### Database: PostgreSQL + TypeORM

- **PostgreSQL**:
  - Relational integrity guarantees reliable transactional order processing.
  - JSONB columns provide flexibility for storing dynamic product attributes.
  - Rich SQL feature set, ideal for complex querying and reporting.
- **TypeORM**:
  - Clear entity-based schema modeling via decorators.
  - Supports both Active Record and Data Mapper patterns.
  - Migration system supports consistent schema evolution.

---

### Money Handling

- All monetary values (e.g., `price`, `cost`) are stored in **cents as integers** to prevent floating-point precision issues.
- This follows best practices used by Stripe, Shopify, Amazon, MercadoLibre, and PayPal.
- Utility functions (`toCents`, `fromCents`) handle conversions between display amounts and stored values.

---

### Tooling & Dev Experience

- **ESLint + Prettier + Husky**:
  - Ensures code quality and consistent formatting with pre-commit hooks.
- **Dockerized Setup**:
  - Multi-stage builds for optimized image sizes.
  - Ensures parity between development and production environments.

---

### Risk Mitigation Strategies

- **Authentication**:
  - JWT stored in `httpOnly` cookies to prevent XSS.
  - Refresh token rotation implemented for session security.
- **GraphQL Optimization**:
  - DataLoader integration planned to resolve N+1 queries.
- **Validation & Type Safety**:
  - Decorators like `@IsEmail()`, `@MinLength()` from `class-validator`.
  - Schema-first GraphQL ensures validation at API boundary.

---

## Database Setup

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

## 3. Database Schema

Below is the database schema used in this project:

![Database Diagram](./docs/Acme_DB2_diagram.png)

[View the schema online](https://dbdiagram.io/d/Acme_DB2-684ddac63cc77757c8e67b10)
The database schema is designed using [DBdiagram.io](https://dbdiagram.io).

## 4. Soft Delete Support (deletedAt field)
To improve data integrity and enable auditability, this project uses soft deletes for certain entities such as Product.

Instead of permanently removing records from the database, we mark them as deleted using a deletedAt field. This approach provides several advantages:

- **Auditability**: Deleted records remain in the database, allowing historical tracking and recovery.
- **Prevention of accidental loss**: In case of unintentional deletions, data can be restored easily.

## 5. Notes on Monetary Values

The `price` and `cost` fields are stored in **cents as integers** (e.g., `$25.99` is stored as `2599`).
This approach avoids precision issues common with floating-point numbers and is widely used in production systems (e.g., **Stripe, Shopify, Amazon, PayPal, MercadoLibre**).

Utility functions such as `toCents()` and `fromCents()` are available in `src/utils/money.ts` to convert between money amounts and cents.

### Example

```ts
// Instead of
price: 19.99; // ❌ prone to floating-point issues

// Use
priceCents: 1999; // ✅ precise, safe, consistent
```

## 6. GraphQL DTO Convention

This project uses a clear separation between **input** and **output** types when defining GraphQL DTOs.

### Why this approach?

In GraphQL, the distinction between what is sent **to** the API (`@InputType`) and what is returned **from** it (`@ObjectType`) is crucial for schema clarity and maintainability.

### Folder structure example

```csharp
src/
├── user/
│ ├── dto/
│ │ ├── user.input.ts # @InputType - for mutations
│ │ └── user.output.ts # @ObjectType - for queries and responses
```

### Benefits

- Makes the schema more explicit and predictable
- Easier to evolve independently (e.g., hiding internal fields from outputs)
- Aligns with GraphQL tooling and community conventions

This convention is recommended for **code-first GraphQL** development with NestJS.
