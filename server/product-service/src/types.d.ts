import DataLoader from 'dataloader';
import { GQLImage } from './gen/gql/types';

export interface DataLoaderMap {
  productImages: DataLoader<string, GQLImage[], string>;
}

export interface RequestContext {
  dataLoaders: DataLoaderMap;
}
