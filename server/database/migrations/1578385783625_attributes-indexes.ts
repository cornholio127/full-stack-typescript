/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createIndex('shop_product_attr_type', 'name', {
    name: 'prod_attr_type_name_index',
    unique: true,
  });
  pgm.createIndex('shop_product_attr', 'value', {
    name: 'prod_attr_value_index',
    unique: false,
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex('shop_product_attr', 'value', {
    name: 'prod_attr_value_index',
  });
  pgm.dropIndex('shop_product_attr_type', 'name', {
    name: 'prod_attr_type_name_index',
  });
}
