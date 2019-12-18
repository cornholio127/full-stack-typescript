import { create } from '../db';
import { GQLOrder, GQLOrderStatus } from '../gen/gql/types';
import { Tables, ShopOrder } from '../gen/db/public';
import { Record } from 'tsooq';

const toGQLOrder = (row: Record): GQLOrder => ({
  id: '' + row.get(ShopOrder.ID),
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
    .select()
    .from(Tables.SHOP_ORDER)
    .where(ShopOrder.ID.eq(Number(id)))
    .fetchSingleMapped(toGQLOrder);
};

export const orders = (): Promise<GQLOrder[]> => {
  const userId = 1; // TODO: get userId from request
  return create
    .select()
    .from(Tables.SHOP_ORDER)
    .where(ShopOrder.USER_ID.eq(userId))
    .fetchMapped(toGQLOrder);
};
