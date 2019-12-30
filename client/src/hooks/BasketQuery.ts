/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BasketQuery
// ====================================================

export interface BasketQuery_basket_items {
  __typename: "BasketItem";
  productId: string;
  quantity: number;
}

export interface BasketQuery_basket {
  __typename: "Basket";
  modificationCount: number;
  items: BasketQuery_basket_items[];
}

export interface BasketQuery {
  basket: BasketQuery_basket;
}
