import { GQLImage, GQLProductResolvers } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopImage } from '../gen/db/public';
import { Record } from 'tsooq';
import { RequestContext } from '../types';

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

export const productImages: GQLProductResolvers['images'] = async (
  source,
  args,
  ctx
) => {
  const { dataLoaders } = ctx as RequestContext;
  return dataLoaders.productImages.load(source.id);
};
