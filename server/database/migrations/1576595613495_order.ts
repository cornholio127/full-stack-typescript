/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('shop_order', {
    id: 'id',
    order_number: { type: 'varchar(20)', notNull: true },
    user_id: { type: 'int', references: 'shop_user', notNull: true },
    order_date: { type: 'date', notNull: true },
    order_status: { type: 'varchar(20)', notNull: true },
  });
  pgm.createTable('shop_order_item', {
    id: 'id',
    order_id: { type: 'int', references: 'shop_order', notNull: true },
    product_id: { type: 'int', references: 'shop_product', notNull: true },
    quantity: { type: 'int', notNull: true },
    net_amount: { type: 'decimal(8, 2)', notNull: true },
    vat_amount: { type: 'decimal(8, 2)', notNull: true },
    gross_amount: { type: 'decimal(8, 2)', notNull: true },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('shop_order_item');
  pgm.dropTable('shop_order');
}
