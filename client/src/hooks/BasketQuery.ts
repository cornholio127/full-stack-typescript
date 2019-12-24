/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BasketQuery
// ====================================================

export interface BasketQuery_basket {
  __typename: "BasketItem";
  productId: string;
  quantity: number;
}

export interface BasketQuery {
  basket: BasketQuery_basket[];
}
