import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ProductOrmEntity } from './modules/product/infrastructure/persistence/product.orm-entity';

dotenv.config();
const isProd = process.env.NODE_ENV === 'production';
const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: !isProd,
  entities: [__dirname + '/**/*.entity{.ts,.js}', __dirname + '/**/*.orm-entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration_table',
  // dropSchema: false,
  // logging: false,
  // logger: 'file',
  ssl: isProd,
});

export default dataSource;