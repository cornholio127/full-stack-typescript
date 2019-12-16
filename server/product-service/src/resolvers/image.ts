import { GQLImage } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopImage } from '../gen/db/public';
import { Record } from 'tsooq';

const toGQLImage = (row: Record): GQLImage => ({
  id: '' + row.get(ShopImage.ID),
  isMain: row.get(ShopImage.IS_MAIN),
  url: row.get(ShopImage.URL),
});

export const imageById = (id: string): Promise<GQLImage> => {
  return create
    .select()
    .from(Tables.SHOP_IMAGE)
    .where(ShopImage.ID.eq(Number(id)))
    .fetchSingleMapped(toGQLImage);
};
