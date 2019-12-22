/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn('shop_product', 'description', { type: 'varchar(4000)' });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn('shop_product', 'description', { type: 'varchar(1000)' });
}
