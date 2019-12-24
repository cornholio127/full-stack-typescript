/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_productById_price {
  __typename: "Price";
  amount: string;
  vatPct: string;
}

export interface ProductDetails_productById_images {
  __typename: "Image";
  url: string;
  isMain: boolean;
}

export interface ProductDetails_productById_specification_attributes {
  __typename: "ProductAttribute";
  name: string;
  value: string;
}

export interface ProductDetails_productById_specification {
  __typename: "ProductAttributeCategory";
  name: string;
  attributes: ProductDetails_productById_specification_attributes[];
}

export interface ProductDetails_productById_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductDetails_productById {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  price: ProductDetails_productById_price;
  images: ProductDetails_productById_images[];
  specification: ProductDetails_productById_specification[];
  category: ProductDetails_productById_category;
}

export interface ProductDetails {
  productById: ProductDetails_productById | null;
}

export interface ProductDetailsVariables {
  id: string;
}
