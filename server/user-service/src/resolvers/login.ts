import { GQLMutationResolvers } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopUser, ShopLogin } from '../gen/db/public';
import { verifyPassword, createAuthToken } from './util';

export const login: GQLMutationResolvers['login'] = async (source, args) => {
  const { email, password } = args.cred;
  const result = await create
    .select(ShopUser.ID, ShopLogin.PWHASH)
    .from(Tables.SHOP_USER)
    .join(Tables.SHOP_LOGIN)
    .on(ShopUser.LOGIN_ID.eq(ShopLogin.ID))
    .where(ShopUser.EMAIL.eq(email).and(ShopLogin.ACTIVE.eq(true)))
    .fetchSingle();
  if (result && verifyPassword(password, result.get(ShopLogin.PWHASH))) {
    const userId = result.get(ShopUser.ID);
    return createAuthToken(userId);
  }
  return 'login failed';
};
