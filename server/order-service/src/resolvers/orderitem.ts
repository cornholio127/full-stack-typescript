import { create } from '../db';
import { GQLOrderItem } from '../gen/gql/types';
import { Record } from 'tsooq';
import { ShopOrderItem, Tables } from '../gen/db/public';

const orderItemId = ShopOrderItem.ID.as('order_item_id');

export const toGQLOrderItem = (row: Record): GQLOrderItem => ({
  id: '' + row.get(orderItemId),
  product: { id: '' + row.get(ShopOrderItem.PRODUCT_ID) },
  quantity: row.get(ShopOrderItem.QUANTITY),
  netAmount: '' + row.get(ShopOrderItem.NET_AMOUNT),
  vatAmount: '' + row.get(ShopOrderItem.VAT_AMOUNT),
  grossAmount: '' + row.get(ShopOrderItem.GROSS_AMOUNT),
});

export const orderItemById = (id: string): Promise<GQLOrderItem> => {
  return create
    .select(
      orderItemId,
      ShopOrderItem.PRODUCT_ID,
      ShopOrderItem.QUANTITY,
      ShopOrderItem.NET_AMOUNT,
      ShopOrderItem.VAT_AMOUNT,
      ShopOrderItem.GROSS_AMOUNT
    )
    .from(Tables.SHOP_ORDER_ITEM)
    .where(ShopOrderItem.ID.eq(Number(id)))
    .fetchSingleMapped(toGQLOrderItem);
};
