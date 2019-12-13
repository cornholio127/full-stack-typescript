import { GQLQueryResolvers } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopCategory } from '../gen/db/public';

export const categories: GQLQueryResolvers['categories'] = () => {
  return create
    .select()
    .from(Tables.SHOP_CATEGORY)
    .orderBy(ShopCategory.ID.asc())
    .fetchMapped(row => ({
      id: '' + row.get(ShopCategory.ID),
      name: row.get(ShopCategory.NAME),
      products: [],
    }));
};
