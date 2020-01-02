/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: OrdersQuery
// ====================================================

export interface OrdersQuery_orders_items_product {
  __typename: "Product";
  id: string;
  name: string;
}

export interface OrdersQuery_orders_items {
  __typename: "OrderItem";
  id: string;
  product: OrdersQuery_orders_items_product;
  quantity: number;
  netAmount: string;
  vatAmount: string;
  grossAmount: string;
}

export interface OrdersQuery_orders {
  __typename: "Order";
  id: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: OrderStatus;
  totalNetAmount: string;
  totalVatAmount: string;
  totalGrossAmount: string;
  items: OrdersQuery_orders_items[];
}

export interface OrdersQuery {
  orders: OrdersQuery_orders[];
}
