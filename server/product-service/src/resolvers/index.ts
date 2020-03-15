import * as productResolver from './product';
import * as categoryResolver from './category';
import * as imageResolver from './image';
import * as specificationResolver from './specification';
import { GQLProduct, GQLImage, GQLCategory } from '../gen/gql/types';

const resolvers = {
  Query: {
    productById: productResolver.productByIdGql,
    productsById: productResolver.productsById,
    searchProducts: productResolver.searchProducts,
    categories: categoryResolver.categories,
    categoryById: categoryResolver.categoryByIdGql,
  },
  Category: {
    __resolveReference: (category: GQLCategory) => {
      return categoryResolver.categoryById(category.id);
    },
    products: productResolver.categoryProducts,
  },
  Product: {
    __resolveReference: (product: GQLProduct) => {
      return productResolver.productById(product.id);
    },
    images: imageResolver.productImages,
    specification: specificationResolver.productSpecification,
  },
  Image: {
    __resolveReference: (image: GQLImage) => {
      return imageResolver.imageById(image.id);
    },
  },
  Mutation: {
    insertProduct: productResolver.insertProduct,
  },
};

export default resolvers;
