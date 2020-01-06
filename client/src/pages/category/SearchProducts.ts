/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchProducts
// ====================================================

export interface SearchProducts_searchProducts_price {
  __typename: "Price";
  amount: string;
}

export interface SearchProducts_searchProducts_images {
  __typename: "Image";
  url: string;
  isMain: boolean;
}

export interface SearchProducts_searchProducts {
  __typename: "Product";
  id: string;
  name: string;
  price: SearchProducts_searchProducts_price;
  images: SearchProducts_searchProducts_images[];
}

export interface SearchProducts {
  searchProducts: SearchProducts_searchProducts[];
}

export interface SearchProductsVariables {
  categoryId: string;
  limit: number;
  offset: number;
}
