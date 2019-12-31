/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ItemInput } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: OrderSummaryQuery
// ====================================================

export interface OrderSummaryQuery_orderSummary_items_product {
  __typename: "Product";
  name: string;
}

export interface OrderSummaryQuery_orderSummary_items {
  __typename: "OrderItem";
  id: string;
  product: OrderSummaryQuery_orderSummary_items_product;
  quantity: number;
  grossAmount: string;
}

export interface OrderSummaryQuery_orderSummary {
  __typename: "OrderSummary";
  items: OrderSummaryQuery_orderSummary_items[];
  totalGrossAmount: string;
}

export interface OrderSummaryQuery {
  orderSummary: OrderSummaryQuery_orderSummary;
}

export interface OrderSummaryQueryVariables {
  items: ItemInput[];
}
