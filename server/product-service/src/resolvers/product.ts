import {
  GQLQueryResolvers,
  GQLCategoryResolvers,
  GQLProduct,
  GQLMutationResolvers,
  GQLImage,
} from '../gen/gql/types';
import { create } from '../db';
import {
  Tables,
  ShopProduct,
  ShopCategory,
  ShopVatGroup,
  ShopImage,
  ShopProductAttr,
} from '../gen/db/public';
import { DbFunctions, Record } from 'tsooq';
import { PoolClient } from 'pg';
import { groupBy, mapGroup } from './util';

const categoryName = ShopCategory.NAME.as('category_name');
const imageId = ShopImage.ID.as('image_id');

const toGQLProduct = (row: Record): GQLProduct => ({
  id: '' + row.get(ShopProduct.ID),
  name: row.get(ShopProduct.NAME),
  description: row.get(ShopProduct.DESCRIPTION),
  activationDate: row.get(ShopProduct.ACTIVATION_DATE).toISOString(),
  category: {
    id: '' + row.get(ShopProduct.CATEGORY_ID),
    name: row.get(categoryName),
    products: [],
  },
  price: {
    amount: '' + row.get(ShopProduct.PRICE),
    vatPct: '' + row.get(ShopVatGroup.PERCENTAGE),
  },
  images: [],
  specification: [],
});

const toGQLImage = (row: Record): GQLImage => ({
  id: '' + row.get(imageId),
  isMain: row.get(ShopImage.IS_MAIN),
  url: row.get(ShopImage.URL),
});

export const productById = async (id: string): Promise<GQLProduct> => {
  const recs = await create
    .select(
      ...Tables.SHOP_PRODUCT.fields,
      categoryName,
      ShopVatGroup.PERCENTAGE,
      imageId,
      ShopImage.URL,
      ShopImage.IS_MAIN
    )
    .from(Tables.SHOP_PRODUCT)
    .join(Tables.SHOP_CATEGORY)
    .on(ShopProduct.CATEGORY_ID.eq(ShopCategory.ID))
    .join(Tables.SHOP_VAT_GROUP)
    .on(ShopProduct.VAT_GROUP_ID.eq(ShopVatGroup.ID))
    .join(Tables.SHOP_IMAGE)
    .on(ShopImage.PRODUCT_ID.eq(ShopProduct.ID))
    .where(ShopProduct.ID.eq(Number(id)))
    .fetch();
  if (recs.length === 0) {
    return null;
  }
  return mapGroup(
    groupBy(recs, ShopProduct.ID),
    toGQLProduct,
    toGQLImage,
    'images'
  )[0];
};

export const productByIdGql: GQLQueryResolvers['productById'] = (
  source,
  args
) => productById(args.id);

export const productsById: GQLQueryResolvers['productsById'] = (
  source,
  args
) => {
  return create
    .select(
      ...Tables.SHOP_PRODUCT.fields,
      categoryName,
      ShopVatGroup.PERCENTAGE
    )
    .from(Tables.SHOP_PRODUCT)
    .join(Tables.SHOP_CATEGORY)
    .on(ShopProduct.CATEGORY_ID.eq(ShopCategory.ID))
    .join(Tables.SHOP_VAT_GROUP)
    .on(ShopProduct.VAT_GROUP_ID.eq(ShopVatGroup.ID))
    .where(ShopProduct.ID.in(args.ids.map(id => Number(id))))
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

export const searchProducts: GQLQueryResolvers['searchProducts'] = async (
  source,
  args
) => {
  const orderField = ShopProduct.ACTIVATION_DATE.desc();
  const recs = await create
    .select(
      ...Tables.SHOP_PRODUCT.fields,
      categoryName,
      ShopVatGroup.PERCENTAGE,
      imageId,
      ShopImage.URL,
      ShopImage.IS_MAIN
    )
    .from(Tables.SHOP_PRODUCT)
    .join(Tables.SHOP_CATEGORY)
    .on(ShopProduct.CATEGORY_ID.eq(ShopCategory.ID))
    .join(Tables.SHOP_VAT_GROUP)
    .on(ShopProduct.VAT_GROUP_ID.eq(ShopVatGroup.ID))
    .join(Tables.SHOP_IMAGE)
    .on(ShopImage.PRODUCT_ID.eq(ShopProduct.ID))
    .where(
      ShopProduct.CATEGORY_ID.eq(Number(args.categoryId)).and(
        ShopProduct.ACTIVATION_DATE.lte(new Date())
      )
    )
    .orderBy(orderField)
    .fetch();
  return mapGroup(
    groupBy(recs, ShopProduct.ID),
    toGQLProduct,
    toGQLImage,
    'images'
  );
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
    for (const attr of product.specification) {
      await create
        .insertInto(
          Tables.SHOP_PRODUCT_ATTR,
          ShopProductAttr.PRODUCT_ID,
          ShopProductAttr.ATTR_TYPE_ID,
          ShopProductAttr.VALUE
        )
        .values(productResult.value, Number(attr.typeId), attr.value)
        .runnable()(client);
    }
    return productResult;
  };
  return '' + (await create.transaction<number>(runnable));
};
