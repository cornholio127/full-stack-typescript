import { GQLQueryResolvers, GQLCountry } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopCountry } from '../gen/db/public';
import { Record } from 'tsooq';

const toGQLCountry = (row: Record): GQLCountry => ({
  id: '' + row.get(ShopCountry.ID),
  code: row.get(ShopCountry.CODE),
  name: row.get(ShopCountry.NAME),
});

export const countryById = (id: string): Promise<GQLCountry> => {
  return create
    .select()
    .from(Tables.SHOP_COUNTRY)
    .where(ShopCountry.ID.eq(Number(id)))
    .fetchSingleMapped(toGQLCountry);
};

export const countries: GQLQueryResolvers['countries'] = () => {
  return create
    .select()
    .from(Tables.SHOP_COUNTRY)
    .fetchMapped(toGQLCountry);
};
