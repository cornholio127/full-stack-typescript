/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';
import { sql } from './util';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  const attrSql = await sql('product_attr_data.sql');
  attrSql.forEach(s => pgm.sql(s));
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql('delete from shop_product_attr_type');
  pgm.sql('delete from shop_product_attr_category');
}
