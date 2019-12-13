import { GQLQueryResolvers } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopCountry } from '../gen/db/public';

export const countries: GQLQueryResolvers['countries'] = () => {
  return create
    .select()
    .from(Tables.SHOP_COUNTRY)
    .fetchMapped(row => ({
      id: '' + row.get(ShopCountry.ID),
      code: row.get(ShopCountry.CODE),
      name: row.get(ShopCountry.NAME),
    }));
};
