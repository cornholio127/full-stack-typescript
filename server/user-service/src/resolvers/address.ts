import { GQLUserResolvers, GQLAddress } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopAddress } from '../gen/db/public';
import { Record } from 'tsooq';
import { isId } from './util';

const toAddress = (row: Record): GQLAddress => ({
  id: '' + row.get(ShopAddress.ID),
  firstName: row.get(ShopAddress.FIRST_NAME),
  lastName: row.get(ShopAddress.LAST_NAME),
  companyName: row.get(ShopAddress.COMPANY_NAME),
  street: row.get(ShopAddress.STREET),
  zipCode: row.get(ShopAddress.ZIP_CODE),
  city: row.get(ShopAddress.CITY),
  country: row.get(ShopAddress.COUNTRY),
});

export const userBillingAddress: GQLUserResolvers['billingAddress'] = (source, args, context, info) => {
  if (!isId(source.billingAddress.id)) {
    return null;
  }
  const billingAddressId = Number(source.billingAddress.id);
  return create
    .select()
    .from(Tables.SHOP_ADDRESS)
    .where(ShopAddress.ID.eq(billingAddressId))
    .fetchSingleMapped(toAddress);
};

export const userShippingAddress: GQLUserResolvers['shippingAddress'] = (source, args, context, info) => {
  if (!isId(source.shippingAddress.id)) {
    return null;
  }
  const shippingAddressId = Number(source.shippingAddress.id);
  return create
    .select()
    .from(Tables.SHOP_ADDRESS)
    .where(ShopAddress.ID.eq(shippingAddressId))
    .fetchSingleMapped(toAddress);
};
