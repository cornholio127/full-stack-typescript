import { GQLQueryResolvers, GQLCategory } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopCategory } from '../gen/db/public';
import { Record } from 'tsooq';

const toGQLCategory = (row: Record): GQLCategory => ({
  id: '' + row.get(ShopCategory.ID),
  name: row.get(ShopCategory.NAME),
  products: [],
});

export const categoryById = (id: string): Promise<GQLCategory> => {
  return create
    .select()
    .from(Tables.SHOP_CATEGORY)
    .where(ShopCategory.ID.eq(Number(id)))
    .fetchSingleMapped(toGQLCategory);
};

export const categoryByIdGql: GQLQueryResolvers['categoryById'] = (
  parent,
  args
) => categoryById(args.id);

export const categories: GQLQueryResolvers['categories'] = () => {
  return create
    .select()
    .from(Tables.SHOP_CATEGORY)
    .orderBy(ShopCategory.ID.asc())
    .fetchMapped(toGQLCategory);
};
