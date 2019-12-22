import {
  GQLProductResolvers,
  GQLProductAttributeCategory,
  GQLProductAttribute,
} from '../gen/gql/types';
import { create } from '../db';
import {
  Tables,
  ShopProductAttrType,
  ShopProductAttrCategory,
  ShopProductAttr,
} from '../gen/db/public';
import { mapGroup, groupBy } from './util';
import { Record } from 'tsooq';

const attrCategoryId = ShopProductAttrCategory.ID.as('attr_cat_id');
const attrCategoryName = ShopProductAttrCategory.NAME.as('attr_cat_name');
const attrTypeId = ShopProductAttrType.ID.as('attr_type_id');
const attrTypeName = ShopProductAttrType.NAME.as('attr_type_name');
const attrId = ShopProductAttr.ID.as('attr_id');

const toGQLProductAttributeCategory = (
  rec: Record
): GQLProductAttributeCategory => ({
  id: '' + rec.get(attrCategoryId),
  name: rec.get(attrCategoryName),
  attributes: [],
});

const toGQLProductAttribute = (rec: Record): GQLProductAttribute => ({
  id: '' + rec.get(attrId),
  name: rec.get(attrTypeName),
  value: rec.get(ShopProductAttr.VALUE),
});

export const productSpecification: GQLProductResolvers['specification'] = async source => {
  const productId = Number(source.id);
  const recs = await create
    .select(
      attrCategoryId,
      attrCategoryName,
      attrTypeId,
      attrTypeName,
      attrId,
      ShopProductAttr.VALUE
    )
    .from(Tables.SHOP_PRODUCT_ATTR_CATEGORY)
    .join(Tables.SHOP_PRODUCT_ATTR_TYPE)
    .on(ShopProductAttrType.ATTR_CATEGORY_ID.eq(ShopProductAttrCategory.ID))
    .join(Tables.SHOP_PRODUCT_ATTR)
    .on(ShopProductAttr.ATTR_TYPE_ID.eq(ShopProductAttrType.ID))
    .where(ShopProductAttr.PRODUCT_ID.eq(productId))
    .orderBy(ShopProductAttrType.ID.asc())
    .fetch();
  return mapGroup(
    groupBy(recs, attrCategoryId),
    toGQLProductAttributeCategory,
    toGQLProductAttribute,
    'attributes'
  );
};
