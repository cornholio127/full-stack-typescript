/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsByIdQuery
// ====================================================

export interface ProductsByIdQuery_productsById_price {
  __typename: "Price";
  amount: string;
  vatPct: string;
}

export interface ProductsByIdQuery_productsById {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  price: ProductsByIdQuery_productsById_price;
}

export interface ProductsByIdQuery {
  productsById: ProductsByIdQuery_productsById[];
}

export interface ProductsByIdQueryVariables {
  ids: string[];
}
