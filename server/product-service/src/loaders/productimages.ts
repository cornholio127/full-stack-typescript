import { GQLImage } from '../gen/gql/types';
import { create } from '../db';
import { Tables, ShopImage, ShopProduct } from '../gen/db/public';
import { Record } from 'tsooq';
import { groupBy } from '../resolvers/util';
import DataLoader from 'dataloader';

const productId = ShopProduct.ID.as('productid');
const imageId = ShopImage.ID.as('imageid');

const toGQLImage = (row: Record): GQLImage => ({
  id: '' + row.get(imageId),
  isMain: row.get(ShopImage.IS_MAIN),
  url: row.get(ShopImage.URL),
});

const imagesByProductIds = async (
  productIds: string[]
): Promise<GQLImage[][]> => {
  const productDbIds = productIds.map(id => Number(id));
  const recs = await create
    .select(productId, imageId, ShopImage.URL, ShopImage.IS_MAIN)
    .from(Tables.SHOP_PRODUCT)
    .join(Tables.SHOP_IMAGE)
    .on(ShopImage.PRODUCT_ID.eq(ShopProduct.ID))
    .where(ShopImage.PRODUCT_ID.in(productDbIds))
    .fetch();
  const group = groupBy(recs, productId);
  return productDbIds.map(id => {
    const recsById = group[id];
    if (!recsById) {
      return [];
    }
    return recsById.map(toGQLImage);
  });
};

export default () => new DataLoader(imagesByProductIds);
