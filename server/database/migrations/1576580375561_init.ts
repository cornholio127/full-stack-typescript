/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('shop_country', {
    id: 'id',
    code: { type: 'char(3)', notNull: true },
    name: { type: 'varchar(100)', notNull: true },
  });
  pgm.createTable('shop_address', {
    id: 'id',
    first_name: { type: 'varchar(100)', notNull: true },
    last_name: { type: 'varchar(100)', notNull: true },
    company_name: { type: 'varchar(100)' },
    street: { type: 'varchar(100)', notNull: true },
    zip_code: { type: 'varchar(10)', notNull: true },
    city: { type: 'varchar(100)', notNull: true },
    country: { type: 'char(3)', notNull: true },
  });
  pgm.createTable('shop_login', {
    id: 'id',
    pwhash: { type: 'varchar(100)', notNull: true },
    active: { type: 'boolean', notNull: true },
    activation_token: { type: 'varchar(20)' },
    reset_token: { type: 'varchar(20)' },
  });
  pgm.createTable('shop_user', {
    id: 'id',
    email: { type: 'varchar(100)', notNull: true, unique: true },
    login_id: { type: 'int', references: 'shop_login', notNull: true },
    billing_address_id: { type: 'int', references: 'shop_address' },
    shipping_address_id: { type: 'int', references: 'shop_address' },
  });
  pgm.createTable('shop_category', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
  });
  pgm.createTable('shop_vat_group', {
    id: 'id',
    name: { type: 'varchar(20)', notNull: true },
    percentage: { type: 'decimal(8, 2)', notNull: true },
  });
  pgm.createTable('shop_product', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    description: { type: 'varchar(1000)' },
    category_id: { type: 'int', references: 'shop_category', notNull: true },
    price: { type: 'decimal(8, 2)', notNull: true },
    vat_group_id: { type: 'int', references: 'shop_vat_group', notNull: true },
    activation_date: { type: 'timestamp', notNull: true },
  });
  pgm.createTable('shop_image', {
    id: 'id',
    product_id: { type: 'int', references: 'shop_product', notNull: true },
    url: { type: 'varchar(200)', notNull: true },
    is_main: { type: 'boolean', notNull: true },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('shop_image');
  pgm.dropTable('shop_product');
  pgm.dropTable('shop_vat_group');
  pgm.dropTable('shop_category');
  pgm.dropTable('shop_user');
  pgm.dropTable('shop_login');
  pgm.dropTable('shop_address');
  pgm.dropTable('shop_country');
}
