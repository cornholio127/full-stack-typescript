import {
  GQLQueryResolvers,
  GQLCategoryResolvers,
  GQLProduct,
  GQLMutationResolvers,
} from '../gen/gql/types';
import { create } from '../db';
import {
  Tables,
  ShopProduct,
  ShopCategory,
  ShopVatGroup,
  ShopImage,
} from '../gen/db/public';
import { DbFunctions, Record } from 'tsooq';
import { PoolClient } from 'pg';

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

export const productById = (id: string): Promise<GQLProduct> => {
  return create
    .select(...Tables.SHOP_PRODUCT.fields, ShopCategory.NAME)
    .from(Tables.SHOP_PRODUCT)
    .join(Tables.SHOP_CATEGORY)
    .on(ShopProduct.CATEGORY_ID.eq(ShopCategory.ID))
    .where(ShopProduct.ID.eq(Number(id)))
    .fetchSingleMapped(toGQLProduct);
};

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

export const searchProducts: GQLQueryResolvers['searchProducts'] = (
  source,
  args
) => {
  const orderField = ShopProduct.ACTIVATION_DATE.desc();
  return create
    .select(...Tables.SHOP_PRODUCT.fields, ShopCategory.NAME)
    .from(Tables.SHOP_PRODUCT)
    .join(Tables.SHOP_CATEGORY)
    .on(ShopProduct.CATEGORY_ID.eq(ShopCategory.ID))
    .join(Tables.SHOP_IMAGE)
    .on(ShopImage.PRODUCT_ID.eq(ShopProduct.ID))
    .where(
      ShopProduct.CATEGORY_ID.eq(Number(args.categoryId)).and(
        ShopProduct.ACTIVATION_DATE.lte(new Date())
      )
    )
    .orderBy(orderField)
    .fetchMapped(toGQLProduct);
};

export const insertProduct: GQLMutationResolvers['insertProduct'] = async (
  source,
  args
) => {
  const { product } = args;
  const runnable = async (client: PoolClient) => {
    const vatGroupId = await create
      .select(ShopVatGroup.ID)
      .from(Tables.SHOP_VAT_GROUP)
      .where(ShopVatGroup.NAME.eq('default'))
      .fetchSingleMapped(row => row.get(ShopVatGroup.ID));
    const productResult = await create
      .insertInto(
        Tables.SHOP_PRODUCT,
        ShopProduct.CATEGORY_ID,
        ShopProduct.NAME,
        ShopProduct.DESCRIPTION,
        ShopProduct.PRICE,
        ShopProduct.VAT_GROUP_ID,
        ShopProduct.ACTIVATION_DATE
      )
      .values(
        Number(product.categoryId),
        product.name,
        product.description,
        Number(product.price),
        vatGroupId,
        new Date()
      )
      .returning(ShopProduct.ID)
      .runnable()(client);
    for (const img of product.images) {
      await create
        .insertInto(
          Tables.SHOP_IMAGE,
          ShopImage.PRODUCT_ID,
          ShopImage.URL,
          ShopImage.IS_MAIN
        )
        .values(productResult.value, img.url, img.isMain)
        .runnable()(client);
    }
    return productResult;
  };
  return '' + (await create.transaction<number>(runnable));
};
