import {
  GQLQueryResolvers,
  GQLCategoryResolvers,
  GQLProduct,
} from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopProduct, ShopCategory } from '../gen/db/public';
import { DbFunctions, Record } from 'tsooq';

const toGQLProduct = (row: Record): GQLProduct => ({
  id: '' + row.get(ShopProduct.ID),
  name: row.get(ShopProduct.NAME),
  description: row.get(ShopProduct.DESCRIPTION),
  activationDate: row.get(ShopProduct.ACTIVATION_DATE).toISOString(),
  category: {
    id: '' + row.get(ShopProduct.CATEGORY_ID),
    name: row.get(ShopCategory.NAME),
    products: [],
  },
  price: {
    amount: '' + row.get(ShopProduct.PRICE),
    vatPct: '',
  },
  images: [],
});

export const products: GQLQueryResolvers['products'] = () => {
  return create
    .select(...Tables.SHOP_PRODUCT.fields, ShopCategory.NAME)
    .from(Tables.SHOP_PRODUCT)
    .join(Tables.SHOP_CATEGORY)
    .on(ShopProduct.CATEGORY_ID.eq(ShopCategory.ID))
    .where(ShopProduct.ACTIVATION_DATE.lte(DbFunctions.now()))
    .orderBy(ShopProduct.ACTIVATION_DATE.desc())
    .fetchMapped(toGQLProduct);
};

export const categoryProducts: GQLCategoryResolvers['products'] = source => {
  const categoryId = Number(source.id);
  return create
    .select()
    .from(Tables.SHOP_PRODUCT)
    .where(
      ShopProduct.ACTIVATION_DATE.lte(DbFunctions.now()).and(
        ShopProduct.CATEGORY_ID.eq(categoryId)
      )
    )
    .orderBy(ShopProduct.ACTIVATION_DATE.desc())
    .fetchMapped(row => {
      const product = toGQLProduct(row);
      product.category.name = source.name;
      return product;
    });
};
