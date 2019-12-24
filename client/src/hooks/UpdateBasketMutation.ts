/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateBasketMutation
// ====================================================

export interface UpdateBasketMutation_updateBasket {
  __typename: "BasketItem";
  productId: string;
  quantity: number;
}

export interface UpdateBasketMutation {
  updateBasket: UpdateBasketMutation_updateBasket[];
}

export interface UpdateBasketMutationVariables {
  productId: string;
  quantity: number;
}
