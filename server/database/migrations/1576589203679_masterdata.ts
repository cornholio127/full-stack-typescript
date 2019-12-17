/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';
import { sql } from './util';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  const countriesSql = await sql('masterdata.sql');
  countriesSql.forEach(s => pgm.sql(s));
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql('delete from shop_vat_group');
  pgm.sql('delete from shop_category');
}
