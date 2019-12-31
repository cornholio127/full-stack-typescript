import { create } from '../db';
import { Tables, ShopProduct } from '../gen/db/public';
import { GQLQueryResolvers } from '../gen/gql/types';
import { intToCurrency, currencyToInt } from '../util';

export const orderSummary: GQLQueryResolvers['orderSummary'] = async (
  source,
  args
) => {
  const quantityById: { [index: string]: number } = {};
  args.items.forEach(item => (quantityById[item.productId] = item.quantity));
  const items = await create
    .select(ShopProduct.ID, ShopProduct.NAME, ShopProduct.PRICE)
    .from(Tables.SHOP_PRODUCT)
    .where(ShopProduct.ID.in(args.items.map(item => Number(item.productId))))
    .fetchMapped(row => ({
      id: '' + row.get(ShopProduct.ID),
      product: { id: '' + row.get(ShopProduct.ID) },
      quantity: quantityById['' + row.get(ShopProduct.ID)],
      netAmount: '' + row.get(ShopProduct.PRICE),
      vatAmount: '0.00',
      grossAmount: '' + row.get(ShopProduct.PRICE),
    }));
  const totalGrossAmount = intToCurrency(
    items
      .map(item => currencyToInt(item.grossAmount) * item.quantity)
      .reduce((a, b) => a + b, 0)
  );
  return {
    items,
    totalNetAmount: totalGrossAmount,
    totalVatAmount: '0.00',
    totalGrossAmount,
  };
};
