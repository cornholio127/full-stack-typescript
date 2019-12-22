/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('shop_product_attr_category', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
  });
  pgm.createTable('shop_product_attr_type', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    attr_category_id: {
      type: 'int',
      references: 'shop_product_attr_category',
      notNull: true,
    },
  });
  pgm.createTable('shop_product_attr', {
    id: 'id',
    product_id: { type: 'int', references: 'shop_product', notNull: true },
    attr_type_id: {
      type: 'int',
      references: 'shop_product_attr_type',
      notNull: true,
    },
    value: { type: 'varchar(100)', notNull: true },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('shop_product_attr');
  pgm.dropTable('shop_product_attr_type');
  pgm.dropTable('shop_product_attr_category');
}
