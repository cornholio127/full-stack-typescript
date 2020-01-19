import {
  GQLOrder,
  GQLOrderStatus,
  GQLMutationResolvers,
  GQLQueryResolvers,
} from '../gen/gql/types';
import { create } from '../db';
import {
  Tables,
  ShopOrder,
  ShopOrderItem,
  ShopProduct,
  ShopVatGroup,
} from '../gen/db/public';
import { Record, constantResult } from 'tsooq';
import { PoolClient } from 'pg';
import Big from 'big.js';
import { mapGroup, groupBy, checkValidUser } from './util';
import { toGQLOrderItem } from './orderitem';

const orderId = ShopOrder.ID.as('order_id');
const orderItemId = ShopOrderItem.ID.as('order_item_id');

const toGQLOrder = (row: Record): GQLOrder => ({
  id: '' + row.get(orderId),
  orderNumber: row.get(ShopOrder.ORDER_NUMBER),
  orderDate: row.get(ShopOrder.ORDER_DATE).toISOString(),
  orderStatus: row.get(ShopOrder.ORDER_STATUS) as GQLOrderStatus,
  items: [],
  totalNetAmount: '0.00',
  totalVatAmount: '0.00',
  totalGrossAmount: '0.00',
});

export const orderById = (id: string): Promise<GQLOrder> => {
  return create
    .select(
      orderId,
      ShopOrder.ORDER_DATE,
      ShopOrder.ORDER_NUMBER,
      ShopOrder.ORDER_STATUS
    )
    .from(Tables.SHOP_ORDER)
    .where(orderId.eq(Number(id)))
    .fetchSingleMapped(toGQLOrder);
};

const computeOrderTotals = (order: GQLOrder): GQLOrder => {
  let net = Big('0.0');
  let vat = Big('0.0');
  let gross = Big('0.0');
  order.items.forEach(item => {
    net = net.plus(Big(item.netAmount)).mul(Big(item.quantity));
    vat = vat.plus(Big(item.vatAmount)).mul(Big(item.quantity));
    gross = gross.plus(Big(item.grossAmount)).mul(Big(item.quantity));
  });
  order.totalNetAmount = net.toFixed(2);
  order.totalVatAmount = vat.toFixed(2);
  order.totalGrossAmount = gross.toFixed(2);
  return order;
};

export const orders: GQLQueryResolvers['orders'] = async (
  source,
  args,
  ctx
) => {
  const userId = checkValidUser(ctx);
  const recs = await create
    .select(
      orderId,
      ShopOrder.ORDER_DATE,
      ShopOrder.ORDER_NUMBER,
      ShopOrder.ORDER_STATUS,
      orderItemId,
      ShopOrderItem.PRODUCT_ID,
      ShopOrderItem.QUANTITY,
      ShopOrderItem.NET_AMOUNT,
      ShopOrderItem.VAT_AMOUNT,
      ShopOrderItem.GROSS_AMOUNT,
      ShopProduct.NAME
    )
    .from(Tables.SHOP_ORDER)
    .join(Tables.SHOP_ORDER_ITEM)
    .on(ShopOrderItem.ORDER_ID.eq(ShopOrder.ID))
    .join(Tables.SHOP_PRODUCT)
    .on(ShopOrderItem.PRODUCT_ID.eq(ShopProduct.ID))
    .where(ShopOrder.USER_ID.eq(userId))
    .fetch();
  const orders = mapGroup(
    groupBy(recs, orderId),
    toGQLOrder,
    toGQLOrderItem,
    'items'
  );
  return orders.map(computeOrderTotals);
};

export const createOrder: GQLMutationResolvers['createOrder'] = async (
  source,
  args,
  ctx
) => {
  const { items } = args;
  const userId = checkValidUser(ctx);
  const orderNumber = '100001'; // TODO: generate order number
  const runnable = async (client: PoolClient) => {
    const orderResult = await create
      .insertInto(
        Tables.SHOP_ORDER,
        ShopOrder.USER_ID,
        ShopOrder.ORDER_DATE,
        ShopOrder.ORDER_NUMBER,
        ShopOrder.ORDER_STATUS
      )
      .values(userId, new Date(), orderNumber, GQLOrderStatus.Created)
      .returning(ShopOrder.ID)
      .runnable()(client);
    for (const item of items) {
      const priceResult = await create
        .select(ShopProduct.PRICE, ShopVatGroup.PERCENTAGE)
        .from(Tables.SHOP_PRODUCT)
        .join(Tables.SHOP_VAT_GROUP)
        .on(ShopProduct.VAT_GROUP_ID.eq(ShopVatGroup.ID))
        .where(ShopProduct.ID.eq(Number(item.productId)))
        .fetchSingle();
      const grossPrice = Big(priceResult.get(ShopProduct.PRICE));
      const netPrice = Big(grossPrice)
        .mul(Big('100.0'))
        .div(Big('100.0').plus(priceResult.get(ShopVatGroup.PERCENTAGE)));
      const vatAmount = grossPrice.minus(netPrice);
      await create
        .insertInto(
          Tables.SHOP_ORDER_ITEM,
          ShopOrderItem.ORDER_ID,
          ShopOrderItem.PRODUCT_ID,
          ShopOrderItem.QUANTITY,
          ShopOrderItem.NET_AMOUNT,
          ShopOrderItem.VAT_AMOUNT,
          ShopOrderItem.GROSS_AMOUNT
        )
        .values(
          orderResult.value,
          Number(item.productId),
          item.quantity,
          Number(netPrice.toFixed(2)),
          Number(vatAmount.toFixed(2)),
          priceResult.get(ShopProduct.PRICE)
        )
        .runnable()(client);
    }
    return constantResult(true);
  };
  await create.transaction(runnable);
  return true;
};
