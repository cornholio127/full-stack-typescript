import { GQLQueryResolvers } from '../types';
import { create } from '../db';
import { Tables, ShopCountry } from '../gen/public';

export const countries: GQLQueryResolvers['countries'] = (source, args, context, info) => {
  return create
    .select()
    .from(Tables.SHOP_COUNTRY)
    .fetchMapped(row => ({
      id: '' + row.get(ShopCountry.ID),
      code: row.get(ShopCountry.CODE),
      name: row.get(ShopCountry.NAME),
    }));
};
