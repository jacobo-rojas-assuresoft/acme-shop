import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'docker' ? '../.env' : '../.env.local';
dotenv.config({ path: envFile });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'acme_shop',
  entities: ['src/entities/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // NEVER active in production
});
