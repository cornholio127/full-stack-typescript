import { GQLQueryResolvers, GQLMutationResolvers, GQLAddress, GQLAddressInput } from '../types';
import { isId } from './util';
import { create } from '../db';
import { Tables, ShopUser, ShopLogin, ShopAddress } from '../gen/public';
import { PoolClient } from 'pg';
import { hashSync } from 'bcrypt';
import { constantResult } from 'tsooq';

const SALT_ROUNDS = 11;

const addressRef = (id?: number): GQLAddress | undefined => id === undefined ? undefined : { id: '' + id } as GQLAddress;

export const userByEmail: GQLQueryResolvers['userByEmail'] = (source, args, context, info) => {
  const { email } = args;
  return create
    .select()
    .from(Tables.SHOP_USER)
    .where(ShopUser.EMAIL.eq(email))
    .fetchSingleMapped(row => ({
      id: '' + row.get(ShopUser.ID),
      email: row.get(ShopUser.EMAIL),
      billingAddress: addressRef(row.get(ShopUser.BILLING_ADDRESS_ID)),
      shippingAddress: addressRef(row.get(ShopUser.SHIPPING_ADDRESS_ID)),
    }));
};

export const insertUser: GQLMutationResolvers['insertUser'] = async (source, args, context, info) => {
  const { user } = args;
  const pwhash = hashSync(user.password, SALT_ROUNDS);
  const runnable = async (client: PoolClient) => {
    const loginId = await create
      .insertInto(Tables.SHOP_LOGIN, ShopLogin.PWHASH, ShopLogin.ACTIVE)
      .values(pwhash, false)
      .returning(ShopLogin.ID)
      .runnable()(client);
    return await create
      .insertInto(Tables.SHOP_USER, ShopUser.EMAIL, ShopUser.LOGIN_ID)
      .values(user.email, loginId.value)
      .returning(ShopUser.ID)
      .runnable()(client);
  };
  const userId = await create.transaction<number>(runnable);
  return '' + userId;
};

const upsertAddress = async (address: GQLAddressInput, client: PoolClient) => {
  if (isId(address.id)) {
    const addressId = Number(address.id);
    await create
      .update(Tables.SHOP_ADDRESS)
      .set(ShopAddress.FIRST_NAME, address.firstName)
      .set(ShopAddress.LAST_NAME, address.lastName)
      .set(ShopAddress.COMPANY_NAME, address.companyName)
      .set(ShopAddress.STREET, address.street)
      .set(ShopAddress.ZIP_CODE, address.zipCode)
      .set(ShopAddress.CITY, address.city)
      .set(ShopAddress.COUNTRY, address.country)
      .where(ShopAddress.ID.eq(addressId))
      .runnable()(client);
    return addressId;
  } else {
    const result = await create
      .insertInto(Tables.SHOP_ADDRESS, ShopAddress.FIRST_NAME, ShopAddress.LAST_NAME, ShopAddress.COMPANY_NAME, ShopAddress.STREET, ShopAddress.ZIP_CODE, ShopAddress.CITY, ShopAddress.COUNTRY)
      .values(address.firstName, address.lastName, address.companyName, address.street, address.zipCode, address.city, address.country)
      .returning(ShopAddress.ID)
      .runnable()(client);
    return result.value;
  }
};

export const updateUser: GQLMutationResolvers['updateUser'] = async (source, args, context, info) => {
  const { user } = args;
  const userId = Number(user.id);
  const runnable = async (client: PoolClient) => {
    if (user.billingAddress) {
      const billingAddressId = await upsertAddress(user.billingAddress, client);
      await create
        .update(Tables.SHOP_USER)
        .set(ShopUser.BILLING_ADDRESS_ID, billingAddressId)
        .where(ShopUser.ID.eq(userId))
        .runnable()(client);
    }
    if (user.shippingAddress) {
      const shippingAddressId = await upsertAddress(user.shippingAddress, client);
      await create
        .update(Tables.SHOP_USER)
        .set(ShopUser.BILLING_ADDRESS_ID, shippingAddressId)
        .where(ShopUser.ID.eq(userId))
        .runnable()(client);
    }
    return constantResult(true);
  };
  await create.transaction(runnable);
  return true;
};
